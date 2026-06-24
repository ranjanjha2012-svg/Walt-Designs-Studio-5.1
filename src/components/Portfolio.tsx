import React, { useState } from 'react';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('All');
  
  const tabs = ['All', 'Web Design', 'Video Editing', 'Growth Agency', 'Resume & CV'];

  const filteredItems = activeTab === 'All'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter(item => item.category === activeTab);

  return (
    <div className="space-y-10" id="portfolio-component">
       
      {/* Category selector */}
      <div className="flex flex-wrap justify-center gap-2" id="portfolio-tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-xs font-display font-medium transition-all duration-300 border cursor-pointer ${
              activeTab === tab
                ? 'bg-gradient-to-r from-amber-500/20 to-amber-500/30 text-amber-300 border-amber-500/30 shadow-md scale-[1.03]'
                : 'bg-neutral-900/40 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
            }`}
            id={`portfolio-tab-btn-${tab.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="portfolio-work-grid">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden glass-panel border border-neutral-800 hover:border-amber-500/20 transition-all duration-300 hover:scale-[1.01] shadow-lg flex flex-col bg-[#0F0F0F]"
            id={`portfolio-card-${item.id}`}
          >
            {/* Image block */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform scale-102 group-hover:scale-108 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              {/* Category tag */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 backdrop-blur-md border border-amber-500/10 text-[10px] font-mono text-amber-300 uppercase tracking-widest leading-none font-semibold">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content info */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h4 className="font-display font-semibold text-white group-hover:text-amber-300 transition-colors text-base leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Status/metric bottom */}
              {item.stats && (
                <div className="pt-4 mt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-mono text-[10px] uppercase">Demonstrated Outcome</span>
                  <span className="text-amber-400 font-mono font-bold tracking-tight bg-amber-950/30 px-2 py-0.5 rounded-md border border-amber-500/10">
                    {item.stats}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
