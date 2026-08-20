import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../firebase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  LogOut, 
  User as UserIcon, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  FileText, 
  CheckCircle2, 
  LayoutDashboard, 
  ArrowRight, 
  FolderKanban, 
  HelpCircle,
  ExternalLink,
  Zap,
  TrendingUp,
  Mail
} from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        // Redirect to authentication screen if not logged in
        window.location.href = '/login';
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut(auth);
      // Return to authentication screen after logout as specified
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      setLoggingOut(false);
    }
  };

  const logoUrl = "https://i.ibb.co/rKxc0kTs/Whats-App-Image-2026-06-23-at-14-27-06.jpg";

  if (loading) {
    return (
      <div className="bg-[#02182d] font-sans min-h-screen text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
          <p className="text-cyan-200 text-sm font-mono tracking-wider">Loading Walt Member Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#02182d] font-sans min-h-screen text-slate-100 flex flex-col justify-between relative w-full max-w-full overflow-x-hidden" id="dashboard-page-view">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-cyan-500/10 blur-[150px] pointer-events-none z-0 rounded-full" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] pointer-events-none z-0 rounded-full" />

      <Header />

      <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="dashboard-main-section">
        
        {/* Top Greeting & User Bar */}
        <div className="bg-gradient-to-r from-[#062440]/90 via-[#032B4E]/80 to-[#063E63]/90 border border-cyan-400/25 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-cyan-400/30 bg-[#021323] shadow-md shrink-0 flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 uppercase tracking-widest font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Authenticated</span>
                </span>
                <span className="text-xs text-cyan-300/60 font-mono">UID: {user?.uid.slice(0, 8)}...</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Welcome back!
              </h1>
              <p className="text-sm text-cyan-100/80 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-white">{user?.email}</span>
              </p>
            </div>
          </div>

          {/* Logout Action Button */}
          <div className="flex items-center space-x-3">
            <a
              href="/contact"
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-black bg-cyan-400 hover:bg-cyan-350 transition-all shadow-md flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-950" />
              <span>New Project Brief</span>
            </a>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-red-200 bg-red-950/60 hover:bg-red-900/60 border border-red-500/30 hover:border-red-400/50 transition-all flex items-center space-x-2 cursor-pointer active:scale-95 disabled:opacity-50"
              id="dashboard-logout-btn"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>{loggingOut ? 'Signing out...' : 'Log Out'}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Main Column */}
          <div className="md:col-span-8 space-y-6">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#062440]/70 border border-cyan-500/20 backdrop-blur-md">
                <div className="flex items-center justify-between text-cyan-400 mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300/70">Active Status</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-white">Client Verified</div>
                <p className="text-[11px] text-cyan-100/60 mt-1">Direct priority channel active</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#062440]/70 border border-cyan-500/20 backdrop-blur-md">
                <div className="flex items-center justify-between text-cyan-400 mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300/70">Average SLA</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white">&lt; 24 Hours</div>
                <p className="text-[11px] text-cyan-100/60 mt-1">Milestone response guarantee</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#062440]/70 border border-cyan-500/20 backdrop-blur-md">
                <div className="flex items-center justify-between text-cyan-400 mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300/70">Studio Reach</span>
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-black text-white">Pan-India</div>
                <p className="text-[11px] text-cyan-100/60 mt-1">Delhi NCR & West Bengal HQ</p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="rounded-3xl bg-gradient-to-b from-[#062440]/90 to-[#02182d]/95 border border-cyan-400/20 p-6 sm:p-8 backdrop-blur-md shadow-xl">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <FolderKanban className="w-5 h-5 text-cyan-400" />
                <span>Your Studio Direct Actions</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="/services"
                  className="p-4 rounded-2xl bg-[#021323]/80 border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-[#031d36] transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Service Desk</span>
                      <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="text-sm font-bold text-white">Explore Creative Catalog</h3>
                    <p className="text-xs text-cyan-100/70">Websites, ATS Resumes, Video Editing, Thumbnails & MSME Filings.</p>
                  </div>
                </a>

                <a
                  href="/contact"
                  className="p-4 rounded-2xl bg-[#021323]/80 border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-[#031d36] transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase">AI Strategy</span>
                      <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                    </div>
                    <h3 className="text-sm font-bold text-white">Generate Launch Plan</h3>
                    <p className="text-xs text-cyan-100/70">Use our customized AI planner on the contact page for immediate roadmaps.</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Account Details Box */}
            <div className="rounded-3xl bg-[#062440]/60 border border-cyan-500/15 p-6 backdrop-blur-md">
              <h3 className="text-sm font-mono font-bold text-cyan-300 uppercase tracking-wider mb-3">
                Security & Authentication Metadata
              </h3>
              <div className="space-y-2 text-xs font-mono text-cyan-100/70">
                <div className="flex justify-between py-1.5 border-b border-cyan-500/10">
                  <span>Firebase Auth Provider:</span>
                  <span className="text-white font-semibold">password</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-cyan-500/10">
                  <span>Email Account:</span>
                  <span className="text-cyan-300 font-semibold">{user?.email}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Email Verified Status:</span>
                  <span className={user?.emailVerified ? 'text-emerald-400 font-bold' : 'text-amber-300 font-bold'}>
                    {user?.emailVerified ? 'Verified' : 'Active (Standard)'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="md:col-span-4 space-y-6">
            
            {/* Direct Agency Contact Card */}
            <div className="rounded-3xl bg-gradient-to-b from-[#4A3B18]/90 via-[#2D230C]/95 to-[#1F1705]/95 border border-[#B3923B]/50 p-6 text-[#FFF5D6] shadow-xl space-y-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-[#F3E5AB]">Dedicated Support</h3>
              </div>
              <p className="text-xs text-amber-100/80 leading-relaxed">
                Need customized enterprise quotations, rush delivery, or direct creative review with our principal design leads?
              </p>
              <div className="pt-2">
                <a
                  href="/contact"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-amber-950 bg-[#F3E5AB] hover:bg-[#FFF5D6] transition-all flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <span>Open Priority Ticket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Studio Info Card */}
            <div className="rounded-3xl bg-[#062440]/80 border border-cyan-400/20 p-6 space-y-3">
              <div className="flex items-center space-x-2 text-cyan-300">
                <HelpCircle className="w-4 h-4" />
                <h4 className="font-bold text-sm text-white">Need Assistance?</h4>
              </div>
              <p className="text-xs text-cyan-100/70 leading-relaxed">
                You can browse public service packages or update your project requirements anytime.
              </p>
              <div className="pt-1">
                <a
                  href="/"
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                >
                  <span>Return to Homepage</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
