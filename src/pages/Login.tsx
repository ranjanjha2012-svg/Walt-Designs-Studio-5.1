import React, { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Mail, 
  Lock, 
  LogIn, 
  UserPlus, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        window.location.href = '/dashboard';
      } else {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    if (!isLoginMode && password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }

    if (!isLoginMode && password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      if (isLoginMode) {
        // Sign In with Firebase Authentication
        await signInWithEmailAndPassword(auth, trimmedEmail, password);
        setSuccessMessage('Login successful! Redirecting to dashboard...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 500);
      } else {
        // Create account
        await createUserWithEmailAndPassword(auth, trimmedEmail, password);
        setSuccessMessage('Account created successfully! Redirecting to dashboard...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 600);
      }
    } catch (err: any) {
      console.error('Firebase Auth error:', err);
      if (isLoginMode) {
        // Strict specification: If login details are wrong, show "Email or password is incorrect."
        setErrorMessage('Email or password is incorrect.');
      } else {
        if (err.code === 'auth/email-already-in-use') {
          setErrorMessage('This email is already registered. Please log in instead.');
        } else if (err.code === 'auth/invalid-email') {
          setErrorMessage('Invalid email format. Please check your email.');
        } else if (err.code === 'auth/weak-password') {
          setErrorMessage('Password is too weak. Please use at least 6 characters.');
        } else {
          setErrorMessage(err.message || 'Authentication failed. Please try again.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const logoUrl = "https://i.ibb.co/rKxc0kTs/Whats-App-Image-2026-06-23-at-14-27-06.jpg";

  if (checkingAuth) {
    return (
      <div className="bg-[#02182d] font-sans min-h-screen text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
          <p className="text-cyan-200 text-sm font-mono tracking-wider">Verifying Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#02182d] font-sans min-h-screen text-slate-100 flex flex-col justify-between relative w-full max-w-full overflow-x-hidden" id="login-page-view">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 blur-[160px] pointer-events-none z-0 rounded-full" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] pointer-events-none z-0 rounded-full" />

      <Header />

      <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          
          {/* Main Login Card */}
          <div className="relative rounded-3xl border border-cyan-400/30 p-6 sm:p-8 bg-gradient-to-b from-[#062440]/95 via-[#031d36]/95 to-[#021527]/98 backdrop-blur-2xl shadow-2xl overflow-hidden" id="auth-card">
            
            {/* Header / Brand Logo in Card */}
            <div className="flex flex-col items-center text-center space-y-3 mb-6">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-cyan-400/30 shadow-lg bg-[#021323]">
                <img 
                  src={logoUrl} 
                  alt="Walt Designs & Studio" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/20 text-[10px] font-mono text-cyan-300 uppercase tracking-widest font-bold mb-1.5">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  <span>Secure Firebase Authentication</span>
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {isLoginMode ? 'Client & Member Login' : 'Create Walt Account'}
                </h1>
                <p className="text-xs sm:text-sm text-cyan-100/70 mt-1">
                  {isLoginMode 
                    ? 'Access your agency projects, inquiry statuses, and direct studio tools.'
                    : 'Register your email to manage design briefs and track project timelines.'}
                </p>
              </div>
            </div>

            {/* Switch Tabs (Login / Create Account) */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-[#021323]/90 border border-cyan-500/20 mb-6">
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(true);
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 ${
                  isLoginMode 
                    ? 'bg-cyan-400 text-black shadow-md' 
                    : 'text-cyan-200/70 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(false);
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 ${
                  !isLoginMode 
                    ? 'bg-cyan-400 text-black shadow-md' 
                    : 'text-cyan-200/70 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start space-x-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Success Message Box */}
            {successMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start space-x-2.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium">{successMessage}</span>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4" id="login-form">
              
              {/* Email field */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-cyan-200/90 font-mono tracking-wide uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400/60">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#021323]/80 border border-cyan-500/25 text-white placeholder-cyan-200/30 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-cyan-200/90 font-mono tracking-wide uppercase">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400/60">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#021323]/80 border border-cyan-500/25 text-white placeholder-cyan-200/30 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-cyan-400/60 hover:text-cyan-300"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password field (if Register mode) */}
              {!isLoginMode && (
                <div className="space-y-1.5 text-left animate-fadeIn">
                  <label className="text-xs font-semibold text-cyan-200/90 font-mono tracking-wide uppercase">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400/60">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#021323]/80 border border-cyan-500/25 text-white placeholder-cyan-200/30 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-black bg-cyan-400 hover:bg-cyan-350 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                id="submit-auth-btn"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : isLoginMode ? (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Log In to Dashboard</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Create Account & Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Footnote about privacy and direct authentication */}
            <div className="mt-6 pt-4 border-t border-cyan-500/15 text-center">
              <p className="text-[11px] text-cyan-100/60 leading-normal">
                Protected by Walt Designs Firebase Auth gateway. No unauthorized telemetry or third-party cookies.
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
