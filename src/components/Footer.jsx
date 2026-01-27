import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Youtube,
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  Building,
  GraduationCap,
  Heart,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight
} from "lucide-react";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Programs", href: "/programs" },
  { label: "Admissions", href: "/admissions" },
  { label: "Mandates & PDFs", href: "/mandates" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const programmes = [
  { label: "B.Sc Nursing", href: "/programs/bsc-nursing", duration: "4 Years" },
  { label: "GNM", href: "/programs/gnm", duration: "3 Years" },
  { label: "P.B.B.Sc Nursing", href: "/programs/pbbsc-nursing", duration: "2 Years" },
  { label: "M.Sc Nursing", href: "/programs/msc-nursing", duration: "2 Years" },
];

const affiliations = [
  { name: "MUHS, Nashik", icon: Building },
  { name: "Maharashtra Nursing Council", icon: GraduationCap },
];

export function Footer() {
  return (
    <footer className="relative">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px'}}></div>
        </div>
        <div className="container mx-auto px-4 py-10 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-white" />
                <span className="text-white/90 text-sm font-medium">Start Your Nursing Career</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white">
                Ready to Join SNIK?
              </h3>
              <p className="text-white/80 mt-2 max-w-md">
                Take the first step towards a rewarding career in healthcare. Apply now for admissions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
              <Link to="/admissions" className="w-full sm:w-auto">
                <button className="group w-full px-8 py-4 bg-[#0c1829] text-white rounded-xl font-bold hover:bg-[#152a45] transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2">
                  Apply Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-all duration-300 border-2 border-white/30 hover:border-white/50">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gradient-to-b from-[#0c1829] to-[#060d16] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Top Accent Line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

        <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
          {/* Top Section - Logo & Affiliations */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
            {/* Logo Section */}
            <div className="flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-xl group-hover:bg-amber-500/30 transition-all duration-500"></div>
                <img 
                  src="/logo.png"
                  alt="SNIK" 
                  className="h-32 w-32 object-contain relative z-10 transition-all duration-500 group-hover:scale-110" 
                />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">SNIK</h3>
                <p className="text-amber-400 text-sm font-medium">Siddhagiri Nursing Institute, Kaneri</p>
                <p className="text-slate-500 text-xs mt-1">Excellence in Nursing Education Since 2011</p>
              </div>
            </div>

            {/* Affiliations */}
            <div className="flex flex-wrap justify-center gap-3">
              {affiliations.map((item, index) => (
                <div 
                  key={item.name}
                  className="group flex items-center gap-2 px-5 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all duration-300 cursor-pointer"
                >
                  <item.icon className="h-5 w-5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
            
            {/* About Section */}
            <div className="lg:col-span-1">
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></span>
                About SNIK
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Siddhagiri Nursing Institute is committed to providing quality nursing education 
                and preparing compassionate healthcare professionals. Part of Siddhagiri Gurukul Foundation 
                with 150 bedded multispecialty hospital for clinical training.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.facebook.com/SiddhagiriNursinginstitute/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-blue-600 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30 border border-white/10 hover:border-blue-500"
                >
                  <Facebook className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                </a>
                <a 
                  href="https://www.instagram.com/siddhagiri_nursing_institute/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/30 border border-white/10 hover:border-pink-500"
                >
                  <Instagram className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></span>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href} 
                      className="group flex items-center gap-2 text-slate-400 hover:text-amber-400 text-sm transition-all duration-300"
                    >
                      <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programmes */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></span>
                Our Programs
              </h4>
              <ul className="space-y-3">
                {programmes.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href} 
                      className="group flex items-center justify-between text-slate-400 hover:text-amber-400 text-sm transition-all duration-300 p-2 rounded-lg hover:bg-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
                        <span>{link.label}</span>
                      </div>
                      <span className="text-xs text-slate-600 group-hover:text-amber-400/70 transition-colors">{link.duration}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></span>
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="group flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-all duration-300">
                    <MapPin className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Address</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Siddhagiri Nursing Institute,<br />
                      Kaneri, Tal. Karveer,<br />
                      Dist. Kolhapur - 416234
                    </p>
                  </div>
                </li>
                <li className="group flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-all duration-300">
                    <Phone className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Phone</p>
                    <a href="tel:02312687553" className="text-slate-400 hover:text-amber-400 text-sm block transition-colors">02312687553</a>
                    <a href="tel:8261049063" className="text-slate-400 hover:text-amber-400 text-sm block transition-colors">8261049063</a>
                  </div>
                </li>
                <li className="group flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-all duration-300">
                    <Mail className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Email</p>
                    <a href="mailto:siddhaginursingcollege@gmail.com" className="text-slate-400 hover:text-amber-400 text-sm transition-colors break-all">
                      siddhaginursingcollege@gmail.com
                    </a>
                  </div>
                </li>
                <li className="group flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-all duration-300">
                    <Clock className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Office Hours</p>
                    <p className="text-slate-400 text-sm">Mon - Sat: 9:00 AM - 5:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* External Links */}
          <div className="py-8 border-t border-white/10">
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Maharashtra CET Cell", url: "https://cetcell.mahacet.org" },
                { name: "MUHS Nashik", url: "https://www.muhs.ac.in" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all duration-300"
                >
                  <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  <span className="text-slate-400 text-sm group-hover:text-white transition-colors">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <span>© 2026 Siddhagiri Nursing Institute, Kaneri.</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <Link to="/about" className="text-slate-500 hover:text-amber-400 transition-colors relative group">
                  Privacy Policy
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/about" className="text-slate-500 hover:text-amber-400 transition-colors relative group">
                  Terms of Service
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
