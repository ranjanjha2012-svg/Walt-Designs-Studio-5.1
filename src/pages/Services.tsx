import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SERVICES_DATA } from '../data';
import { Laptop, FileText, Video, Compass, Scale, BadgeCheck, Clock, ShieldCheck, HelpCircle } from 'lucide-react';

const iconsMap: Record<string, React.ComponentType<any>> = {
  'Laptop': Laptop,
  'FileText': FileText,
  'Video': Video,
  'TrendingUp': Compass,  // Use compass for trending / growth
  'FileCheck': ShieldCheck // Use shield check for certification / registration
};

export default function Services() {
  return (
    <div className="bg-[#8C1A33] font-sans min-h-screen text-slate-100 flex flex-col justify-between" id="services-page-view">
      <Header />

      {/* Glowing background decor */}
      <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 right-[15%] w-[400px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full animate-pulseGlow" />
        <div className="absolute top-40 left-[10%] w-[300px] h-[300px] bg-amber-500/3 blur-[100px] rounded-full" />
      </div>

      <main className="flex-grow relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="services-main-section">
        
        {/* Header summary section */}
        <div className="max-w-3xl space-y-4 mb-16 border-l-4 border-amber-500 pl-6 py-2">
          <span className="font-mono text-xs uppercase text-amber-500 tracking-widest font-bold">Specialized Competence</span>
          <h1 className="font-display font-medium text-4xl sm:text-5xl text-white">Our Service Suite</h1>
          <p className="text-neutral-400 text-base leading-relaxed">
            Walt Designs & Studio offers handcrafted digital answers engineered for outstanding accuracy and click metrics. We focus on transparent structures and absolute timely launch.
          </p>
        </div>

        {/* Detailed Services Catalog */}
        <div className="space-y-12" id="detailed-services-container">
          {SERVICES_DATA.map((service, idx) => {
            const IconComponent = iconsMap[service.icon] || Laptop;
            return (
              <section 
                key={service.id}
                id={service.id}
                className="glass-panel rounded-3xl border border-neutral-800 p-8 sm:p-12 relative overflow-hidden group hover:border-amber-500/20 transition-all duration-300 shadow-xl bg-[#0F0F0F]"
              >
                {/* Micro accent spots on each big service card */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/5 blur-xl rounded-full" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                  
                  {/* Left Column: Heading and core description */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                        <IconComponent className="w-8 h-8 text-amber-500 group-hover:text-black transition-colors" />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-amber-300 uppercase tracking-widest block font-semibold mb-0.5">Walt Division {idx + 1}</span>
                        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white">{service.title}</h2>
                      </div>
                    </div>

                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                      {service.description}
                    </p>

                    {/* Timeline & Price guides pill */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-neutral-850 flex items-center space-x-3 text-xs">
                        <Clock className="w-4 h-4 text-neutral-500" />
                        <div>
                          <span className="text-neutral-550 font-mono block text-[10px]">EXECUTION MATRIX</span>
                          <span className="text-neutral-200 font-medium">{service.timeline}</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-neutral-850 flex items-center space-x-3 text-xs">
                        <Scale className="w-4 h-4 text-neutral-500" />
                        <div>
                          <span className="text-neutral-550 font-mono block text-[10px]">AFFORDABLE ESTIMATE</span>
                          <span className="text-amber-400 font-bold">{service.priceEstimate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Key feature checkboxes & action */}
                  <div className="lg:col-span-5 bg-[#0A0A0A]/50 rounded-2xl p-6 sm:p-8 border border-neutral-850 space-y-6 self-stretch flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold">Standard Deliverables</h3>
                      <ul className="space-y-2.5 text-xs">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2 text-neutral-300 leading-relaxed">
                            <BadgeCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-neutral-850">
                      <a
                        href={`/contact?service=${encodeURIComponent(service.id)}`}
                        className="w-full text-center inline-flex items-center justify-center py-3 rounded-xl bg-[#121212] group-hover:bg-amber-500 group-hover:text-black text-white font-display text-xs font-semibold hover:bg-[#1C1C1C] transition-all border border-neutral-800 group-hover:border-transparent cursor-pointer active:scale-95"
                        id={`service-inquiry-${service.id}`}
                      >
                        Inquire About Division
                      </a>
                    </div>
                  </div>

                </div>
              </section>
            );
          })}
        </div>

        {/* Quality parameters section */}
        <div className="my-24 p-8 sm:p-12 bg-neutral-900/10 border border-neutral-850 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-8" id="quality-assertions">
          <div className="space-y-2.5">
            <h4 className="font-display font-medium text-lg text-white">Primacy of No-Lag</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We design and write codebase directly from raw states, avoiding cumbersome pre-built widgets that clog system performance.
            </p>
          </div>
          <div className="space-y-2.5">
            <h4 className="font-display font-medium text-lg text-white">ATS CV Optimizations</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Our resume compilers run multiple verification passes matching standard corporate candidate criteria for maximum visibility.
            </p>
          </div>
          <div className="space-y-2.5">
            <h4 className="font-display font-medium text-lg text-white">Full Regional Match</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Serving Delhi, Noida, Faridabad, and across India, our legal registration services support diverse business structures seamlessly.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
