import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { WEB3FORMS_CONFIG } from '../config/web3forms';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [contactInfoVisible, setContactInfoVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Staggered animations
    setTimeout(() => setFormVisible(true), 300);
    setTimeout(() => setContactInfoVisible(true), 600);
    setTimeout(() => setMapVisible(true), 900);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // 1. Save to database via backend API
      const apiUrl = import.meta.env.VITE_API_URL || 'https://siddhagiri-nursing-backend.onrender.com/api';
      const dbResponse = await fetch(`${apiUrl}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const dbResult = await dbResponse.json();

      if (!dbResult.success) {
        console.error('Failed to save to database:', dbResult);
        // Continue anyway to send email
      }

      // 2. Send to Web3Forms for email notification
      const web3Data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || 'New Contact Form Submission - SNIK',
        message: formData.message,
        access_key: WEB3FORMS_CONFIG.accessKey,
        from_name: 'SNIK Contact Form',
      };

      const emailResponse = await fetch(WEB3FORMS_CONFIG.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(web3Data),
      });

      const emailResult = await emailResponse.json();

      if (emailResult.success || dbResult.success) {
        setStatus({ 
          type: 'success', 
          message: 'Thank you! Your message has been sent successfully. We will respond within 24 hours.' 
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ 
          type: 'error', 
          message: 'Something went wrong. Please try again or call us directly.' 
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
    }

    setLoading(false);
    setTimeout(() => setStatus({ type: '', message: '' }), 6000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse animate-delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse animate-delay-2000" />
        </div>
        
        <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4 animate-fade-in-up animate-delay-300">
            We're Here to Help
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up animate-delay-500">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Touch</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-5 rounded-full animate-scale-in animate-delay-700" />
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto animate-fade-in-up animate-delay-900">
            Questions about admissions or our nursing programs? Our team is ready to guide you on your journey to becoming a healthcare professional.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-8">
            
            {/* Contact Form - Takes 3 columns */}
            <div className={`lg:col-span-3 transition-all duration-1000 ease-out ${formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 hover:scale-[1.01]">
                <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
                  <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25 animate-bounce-gentle">
                    <Send className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#0c1829]">Send Us a Message</h2>
                    <p className="text-slate-500 text-sm">We typically respond within 24 hours</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="group animate-slide-in-left animate-delay-200">
                      <label className="block text-slate-600 font-medium mb-1.5 text-sm">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all duration-300 text-sm hover:border-amber-300 focus:scale-[1.01]"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="animate-slide-in-right animate-delay-300">
                      <label className="block text-slate-600 font-medium mb-1.5 text-sm">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all duration-300 text-sm hover:border-amber-300 focus:scale-[1.01]"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="animate-slide-in-left animate-delay-400">
                      <label className="block text-slate-600 font-medium mb-1.5 text-sm">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 1234567890"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all duration-300 text-sm hover:border-amber-300 focus:scale-[1.01]"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="animate-slide-in-right animate-delay-500">
                      <label className="block text-slate-600 font-medium mb-1.5 text-sm">Subject</label>
                      <select
                        name="subject"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all duration-300 text-sm hover:border-amber-300 focus:scale-[1.01]"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="">Select a topic</option>
                        <option value="Admission Inquiry">Admission Inquiry</option>
                        <option value="Course Information">Course Information</option>
                        <option value="Fee Structure">Fee Structure</option>
                        <option value="General Query">General Query</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="animate-fade-in-up animate-delay-600">
                    <label className="block text-slate-600 font-medium mb-1.5 text-sm">Your Message *</label>
                    <textarea
                      name="message"
                      rows="4"
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all duration-300 resize-none text-sm hover:border-amber-300 focus:scale-[1.01]"
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-sm animate-fade-in-up animate-delay-700"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>

                {/* Status Message */}
                {status.message && (
                  <div className={`mt-4 p-4 rounded-xl flex items-center gap-3 animate-slide-down ${
                    status.type === 'success' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {status.type === 'success' ? (
                      <CheckCircle className="h-5 w-5 shrink-0 animate-bounce-gentle" />
                    ) : (
                      <AlertCircle className="h-5 w-5 shrink-0 animate-shake" />
                    )}
                    <span className="text-sm">{status.message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Info - Takes 2 columns */}
            <div className={`lg:col-span-2 transition-all duration-1000 ease-out ${contactInfoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-gradient-to-br from-[#0c1829] via-[#152a45] to-[#1e3a5f] rounded-2xl p-6 md:p-7 h-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
                <h2 className="text-xl font-bold text-white mb-6 animate-fade-in-up">Contact Information</h2>
                
                <div className="space-y-5">
                  <a href="tel:+919356872628" className="flex items-start gap-3 group animate-slide-in-right animate-delay-200">
                    <div className="w-10 h-10 bg-amber-500/15 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-amber-500/25 group-hover:scale-110 transition-all duration-300 animate-pulse-gentle">
                      <Phone className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm mb-0.5">Phone</h3>
                      <p className="text-amber-400 font-semibold text-sm hover:text-amber-300 transition-colors">+91 9356872628</p>
                    </div>
                  </a>
                  
                  <a href="mailto:siddhaginursingcollege@gmail.com" className="flex items-start gap-3 group animate-slide-in-right animate-delay-300">
                    <div className="w-10 h-10 bg-amber-500/15 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-amber-500/25 group-hover:scale-110 transition-all duration-300 animate-pulse-gentle">
                      <Mail className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm mb-0.5">Email Us</h3>
                      <p className="text-amber-400 font-semibold text-xs break-all">siddhaginursingcollege@gmail.com</p>
                    </div>
                  </a>
                  
                  <div className="flex items-start gap-3 group animate-slide-in-right animate-delay-400">
                    <div className="w-10 h-10 bg-amber-500/15 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-amber-500/25 group-hover:scale-110 transition-all duration-300 animate-pulse-gentle">
                      <MapPin className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm mb-0.5">Visit Us</h3>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Siddhagiri Nursing Institute,<br />
                        Kaneri, Tal. Karveer,<br />
                        Dist. Kolhapur - 416234
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 group animate-slide-in-right animate-delay-500">
                    <div className="w-10 h-10 bg-amber-500/15 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-amber-500/25 group-hover:scale-110 transition-all duration-300 animate-pulse-gentle">
                      <Clock className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm mb-0.5">Office Hours</h3>
                      <p className="text-slate-300 text-xs">Monday - Saturday</p>
                      <p className="text-amber-400 font-semibold text-sm">9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* Accreditation */}
                <div className="mt-6 pt-5 border-t border-white/10 animate-fade-in-up animate-delay-600">
                  <p className="text-slate-400 text-xs mb-2">Accredited By:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-amber-500/15 text-amber-400 rounded-full text-xs font-medium animate-fade-in-up animate-delay-800 hover:bg-amber-500/25 transition-all duration-300">
                      MUHS Affiliated
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className={`py-12 bg-slate-50 transition-all duration-1000 ease-out ${mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0c1829] mb-2">Our Location</h2>
            <div className="w-14 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full animate-scale-in animate-delay-200" />
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 hover:scale-[1.01] animate-fade-in-up animate-delay-300">
            <div className="h-72 md:h-80 w-full overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=Siddhagiri+Nursing+Institute,Kaneri,Kolhapur,Maharashtra&output=embed"
                className="w-full h-full border-0 transition-all duration-500 hover:scale-105"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Siddhagiri Nursing Institute Location"
              />
            </div>
            <div className="p-5 md:p-6 bg-gradient-to-r from-[#0c1829] via-[#152a45] to-[#1e3a5f]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4 animate-slide-in-left animate-delay-500">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center shrink-0 animate-pulse-gentle">
                    <MapPin className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-white">Siddhagiri Nursing Institute</h3>
                    <p className="text-slate-400 text-sm">Kaneri, Kolhapur, Maharashtra</p>
                  </div>
                </div>
                <a 
                  href="https://maps.app.goo.gl/y6V6wDPP7QNWTGwo9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-[#0c1829] font-semibold rounded-xl transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-amber-500/25 text-sm animate-slide-in-right animate-delay-600"
                >
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slide-in-left {
          from { 
            opacity: 0; 
            transform: translateX(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes slide-in-right {
          from { 
            opacity: 0; 
            transform: translateX(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes slide-down {
          from { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.8); 
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
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out both;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out both;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out both;
        }
        
        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out both;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-delay-200 { animation-delay: 200ms; }
        .animate-delay-300 { animation-delay: 300ms; }
        .animate-delay-400 { animation-delay: 400ms; }
        .animate-delay-500 { animation-delay: 500ms; }
        .animate-delay-600 { animation-delay: 600ms; }
        .animate-delay-700 { animation-delay: 700ms; }
        .animate-delay-800 { animation-delay: 800ms; }
        .animate-delay-900 { animation-delay: 900ms; }
        .animate-delay-1000 { animation-delay: 1000ms; }
        .animate-delay-2000 { animation-delay: 2000ms; }
      `}</style>
    </div>
  );
};

export { ContactPage };
