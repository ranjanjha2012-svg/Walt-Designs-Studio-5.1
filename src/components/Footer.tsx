import React from 'react';
import { Phone, Mail, MapPin, Award, Clock } from 'lucide-react';

export default function Footer() {
  const logoUrl = "https://i.ibb.co/rKxc0kTs/Whats-App-Image-2026-06-23-at-14-27-06.jpg";

  return (
    <footer className="relative bg-[#6B4433] border-t border-[#805645] w-full text-neutral-200" id="shared-footer">
      
      {/* Decorative subtle glows */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#402418] to-transparent opacity-45 pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[60px] py-12 lg:py-[70px] relative z-10 box-border flex flex-col justify-start">
        
        {/* Upper footer grids: 3 Columns on lg screens, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 footer-top gap-8 pb-10 border-b border-white/10 items-start" id="footer-top-row">
          
          {/* Column 1: Company Information */}
          <div className="flex flex-col space-y-4" id="company-info-col">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-lg overflow-hidden border border-white/10 shrink-0">
                  <img 
                    src={logoUrl} 
                    alt="Walt Designs & Studio Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white leading-tight">WALT DESIGNS</h3>
                  <p className="text-[10px] text-amber-500 tracking-widest uppercase font-bold">& STUDIO</p>
                </div>
              </div>
              
              <p className="text-sm text-amber-100/75 leading-relaxed max-w-sm">
                Walt Designs & Studio is a prominent design & dev agency crafting zero-lag premium solutions. We engineer pristine digital infrastructures, creative media edits, professional resume templates, and corporate licensing.
              </p>
            </div>

            <div className="inline-flex self-start items-center space-x-2 px-3 py-1.5 rounded-lg bg-orange-950/30 border border-orange-500/15">
              <Award className="w-4 h-4 text-orange-400" />
              <span className="text-[11px] text-orange-200 font-bold">On-Time Pan-India Service</span>
            </div>
          </div>

          {/* Column 2: Quick Links & Leadership */}
          <div className="flex flex-col space-y-6" id="quick-links-col">
            <div className="space-y-3.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-orange-300">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="hover:text-orange-400 transition-colors inline-block text-neutral-300">Home</a>
                </li>
                <li>
                  <a href="/services" className="hover:text-orange-400 transition-colors inline-block text-neutral-300">Services desk</a>
                </li>
                <li>
                  <a href="/about" className="hover:text-orange-400 transition-colors inline-block text-neutral-300">About agency</a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-orange-400 transition-colors inline-block text-neutral-300">Contact brief</a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-orange-300">Leadership</h4>
              <div className="space-y-1.5 text-sm text-neutral-300">
                <p className="text-[10px] text-amber-200/50 uppercase">Founder & Executive Representative:</p>
                <div className="font-semibold text-white border-l-2 border-orange-400 pl-2.5 py-0.5 leading-tight">
                  Priyanshu Kumar
                  <p className="text-[9px] text-orange-400 font-bold tracking-tight mt-0.5">Founder & Director</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Us Panel */}
          <div className="bg-black/15 p-5 rounded-2xl border border-white/5 flex flex-col space-y-4" id="contact-us-col">
            <h4 className="font-bold text-sm tracking-wide text-orange-300 border-b border-white/5 pb-2">
              Contact Us
            </h4>

            <div className="space-y-3 text-sm text-amber-100/90">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] text-amber-200/50 uppercase block font-semibold">Office Address</span>
                  <span className="text-white font-medium text-xs sm:text-sm">West Bengal, India</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] text-amber-200/50 uppercase block font-semibold">Phone Inquiries</span>
                  <a href="tel:+917303942175" className="text-white font-medium text-xs sm:text-sm hover:underline">
                    +91 7303942175
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] text-amber-200/50 uppercase block font-semibold">Email Channel</span>
                  <a href="mailto:waltdesignsstudio@gmail.com" className="text-white font-medium text-xs sm:text-sm hover:underline break-all">
                    waltdesignsstudio@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <svg className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.896 0c3.181.001 6.174 1.24 8.423 3.49 2.248 2.25 3.486 5.245 3.485 8.426-.003 6.57-5.328 11.895-11.893 11.895-2.007-.001-3.98-.51-5.731-1.48L0 24zm6.59-4.846c1.6.95 3.1 1.448 4.705 1.449 5.42 0 9.83-4.417 9.833-9.842 0-2.628-1.022-5.1-2.88-6.958C16.39 1.946 13.918.92 11.894.92c-5.422 0-9.832 4.416-9.835 9.843-.001 1.902.501 3.75 1.455 5.4l-.994 3.634 3.725-.977zm11.332-6.536c-.31-.157-1.84-.906-2.127-1.01-.288-.102-.497-.155-.705.158-.208.312-.807 1.01-.988 1.217-.182.207-.364.233-.675.077-.312-.156-1.315-.484-2.505-1.545-.926-.826-1.552-1.848-1.733-2.16-.182-.313-.02-.482.136-.638.14-.14.312-.363.468-.545.156-.182.208-.312.312-.52.104-.207.052-.389-.026-.545-.078-.156-.705-1.698-.966-2.327-.254-.61-.513-.526-.705-.536-.182-.01-.39-.012-.6-.012s-.552.078-.84.39c-.288.312-1.1 1.075-1.1 2.623s1.127 3.036 1.282 3.243c.156.208 2.218 3.387 5.372 4.75.75.324 1.336.518 1.793.663.753.24 1.438.206 1.98.113.604-.103 1.84-.75 2.1-1.438.261-.69.261-1.282.183-1.408-.078-.124-.287-.202-.597-.36z"/>
                </svg>
                <div>
                  <span className="text-[9px] text-amber-200/50 uppercase block font-semibold">WhatsApp Desk</span>
                  <a href="https://wa.me/917303942175" className="text-white font-medium text-xs sm:text-sm hover:underline">
                    +91 7303942175
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 pt-1.5 border-t border-white/5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] text-amber-200/50 uppercase block font-semibold">Consultation Hours</span>
                  <span className="text-white text-xs leading-normal">
                    07:00 AM to 10:30 PM (All Days)
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Office Location Map Section centered and 100% width below first row columns */}
        <div className="footer-map w-full" id="footer-map-container">
          <div className="bg-black/15 p-5 rounded-[20px] border border-white/5 flex flex-col space-y-4">
            <h4 className="font-bold text-sm tracking-wide text-orange-300 border-b border-white/5 pb-2">
              Office Location Map
            </h4>
            
            <div className="relative rounded-[20px] overflow-hidden bg-black/35 border border-white/15 w-full shadow-inner group h-[280px] lg:h-[480px]">
              <iframe
                title="HQ Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=87.5,22.0,88.5,23.0&layer=mapnik&marker=22.5726%2C88.3639"
                className="grayscale opacity-80 group-hover:opacity-100 transition-all duration-300 pointer-events-auto w-full h-full"
                style={{ border: 0 }}
              />
            </div>
            <p className="text-[10px] text-amber-200/50 text-right italic leading-none">
              West Bengal HQ Sector Zero
            </p>
          </div>
        </div>

        {/* Lower footer: Centered copyright block placed tightly below */}
        <div className="pt-6 text-center mt-10 border-t border-white/10" id="copyright-box">
          <p className="text-sm font-semibold text-neutral-300">
            &copy; 2026 Walt Designs & Studio. All rights reserved
          </p>
          <p className="text-xs text-neutral-400/80 mt-1">
            Handcrafted with dynamic design standards &bull; Available Pan-India
          </p>
        </div>

      </div>

      {/* Fancy Marquee below footer across all pages */}
      <div className="w-full bg-[#1A0E05] border-t border-[#B3923B]/40 py-3 relative z-10 select-none overflow-hidden" id="fancy-marquee-bar">
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#1A0E05] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#1A0E05] to-transparent z-20 pointer-events-none" />
        <marquee direction="left" scrollamount="6" className="text-[#F3E5AB] font-mono text-xs sm:text-sm tracking-[0.1em] font-extrabold uppercase block">
          ✦ Welcome to Walt Designs & Growth Agency ✦ Deliver exquisite outcomes with zero lag ✦ Pan-India integration ✦ Web Designing & Custom Software Development ✦ Professional Resume & CV Making ✦ High CTR Thumbnail & Premium Video Editing ✦ Government Licence & Forms Registration ✦
        </marquee>
      </div>
    </footer>
  );
}
