import React, { useState } from 'react';
import { Send, CheckCircle, Sparkles, User, Phone, Mail, MapPin, Layers } from 'lucide-react';

export default function HomeInquiryForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [division, setDivision] = useState('web-design');
  const [customDivision, setCustomDivision] = useState('');
  const [area, setArea] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorStr, setErrorStr] = useState<string | null>(null);
  const [ticketNumber, setTicketNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !division || !area) return;

    setSubmitting(true);
    setErrorStr(null);

    const chosenDivision = division === 'others' ? `Others: ${customDivision}` : division;

    try {
      const response = await fetch('https://formspree.io/f/xreylalq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          division: chosenDivision,
          area,
        }),
      });

      if (!response.ok) {
        throw new Error('Our submission channels are busy. Please retry shortly.');
      }

      setTicketNumber(`WDT-${Math.floor(Math.random() * 900000 + 100000)}`);
      setSubmitted(true);
    } catch (err: any) {
      setErrorStr(err?.message || 'Something went wrong while submitting. Please check your network and retry.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setDivision('web-design');
    setCustomDivision('');
    setArea('');
    setSubmitted(false);
    setErrorStr(null);
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 relative z-10" id="home-inquiry-section">
      {/* Absolute ambient gold glow behind form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        
        {/* Form Title & Description with Luxury Gold borders */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-mono text-[11px] font-bold text-amber-300 uppercase tracking-widest leading-none">
              Premium Partnership Form
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Scale Your Brand Instantly
          </h2>
          <p className="text-neutral-300 text-sm max-w-xl mx-auto leading-relaxed">
            Fill out our premium agency division form below. Our team reviews submissions daily to deliver elite, zero-lag strategies pan-India.
          </p>
        </div>

        {/* The Premium Dark Golden Form container */}
        <div 
          className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#2D220A] via-[#1A1305] to-[#0A0701] border-2 border-[#B3923B] shadow-[0_25px_60px_-15px_rgba(179,146,59,0.25)] p-8 sm:p-12 md:p-14"
          id="premium-gold-form"
        >
          {/* Subtle Decorative Gold Corner SVG Designs */}
          <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none opacity-40 border-t-2 border-l-2 border-amber-500/50 m-4 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-40 border-t-2 border-r-2 border-amber-500/50 m-4 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none opacity-40 border-b-2 border-l-2 border-amber-500/50 m-4 rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none opacity-40 border-b-2 border-r-2 border-amber-500/50 m-4 rounded-br-xl" />
          
          {/* Dynamic background patterns */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(179,146,59,0.06)_0%,transparent_60%)] pointer-events-none" />
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-8" id="home-formspree-form">
              
              <div className="border-b border-[#B3923B]/25 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-amber-100 font-sans">Inquiry Specification Sheet</h3>
                  <p className="text-xs text-amber-250/70 mt-1">Please provide accurate corporate metrics for express onboarding.</p>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
                    Express Channel
                  </span>
                </div>
              </div>

              {/* Form Input fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name field */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 font-mono flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4.5 py-3.5 bg-black/40 border border-[#B3923B]/40 rounded-xl text-sm text-white placeholder-amber-100/30 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
                  />
                </div>

                {/* Number field */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 font-mono flex items-center space-x-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Contact Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter contact number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4.5 py-3.5 bg-black/40 border border-[#B3923B]/40 rounded-xl text-sm text-white placeholder-amber-100/30 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
                  />
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 font-mono flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4.5 py-3.5 bg-black/40 border border-[#B3923B]/40 rounded-xl text-sm text-white placeholder-amber-100/30 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
                  />
                </div>

                {/* Area field */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 font-mono flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Location Area / Region *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kolkata, West Bengal or Delhi NCR"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-4.5 py-3.5 bg-black/40 border border-[#B3923B]/40 rounded-xl text-sm text-white placeholder-amber-100/30 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
                  />
                </div>

                {/* CHOSEN AGENCY DIVISION select field */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 font-mono flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>Chosen Agency Division *</span>
                  </label>
                  <div className="relative">
                    <select
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      className="w-full px-4.5 py-3.5 bg-black/40 border border-[#B3923B]/40 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-all appearance-none cursor-pointer"
                    >
                      <option value="web-design">Web Designing & Custom Software Development</option>
                      <option value="resume-cv">Professional Resume & CV Making</option>
                      <option value="thumbnail-video">High CTR Thumbnail & Premium Video Editing</option>
                      <option value="growth-agency">Growth Agency & GMB Optimization</option>
                      <option value="license-forms">Government Licence & Forms Registration</option>
                      <option value="others">Others (Specify below)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-amber-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Conditional "Others" input block */}
                {division === 'others' && (
                  <div className="space-y-2 md:col-span-2 animate-fadeIn">
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
                      Please specify your custom division requirement *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dynamic branding, logo designing, app UI, etc."
                      value={customDivision}
                      onChange={(e) => setCustomDivision(e.target.value)}
                      className="w-full px-4.5 py-3.5 bg-black/40 border border-amber-400/60 rounded-xl text-sm text-white placeholder-amber-100/30 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
                    />
                  </div>
                )}

              </div>

              {errorStr && (
                <p className="text-xs text-red-300 font-mono bg-red-950/40 p-4 rounded-xl border border-red-500/20">
                  {errorStr}
                </p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center space-x-2 py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-black font-display font-bold text-sm tracking-wide transition-all shadow-lg hover:scale-[1.01] active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4 text-black" />
                <span>{submitting ? 'TRANSMITTING BRIEF...' : 'TRANSMIT SCOPING INQUIRY'}</span>
              </button>

            </form>
          ) : (
            <div className="py-12 flex flex-col items-center text-center space-y-6 animate-fadeIn relative z-10" id="gold-success-panel">
              <div className="w-18 h-18 rounded-full bg-amber-500/10 border-2 border-[#B3923B] flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(179,146,59,0.3)]">
                <CheckCircle className="w-9 h-9" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-amber-100 font-sans">Corporate Brief Transmitted</h3>
                <p className="text-sm text-amber-100/80 max-w-md mx-auto leading-relaxed">
                  Greetings, <strong className="text-white font-bold">{name}</strong>. Your requirement parameters have been safely secured on Formspree channels.
                </p>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Our Indian Client operations desk will evaluate your requirements and contact you within 12 hours.
                </p>
              </div>

              <div className="bg-black/50 border border-[#B3923B]/40 p-4 rounded-xl font-mono text-xs text-center space-y-1">
                <span className="text-amber-400/50 uppercase block text-[10px] tracking-wider font-bold">Partnership Authorization Code</span>
                <span className="text-amber-300 font-bold text-base tracking-widest">{ticketNumber}</span>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-amber-500/10 border border-[#B3923B]/60 text-amber-200 hover:text-white rounded-xl text-xs font-semibold tracking-wide hover:bg-amber-500/20 transition-all cursor-pointer"
              >
                Transmit Another Proposal
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
