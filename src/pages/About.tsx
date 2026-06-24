import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Award, Compass, Heart, Anchor, HelpCircle, ShieldCheck } from 'lucide-react';

export default function About() {
  const logoUrl = "https://i.ibb.co/rKxc0kTs/Whats-App-Image-2026-06-23-at-14-27-06.jpg";

  const coreValues = [
    { title: 'Artistic Precision', desc: 'No cookie-cutter templates. Every layout, typography selection, and alignment margin is handcrafted from scratch.', icon: Anchor },
    { title: 'Affordable Integrity', desc: 'Providing elite digital agency results without charging astronomical corporate prices.', icon: ShieldCheck },
    { title: 'Algorithmic Edge', desc: 'Whether writing clean code or editing YouTube video thumbnails, we optimize strictly for maximum speed, attention retention, and user metrics.', icon: Compass }
  ];

  return (
    <div className="bg-[#8C1A33] font-sans min-h-screen text-slate-100 flex flex-col justify-between" id="about-page-view">
      <Header />

      {/* Ambient glows */}
      <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-[20%] w-[350px] h-[350px] bg-amber-500/5 blur-[120px] rounded-full animate-pulseGlow" />
        <div className="absolute top-30 right-[15%] w-[300px] h-[300px] bg-amber-500/3 blur-[90px] rounded-full" />
      </div>

      <main className="flex-grow relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="about-main-section">
        
        {/* About Hero block with embedded logo watermark */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24" id="about-hero">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase text-amber-500 tracking-widest font-bold">The Creative Agency</span>
            <h1 className="font-display font-medium text-4xl sm:text-5xl text-white">
              Walt Designs & <br />
              <span className="text-gradient font-bold">Studio Story</span>
            </h1>
            <p className="text-neutral-400 text-base leading-relaxed">
              Walt Designs & Studio was established to empower brands with elite digital engineering, bypassing cumbersome structures. Our approach is direct, stateful, and tailored to maximize human metrics.
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Whether designing dynamic fullstack web applications, drafting ATS-friendly high-profile resumes, or conducting localized Google My Business SEO listings, our output remains completely bespoke and premium.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-[#1A1A1A]/10 to-transparent rounded-3xl blur-xl" />
            <div className="relative glass-panel rounded-3xl border border-neutral-800 p-8 sm:p-10 space-y-6 text-center bg-[#0F0F0F]">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-500/20 mx-auto shadow-2xl">
                <img src={logoUrl} alt="Walt Designs Logo" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-white text-lg">Priyanshu Kumar</h4>
                <p className="font-mono text-xs text-amber-500 uppercase tracking-widest">Founder & Creative Director</p>
              </div>
              <div className="pt-4 border-t border-neutral-850 text-neutral-400 text-xs text-left leading-relaxed">
                "We set out to challenge the average agency narrative in India. No slow templates, no generic templates, and no hidden billing brackets. Every Walt project gets my direct focus and execution signature."
              </div>
            </div>
          </div>

        </section>

        {/* Corporate stats summary */}
        <section className="p-8 sm:p-12 bg-neutral-900/10 border border-neutral-850 rounded-3xl mb-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center" id="corporate-credentials bg-[#0D0D0D]">
          <div className="space-y-1">
            <p className="font-display text-3xl sm:text-4xl font-bold text-amber-500">120+</p>
            <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Customers Nationwide</p>
          </div>
          <div className="space-y-1">
            <p className="font-display text-3xl sm:text-4xl font-bold text-white">80+</p>
            <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Projects Completed</p>
          </div>
          <div className="space-y-1">
            <p className="font-display text-3xl sm:text-4xl font-bold text-amber-500">4.1</p>
            <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Average User Rating</p>
          </div>
          <div className="space-y-1">
            <p className="font-display text-3xl sm:text-4xl font-bold text-amber-550">100%</p>
            <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">On-Time Performance</p>
          </div>
        </section>

        {/* Core methodology values list */}
        <section className="space-y-12" id="methodology">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="font-mono text-xs uppercase text-amber-500 tracking-widest font-semibold">Operational Pillars</span>
            <h2 className="font-display font-medium text-3xl text-white">The Handcrafted Standard</h2>
            <p className="text-neutral-400 text-sm">We adhere strictly to our design philosophy so each division delivers world-class precision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((val, id) => {
              const IconComponent = val.icon;
              return (
                <div key={id} className="glass-panel rounded-2xl border border-neutral-800 bg-[#0F0F0F] p-6 hover:border-amber-500/25 transition-all space-y-4">
                  <div className="inline-flex p-3 rounded-lg bg-amber-950/20 border border-amber-500/10 text-amber-550">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display font-semibold text-lg text-white">{val.title}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Regional footprint focus */}
        <section className="mt-24 p-8 sm:p-12 glass-panel rounded-3xl border border-neutral-800 bg-[#0F0F0F] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" id="geography-reach">
          <div className="space-y-5">
            <h3 className="font-display font-medium text-2xl text-white">Our Indian Footprint</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              With our operational core head office grounded in West Bengal, India, we have built physical collaboration linkages throughout the National Capital Region (excluding regional boundaries) — covering Noida tech avenues, Delhi proper networks, and Faridabad industrial lines.
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Our digital delivery mechanisms are fully remote-optimized, enabling clients all over India to access elite website engineering, video thumbnails, growth agency partnerships, and certified MSME licence filings instantly with no communication bottlenecks.
            </p>
          </div>
          <div className="p-6 bg-[#0A0A0A] rounded-2xl border border-neutral-850 space-y-3">
            <h4 className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">Office Locations & Channels</h4>
            <div className="space-y-2.5 text-xs text-slate-350">
              <p><strong>Primary HQ:</strong> West Bengal, India</p>
              <p><strong>Local NCR Services:</strong> Delhi, Faridabad, Noida (Virtual Presence & Mapping)</p>
              <p><strong>E-Mail Address:</strong> waltdesignsstudio@gmail.com</p>
              <p><strong>Technical Coordinator:</strong> Priyanshu Kumar (Founder)</p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
