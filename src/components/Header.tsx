import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, Sparkles, LogIn, LogOut, LayoutDashboard, User as UserIcon } from 'lucide-react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../firebase';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login';
    } catch (error) {
      console.error('Header logout error:', error);
    }
  };

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
          <nav className="hidden md:flex items-center space-x-7" id="desktop-nav">
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
 
          {/* Call To Action & Login Right */}
          <div className="hidden md:flex items-center space-x-3" id="header-actions">
            
            {/* Login / Dashboard / Logout Buttons */}
            {!authLoading && (
              currentUser ? (
                <div className="flex items-center space-x-2">
                  <a
                    href="/dashboard"
                    className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive('/dashboard')
                        ? 'bg-amber-400 text-amber-950 shadow-md font-extrabold'
                        : 'text-amber-100 bg-white/10 hover:bg-white/15 border border-amber-300/30'
                    }`}
                    id="header-dashboard-btn"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-amber-300" />
                    <span>Dashboard</span>
                  </a>
                  <button
                    onClick={handleLogout}
                    title="Log Out"
                    className="p-2 rounded-xl text-amber-200 hover:text-red-200 bg-black/25 hover:bg-red-950/60 border border-white/10 hover:border-red-400/40 transition-all cursor-pointer"
                    id="header-logout-btn"
                    aria-label="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <a
                  href="/login"
                  className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive('/login')
                      ? 'bg-cyan-400 text-black shadow-md font-extrabold'
                      : 'text-amber-100 hover:text-white bg-black/25 hover:bg-black/40 border border-[#B3923B]/40'
                  }`}
                  id="header-login-btn"
                >
                  <LogIn className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Login</span>
                </a>
              )
            )}

            <a
              href="/contact"
              className="relative inline-flex items-center justify-center px-4.5 py-2.5 rounded-xl overflow-hidden font-display text-xs font-bold text-amber-950 transition-all duration-300 bg-[#F3E5AB] hover:bg-[#FFF5D6] border border-[#B3923B]/30 hover:scale-[1.02] shadow-lg shadow-black/20 active:scale-95"
              id="header-cta-btn"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 animate-pulse text-amber-600" />
              Inquire Now
            </a>
          </div>
 
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {!authLoading && !currentUser && (
              <a
                href="/login"
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-100 bg-black/30 border border-[#B3923B]/40"
                id="mobile-header-login-quick"
              >
                <LogIn className="w-3.5 h-3.5 text-cyan-300" />
                <span>Login</span>
              </a>
            )}
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
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-display text-base font-bold transition-colors ${
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

            {/* Auth links in mobile menu */}
            {currentUser ? (
              <>
                <a
                  href="/dashboard"
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-display text-base font-bold transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-amber-400/20 text-[#F3E5AB] border-l-4 border-amber-400'
                      : 'text-amber-100 hover:bg-white/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <LayoutDashboard className="w-4 h-4 text-amber-300" />
                    <span>Member Dashboard</span>
                  </div>
                  <span className="text-xs text-amber-300 font-mono">Active</span>
                </a>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-display text-base font-bold text-red-300 hover:bg-red-950/30 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span>Log Out</span>
                  </div>
                </button>
              </>
            ) : (
              <a
                href="/login"
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-display text-base font-bold transition-colors ${
                  isActive('/login')
                    ? 'bg-cyan-400/20 text-cyan-200 border-l-4 border-cyan-400'
                    : 'text-cyan-200 hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <LogIn className="w-4 h-4 text-cyan-300" />
                  <span>Login / Register</span>
                </div>
              </a>
            )}

            <div className="pt-3 px-1">
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
