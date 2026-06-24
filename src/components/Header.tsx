import React, { useState, useEffect } from 'react';
import { Menu, X, Landmark, Compass, Sparkles } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const logoUrl = "https://i.ibb.co/rKxc0kTs/Whats-App-Image-2026-06-23-at-14-27-06.jpg";

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return currentPath === '/' || currentPath === '/index.html' || currentPath === '';
    }
    return currentPath.includes(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-350 bg-gradient-to-r from-[#4A3B18] via-[#5A481E] to-[#3D3012] border-b border-[#B3923B]/30 shadow-md" id="shared-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <a href="/" className="flex items-center space-x-3 group" id="logo-header-link">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/15 group-hover:border-white/30 transition-all duration-300">
              <img 
                src={logoUrl} 
                alt="Walt Designs & Studio" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-[#FFF5D6] group-hover:text-white transition-colors">
                WALT DESIGNS
              </span>
              <span className="font-mono text-[10px] text-amber-300 group-hover:text-amber-200 transition-colors tracking-widest uppercase font-bold">
                & STUDIO
              </span>
            </div>
          </a>
 
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-1 py-2 font-display text-sm font-bold transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-[#F3E5AB] font-extrabold'
                    : 'text-amber-100/80 hover:text-white'
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#F3E5AB] rounded-full" />
                )}
              </a>
            ))}
          </nav>
 
          {/* Call To Action Right */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/contact"
              className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl overflow-hidden font-display text-xs font-bold text-amber-950 transition-all duration-300 bg-[#F3E5AB] hover:bg-[#FFF5D6] border border-[#B3923B]/30 hover:scale-[1.02] shadow-lg shadow-black/20 active:scale-95"
              id="header-cta-btn"
            >
              <Sparkles className="w-3.5 h-3.5 mr-2 animate-pulse text-amber-600" />
              Inquire Now
            </a>
          </div>
 
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-amber-100 hover:text-white bg-white/10 border border-white/10 transition-all focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </div>
 
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#4A3B18] to-[#2D230C] border-b border-[#B3923B]/30 animate-fadeIn" id="mobile-nav-panel">
          <div className="px-3 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-display text-base font-bold transition-colors ${
                  isActive(link.href)
                    ? 'bg-white/10 text-[#F3E5AB] border-l-4 border-[#B3923B]'
                    : 'text-amber-100 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span>{link.name}</span>
                <Compass className="w-4 h-4 opacity-75 text-amber-200" />
              </a>
            ))}
            <div className="pt-4 px-4">
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl text-center text-sm font-bold text-amber-950 bg-[#F3E5AB] hover:bg-[#FFF5D6] transition-all cursor-pointer shadow-md"
                onClick={() => setIsOpen(false)}
              >
                Inquire Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
