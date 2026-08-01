import React, { useState } from 'react';
import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import { FAQS_DATA } from '../data';
import { ChevronDown, ChevronUp, Sparkles, TrendingUp, Compass, ArrowRight, Zap, BadgeCheck, Map } from 'lucide-react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const stats = [
    { value: '120+', label: 'Delighted Customers', icon: 'Users' },
    { value: '80+', label: 'Completed Projects', icon: 'Code' },
    { value: '4.1', label: 'Average Rating ★', icon: 'Star' }
  ];

  const values = [
    { title: 'On-time Service', description: 'Strictest compliance to agreed milestone timelines. We respect commitments with zero drag.', icon: Zap, textGradient: 'text-amber-400' },
    { title: 'Affordable Prices', description: 'World-class premium designs engineered transparently without deep cost barriers.', icon: BadgeCheck, textGradient: 'text-amber-300' },
    { title: 'Available all over India', description: 'Client nodes established key zones—including NCR and West Bengal headquarters.', icon: Map, textGradient: 'text-amber-500' }
  ];

  const logoUrl = "https://i.ibb.co/rKxc0kTs/Whats-App-Image-2026-06-23-at-14-27-06.jpg";

  return (
    <div className="bg-[#0A0A0A] font-sans min-h-screen text-slate-100 flex flex-col justify-between" id="home-page-view">
      <Header />

      {/* Hero decor watermarks and abstract ambient spots */}
      <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-amber-500/5 to-transparent blur-[160px] rounded-full animate-pulseGlow" />
        <div className="absolute top-40 right-10 w-[350px] h-[350px] bg-amber-500/3 blur-[120px] rounded-full" />
        <div className="absolute top-[350px] left-10 w-[300px] h-[300px] bg-amber-500/2 blur-[100px] rounded-full" />
      </div>

      <main className="flex-1 relative z-10" id="home-main-section">
        
        {/* Hero Section */}
        <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="hero-section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#0F0F0F] border border-amber-500/20 animate-fadeIn">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="font-mono text-[11px] font-semibold text-amber-300 uppercase tracking-widest leading-none">
                  Elite Creative Agency
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
                  Walt Designs <br className="hidden sm:block" />
                  <span className="text-gradient font-bold">& Studio</span>
                </h1>
                <p className="text-neutral-400 text-lg leading-relaxed max-w-xl">
                  We engineer premium, professional digital products designed with zero lag. Our mission is to scale Indian startups, creators, and professionals with elite visual assets and bulletproof business forms.
                </p>
              </div>

              {/* Core Features / Quick Stats Pills */}
              <div className="flex flex-wrap gap-4 pt-2">
                {stats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="px-5 py-3 rounded-2xl bg-[#0F0F0F]/60 border border-neutral-800 backdrop-blur-sm hover:border-amber-500/25 transition-all flex items-center space-x-3"
                    id={`stat-hero-${idx}`}
                  >
                    <span className="font-display text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium font-mono border-l border-neutral-800 pl-3 leading-tight uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Hero CTA Block */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="/contact"
                  className="px-8 py-4 rounded-xl text-center font-display text-sm font-bold text-black bg-amber-500 hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-500/5 hover:scale-[1.02] active:scale-95"
                >
                  Consult Auto-AI Planner
                </a>
                <a
                  href="/services"
                  className="px-8 py-4 rounded-xl text-center font-display text-sm font-semibold text-slate-200 bg-[#0F0F0F] hover:bg-[#1A1A1A] border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer inline-flex items-center justify-center space-x-2"
                >
                  <span>Review Our Services</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </a>
              </div>
            </div>

            {/* Right Graphic column with Watermarks */}
            <div className="lg:col-span-5 relative" id="hero-graphic-block">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-[#1A1A1A]/20 to-transparent rounded-3xl blur-2xl" />
              
              {/* Overlapping glassmorphism frames detailing client hub */}
              <div className="relative glass-panel rounded-3xl border border-neutral-800 p-8 space-y-6 shadow-2xl bg-[#0F0F0F]/90 overflow-hidden group">
                {/* Embedded logo watermark */}
                <div className="absolute -bottom-10 -right-10 w-44 h-44 opacity-[0.03] select-none pointer-events-none">
                  <img src={logoUrl} alt="Watermark" className="w-full h-full object-cover rounded-full" />
                </div>
 
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-amber-500/20">
                      <img src={logoUrl} alt="Walt Main Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-slate-200">WALT DESIGNS HQ</h4>
                      <p className="font-mono text-[9px] text-amber-400 uppercase tracking-widest">& STUDIO DIRECTIVE</p>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                </div>

                {/* Micro presentation widget content */}
                <div className="space-y-4 text-xs font-mono">
                  <div className="space-y-1">
                    <p className="text-slate-500 text-[10px] uppercase">Service Reach Bounds:</p>
                    <p className="text-slate-300 font-sans text-sm font-medium">Pan-India Creative Integration</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 text-[10px] uppercase">Active Local Service Hubs:</p>
                    <p className="text-amber-400 font-sans text-sm font-medium">Delhi, Noida & Faridabad NCR</p>
                  </div>
                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-slate-500 uppercase text-[9px]">Establishment Code:</span>
                    <span className="text-amber-500 text-[11px] font-bold">W-2026-ACTIVE</span>
                  </div>
                </div>

                {/* Premium tag overlay */}
                <div className="flex items-center space-x-2 bg-[#0A0A0A] p-3 rounded-xl border border-neutral-800">
                  <TrendingUp className="w-4 h-4 text-amber-500 shrink-0" />
                  <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                    Over <span className="text-white font-semibold">80+ Projects</span> deployed with absolute zero design lags.
                  </p>
                </div>
              </div>

              {/* Floating micro accent cards */}
              <div className="absolute -bottom-6 -left-6 bg-[#0F0F0F] border border-amber-500/20 px-4 py-2.5 rounded-xl shadow-xl z-20 flex items-center space-x-2 text-xs font-mono animate-bounce" style={{ animationDuration: '4s' }}>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-amber-400 font-sans font-bold">100% On-time</span>
              </div>
            </div>

          </div>
        </section>

        {/* Core Business Values Banner */}
        <section className="py-16 bg-[#0F0F0F]/40 border-y border-neutral-800 px-4 sm:px-6 lg:px-8" id="values-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="sr-only">Core Walt Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, idx) => {
                const IconComponent = v.icon;
                return (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                    className="p-6 rounded-2xl bg-[#0F0F0F]/20 border border-neutral-850 space-y-4 hover:border-neutral-700 transition-all text-center md:text-left"
                    id={`value-card-${idx}`}
                  >
                    <div className="inline-flex p-3 rounded-xl bg-[#0A0A0A] border border-neutral-800 mx-auto md:mx-0">
                      <IconComponent className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-display font-semibold text-lg text-white">{v.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{v.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Portfolio Showcase Block */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="portfolio-section">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="font-mono text-xs uppercase text-amber-500 tracking-widest font-semibold">Exquisite Outcomes</span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-white">Featured Agency Showcase</h2>
            <p className="text-neutral-400 text-sm">Review a selection of premium websites, visual designs, resumes, and branding outputs.</p>
          </div>
          <Portfolio />
        </section>

        {/* Client Testimonial Segment */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-950/40 rounded-3xl space-y-12" id="testimonials-section">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="font-mono text-xs uppercase text-amber-500 tracking-widest font-semibold">Client Endorsements</span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-white">Trust is Handcrafted</h2>
            <p className="text-slate-400 text-sm">See how we deliver outstanding digital integrations across key business domains in India.</p>
          </div>
          <Testimonials />
        </section>

        {/* FAQ Section */}
        <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="faq-section">
          <div className="text-center space-y-3">
            <span className="font-mono text-xs uppercase text-amber-500 tracking-widest font-semibold">Answers Secured</span>
            <h2 className="font-display font-medium text-3xl text-white">Frequently Asked Questions</h2>
            <p className="text-neutral-400 text-sm">We believe in transparent operational parameters. Contact us for outstanding queries.</p>
          </div>

          <div className="space-y-4" id="faq-accordion">
            {FAQS_DATA.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="rounded-2xl bg-[#0F0F0F] border border-neutral-850 overflow-hidden transition-all duration-300"
                  id={`faq-item-${faq.id}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-[#1A1A1A]/40 transition-colors cursor-pointer"
                  >
                    <span className="font-display font-medium text-white pr-4">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-6 pt-0 border-t border-neutral-850 bg-[#0A0A0A]/20 text-sm text-neutral-400 leading-relaxed font-sans transition-all animate-fadeIn">
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
