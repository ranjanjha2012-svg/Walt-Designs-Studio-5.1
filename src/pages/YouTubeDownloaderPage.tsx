import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import YouTubeDownloader from '../components/YouTubeDownloader';
import { 
  Zap, 
  ShieldCheck, 
  Download, 
  Youtube, 
  Sparkles, 
  Film, 
  Music, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Smartphone
} from 'lucide-react';

export default function YouTubeDownloaderPage() {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const faqs = [
    {
      id: 'faq-1',
      question: 'Is this YouTube Video Downloader 100% free with no ads?',
      answer: 'Yes! Our YouTube downloader tool is completely free, clean, and 100% ad-free. You can convert and download unlimited videos, shorts, and audio without popups or subscription walls.'
    },
    {
      id: 'faq-2',
      question: 'Can I download YouTube Shorts and MP3 Audio?',
      answer: 'Absolutely. Just paste the URL of any YouTube Short or standard YouTube video. You can extract high-bitrate MP3 audio (up to 320kbps) or download MP4 video files in 1080p, 720p, or 480p resolution.'
    },
    {
      id: 'faq-3',
      question: 'Do I need to install software or register an account?',
      answer: 'No installation or account registration required! Everything runs directly inside your browser safely on any device (Desktop, iPhone, Android, Tablet).'
    },
    {
      id: 'faq-4',
      question: 'How fast are video downloads processed?',
      answer: 'Our optimized backend proxy processes video info and conversion instantly. Downloads start in seconds directly to your device downloads folder.'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Copy Video Link',
      desc: 'Open YouTube on your app or browser, choose any video or Short, and copy its link.'
    },
    {
      step: '02',
      title: 'Paste into Search Box',
      desc: 'Paste the link into our downloader search bar above and click "Search Video".'
    },
    {
      step: '03',
      title: 'Choose Format & Download',
      desc: 'Select your preferred MP4 resolution or MP3 audio quality, then click Download.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-amber-500 selection:text-black">
      <Header />

      <main className="flex-1">
        
        {/* Page Hero Header */}
        <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Youtube className="w-4 h-4 text-red-500" />
            <span>Dedicated Video & Audio Converter</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            YouTube Video <span className="bg-gradient-to-r from-red-500 via-amber-400 to-amber-500 bg-clip-text text-transparent">Downloader</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Convert and download high-definition YouTube videos, Shorts, and high-quality MP3 audio streams instantly without restrictions.
          </p>
        </section>

        {/* Main Downloader Interactive Application */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <YouTubeDownloader />
        </section>

        {/* How It Works Steps */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 border-t border-neutral-900 mt-12">
          <div className="text-center space-y-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              How to Download YouTube Videos in 3 Easy Steps
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Follow these simple steps to save your favorite content directly to your device.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#0F0F0F] border border-neutral-850 hover:border-amber-500/30 transition-all space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-extrabold text-3xl text-amber-500/40 group-hover:text-amber-500 transition-colors">
                    {item.step}
                  </span>
                  <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-400">
                    {idx === 0 && <Youtube className="w-5 h-5 text-red-500" />}
                    {idx === 1 && <Sparkles className="w-5 h-5 text-amber-400" />}
                    {idx === 2 && <Download className="w-5 h-5 text-emerald-400" />}
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg text-white">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features & Advantages Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-neutral-900/30 rounded-3xl border border-neutral-850 my-12 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Why Use Our Free Downloader?
            </h2>
            <p className="text-slate-400 text-sm">
              Built with modern web speed, security, and cleanliness in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#0A0A0A] border border-neutral-800 space-y-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">100% Ad-Free & Safe</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                No annoying popups, aggressive banners, or malicious redirection scripts. Just clean downloads.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0A0A] border border-neutral-800 space-y-3">
              <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400 w-fit">
                <Film className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">Full HD 1080p Support</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Preserve crisp video quality with multiple resolution choices ranging from 360p up to 1080p HD.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0A0A] border border-neutral-800 space-y-3">
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 w-fit">
                <Music className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">High Quality MP3 Audio</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Convert video tracks into 320kbps MP3 audio files perfect for music playlists and podcast listening.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0A0A] border border-neutral-800 space-y-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 w-fit">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">Mobile & Tablet Friendly</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Fully responsive design crafted for mobile phones, tablets, laptops, and desktop computers.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0A0A] border border-neutral-800 space-y-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">Lightning Fast Speed</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                High-bandwidth server proxy processing ensures rapid video conversion without waiting.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0A0A] border border-neutral-800 space-y-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 w-fit">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">No Signup Required</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Start downloading immediately without creating an account or sharing personal details.
              </p>
            </div>
          </div>
        </section>

        {/* Downloader FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm">
              Everything you need to know about downloading videos.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="rounded-2xl bg-[#0F0F0F] border border-neutral-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between space-x-4 cursor-pointer hover:bg-neutral-900/50 transition-colors"
                  >
                    <span className="font-display font-semibold text-sm sm:text-base text-white">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-neutral-850/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
