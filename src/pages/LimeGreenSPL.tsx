import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Heart, Flame, Sparkles, Lock, Unlock, Volume2, VolumeX, ShieldAlert, CheckCircle2, Share2 } from 'lucide-react';

export default function LimeGreenSPL() {
  const [isCandleLit, setIsCandleLit] = useState(true);
  const [showSecretMsg, setShowSecretMsg] = useState(false);
  const [forgiven, setForgiven] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [heartsCount, setHeartsCount] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Simple Web Audio API Synthesizer for soft romantic ambient tone
  const toggleAmbientSound = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Soft gentle chord frequencies (E4, G#4, B4, E5)
      const freqs = [329.63, 415.30, 493.88, 659.25];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.3);
        osc.stop(ctx.currentTime + 6);
      });
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 6000);
    } catch (e) {
      console.log('Audio contextual start block', e);
    }
  };

  const triggerHearts = () => {
    const newHearts = Array.from({ length: 12 }, (_, i) => Date.now() + i);
    setHeartsCount(prev => [...prev, ...newHearts]);
    setForgiven(true);
    setTimeout(() => {
      setHeartsCount(prev => prev.filter(id => !newHearts.includes(id)));
    }, 3000);
  };

  const imagesList = [
    {
      id: 'img1',
      src: 'https://i.ibb.co/vxvZGrkL/Whats-App-Image-2026-08-06-at-19-39-46.jpg',
      link: 'https://ibb.co/rGf4SLH5',
      caption: 'Precious Memories',
      alt: 'Radha Rani Special Memory 1'
    },
    {
      id: 'img2',
      src: 'https://i.ibb.co/8gs2cFbZ/Whats-App-Image-2026-08-03-at-22-45-24.jpg',
      link: 'https://ibb.co/N2CpSwrB',
      caption: 'Unforgettable Moments',
      alt: 'Radha Rani Special Memory 2'
    },
    {
      id: 'img3',
      src: 'https://i.ibb.co/YTWVmVp1/Whats-App-Image-2026-08-03-at-22-45-22.jpg',
      link: 'https://ibb.co/n80K9KzY',
      caption: 'Sincere Apology',
      alt: 'Radha Rani Special Memory 3'
    }
  ];

  return (
    <div className="min-h-screen bg-[#061408] text-slate-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-lime-500 selection:text-black">
      
      {/* Floating Animated Hearts Overlay on Forgiveness click */}
      {heartsCount.map(id => (
        <div
          key={id}
          className="fixed z-50 pointer-events-none animate-bounce"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            animationDuration: `${Math.random() * 2 + 1}s`
          }}
        >
          <Heart className="w-8 h-8 text-lime-400 fill-lime-400 drop-shadow-[0_0_12px_rgba(163,230,53,0.8)]" />
        </div>
      ))}

      {/* Header Navigation */}
      <Header />

      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-lime-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-lime-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-emerald-500/10 blur-[100px] rounded-full" />
      </div>

      <main className="flex-1 relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        
        {/* Top Lime Green SPL Banner */}
        <section className="text-center space-y-4 pt-2">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-lime-950/80 border border-lime-500/40 text-lime-300 shadow-[0_0_20px_rgba(163,230,53,0.2)]">
            <Sparkles className="w-4 h-4 text-lime-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="font-mono text-xs font-bold uppercase tracking-widest">
              Lime Green SPL • Special Apology Page
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display">
            Sincere Apology to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400 drop-shadow-[0_0_25px_rgba(163,230,53,0.3)]">
              Radha Rani 💚
            </span>
          </h1>

          <p className="text-lime-200/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            A dedicated, heartfelt page made with pure respect, love, and a sincere plea for forgiveness.
          </p>

          <div className="flex justify-center pt-2">
            <button
              onClick={toggleAmbientSound}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-lime-900/40 border border-lime-500/30 text-lime-300 text-xs font-semibold hover:bg-lime-800/40 transition-all cursor-pointer shadow-md"
            >
              {isPlayingAudio ? <Volume2 className="w-4 h-4 text-lime-400 animate-pulse" /> : <VolumeX className="w-4 h-4 text-lime-400" />}
              <span>{isPlayingAudio ? 'Soft Chimes Playing...' : 'Play Soft Atmosphere Sound'}</span>
            </button>
          </div>
        </section>

        {/* Interactive Glowing Candle Section */}
        <section className="relative rounded-3xl bg-gradient-to-b from-[#0e2712]/90 to-[#08180c]/95 border border-lime-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden text-center space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.12)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 max-w-md mx-auto space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-lime-200 uppercase tracking-widest font-mono flex items-center justify-center space-x-2">
              <Flame className="w-5 h-5 text-lime-400" />
              <span>Candle of Hope & Repentance</span>
            </h2>

            {/* Candle Graphic */}
            <div className="py-6 flex flex-col items-center justify-center relative select-none">
              
              {/* Flame Glow */}
              {isCandleLit && (
                <div className="relative mb-1 flex flex-col items-center">
                  {/* Outer aura */}
                  <div className="absolute -top-6 w-16 h-16 bg-lime-400/30 rounded-full blur-xl animate-pulse" />
                  {/* Main Flame */}
                  <div className="w-6 h-10 bg-gradient-to-t from-amber-500 via-lime-300 to-white rounded-full animate-bounce shadow-[0_0_30px_#a3e635] transform origin-bottom transition-all duration-300" />
                  {/* Wick */}
                  <div className="w-1 h-3 bg-neutral-800" />
                </div>
              )}

              {!isCandleLit && (
                <div className="mb-2 h-10 flex items-center justify-center text-xs text-neutral-500 font-mono italic">
                  (Candle is unlit - click button below to light it)
                </div>
              )}

              {/* Candle Body */}
              <div className="w-14 h-36 bg-gradient-to-b from-lime-100 via-lime-200 to-lime-300 rounded-t-sm rounded-b-xl shadow-[0_0_20px_rgba(163,230,53,0.2)] border-t border-white/60 relative overflow-hidden flex flex-col items-center justify-end pb-3">
                <div className="w-full h-1/2 bg-gradient-to-t from-lime-400/30 to-transparent" />
                <Heart className="w-5 h-5 text-lime-700/60 fill-lime-700/20" />
              </div>

              {/* Candle Stand / Base */}
              <div className="w-24 h-4 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 rounded-full shadow-lg border border-amber-600/40 -mt-1" />
            </div>

            <p className="text-xs sm:text-sm text-lime-100/90 font-mono leading-relaxed">
              {isCandleLit 
                ? '🕯️ A flame is burning steadily for Radha Rani, symbolizing pure intentions & unwavering apology.'
                : 'Candle is paused. Light it to show your constant prayers.'}
            </p>

            <button
              onClick={() => setIsCandleLit(!isCandleLit)}
              className="px-6 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-black font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(163,230,53,0.4)] cursor-pointer active:scale-95 inline-flex items-center space-x-2"
            >
              <Flame className="w-4 h-4" />
              <span>{isCandleLit ? 'Keep Flame Glowing' : 'Light The Candle 🕯️'}</span>
            </button>
          </div>
        </section>

        {/* The Main Sorry Note / Message Box */}
        <section className="relative rounded-3xl bg-gradient-to-br from-[#0b240f] via-[#081b0c] to-[#041007] border-2 border-lime-500/50 p-6 sm:p-10 shadow-[0_0_40px_rgba(163,230,53,0.15)] text-left space-y-6">
          <div className="flex items-center justify-between border-b border-lime-500/20 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-lime-500/20 border border-lime-400/40 flex items-center justify-center text-lime-400">
                <Heart className="w-5 h-5 fill-lime-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-display">Deep Heartfelt Apology</h2>
                <span className="text-[11px] text-lime-400 font-mono uppercase tracking-wider">Public Pledge & Confession</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-lime-950 text-lime-300 text-xs font-mono font-bold border border-lime-500/30">
              SINCERE NOTE
            </span>
          </div>

          {/* Exact User Text Highlight Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-black/40 border border-lime-400/30 space-y-4 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <p className="text-lime-300 font-mono text-xs uppercase tracking-widest font-bold">Message for Radha Rani:</p>
            
            <blockquote className="text-lg sm:text-2xl font-serif italic text-white leading-relaxed tracking-wide text-lime-100 drop-shadow-sm">
              &ldquo;Please Radha Rani maaf krdo mujhe....bahut bari galti ho gyi mujhse...ab se kabhi nhi krunga plz shama kar do mai duniya ke saamne maafi maangta hu apse...&rdquo;
            </blockquote>

            <p className="text-xs sm:text-sm text-lime-200/80 leading-relaxed font-sans pt-2 border-t border-lime-500/20">
              I am genuinely sorry from the core of my heart. I promise to always treat you with utmost care, honesty, and affection. Please forgive me...
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              onClick={triggerHearts}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 text-black font-extrabold text-sm shadow-[0_0_25px_rgba(163,230,53,0.5)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
            >
              <Heart className="w-5 h-5 fill-black" />
              <span>{forgiven ? 'Forgiveness Accepted! 💚' : 'Accept Apology & Send Love 💚'}</span>
            </button>

            <div className="flex items-center space-x-2 text-xs text-lime-300/80 font-mono">
              <CheckCircle2 className="w-4 h-4 text-lime-400" />
              <span>Bound with pure love & devotion</span>
            </div>
          </div>
        </section>

        {/* Special Image Gallery Section (The 3 WhatsApp images) */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">Special Memories & Moments</h2>
            <p className="text-xs sm:text-sm text-lime-200/70 font-mono">Click on any photo to view in full resolution</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {imagesList.map((item) => (
              <div 
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-black/40 border border-lime-500/30 hover:border-lime-400 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    <img 
                      src={item.src} 
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-lime-500/30 text-[10px] text-lime-300 font-mono font-bold">
                    LIME GREEN SPL
                  </div>
                </div>

                {/* Card Bottom Footer */}
                <div className="p-4 bg-gradient-to-b from-[#0b220e] to-[#061408] border-t border-lime-500/20 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-white">{item.caption}</h3>
                    <p className="text-[10px] text-lime-300/70 font-mono">Dedicated to Radha Rani</p>
                  </div>
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-lime-500/20 border border-lime-400/30 text-lime-300 hover:bg-lime-400 hover:text-black transition-all"
                    title="Open Image Link"
                  >
                    <Share2 className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Secret Message Section */}
        <section className="relative rounded-3xl bg-gradient-to-br from-[#123317]/90 via-[#0a200f]/95 to-[#051308] border border-lime-400/40 p-6 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-4">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-lime-950 border border-lime-400/30 text-lime-300 text-xs font-mono font-bold">
              <Lock className="w-3.5 h-3.5 text-lime-400" />
              <span>PRIVATE ENVELOPE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Secret Message for Radha Rani
            </h2>

            <p className="text-xs sm:text-sm text-lime-200/80 leading-relaxed font-sans">
              There is a special message kept locked just for you. Tap below to unlock it.
            </p>

            {!showSecretMsg ? (
              <button
                onClick={() => {
                  setShowSecretMsg(true);
                  triggerHearts();
                }}
                className="px-8 py-3.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(163,230,53,0.5)] transform hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center space-x-2.5"
              >
                <Unlock className="w-4 h-4" />
                <span>Reveal Secret Message 💌</span>
              </button>
            ) : (
              <div className="p-6 sm:p-8 rounded-2xl bg-black/60 border-2 border-lime-400 text-center space-y-4 animate-fadeIn shadow-[0_0_50px_rgba(163,230,53,0.3)]">
                <div className="inline-block p-4 rounded-full bg-lime-500/20 border border-lime-400/50 animate-bounce">
                  <Heart className="w-12 h-12 text-lime-400 fill-lime-400 drop-shadow-[0_0_20px_rgba(163,230,53,0.8)]" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-lime-300 font-display tracking-tight animate-pulse">
                    I love You... ❤️💚
                  </h3>
                  <p className="text-sm sm:text-base text-lime-100 font-serif italic max-w-md mx-auto">
                    &ldquo;You mean the entire world to me. I promise to love, protect, respect, and prioritize you forever.&rdquo;
                  </p>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-lime-400/80 bg-lime-950 px-3 py-1 rounded-full border border-lime-500/30">
                    Forever Yours
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
