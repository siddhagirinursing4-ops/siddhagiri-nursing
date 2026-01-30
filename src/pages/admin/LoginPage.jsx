import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import { Lock, Mail, Eye, EyeOff, Shield, Sparkles, AlertTriangle } from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { AnnouncementBar } from '../../components/AnnouncementBar';
import { 
  detectSuspiciousActivity, 
  trackFailedLogin, 
  resetFailedLogins,
  preventClickjacking 
} from '../../lib/security';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuspicious, setIsSuspicious] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(null);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    // Prevent clickjacking
    preventClickjacking();
    
    // Check for suspicious activity on mount
    setIsSuspicious(detectSuspiciousActivity());
  }, []);

  // Check lockout timer
  useEffect(() => {
    if (lockoutTime) {
      const timer = setInterval(() => {
        const remaining = lockoutTime - Date.now();
        if (remaining <= 0) {
          setLockoutTime(null);
          setIsSuspicious(false);
          resetFailedLogins();
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [lockoutTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if account is temporarily locked
    if (isSuspicious && lockoutTime && lockoutTime > Date.now()) {
      const remainingMinutes = Math.ceil((lockoutTime - Date.now()) / 60000);
      toast.error(`Too many failed attempts. Please try again in ${remainingMinutes} minute(s).`);
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      resetFailedLogins();
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      
      // Track failed login
      const attempts = trackFailedLogin();
      
      let message = 'Login failed';
      
      if (error.response) {
        // Server responded with error
        message = error.response.data?.message || error.response.statusText;
        
        if (error.response.status === 423) {
          message = 'Account locked due to too many failed attempts. Please try again later.';
          setLockoutTime(Date.now() + 15 * 60 * 1000); // 15 minutes
          setIsSuspicious(true);
        } else if (error.response.status === 429) {
          message = 'Too many requests. Please try again later.';
          setLockoutTime(Date.now() + 15 * 60 * 1000);
          setIsSuspicious(true);
        } else if (error.response.status === 403) {
          message = 'Account is deactivated. Contact administrator.';
        } else if (error.response.status === 401) {
          message = 'Invalid email or password';
          
          // Check if we should trigger local lockout
          if (attempts >= 3) {
            setIsSuspicious(true);
            setLockoutTime(Date.now() + 15 * 60 * 1000);
            message = 'Too many failed attempts. Account temporarily locked for 15 minutes.';
          } else {
            message += ` (${3 - attempts} attempts remaining)`;
          }
        }
      } else if (error.request) {
        // Request made but no response
        message = 'Cannot connect to server. Please check if the server is running.';
      } else {
        // Something else happened
        message = error.message || 'An unexpected error occurred';
      }
      
      toast.error(message, { duration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const getRemainingTime = () => {
    if (!lockoutTime) return '';
    const remaining = Math.ceil((lockoutTime - Date.now()) / 60000);
    return remaining > 0 ? `${remaining} minute(s)` : '';
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AnnouncementBar />
      <Header />
      
      {/* Modern Centered Login Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] overflow-hidden py-12 px-4">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

        {/* Login Card */}
        <div className="w-full max-w-md relative z-10 animate-scale-in">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 p-8 border border-white/20">
            
            {/* Security Warning */}
            {isSuspicious && lockoutTime && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-900">Account Temporarily Locked</p>
                  <p className="text-xs text-red-700 mt-1">
                    Too many failed login attempts. Please try again in {getRemainingTime()}.
                  </p>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl mb-4 shadow-lg shadow-amber-500/30 animate-bounce-gentle">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-black text-[#0c1829] mb-2">Admin Portal</h1>
              <p className="text-slate-600 text-sm">Sign in to manage your institution</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#0c1829] mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none text-[#0c1829] placeholder:text-slate-400 hover:border-slate-300 bg-white"
                    placeholder="admin@example.com"
                    required
                    disabled={isSuspicious && lockoutTime > Date.now()}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0c1829] mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none text-[#0c1829] placeholder:text-slate-400 hover:border-slate-300 bg-white"
                    placeholder="••••••••"
                    required
                    disabled={isSuspicious && lockoutTime > Date.now()}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-600 transition-colors p-1 rounded-lg hover:bg-amber-50"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || (isSuspicious && lockoutTime > Date.now())}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-bold text-base hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Shield className="w-4 h-4 text-amber-500" />
                <span>Secured with enterprise-grade encryption</span>
              </div>
            </div>
          </div>

          {/* Bottom Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Shield className="h-4 w-4 text-amber-400" />
              <span className="text-white/80 text-xs font-medium">Secure Admin Access</span>
            </div>
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes scale-in {
            from { 
              opacity: 0; 
              transform: scale(0.95); 
            }
            to { 
              opacity: 1; 
              transform: scale(1); 
            }
          }
          
          @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          
          .animate-scale-in {
            animation: scale-in 0.6s ease-out both;
          }
          
          .animate-bounce-gentle {
            animation: bounce-gentle 2s ease-in-out infinite;
          }
        `}</style>
      </section>

      <Footer />
    </div>
  );
}
