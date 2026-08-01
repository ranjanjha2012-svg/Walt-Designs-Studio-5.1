import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Memory store for contact listings (in-memory persistent during container lifecycle)
interface EnquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  details: string;
  timestamp: string;
}

const ENQUIRIES_DATABASE: EnquiryRecord[] = [];

// Lazy-initialize Gemini AI client per Guidelines
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'MY_GEMINI_API_KEY') {
      throw new Error('GEMINI_API_KEY is not configured in the workspace secrets panel. Please update it in the settings panel.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Route: Contact Enquiry Form Submission
  app.post('/api/contact', (req, res) => {
    try {
      const { name, email, phone, service, details } = req.body;
      
      if (!name || !email || !phone || !details) {
        return res.status(400).json({ error: 'All core fields are required' });
      }

      const ticketId = `WDT-${Math.floor(Math.random() * 900000 + 100000)}`;
      const newEnquiry: EnquiryRecord = {
        id: ticketId,
        name,
        email,
        phone,
        service,
        details,
        timestamp: new Date().toISOString()
      };

      ENQUIRIES_DATABASE.push(newEnquiry);
      console.log(`[Walt Enquiry Saved] Ticket: ${ticketId}, Client: ${name}, Division: ${service}`);

      return res.status(200).json({ 
        success: true, 
        ticketId,
        message: 'Your brief was secured successfully.' 
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Server error' });
    }
  });

  // API Route: YouTube Video Information Fetcher
  app.get('/api/yt/info', async (req, res) => {
    try {
      const inputUrl = req.query.url as string;
      if (!inputUrl) {
        return res.status(400).json({ success: false, error: 'URL parameter is required' });
      }

      // Helper regex to extract 11-character Youtube video ID
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = inputUrl.trim().match(regExp);
      const videoId = (match && match[2].length === 11) ? match[2] : (inputUrl.trim().length === 11 ? inputUrl.trim() : null);

      if (!videoId) {
        return res.status(400).json({ success: false, error: 'Invalid YouTube link format. Please check the URL.' });
      }

      // Query YouTube official oEmbed API for details
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      
      let title = 'YouTube Video';
      let author = 'YouTube Creator';
      let authorUrl = `https://www.youtube.com/watch?v=${videoId}`;

      if (oembedRes.ok) {
        const oembedData = await oembedRes.json();
        title = oembedData.title || title;
        author = oembedData.author_name || author;
        authorUrl = oembedData.author_url || authorUrl;
      }

      const videoInfo = {
        videoId,
        title,
        author,
        authorUrl,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`
      };

      return res.status(200).json({ success: true, videoInfo });
    } catch (err: any) {
      console.error('[YT Info Error]:', err.message);
      return res.status(500).json({ success: false, error: 'Could not resolve YouTube video details.' });
    }
  });

  // Helper function to resolve and stream binary media directly to Express response
  async function streamYouTubeMedia(
    videoId: string,
    format: 'mp4' | 'mp3' | 'm4a',
    quality: string,
    cleanFilename: string,
    res: express.Response
  ) {
    const isAudio = format === 'mp3' || format === 'm4a';
    const candidateUrls: string[] = [];

    // Provider 1: Cobalt Instances
    const cobaltInstances = [
      'https://api.cobalt.tools/api/json',
      'https://co.wuk.sh/api/json',
      'https://cobalt-api.kwippy.net/api/json',
      'https://api.imput.net/api/json'
    ];

    for (const cobaltUrl of cobaltInstances) {
      try {
        const cobaltRes = await fetch(cobaltUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
          },
          body: JSON.stringify({
            url: `https://www.youtube.com/watch?v=${videoId}`,
            vQuality: quality.replace('p', ''),
            isAudioOnly: isAudio,
            filenamePattern: 'basic'
          })
        });

        if (cobaltRes.ok) {
          const cobaltData: any = await cobaltRes.json();
          if (cobaltData && cobaltData.url) {
            candidateUrls.push(cobaltData.url);
            break;
          }
        }
      } catch (err) {
        // Try next
      }
    }

    // Provider 2: Invidious Instances (Format streams)
    if (candidateUrls.length === 0) {
      const invidiousInstances = [
        'https://inv.tux.pizza/api/v1/videos/',
        'https://vid.puffyan.us/api/v1/videos/',
        'https://invidious.nerdvpn.de/api/v1/videos/',
        'https://inv.riverside.rocks/api/v1/videos/'
      ];

      for (const invInstance of invidiousInstances) {
        try {
          const invRes = await fetch(`${invInstance}${videoId}`);
          if (invRes.ok) {
            const data: any = await invRes.json();
            if (isAudio && data.adaptiveFormats) {
              const audioFormat = data.adaptiveFormats.find((f: any) => f.type?.includes('audio') || f.container === 'm4a' || f.container === 'webm');
              if (audioFormat && audioFormat.url) {
                candidateUrls.push(audioFormat.url);
                break;
              }
            } else if (!isAudio && data.formatStreams) {
              const matchingStream = data.formatStreams.find((f: any) => f.qualityLabel === quality || f.quality === quality) || data.formatStreams[0];
              if (matchingStream && matchingStream.url) {
                candidateUrls.push(matchingStream.url);
                break;
              }
            }
          }
        } catch (err) {
          // Continue
        }
      }
    }

    // Provider 3: Piped Instances
    if (candidateUrls.length === 0) {
      const pipedInstances = [
        'https://pipedapi.kavin.rocks/streams/',
        'https://api.piped.video/streams/',
        'https://pipedapi.mha.fi/streams/'
      ];

      for (const pipedUrl of pipedInstances) {
        try {
          const pipedRes = await fetch(`${pipedUrl}${videoId}`);
          if (pipedRes.ok) {
            const data: any = await pipedRes.json();
            if (isAudio && data.audioStreams?.length > 0) {
              candidateUrls.push(data.audioStreams[0].url);
              break;
            } else if (!isAudio && data.videoStreams?.length > 0) {
              const stream = data.videoStreams.find((s: any) => s.quality === quality || s.format === 'MPEG_4') || data.videoStreams[0];
              if (stream && stream.url) {
                candidateUrls.push(stream.url);
                break;
              }
            }
          }
        } catch (err) {
          // Continue
        }
      }
    }

    // Proxy stream from candidates
    for (const streamUrl of candidateUrls) {
      try {
        const streamRes = await fetch(streamUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Referer': 'https://www.youtube.com/'
          }
        });

        const contentType = streamRes.headers.get('content-type') || '';
        const contentLength = streamRes.headers.get('content-length');

        if (
          streamRes.ok &&
          !contentType.includes('text/html') &&
          !contentType.includes('application/json')
        ) {
          res.setHeader('Content-Type', format === 'mp3' ? 'audio/mpeg' : (format === 'm4a' ? 'audio/mp4' : 'video/mp4'));
          res.setHeader('Content-Disposition', `attachment; filename="${cleanFilename}"`);
          if (contentLength && parseInt(contentLength, 10) > 1000) {
            res.setHeader('Content-Length', contentLength);
          }
          res.status(200);

          if (streamRes.body) {
            const reader = (streamRes.body as any).getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              res.write(value);
            }
            res.end();
            return;
          } else {
            const arrayBuffer = await streamRes.arrayBuffer();
            return res.send(Buffer.from(arrayBuffer));
          }
        }
      } catch (streamErr) {
        console.error('[Stream Proxy Error]:', streamErr);
      }
    }

    // Error response if all stream attempts fail - return JSON status 502, NEVER HTML or 302 redirect
    return res.status(502).json({
      success: false,
      error: 'Unable to stream video directly from YouTube. The video may be restricted, private, or age-gated. Please try another video or format.'
    });
  }

  // API Route: YouTube Video Direct Stream & Download Endpoint
  app.get('/api/yt/download', async (req, res) => {
    try {
      const videoId = req.query.videoId as string;
      const format = ((req.query.format as string) || 'mp4') as 'mp4' | 'mp3' | 'm4a';
      const quality = (req.query.quality as string) || '720p';
      const rawTitle = (req.query.title as string) || 'YouTube_Video';

      if (!videoId) {
        return res.status(400).json({ success: false, error: 'videoId parameter is missing.' });
      }

      const cleanTitle = rawTitle.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50) || 'YouTube_Video';
      const filename = `${cleanTitle}_${quality}.${format}`;

      return await streamYouTubeMedia(videoId, format, quality, filename, res);

    } catch (err: any) {
      console.error('[YT Download Proxy Error]:', err.message);
      return res.status(500).json({ success: false, error: 'Server error processing video stream.' });
    }
  });

  // API Route: AI Business Planner using Gemini 3.5 Flash JSON Output
  app.post('/api/ai-planner', async (req, res) => {
    try {
      const { businessIdea, targetAudience, budgetRange, extraDetails } = req.body;

      if (!businessIdea) {
        return res.status(400).json({ error: 'Business Idea is required to generate strategy.' });
      }

      // Initialize Gemini Client safely
      const ai = getGeminiClient();

      const systemPrompt = `
        You are the automated Chief Creative Strategy Planner model of "Walt Designs & Studio" (an elite Indian design, technical dev, media edit, and MSME registration agency).
        Given a client's business idea, target audience, budget, and extra requirements, you synthesize a 5-step operational blueprint.
        
        CRITICAL RULES:
        1. Always align suggested steps with actual services and divisions offered by Walt Designs:
           - "Web Designing/Developing" (custom react, swift speed, commerce portals)
           - "Resume & CV Making" (elite ATS scores, digital layout bio portfolios)
           - "Thumbnail/Video Editing" (algorithm CTR tricks, cinematic SHORT CUT editing)
           - "Growth Agency" (SEO listings, GMB reviews, micro influencer pairings)
           - "Licence & Forms Registration" (digital GST applications, MSME filings, trade licenses)
        2. Set budget references under rupees "₹" and keep them realistic (matching are pricing).
        3. Keep titles and descriptions human, professional, precise and high-craft. Avoid boring cliches.
        4. Focus on Delhi, Noida, Faridabad, or India-wide capabilities if applicable.
      `;

      const prompt = `
        Analyze the following startup parameters:
        - Business Concept: ${businessIdea}
        - Intended Target Market/Audience: ${targetAudience || 'General Public/Indian market'}
        - Target Budget Profile: ${budgetRange}
        - Additional Wishes: ${extraDetails || 'None'}
        
        Please produce of high-craft custom launch roadmap in JSON structure matching the schema.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              businessNameSuggestion: {
                type: Type.STRING,
                description: "A brandable, clean corporate name suggestion custom-designed for this idea."
              },
              strategySummary: {
                type: Type.STRING,
                description: "A 2-sentence highly professional overview of the core approach we recommend."
              },
              estimatedTotalCost: {
                type: Type.STRING,
                description: "E.g., starting at ₹18,500 under Walt Packages"
              },
              timelineEstimate: {
                type: Type.STRING,
                description: "E.g., 20-30 Days to full launch"
              },
              customSteps: {
                type: Type.ARRAY,
                description: "List of exactly 4 to 5 sequential stages mapped out.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: {
                      type: Type.STRING,
                      description: "E.g., Brand Authority Establishment or Seamless Local Licencing"
                    },
                    summary: {
                      type: Type.STRING,
                      description: "Short details explaining exactly how this step sets up their business."
                    },
                    timeline: {
                      type: Type.STRING,
                      description: "E.g., Days 1-5"
                    },
                    recommendedWaltService: {
                      type: Type.STRING,
                      description: "MUST strictly be one of: Web Designing/Developing, Resume & CV Making, Thumbnail/Video Editing, Growth Agency, Licence & Forms Registration"
                    },
                    actionItems: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.STRING
                      },
                      description: "2 custom tactical actions they must do inside this phase"
                    }
                  },
                  required: ['title', 'summary', 'timeline', 'recommendedWaltService', 'actionItems']
                }
              }
            },
            required: ['businessNameSuggestion', 'strategySummary', 'customSteps', 'estimatedTotalCost', 'timelineEstimate']
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Empirical blueprint synthesis yielded void output. Please try again.');
      }

      const blueprint = JSON.parse(responseText.trim());

      return res.status(200).json({ success: true, blueprint });
    } catch (err: any) {
      console.error('[AI Planner Error]:', err.message);
      return res.status(500).json({ error: err.message || 'Generation Halt' });
    }
  });

  // Multipage routing map in dev environment (Vite handles compilation)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    // Custom path mapping middleware to target distinct HTML pages in dev (MPA emulation)
    app.use((req, res, next) => {
      const cleanPath = req.path;
      if (cleanPath === '/youtube-downloader' || cleanPath === '/downloader') {
        req.url = '/youtube-downloader.html';
      } else if (cleanPath === '/services') {
        req.url = '/services.html';
      } else if (cleanPath === '/about') {
        req.url = '/about.html';
      } else if (cleanPath === '/contact') {
        req.url = '/contact.html';
      } else if (cleanPath === '/' || cleanPath === '/index.html') {
        req.url = '/index.html';
      }
      next();
    });

    app.use(vite.middlewares);
  } else {
    // Production delivery: serve compiled html files in dist/
    const distPath = path.join(process.cwd(), 'dist');
    
    app.get('/', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });

    app.get(['/youtube-downloader', '/downloader'], (req, res) => {
      res.sendFile(path.join(distPath, 'youtube-downloader.html'));
    });
    
    app.get('/services', (req, res) => {
      res.sendFile(path.join(distPath, 'services.html'));
    });
    
    app.get('/about', (req, res) => {
      res.sendFile(path.join(distPath, 'about.html'));
    });
    
    app.get('/contact', (req, res) => {
      res.sendFile(path.join(distPath, 'contact.html'));
    });

    // Fallbacks and Static assets
    app.use(express.static(distPath));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Walt Designs Express Server] Active on port ${PORT}`);
  });
}

startServer();
