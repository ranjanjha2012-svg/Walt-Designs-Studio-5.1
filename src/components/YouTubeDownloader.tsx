import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Download, 
  Youtube, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Play, 
  Music, 
  Film, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ExternalLink, 
  Copy, 
  Check, 
  X,
  Share2
} from 'lucide-react';

export interface VideoInfo {
  videoId: string;
  title: string;
  author: string;
  authorUrl: string;
  thumbnail: string;
  duration?: string;
  embedUrl: string;
}

export default function YouTubeDownloader() {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [activeTab, setActiveTab] = useState<'video' | 'audio' | 'thumbnail'>('video');
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Helper to extract Youtube video ID
  const extractVideoId = (url: string): string | null => {
    if (!url) return null;
    const trimmed = url.trim();
    // Raw video ID check
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = trimmed.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleFetchVideo = async (targetUrl?: string) => {
    const input = targetUrl || urlInput;
    setError(null);
    
    if (!input.trim()) {
      setError('Please paste or type a valid YouTube video or Shorts link.');
      return;
    }

    const videoId = extractVideoId(input);
    if (!videoId) {
      setError('Invalid YouTube link. Please check the URL and try again.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/yt/info?url=${encodeURIComponent(input)}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to retrieve video information.');
      }

      setVideoInfo(data.videoInfo);
    } catch (err: any) {
      // Fallback client-side oEmbed resolution if server endpoint fails
      try {
        const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        if (oembedRes.ok) {
          const oembedData = await oembedRes.json();
          setVideoInfo({
            videoId,
            title: oembedData.title || 'YouTube Video',
            author: oembedData.author_name || 'YouTube Creator',
            authorUrl: oembedData.author_url || `https://www.youtube.com/watch?v=${videoId}`,
            thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
            embedUrl: `https://www.youtube.com/embed/${videoId}`
          });
          setError(null);
        } else {
          throw new Error('Unable to fetch video details.');
        }
      } catch (fallbackErr) {
        setError(err.message || 'Could not fetch video info. Please verify the URL.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrlInput(text);
        handleFetchVideo(text);
      }
    } catch (err) {
      // Clipboard access denied or unhandled
    }
  };

  const handleCopyLink = () => {
    if (videoInfo) {
      navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${videoInfo.videoId}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const triggerDownload = async (format: string, quality: string) => {
    if (!videoInfo) return;
    setDownloadingFormat(`${format}-${quality}`);

    try {
      // Request download from backend proxy or open download stream
      const downloadUrl = `/api/yt/download?videoId=${videoInfo.videoId}&format=${format}&quality=${quality}&title=${encodeURIComponent(videoInfo.title)}`;
      
      // Create hidden link to initiate file download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${videoInfo.title.replace(/[^a-zA-Z0-9]/g, '_')}_${quality}.${format}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setTimeout(() => setDownloadingFormat(null), 1500);
    }
  };

  const videoQualities = [
    { label: '1080p Full HD', quality: '1080p', size: '~45 MB', badge: 'Best Quality' },
    { label: '720p HD', quality: '720p', size: '~22 MB', badge: 'Popular' },
    { label: '480p Standard', quality: '480p', size: '~12 MB', badge: 'Fast' },
    { label: '360p Compact', quality: '360p', size: '~7 MB', badge: 'Mobile' },
  ];

  const audioQualities = [
    { label: 'MP3 High Quality (320kbps)', quality: '320k', size: '~8 MB', badge: 'Crisp Sound' },
    { label: 'MP3 Standard (128kbps)', quality: '128k', size: '~3.5 MB', badge: 'Standard' },
    { label: 'M4A Audio Stream', quality: 'm4a', size: '~4 MB', badge: 'Original' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12" id="youtube-downloader-app">
      {/* Container Panel */}
      <div className="relative rounded-3xl border border-neutral-800 bg-[#0F0F0F]/90 backdrop-blur-md p-6 sm:p-10 shadow-2xl overflow-hidden">
        
        {/* Glow backdrop effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Header Title */}
        <div className="relative text-center space-y-4 mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 font-mono text-xs font-semibold uppercase tracking-widest">
            <Youtube className="w-4 h-4 text-red-500 animate-pulse" />
            <span>Ad-Free YouTube Downloader</span>
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Download YouTube Videos & Shorts <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-red-500 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Zero Restrictions. Zero Ads.
            </span>
          </h2>
          
          <p className="text-neutral-400 text-sm max-w-xl mx-auto leading-relaxed">
            Paste any YouTube video or Shorts link below to convert and download instantly in High Definition MP4 or High Quality MP3 audio.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative max-w-3xl mx-auto mb-8">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleFetchVideo(); }}
            className="flex flex-col sm:flex-row gap-3 p-2 bg-[#0A0A0A] border border-neutral-800 rounded-2xl focus-within:border-amber-500/50 transition-all shadow-inner"
          >
            <div className="relative flex-1 flex items-center px-3">
              <Youtube className="w-5 h-5 text-red-500 mr-3 shrink-0" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Paste YouTube Video or Shorts URL (e.g. https://www.youtube.com/watch?v=...)"
                className="w-full bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none py-3"
              />
              {urlInput && (
                <button
                  type="button"
                  onClick={() => { setUrlInput(''); setVideoInfo(null); setError(null); }}
                  className="p-1 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors mr-1"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handlePaste}
                className="px-2.5 py-1 text-xs font-mono bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-amber-400 rounded-lg transition-colors shrink-0 hidden sm:block"
                title="Paste from clipboard"
              >
                Paste
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-black font-display text-sm font-bold transition-all shadow-lg flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-black" />
                  <span>Search Video</span>
                </>
              )}
            </button>
          </form>

          {/* Quick error feedback */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs flex items-center space-x-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </motion.div>
          )}
        </div>

        {/* Feature Highlights Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-400 mb-8 border-y border-neutral-850 py-4">
          <div className="flex items-center space-x-1.5 text-amber-400">
            <Zap className="w-3.5 h-3.5" />
            <span>Instant Processing</span>
          </div>
          <span className="text-neutral-700">•</span>
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Safe & Ad-Free</span>
          </div>
          <span className="text-neutral-700">•</span>
          <div className="flex items-center space-x-1.5 text-blue-400">
            <Film className="w-3.5 h-3.5" />
            <span>100% Full HD Support</span>
          </div>
          <span className="text-neutral-700">•</span>
          <div className="flex items-center space-x-1.5 text-purple-400">
            <Music className="w-3.5 h-3.5" />
            <span>High Quality Audio MP3</span>
          </div>
        </div>

        {/* Video Result Card */}
        <AnimatePresence>
          {videoInfo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl bg-[#0A0A0A] border border-neutral-800 p-6 space-y-6 shadow-2xl"
              id="youtube-result-card"
            >
              {/* Top Details Header */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Thumbnail / Player Frame */}
                <div className="md:col-span-5 relative group rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-video">
                  <img
                    src={videoInfo.thumbnail}
                    alt={videoInfo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback thumbnail
                      (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${videoInfo.videoId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={`https://www.youtube.com/watch?v=${videoInfo.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-red-600/90 text-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center"
                      title="Watch on YouTube"
                    >
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </a>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white">
                    HD
                  </div>
                </div>

                {/* Title & Channel details */}
                <div className="md:col-span-7 space-y-4">
                  <div className="space-y-2">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3 text-amber-400" />
                      <span>Ready to Download</span>
                    </span>

                    <h3 className="font-display font-semibold text-lg text-white leading-snug line-clamp-2">
                      {videoInfo.title}
                    </h3>

                    <div className="flex items-center space-x-3 text-xs text-neutral-400">
                      <span>Channel: <strong className="text-slate-200">{videoInfo.author}</strong></span>
                    </div>
                  </div>

                  {/* Actions bar */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-neutral-850">
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs text-slate-300 font-mono flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                      <span>{copied ? 'Copied Link' : 'Copy Video Link'}</span>
                    </button>

                    <a
                      href={`https://www.youtube.com/watch?v=${videoInfo.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs text-slate-300 font-mono flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Open on YouTube</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Format Selection Tabs */}
              <div className="space-y-4 pt-4 border-t border-neutral-850">
                <div className="flex items-center space-x-2 border-b border-neutral-850 pb-2">
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`px-4 py-2 rounded-xl text-xs font-display font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                      activeTab === 'video'
                        ? 'bg-amber-500 text-black shadow-md'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>Video (MP4)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('audio')}
                    className={`px-4 py-2 rounded-xl text-xs font-display font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                      activeTab === 'audio'
                        ? 'bg-amber-500 text-black shadow-md'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    <Music className="w-3.5 h-3.5" />
                    <span>Audio (MP3)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('thumbnail')}
                    className={`px-4 py-2 rounded-xl text-xs font-display font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                      activeTab === 'thumbnail'
                        ? 'bg-amber-500 text-black shadow-md'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>HD Thumbnail</span>
                  </button>
                </div>

                {/* Tab 1: Video MP4 Downloads */}
                {activeTab === 'video' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-fadeIn">
                    {videoQualities.map((item, idx) => {
                      const isDownloading = downloadingFormat === `mp4-${item.quality}`;
                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3 group"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-display font-bold text-sm text-white">{item.label}</h4>
                              <p className="font-mono text-[10px] text-neutral-400">{item.size}</p>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-[9px] font-semibold border border-amber-500/20">
                              {item.badge}
                            </span>
                          </div>

                          <button
                            onClick={() => triggerDownload('mp4', item.quality)}
                            disabled={isDownloading}
                            className="w-full py-2.5 rounded-lg bg-neutral-800 hover:bg-amber-500 hover:text-black font-display text-xs font-bold text-slate-200 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow"
                          >
                            {isDownloading ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Preparing...</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>Download MP4</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Tab 2: Audio MP3 Downloads */}
                {activeTab === 'audio' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fadeIn">
                    {audioQualities.map((item, idx) => {
                      const isDownloading = downloadingFormat === `mp3-${item.quality}`;
                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3 group"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-display font-bold text-sm text-white">{item.label}</h4>
                              <p className="font-mono text-[10px] text-neutral-400">{item.size}</p>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-mono text-[9px] font-semibold border border-purple-500/20">
                              {item.badge}
                            </span>
                          </div>

                          <button
                            onClick={() => triggerDownload('mp3', item.quality)}
                            disabled={isDownloading}
                            className="w-full py-2.5 rounded-lg bg-neutral-800 hover:bg-amber-500 hover:text-black font-display text-xs font-bold text-slate-200 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow"
                          >
                            {isDownloading ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Converting...</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>Download MP3</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Tab 3: HD Thumbnail Downloads */}
                {activeTab === 'thumbnail' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                      <div className="aspect-video rounded-lg overflow-hidden border border-neutral-800 bg-black">
                        <img 
                          src={`https://i.ytimg.com/vi/${videoInfo.videoId}/maxresdefault.jpg`} 
                          alt="Max Res Thumbnail"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${videoInfo.videoId}/hqdefault.jpg`;
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-display font-bold text-xs text-white">Full HD (1080p) Cover</p>
                          <p className="font-mono text-[10px] text-neutral-400">1920x1080 resolution</p>
                        </div>
                        <a
                          href={`https://i.ytimg.com/vi/${videoInfo.videoId}/maxresdefault.jpg`}
                          target="_blank"
                          download={`YouTube_Thumbnail_${videoInfo.videoId}.jpg`}
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-display text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                          <span>Save JPG</span>
                        </a>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                      <div className="aspect-video rounded-lg overflow-hidden border border-neutral-800 bg-black">
                        <img 
                          src={`https://i.ytimg.com/vi/${videoInfo.videoId}/hqdefault.jpg`} 
                          alt="HQ Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-display font-bold text-xs text-white">High Quality (HQ) Cover</p>
                          <p className="font-mono text-[10px] text-neutral-400">480x360 resolution</p>
                        </div>
                        <a
                          href={`https://i.ytimg.com/vi/${videoInfo.videoId}/hqdefault.jpg`}
                          target="_blank"
                          download={`YouTube_Thumbnail_HQ_${videoInfo.videoId}.jpg`}
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-display text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                          <span>Save JPG</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
