import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, ChevronDown, Facebook, Instagram, ChevronRight, Lock } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/" },
    { 
      label: "About", 
      href: "/about",
    },
    { 
      label: "Programmes", 
      href: "/programs",
      dropdown: [
        { label: "B.Sc Nursing", href: "/programs/bsc-nursing" },
        { label: "GNM", href: "/programs/gnm" },
        { label: "P.B.B.Sc Nursing", href: "/programs/pbbsc-nursing" },
        { label: "M.Sc Nursing", href: "/programs/msc-nursing" },
      ]
    },
    { label: "Mandates", href: "/mandates" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setMobileDropdown(null);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? "shadow-xl" : ""}`}>
      {/* Modern Top Bar */}
      <div className={`bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-500 ${isScrolled ? "py-1" : "py-1.5"}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Left Section - Contact Info */}
            <div className="flex items-center gap-3 sm:gap-5 lg:gap-6">
              <a 
                href="tel:+919356872628" 
                className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/90 hover:text-amber-400 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-amber-500/20 transition-all">
                  <Phone className="h-2.5 w-2.5 text-amber-400" />
                </div>
                <span className="hidden xs:inline font-medium">+91 9356872628</span>
              </a>
              
              <a 
                href="mailto:siddhaginursingcollege@gmail.com" 
                className="hidden sm:flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/90 hover:text-amber-400 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-amber-500/20 transition-all">
                  <Mail className="h-2.5 w-2.5 text-amber-400" />
                </div>
                <span className="hidden md:inline font-medium">siddhaginursingcollege@gmail.com</span>
                <span className="md:hidden font-medium">Email</span>
              </a>
              
              <a 
                href="https://www.google.com/maps/dir//Siddhagiri+Nursing+Institute+siddhagiri+math+campus+Panchashil+Nagar+Kaneri,+Maharashtra+416234/@16.6131258,74.2579804,15z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3bc0ffd68324e08d:0xe6861f88cf62e4e6"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 text-[11px] text-white/70 hover:text-amber-400 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-amber-500/20 transition-all">
                  <MapPin className="h-2.5 w-2.5 text-amber-400" />
                </div>
                <span className="font-medium">Kaneri, Kolhapur, Maharashtra</span>
              </a>
            </div>
            
            {/* Right Section - Accreditation & Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden md:flex items-center gap-2 px-2.5 py-0.5 bg-white/10 rounded-full backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
                <span className="text-amber-400 font-semibold tracking-wide text-[10px] lg:text-[11px]">
                  MUHS Affiliated
                </span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <Link 
                  to="/admin/login" 
                  className="w-6 h-6 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group backdrop-blur-sm"
                  title="Admin Login"
                >
                  <Lock className="h-2.5 w-2.5 group-hover:animate-pulse" />
                </Link>
                <a 
                  href="https://www.facebook.com/SiddhagiriNursinginstitute/" 
                  className="w-6 h-6 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-6 backdrop-blur-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-2.5 w-2.5" />
                </a>
                <a 
                  href="https://www.instagram.com/siddhagiri_nursing_institute/?hl=en" 
                  className="w-6 h-6 bg-white/10 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-rotate-6 backdrop-blur-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className={`bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-500 ${
        isScrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.1)]" : ""
      }`}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-16 sm:h-20 md:h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center group -my-3 sm:-my-6">
              <img 
                src="/logo.png"
                alt="SNIK" 
                className="h-20 sm:h-32 md:h-36 object-contain transition-all duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item, index) => (
                <div 
                  key={item.label} 
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`relative flex items-center gap-1 px-3 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 rounded-md group ${
                      location.pathname === item.href
                        ? "text-orange-600"
                        : "text-slate-700 hover:text-orange-600"
                    }`}
                  >
                    <span className="relative">
                      {item.label}
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300 ${
                        location.pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                      }`} />
                    </span>
                    {item.dropdown && (
                      <ChevronDown className={`h-3 w-3 transition-all duration-300 ${
                        activeDropdown === item.label ? "rotate-180 text-orange-500" : ""
                      }`} />
                    )}
                  </Link>
                  
                  {/* Desktop Dropdown */}
                  {item.dropdown && (
                    <div className={`absolute top-full left-0 pt-2 z-50 transition-all duration-300 ${
                      activeDropdown === item.label 
                        ? "opacity-100 visible translate-y-0" 
                        : "opacity-0 invisible -translate-y-3 pointer-events-none"
                    }`}>
                      <div className="w-48 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden">
                        <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500" />
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            className="block px-4 py-3 text-[13px] text-slate-600 hover:text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-300 hover:pl-6 border-b border-slate-50 last:border-0"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <Link to="/admissions" className="ml-4">
                <button className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-6 py-2 text-[13px] rounded-full shadow-lg shadow-orange-500/30 transition-all duration-300 tracking-wide overflow-hidden group hover:shadow-orange-500/50 hover:scale-105 active:scale-95">
                  <span className="relative z-10">Apply Now</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_50%_-20%,white,transparent_70%)] transition-opacity duration-500" />
                </button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:gap-3 xl:hidden">
              <Link to="/admissions">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-lg">
                  Apply Now
                </button>
              </Link>
              
              <button
                className="p-2 hover:bg-slate-100 rounded-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-4">
                  <span className={`absolute left-0 w-5 h-0.5 bg-slate-700 rounded transition-all duration-300 ${
                    isMenuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`} />
                  <span className={`absolute left-0 top-1.5 w-5 h-0.5 bg-slate-700 rounded transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 scale-0" : "opacity-100"
                  }`} />
                  <span className={`absolute left-0 w-5 h-0.5 bg-slate-700 rounded transition-all duration-300 ${
                    isMenuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Navigation Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 xl:hidden transform transition-all duration-500 ease-out shadow-2xl ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <img src="/logo.png" alt="SNIK" className="h-20 transition-transform duration-300 hover:scale-110" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-all duration-300 hover:rotate-90"
          >
            <div className="relative w-5 h-5">
              <span className="absolute left-0 top-2 w-5 h-0.5 bg-slate-700 rounded rotate-45" />
              <span className="absolute left-0 top-2 w-5 h-0.5 bg-slate-700 rounded -rotate-45" />
            </div>
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="overflow-y-auto h-[calc(100%-140px)] py-2">
          {navItems.map((item, index) => (
            <div 
              key={item.label}
              className="transition-all duration-300"
            >
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => setMobileDropdown(mobileDropdown === item.label ? null : item.label)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all duration-300 ${
                      location.pathname === item.href
                        ? "text-orange-600 bg-orange-50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                    <ChevronRight className={`h-4 w-4 transition-all duration-300 ${
                      mobileDropdown === item.label ? "rotate-90 text-orange-500" : ""
                    }`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 bg-slate-50 ${
                    mobileDropdown === item.label ? "max-h-48" : "max-h-0"
                  }`}>
                    {item.dropdown.map((subItem, subIndex) => (
                      <Link
                        key={subItem.label}
                        to={subItem.href}
                        className="block px-8 py-2.5 text-sm text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.href}
                  className={`block px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.href
                      ? "text-orange-600 bg-orange-50"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-gradient-to-t from-white to-slate-50">
          <Link to="/admissions" onClick={() => setIsMenuOpen(false)} className="block">
            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 text-sm rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
              Apply Now
            </button>
          </Link>
          <div className="flex items-center justify-center gap-3 mt-3">
            <a href="https://www.facebook.com/SiddhagiriNursinginstitute/" className="w-9 h-9 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com/siddhagiri_nursing_institute/?hl=en" className="w-9 h-9 bg-slate-100 hover:bg-pink-600 hover:text-white text-slate-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
