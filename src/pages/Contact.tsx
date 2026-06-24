import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Phone, Mail, MapPin, User, Send, CheckCircle, Clock } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('web-design');
  const [customService, setCustomService] = useState('');
  const [area, setArea] = useState('');
  const [details, setDetails] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [errorStr, setErrorStr] = useState<string | null>(null);

  // Auto-fill chosen service from search query parameter (?service=...)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const preselectedService = params.get('service');
      if (preselectedService) {
        setService(preselectedService);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !area || !details) return;

    setSubmitting(true);
    setErrorStr(null);

    const chosenService = service === 'others' ? `Others: ${customService}` : service;

    try {
      const response = await fetch('https://formspree.io/f/xreylalq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: chosenService,
          area,
          details,
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

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setArea('');
    setService('web-design');
    setCustomService('');
    setDetails('');
    setSubmitted(false);
    setErrorStr(null);
  };

  return (
    <div className="bg-[#8C1A33] font-sans min-h-screen text-slate-100 flex flex-col justify-between" id="contact-page-view">
      <Header />

      {/* Background ambient spots */}
      <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 right-[10%] w-[350px] h-[350px] bg-amber-500/5 blur-[120px] rounded-full animate-pulseGlow" />
        <div className="absolute top-30 left-[15%] w-[300px] h-[300px] bg-amber-500/3 blur-[90px] rounded-full" />
      </div>

      <main className="flex-grow relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24" id="contact-main-section">
        
        {/* Get in touch introductory heading */}
        <section className="max-w-3xl space-y-4">
          <span className="font-mono text-xs uppercase text-amber-500 tracking-widest font-bold">Inquiry Management</span>
          <h1 className="font-display font-medium text-4xl sm:text-5xl text-white">Get In Touch With Us</h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Fill up our enquiry form, view our direct contact channels, or consult our automated AI planner model to design a comprehensive business blueprint. We will review your concepts and respond on time.
          </p>
        </section>

        {/* Contact Split Grid: Direct channels + Interactive Form */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-split-grid">
          
          {/* Left Block: Direct contact details */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            
            <div className="space-y-4">
              <h3 className="font-display font-medium text-xl text-white">Direct Agency Access</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-mono">
                Consult our direct channels to bypass standard queues for instant coordination.
              </p>
            </div>

            {/* Structured channel list */}
            <div className="space-y-4" id="channels-list">
              
              <div className="flex items-start space-x-4 bg-[#0F0F0F] p-5 rounded-2xl border border-neutral-800 hover:border-amber-500/10 transition-all">
                <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-neutral-850 text-amber-500">
                  <User className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-500 font-mono uppercase">FOUNDER & DIRECTOR</span>
                  <p className="text-sm font-semibold text-white">Priyanshu Kumar</p>
                  <p className="text-xs text-neutral-400">Primary operational signatory for Walt Designs & Studio.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-[#0F0F0F] p-5 rounded-2xl border border-neutral-800 hover:border-amber-500/10 transition-all">
                <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-neutral-850 text-amber-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-500 font-mono uppercase">EXECUTIVE HOTLINE</span>
                  <a href="tel:+917303942175" className="text-sm font-semibold text-white hover:text-amber-450 transition-colors block">
                    +91 7303942175
                  </a>
                  <p className="text-xs text-neutral-400">Available regarding emergency web setup or urgent registration assistance.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-[#0F0F0F] p-5 rounded-2xl border border-neutral-800 hover:border-amber-500/10 transition-all">
                <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-neutral-850 text-amber-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-500 font-mono uppercase">CREATIVE DIRECTORY</span>
                  <a href="mailto:waltdesignsstudio@gmail.com" className="text-sm font-semibold text-white hover:text-amber-450 transition-colors block">
                    waltdesignsstudio@gmail.com
                  </a>
                  <p className="text-xs text-neutral-400">Checked continuously. Submit briefs directly to preserve high resolution.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-[#0F0F0F] p-5 rounded-2xl border border-neutral-800 hover:border-amber-500/10 transition-all">
                <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-neutral-850 text-amber-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-500 font-mono uppercase">HEAD OFFICE LOCATION</span>
                  <p className="text-sm font-semibold text-white">West Bengal, India</p>
                  <p className="text-xs text-neutral-400">Direct physical registrations mapped and filed nationally.</p>
                </div>
              </div>

            </div>

            {/* Response speed metrics banner */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/10 text-xs flex items-center space-x-3 text-neutral-400">
              <Clock className="w-4.5 h-4.5 text-amber-500 shrink-0" />
              <span>We guarantees first response regarding inquiry forms in <strong className="text-amber-400 font-bold">under 12 hours</strong>.</span>
            </div>

          </div>

          {/* Right Block: Form or Success */}
          <div className="lg:col-span-7 bg-[#0F0F0F] rounded-3xl border border-neutral-800 p-6 sm:p-10 relative overflow-hidden shadow-2xl" id="contact-form-panel">
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6" id="inquiry-form">
                <div className="space-y-2 border-b border-neutral-850 pb-4">
                  <h3 className="font-display font-medium text-xl text-white">Integrated inquiry form</h3>
                  <p className="text-xs text-neutral-400">Provide direct metrics regarding your requirements to trigger swift scoping.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-450 font-mono">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Priya Patel"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-450 font-mono">E-Mail Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="priya@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-450 font-mono">Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 12345 67890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-450 font-mono">Location Area / Region *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. West Bengal, Delhi NCR, Mumbai"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-450 font-mono">CHOSEN AGENCY DIVISION *</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none"
                    >
                      <option value="web-design">Web Designing & Custom Software Development</option>
                      <option value="resume-cv">Professional Resume & CV Making</option>
                      <option value="thumbnail-video">High CTR Thumbnail & Premium Video Editing</option>
                      <option value="growth-agency">Growth Agency & GMB Optimization</option>
                      <option value="license-forms">Government Licence & Forms Registration</option>
                      <option value="others">Others (Specify below)</option>
                    </select>
                  </div>

                  {service === 'others' && (
                    <div className="space-y-2 sm:col-span-2 animate-fadeIn">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-450 font-mono">Please specify your custom division requirement *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dynamic branding, logo designing, app UI, etc."
                        value={customService}
                        onChange={(e) => setCustomService(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-450 font-mono">Requirement Specifications *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe budget metrics, visual style, or specific local registration forms you require..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                {errorStr && (
                  <p className="text-xs text-red-400 font-mono bg-red-950/20 p-3 rounded-lg border border-red-500/10">
                    {errorStr}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center space-x-2 py-4 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-display font-bold text-sm tracking-wide transition-all shadow-lg hover:scale-[1.01] active:scale-95 disabled:opacity-50 cursor-pointer"
                  id="submit-inquiry-trigger"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>{submitting ? 'Transmitting Scopes...' : 'Transmit Scoping Brief'}</span>
                </button>
              </form>
            ) : (
              <div className="py-12 flex flex-col items-center text-center space-y-6 animate-fadeIn" id="success-panel">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-medium text-2xl text-white">Brief Successfully Transmitted</h3>
                  <p className="text-sm text-neutral-400 max-w-md mx-auto">
                    Excellent, {name}. Your details have been secured in our local database. Founder Priyanshu Kumar will coordinate your scope proposal shortly.
                  </p>
                </div>

                <div className="bg-[#0A0A0A] border border-neutral-800 p-4 rounded-xl font-mono text-xs text-center space-y-1">
                  <span className="text-neutral-500 uppercase block text-[10px]">Scoping Authorization ID</span>
                  <span className="text-amber-500 font-bold text-base tracking-widest">{ticketNumber}</span>
                </div>

                <button
                  onClick={handleResetForm}
                  className="px-6 py-2.5 bg-[#121212] border border-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold tracking-wide hover:bg-[#1C1C1C] transition-all cursor-pointer"
                >
                  Submit Alternative Proposal
                </button>
              </div>
            )}

          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}
