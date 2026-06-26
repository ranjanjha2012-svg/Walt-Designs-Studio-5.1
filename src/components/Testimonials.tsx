import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const active = TESTIMONIALS_DATA[activeIndex];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-10" 
      id="testimonials-block"
    >
      {/* Testimonial slider structure */}
      <div className="relative max-w-4xl mx-auto glass-panel rounded-3xl border border-neutral-800 p-8 sm:p-14 overflow-hidden shadow-2xl bg-[#0F0F0F]">
        <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/3 blur-[60px] rounded-full pointer-events-none" />

        {/* Floating premium quote icon decor */}
        <Quote className="w-20 h-20 text-amber-500/10 absolute top-6 left-6" />

        <div className="relative z-10 space-y-6">
          {/* Stars */}
          <div className="flex items-center space-x-1" id={`rating-${active.id}`}>
            {Array.from({ length: active.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>

          {/* Feedback paragraph */}
          <blockquote className="font-display text-lg sm:text-xl text-neutral-100 leading-relaxed italic">
            "{active.feedback}"
          </blockquote>

          {/* Profile card metadata */}
          <div className="flex items-center justify-between pt-6 border-t border-neutral-800">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#0A0A0A] border border-amber-500/25 flex items-center justify-center font-bold text-amber-400 shadow-inner">
                {active.name.charAt(0)}
              </div>
              <div>
                <cite className="font-display font-medium text-white not-italic text-base block">{active.name}</cite>
                <span className="text-xs text-neutral-400 font-mono">
                  {active.role} &bull; <strong className="text-amber-400 font-semibold">{active.companyString}</strong>
                </span>
              </div>
            </div>

            {/* Slider Switch buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-[#0A0A0A] hover:bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                aria-label="Previous testimonial"
                id="testimonial-prev-trigger"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-[#0A0A0A] hover:bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                aria-label="Next testimonial"
                id="testimonial-next-trigger"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tiny indicators dots on active panel */}
      <div className="flex justify-center space-x-2.5">
        {TESTIMONIALS_DATA.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => setActiveIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === idx 
                ? 'bg-gradient-to-r from-amber-400 to-amber-600 w-8' 
                : 'bg-neutral-800 hover:bg-neutral-700'
            }`}
            aria-label={`Go to testimonial ${idx + 1}`}
            id={`testimonial-dot-${idx}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
