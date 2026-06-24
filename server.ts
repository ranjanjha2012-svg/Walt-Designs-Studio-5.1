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
      if (cleanPath === '/services') {
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
