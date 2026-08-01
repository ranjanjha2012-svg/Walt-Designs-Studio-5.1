import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import HomeInquiryForm from './components/HomeInquiryForm';
import { FAQS_DATA } from './data';
import { ChevronDown, ChevronUp, Sparkles, TrendingUp, ArrowRight, Zap, BadgeCheck, Map } from 'lucide-react';

export default function App() {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        if (window.scrollY > heroHeight - 100) {
          setShowBackToTop(true);
        } else {
          setShowBackToTop(false);
        }
      } else {
        if (window.scrollY > 500) {
          setShowBackToTop(true);
        } else {
          setShowBackToTop(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = [
    { value: '120+', label: 'Delighted customers' },
    { value: '80+', label: 'Completed Projects' },
    { value: '4.1', label: 'Avg Rating' },
    { value: '24/7', label: 'Backend Team' }
  ];

  const values = [
    { 
      title: 'On-time Service', 
      description: 'Strictest compliance to agreed milestone timelines. We respect commitments with zero drag.', 
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80' 
    },
    { 
      title: 'Affordable Prices', 
      description: 'World-class premium designs engineered transparently without deep cost barriers.', 
      icon: BadgeCheck,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80' 
    },
    { 
      title: 'Available all over India', 
      description: 'Client nodes established key zones—including NCR and West Bengal headquarters.', 
      icon: Map,
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80' 
    },
    {
      title: 'High quality Service in budget',
      description: 'Exquisite elite-tier engineering and creative outcomes tailored to clear pricing targets.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const logoUrl = "https://i.ibb.co/rKxc0kTs/Whats-App-Image-2026-06-23-at-14-27-06.jpg";

  return (
    <div className="bg-[#8C1A33] font-sans min-h-screen text-slate-100 flex flex-col justify-between relative w-full max-w-full overflow-x-hidden" id="home-page-view">
      
      {/* Light Wine page background accent highlight in deep page areas */}
      <div className="absolute top-[100vh] left-0 right-0 h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E11D48]/10 blur-[150px] rounded-full" />
      </div>

      <Header />

      {/* Redesigned Premium Hero Section - Content-Adaptive to Remove Spacing Gaps */}
      <section 
        id="hero-section" 
        className="relative w-full max-w-full min-h-screen bg-gradient-to-br from-[#021B34] via-[#032B4E] to-[#063E63] overflow-hidden flex flex-col justify-start border-b border-cyan-950"
      >
        {/* Subtle radial gradients for extra depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,108,154,0.18)_0%,rgba(3,43,78,0)_70%)] pointer-events-none z-0" stroke="none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0A6C9A]/20 rounded-full blur-[120px] pointer-events-none z-0 animate-glow-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#0A6C9A]/15 rounded-full blur-[120px] pointer-events-none z-0 animate-glow-pulse" style={{ animationDelay: '2.5s' }} />

        {/* Low Opacity Custom SVG Coding Monitor Background Artwork */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-[0.14] pointer-events-none stroke-cyan-400/40 fill-none z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tech square mesh grid */}
          <defs>
            <pattern id="tech-mesh" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" strokeWidth="0.5" stroke="rgba(34, 211, 238, 0.12)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-mesh)" />

          {/* IDE coding monitor editor window frame */}
          <g transform="translate(30, 40)" stroke="rgba(34, 211, 238, 0.25)" strokeWidth="1">
            <rect x="0" y="0" width="94%" height="520" rx="12" fill="rgba(3, 43, 78, 0.45)" />
            <line x1="0" y1="40" x2="94%" y2="40" />
            <circle cx="20" cy="20" r="6" fill="#ef4444" opacity="0.6" />
            <circle cx="40" cy="20" r="6" fill="#f59e0b" opacity="0.6" />
            <circle cx="60" cy="20" r="6" fill="#10b981" opacity="0.6" />
            <text x="90" y="25" fill="rgba(34, 211, 238, 0.6)" fontFamily="monospace" fontSize="11" fontWeight="bold" stroke="none">walt_designs_studio.ts — Editor Mode</text>
          </g>

          {/* Monospace Code text on background */}
          <g fill="rgba(34, 211, 238, 0.55)" fontFamily="monospace" fontSize="12" xmlSpace="preserve" stroke="none">
            <text x="60" y="110" fill="#22d3ee" fontWeight="bold">import &#123; zeroLag, premium, waltDesigns &#125; from "walt-studio";</text>
            <text x="60" y="135" fill="#f59e0b">const launchStudio = async () =&gt; &#123;</text>
            <text x="90" y="160" fill="#10b981">  // Deliver exquisite outcomes all over India</text>
            <text x="90" y="185" fill="#a855f7">  const setup = await waltDesigns.initialize(&#123;</text>
            <text x="120" y="210" fill="#3b82f6">    latency: 0,</text>
            <text x="120" y="235" fill="#3b82f6">    hq: "West Bengal Sector Zero Base",</text>
            <text x="120" y="260" fill="#3b82f6">    reach: "Pan-India Integration (NCR, Bengal)"</text>
            <text x="90" y="285" fill="#a855f7">  &#125;);</text>
            <text x="90" y="310" fill="#ef4444">  if (setup.active) &#123;</text>
            <text x="120" y="335" fill="#f59e0b">    await waltDesigns.render(&#123; banner: true, stats: "golden" &#125;);</text>
            <text x="90" y="360" fill="#ef4444">  &#125;</text>
            <text x="60" y="385" fill="#f59e0b">&#125;;</text>
            <text x="60" y="420" fill="#22d3ee" opacity="0.4">console.log("SYS_ACTIVE: TRUE | PORT: 3000");</text>
          </g>

          {/* Circuit lines */}
          <g>
            <path d="M -20 100 L 240 100 L 300 160 M 340 160 L 380 200" strokeWidth="1" stroke="rgba(34, 211, 238, 0.25)" />
            <circle cx="240" cy="100" r="3" fill="#22d3ee" />
            <circle cx="300" cy="160" r="3" fill="#22d3ee" />
          </g>
        </svg>

        {/* Fancy Marquee below header at hero, between Elite Creative Agency and header */}
        <div className="w-full bg-[#D946EF] border-b border-pink-400/40 py-3 relative z-10 select-none overflow-hidden" id="fancy-marquee-bar-hero">
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#D946EF] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#D946EF] to-transparent z-20 pointer-events-none" />
          <marquee direction="left" scrollamount="6" className="text-white font-mono text-xs sm:text-sm tracking-[0.1em] font-extrabold uppercase block">
            ✦ Welcome to Walt Designs & Growth Agency ✦ Deliver exquisite outcomes with zero lag ✦ Pan-India integration ✦ Web Designing & Custom Software Development ✦ Professional Resume & CV Making ✦ High CTR Thumbnail & Premium Video Editing ✦ Government Licence & Forms Registration ✦
          </marquee>
        </div>

        {/* Content Box aligned to Layout grid limits - Two-column immersive SaaS-style layout */}
        <div className="w-full max-w-none px-4 sm:px-10 md:px-12 lg:px-[70px] pt-1 pb-12 md:pt-2 md:pb-16 relative z-10 flex flex-col md:flex-row justify-between items-start gap-8 lg:gap-[80px]" id="hero-grid-container">
          
          {/* Left Text and Stats Col (55% width on desktop) */}
          <div className="flex-1 w-full md:max-w-[55%] space-y-4 sm:space-y-5 relative z-10 text-left flex flex-col items-start justify-center animate-fade-in-up" id="hero-left-col">
            
            {/* Elite Badge with red blinking dot (Left-aligned) */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#021323] border border-cyan-400/25">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-cyan-300 uppercase tracking-widest leading-none">
                Elite Creative Agency
              </span>
            </div>

            {/* Bold Headline (Increased to 72-90px on desktop) */}
            <div className="space-y-3 text-left flex flex-col items-start w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[84px] font-bold tracking-tight leading-[1.1] text-white text-left">
                Walt Designs <br className="hidden lg:block" />
                <span className="text-gradient hover:text-gradient-gold transition-all duration-300">& Studio</span>
              </h1>
              
              {/* Compelling Subheadline (600-700px width limit for perfect readability) */}
              <p className="text-cyan-100/80 text-base sm:text-lg lg:text-xl leading-relaxed max-w-[650px] text-left">
                We engineer premium, professional digital products designed with zero lag. Our mission is to scale Indian startups, creators, and professionals with elite visual assets and bulletproof business forms.
              </p>

              {/* Clear introductory paragraph describing core services for Google Search SEO Snippet generation */}
              <p className="text-cyan-200/90 text-xs sm:text-sm leading-relaxed max-w-[650px] text-left border-l-2 border-cyan-400/50 pl-3.5 py-1 my-1">
                Our dynamic agency offers premium <strong>Website Design</strong>, robust <strong>Website Development</strong>, custom <strong>Resume & CV Making</strong>, high-CTR <strong>Thumbnail Design</strong>, professional-tier <strong>Video Editing</strong>, and tailored <strong>Digital Solutions</strong> designed to skyrocket your conversion metrics and digital authority.
              </p>

              {/* Banner Added Below Subheadline */}
              <div className="w-full max-w-[650px] my-3 overflow-hidden rounded-xl border border-cyan-400/35 transition-all duration-300 hover:border-cyan-400/60 shadow-xl bg-black/20">
                <a href="https://ibb.co/fYTyTGDb" target="_blank" rel="noopener noreferrer" className="block">
                  <img 
                    src="https://i.ibb.co/kgPwP6mp/Whats-App-Image-2026-06-24-at-07-00-03.jpg" 
                    alt="Whats-App-Image-2026-06-24-at-07-00-03" 
                    className="w-full h-auto object-cover hover:scale-[1.02] transition-all duration-500" 
                    referrerPolicy="no-referrer"
                  />
                </a>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-start items-center w-full">
              <a
                href="/contact"
                className="px-8 py-3.5 rounded-xl text-center text-sm font-bold text-black bg-cyan-400 hover:bg-cyan-350 transition-all shadow-lg hover:scale-[1.02] active:scale-95 duration-200 min-w-[180px] w-full sm:w-auto"
              >
                Inquire Now
              </a>
              <a
                href="/services"
                className="px-8 py-3.5 rounded-xl text-center text-sm font-bold text-cyan-200 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/25 hover:border-cyan-400/40 transition-all inline-flex items-center justify-center space-x-2.5 min-w-[180px] w-full sm:w-auto"
              >
                <span>Our Service Desk</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </a>
            </div>

          </div>

          {/* Right Floating Glassmorphism Hero Card with Parallax styling (45% width on desktop) */}
          <div className="w-full md:w-[420px] lg:w-[460px] xl:w-[480px] md:max-w-none shrink-0 relative animate-float self-center md:self-start md:mt-0" id="hero-graphic-block">
            {/* Ambient soft glow backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/25 via-[#032B4E]/30 to-transparent rounded-3xl blur-2xl pointer-events-none" />
            
            {/* Elegant glass card wrapper */}
            <div className="relative rounded-3xl border border-cyan-400/30 p-7 space-y-6 bg-gradient-to-b from-[#062440]/85 to-[#02182d]/95 backdrop-blur-xl overflow-hidden shadow-2xl">
              
              {/* Embedded soft watermark */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 opacity-5 select-none pointer-events-none">
                <img src={logoUrl} alt="Watermark" className="w-full h-full object-cover rounded-full" />
              </div>

              {/* Premium Hero Graphic Image above the logo block */}
              <div className="w-full h-44 rounded-2xl overflow-hidden border border-cyan-400/20 shadow-lg relative group mb-2">
                <a href="https://ibb.co/HphqWFt3" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <img 
                    src="https://i.ibb.co/x8F6pC1d/photo-1626785774573-4b799315345d.avif" 
                    alt="photo-1626785774573-4b799315345d" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-350"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </a>
              </div>

              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden border border-cyan-400/20 bg-[#021323]">
                    <img src={logoUrl} alt="Walt Main Logo" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs text-white uppercase tracking-wider">WALT DESIGNS HQ</h4>
                    <span className="text-[9px] text-cyan-400 uppercase tracking-widest font-bold block leading-none mt-0.5">STUDIO DIRECTIVE</span>
                  </div>
                </div>

                {/* Animated active status badge */}
                <div className="flex items-center space-x-2 bg-cyan-950/65 border border-cyan-500/15 px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[10px] text-cyan-200 font-bold tracking-wider uppercase font-mono">ACTIVE</span>
                </div>
              </div>

              <div className="space-y-4 text-xs text-left">
                <div className="space-y-1">
                  <p className="text-cyan-300/50 uppercase text-[9px] font-bold tracking-widest">Service Reach Bounds:</p>
                  <p className="text-cyan-50 text-sm font-medium">Pan-India Integration (Bengal to Delhi NCR)</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-cyan-300/50 uppercase text-[9px] font-bold tracking-widest font-mono">Primary Hub Coordinates:</p>
                  <p className="text-cyan-100 text-xs sm:text-sm">West Bengal Sector Zero Base</p>
                </div>

                <div className="space-y-1">
                  <p className="text-cyan-300/50 uppercase text-[9px] font-bold tracking-widest">Core operation sectors:</p>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    <span className="px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/15 text-[10px] text-cyan-300 font-mono">Web UI Infra</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/15 text-[10px] text-cyan-300 font-mono">Media Design</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/15 text-[10px] text-cyan-300 font-mono">Corporate Forms</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-cyan-500/15 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-cyan-300/50 uppercase">REGISTRATION CODE:</span>
                  <span className="text-cyan-400 font-bold bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">W-2026-ACTIVE</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-[#02182d]/70 p-3 rounded-2xl border border-cyan-500/10">
                <TrendingUp className="w-5 h-5 text-cyan-400 shrink-0" />
                <p className="text-[11px] text-cyan-100/70 leading-normal text-left">
                  Over <span className="text-white font-bold">80+ Projects</span> deployed with absolute zero design lags.
                </p>
              </div>

            </div>

            {/* Micro floating accent elements for maximized depth */}
            <div className="absolute -bottom-4 -left-4 bg-[#021323]/95 border border-cyan-400/25 px-4 py-2 rounded-xl shadow-xl z-20 flex items-center space-x-2 text-[11px] animate-float-reversed">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-200 font-extrabold">Auto-Synced</span>
            </div>

            <div className="absolute -top-4 -right-4 bg-[#021323]/95 border border-cyan-400/25 px-4 py-2 rounded-xl shadow-xl z-20 flex items-center space-x-2 text-[11px] animate-float">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-200 font-extrabold">Professional Standard</span>
            </div>

          </div>

        </div>

        {/* Premium Full-Width Responsive Grid Statistics Section */}
        <div className="w-full max-w-none px-4 sm:px-10 md:px-12 lg:px-[70px] pb-12 sm:pb-16 relative z-10" id="hero-stats-wrapper">
          <div className="max-w-4xl mx-auto w-full grid grid-cols-2 gap-4 sm:gap-6 mt-[30px] items-stretch hero-stats" id="premium-hero-stats">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="w-full min-h-[110px] p-5 sm:p-6 rounded-[20px] bg-gradient-to-br from-[#4A3B18]/90 via-[#2D230C]/95 to-[#1F1705]/95 border border-[#B3923B]/60 hover:border-[#F2D06B] text-[#FFF5D6] shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_32px_rgba(179,146,59,0.2)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-start justify-center text-left select-none stat-card"
                id={`stat-hero-${idx}`}
              >
                <span className="text-2xl sm:text-3xl font-extrabold leading-[1] text-[#F3E5AB]">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-[13px] font-semibold tracking-[0.5px] uppercase mt-2 text-amber-100/90 leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Container below the Full Screen Hero */}
      <main className="flex-1 relative z-10 w-full max-w-full py-8 overflow-x-hidden" id="home-main-section">
        
         {/* Core Business Values Banner */}
        <section className="py-16 bg-[#022C22] border-y border-emerald-500/20 my-12 w-full max-w-full overflow-x-hidden" id="values-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8">
              {values.map((v, idx) => {
                const IconComponent = v.icon;
                return (
                  <div 
                    key={idx} 
                    className="p-3 sm:p-5 md:p-6 rounded-2xl bg-emerald-950/45 border border-emerald-500/10 hover:border-emerald-500/30 transition-all text-center md:text-left flex flex-col justify-between shadow-lg"
                    id={`value-card-${idx}`}
                  >
                    <div className="space-y-3 sm:space-y-4">
                      {/* Related Category Image */}
                      {v.image && (
                        <div className="relative w-full h-24 sm:h-32 md:h-40 rounded-xl overflow-hidden border border-emerald-500/10 shadow-md">
                          <img 
                            src={v.image} 
                            alt={v.title} 
                            className="w-full h-full object-cover object-center transform hover:scale-105 transition-all duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                      )}
                      
                      <div className="flex flex-col sm:flex-row items-center sm:space-x-3 justify-center md:justify-start space-y-2 sm:space-y-0">
                        <div className="inline-flex p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                        </div>
                        <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-white text-center md:text-left">{v.title}</h3>
                      </div>
                      
                      <p className="text-[10px] sm:text-xs md:text-sm text-emerald-100/85 leading-relaxed text-center md:text-left">{v.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Portfolio Showcase Block */}
        <section className="py-16 space-y-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden" id="portfolio-section">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs uppercase text-cyan-400 tracking-widest font-bold">Exquisite Outcomes</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Featured Agency Showcase</h2>
            <p className="text-slate-350 text-sm">Review a selection of premium websites, visual designs, resumes, and branding outputs.</p>
          </div>
          <Portfolio />
        </section>

        {/* FAQ Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-12">
          <section className="py-16 px-6 sm:px-12 bg-[#5B21B6] rounded-3xl space-y-10 w-full overflow-x-hidden border border-violet-400/35 shadow-[0_15px_40px_rgba(91,33,182,0.35)]" id="faq-section">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase text-violet-200 tracking-widest font-bold">Answers Secured</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
              <p className="text-violet-100/90 text-sm max-w-2xl mx-auto">We believe in transparent operational parameters. Contact us for outstanding queries.</p>
            </div>

            <div className="space-y-4" id="faq-accordion">
              {FAQS_DATA.map((faq, idx) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div 
                    key={faq.id} 
                    className="rounded-2xl bg-white/10 border border-white/15 overflow-hidden transition-all duration-300 shadow-sm"
                    id={`faq-item-${faq.id}`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-white pr-4">{idx + 1}. {faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-white shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-violet-200 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-6 pt-0 border-t border-white/10 text-sm text-violet-50 leading-relaxed font-sans transition-all animate-fadeIn">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

      </main>

      {/* Premium Dark Golden Partnerships Inquiry Form Section */}
      <HomeInquiryForm />

      {/* Premium White-Background Indian Client Testimonial Section */}
      <section className="w-full max-w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-b border-gray-100 relative z-10 overflow-x-hidden" id="indian-testimonials">
        <div className="max-w-7xl mx-auto">
          
          {/* Header block with Indian Client badges */}
          <div className="flex flex-col items-center text-center space-y-4 mb-14">
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#8C1A33]/10 text-[#8C1A33] font-mono text-[10px] font-extrabold tracking-widest uppercase animate-pulse">
                🇮🇳 Indian Client
              </span>
              <span className="px-3.5 py-1 rounded-full bg-[#8C1A33]/10 text-[#8C1A33] font-mono text-[10px] font-extrabold tracking-widest uppercase animate-pulse">
                🇮🇳 Indian Client
              </span>
              <span className="px-3.5 py-1 rounded-full bg-[#8C1A33]/10 text-[#8C1A33] font-mono text-[10px] font-extrabold tracking-widest uppercase animate-pulse">
                🇮🇳 Indian Client
              </span>
            </div>

            <div className="space-y-3 max-w-2xl">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-sans">
                Our Clients Say It Best
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                Join the growing list of successful businesses powered by Walt Designs & Studio.
              </p>
            </div>

            {/* Overall aggregate rating banner */}
            <div className="inline-flex items-center space-x-2.5 px-4.5 py-2 rounded-2xl bg-amber-50 border border-amber-200 mt-2">
              <div className="flex items-center text-amber-500">
                <span className="text-sm font-black mr-0.5">★</span>
                <span className="text-sm font-black mr-0.5">★</span>
                <span className="text-sm font-black mr-0.5">★</span>
                <span className="text-sm font-black mr-0.5">★</span>
                <span className="text-sm font-black">★</span>
              </div>
              <span className="text-sm font-extrabold text-amber-950 font-mono">
                4.3 / 5.0 Rating
              </span>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1 */}
            <div className="bg-slate-50 border border-slate-100 hover:border-[#8C1A33]/20 hover:shadow-xl transition-all duration-300 p-7 rounded-3xl flex flex-col justify-between h-full space-y-6 group">
              <div className="space-y-4">
                <div className="text-amber-400 text-lg">★★★★★</div>
                <p className="text-slate-700 text-sm italic leading-relaxed">
                  "Amazing service and growth strategies. They handled our digital presence with extreme care and professionalism."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60 flex items-center space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80" 
                  alt="RANJAN KUMAR" 
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 tracking-wide uppercase font-sans">
                    RANJAN KUMAR
                  </h4>
                  <p className="text-[11px] font-bold text-[#8C1A33]/85 tracking-widest uppercase mt-0.5 font-mono">
                    MITHILA CATERING
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 border border-slate-100 hover:border-[#8C1A33]/20 hover:shadow-xl transition-all duration-300 p-7 rounded-3xl flex flex-col justify-between h-full space-y-6 group">
              <div className="space-y-4">
                <div className="text-amber-400 text-lg">★★★★★</div>
                <p className="text-slate-700 text-sm italic leading-relaxed">
                  "Professionalism at its best. The team is dedicated and their results speak louder than words."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60 flex items-center space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80" 
                  alt="VIKASH KUMAR" 
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 tracking-wide uppercase font-sans">
                    VIKASH KUMAR
                  </h4>
                  <p className="text-[11px] font-bold text-[#8C1A33]/85 tracking-widest uppercase mt-0.5 font-mono">
                    KAUSHALAYAN CONSULTING
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 border border-slate-100 hover:border-[#8C1A33]/20 hover:shadow-xl transition-all duration-300 p-7 rounded-3xl flex flex-col justify-between h-full space-y-6 group">
              <div className="space-y-4">
                <div className="text-amber-400 text-lg">★★★★★</div>
                <p className="text-slate-700 text-sm italic leading-relaxed">
                  "Exceeded our expectations in every way. From branding to digital reach, everything was top-notch."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60 flex items-center space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80" 
                  alt="RAHUL KAUSHIK" 
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 tracking-wide uppercase font-sans">
                    RAHUL KAUSHIK
                  </h4>
                  <p className="text-[11px] font-bold text-[#8C1A33]/85 tracking-widest uppercase mt-0.5 font-mono">
                    KAUSHIK CATERERS
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 border border-slate-100 hover:border-[#8C1A33]/20 hover:shadow-xl transition-all duration-300 p-7 rounded-3xl flex flex-col justify-between h-full space-y-6 group">
              <div className="space-y-4">
                <div className="text-amber-400 text-lg">★★★★★</div>
                <p className="text-slate-700 text-sm italic leading-relaxed">
                  "The visual identity they created for us is simply stunning. We get compliments from every client."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60 flex items-center space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80" 
                  alt="RAHUL DOGRA" 
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 tracking-wide uppercase font-sans">
                    RAHUL DOGRA
                  </h4>
                  <p className="text-[11px] font-bold text-[#8C1A33]/85 tracking-widest uppercase mt-0.5 font-mono">
                    LALAJI CATERERS
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Back to Top Floating Button with glassmorphism */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 sm:p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center"
          aria-label="Back to top"
          id="back-to-top-button"
        >
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      )}

      <Footer />
    </div>
  );
}
