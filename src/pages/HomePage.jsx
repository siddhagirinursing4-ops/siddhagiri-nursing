import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  ArrowUpRight,
  GraduationCap, 
  Heart, 
  Stethoscope, 
  Award,
  Users,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  BookOpen,
  Target,
  Sparkles,
  Phone,
  CheckCircle,
  MapPin
} from "lucide-react";
import { CLOUDINARY_URLS, getImageUrl, getVideoUrl } from "../config/cloudinary";
import axios from "axios";

// Icon mapping for programs
const iconMap = {
  "B.Sc Nursing": GraduationCap,
  "GNM": Heart,
  "P.B.B.Sc Nursing": Stethoscope,
  "M.Sc Nursing": Award,
};

// Stats Data
const stats = [
  { value: "500+", label: "Students Trained", icon: Users },
  { value: "13+", label: "Years of Excellence", icon: Award },
  { value: "150", label: "Bedded Hospital", icon: Building2 },
  { value: "4", label: "Nursing Programs", icon: BookOpen },
];

// Features Data
const features = [
  { icon: Award, title: "MUHS Affiliated", desc: "Recognized by Maharashtra University of Health Sciences, Nashik" },
  { icon: Building2, title: "150 Bedded Hospital", desc: "Hands-on clinical training at our multispecialty hospital" },
  { icon: Users, title: "Expert Faculty", desc: "Experienced and qualified nursing faculty" },
  { icon: Target, title: "100% Placement", desc: "Comprehensive placement support for all graduates" },
];

// News Data
const news = [
  {
    date: "15",
    month: "JAN",
    title: "Admissions Open for 2025-26 Academic Year",
    description: "Applications are now being accepted for all nursing programs through Maharashtra CET Cell.",
    image: getImageUrl('2')
  },
  {
    date: "22",
    month: "DEC",
    title: "Annual Day Celebration 2024",
    description: "Students showcased their talents through cultural performances and received awards.",
    image: getImageUrl('5')
  },
  {
    date: "10",
    month: "NOV",
    title: "National Nursing Week Celebrations",
    description: "Week-long activities including health camps, workshops, and awareness programs.",
    image: getImageUrl('6')
  },
];

export function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [programsVisible, setProgramsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch programs from API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        console.log('Fetching programs from API...');
        const response = await axios.get('/api/programmes');
        console.log('API Response:', response);
        console.log('Response data:', response.data);
        
        // Handle both array and object responses
        const programmesData = Array.isArray(response.data) ? response.data : response.data.data || [];
        console.log('Programmes data:', programmesData);
        
        if (programmesData.length === 0) {
          console.log('No programs found, using fallback');
          // Use fallback programs matching the ProgramsPage data
          setPrograms([
            { 
              title: "B.Sc. Nursing", 
              subtitle: "Bachelor of Science in Nursing",
              duration: "4 Years", 
              seats: "60 Seats",
              icon: GraduationCap,
              href: "/programs/bsc-nursing",
              highlights: ["Experienced faculty", "Modern infrastructure", "Clinical training in reputed hospitals"]
            },
            { 
              title: "GNM", 
              subtitle: "General Nursing and Midwifery",
              duration: "3 Years", 
              seats: "60 Seats",
              icon: Heart,
              href: "/programs/gnm",
              highlights: ["Affordable fees", "Shorter duration", "Good job opportunities"]
            },
            { 
              title: "P.B.B.Sc. Nursing", 
              subtitle: "Post Basic B.Sc. Nursing",
              duration: "2 Years", 
              seats: "30 Seats",
              icon: Stethoscope,
              href: "/programs/pbbsc-nursing",
              highlights: ["Upgrade from diploma to degree", "Better career prospects", "Eligible for M.Sc. Nursing"]
            },
            { 
              title: "M.Sc. Nursing", 
              subtitle: "Master of Science in Nursing",
              duration: "2 Years", 
              seats: "20 Seats",
              icon: Award,
              href: "/programs/msc-nursing",
              highlights: ["Specialization in chosen field", "Research and dissertation", "Teaching opportunities"]
            },
          ]);
          setLoading(false);
          return;
        }
        
        const fetchedPrograms = programmesData.map(prog => ({
          title: prog.title,
          subtitle: prog.subtitle || prog.title,
          duration: prog.duration,
          seats: `${prog.seats} Seats`,
          icon: iconMap[prog.title] || GraduationCap,
          href: `/programs/${prog.slug}`,
          highlights: prog.highlights ? prog.highlights.split(',').map(h => h.trim()).slice(0, 3) : []
        }));
        console.log('Mapped programs:', fetchedPrograms);
        setPrograms(fetchedPrograms);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching programs:', error);
        console.log('Using fallback programs');
        // Fallback to default programs matching ProgramsPage data
        setPrograms([
          { 
            title: "B.Sc. Nursing", 
            subtitle: "Bachelor of Science in Nursing",
            duration: "4 Years", 
            seats: "60 Seats",
            icon: GraduationCap,
            href: "/programs/bsc-nursing",
            highlights: ["Experienced faculty", "Modern infrastructure", "Clinical training in reputed hospitals"]
          },
          { 
            title: "GNM", 
            subtitle: "General Nursing and Midwifery",
            duration: "3 Years", 
            seats: "60 Seats",
            icon: Heart,
            href: "/programs/gnm",
            highlights: ["Affordable fees", "Shorter duration", "Good job opportunities"]
          },
          { 
            title: "P.B.B.Sc. Nursing", 
            subtitle: "Post Basic B.Sc. Nursing",
            duration: "2 Years", 
            seats: "30 Seats",
            icon: Stethoscope,
            href: "/programs/pbbsc-nursing",
            highlights: ["Upgrade from diploma to degree", "Better career prospects", "Eligible for M.Sc. Nursing"]
          },
          { 
            title: "M.Sc. Nursing", 
            subtitle: "Master of Science in Nursing",
            duration: "2 Years", 
            seats: "20 Seats",
            icon: Award,
            href: "/programs/msc-nursing",
            highlights: ["Specialization in chosen field", "Research and dissertation", "Teaching opportunities"]
          },
        ]);
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setProgramsVisible(true), 300);
    setTimeout(() => setStatsVisible(true), 600);
    setTimeout(() => setFeaturesVisible(true), 900);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Screen Video */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Video Background - Clear & Visible */}
        <div className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={getVideoUrl('1')} type="video/mp4" />
          </video>
          {/* Lighter overlay - only on left side for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c1829]/60 via-[#0c1829]/30 to-transparent"></div>
          {/* Bottom gradient for smooth transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1829]/70 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 h-full flex items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full mb-6 border border-amber-500/30 animate-fade-in-up">
                <Sparkles className="h-4 w-4 text-amber-400 animate-pulse-gentle" />
                <span className="text-amber-400 text-sm font-medium">Excellence in Nursing Education Since 2011</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 animate-fade-in-up animate-delay-200">
                <span className="text-white/60 text-xl md:text-2xl font-semibold block mb-2">ADMISSIONS 2025-26</span>
                <span className="block">Siddhagiri Nursing</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400">
                  Institute, Kaneri
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl animate-fade-in-up animate-delay-300">
                Join SNIK and become a part of the healthcare revolution. Where compassion meets excellence in nursing education.
              </p>
              
              <div className="flex flex-wrap gap-4 animate-fade-in-up animate-delay-400">
                <Link to="/admissions">
                  <button className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-[#0c1829] rounded-xl font-bold text-lg hover:from-amber-400 hover:to-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30 flex items-center gap-2">
                    <span>Apply Now</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/programs">
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg border-2 border-white/30 hover:border-amber-400 hover:text-amber-400 transition-all duration-300 flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Explore Programs
                  </button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mt-12 animate-fade-in-up animate-delay-500">
                {[
                  { label: "MUHS Affiliated", icon: Award },
                  { label: "Kolhapur, Maharashtra", icon: MapPin },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/60">
                    <item.icon className="h-4 w-4 text-amber-400" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Info Card */}
        <div className="absolute bottom-8 right-8 hidden lg:block animate-fade-in-up animate-delay-700">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">Admissions Open 2025</p>
                <p className="text-white/60 text-sm">Apply via CET Cell</p>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              Join SNIK's nursing programs. Excellence with compassion for a better tomorrow.
            </p>
          </div>
        </div>

        {/* Scroll Indicator - Modern Design */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2">
          <span className="text-white/60 text-xs font-medium tracking-wider">SCROLL</span>
          <div className="w-[2px] h-12 bg-gradient-to-b from-amber-400 to-transparent"></div>
        </div>
      </section>


      {/* Programs Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className={`text-center mb-12 transition-all duration-1000 ease-out ${programsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-600 rounded-full text-sm font-medium mb-4 border border-amber-500/20 animate-fade-in-up">
              <GraduationCap className="h-4 w-4" />
              Our Programs
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0c1829] mb-3 animate-fade-in-up animate-delay-200">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Nursing Path</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full animate-scale-in animate-delay-300"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              // Loading skeleton
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="h-full bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 animate-pulse">
                  <div className="w-14 h-14 bg-slate-200 rounded-xl mb-4"></div>
                  <div className="h-6 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded mb-4"></div>
                  <div className="flex gap-3 mb-4">
                    <div className="h-6 w-20 bg-slate-200 rounded-lg"></div>
                    <div className="h-6 w-20 bg-slate-200 rounded-lg"></div>
                  </div>
                </div>
              ))
            ) : (
              programs.map((program, index) => (
              <Link 
                key={program.title} 
                to={program.href}
                className={`group transition-all duration-700 ease-out ${programsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="h-full bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 hover:shadow-xl hover:shadow-amber-100/50 hover:-translate-y-2 transition-all duration-500">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0c1829] to-[#1a365d] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <program.icon className="h-7 w-7 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0c1829] mb-1 group-hover:text-amber-600 transition-colors">{program.title}</h3>
                  <p className="text-slate-500 text-sm mb-4">{program.subtitle}</p>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs font-medium rounded-lg">{program.duration}</span>
                    <span className="px-2 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg">{program.seats}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {program.highlights.map((h, i) => (
                      <span key={i} className="text-xs text-slate-400">{h}{i < program.highlights.length - 1 ? ' •' : ''}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-amber-500 text-sm font-medium group-hover:text-amber-600">
                    Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))
            )}
          </div>

          <div className="text-center mt-10 animate-fade-in-up animate-delay-500">
            <Link to="/programs">
              <button className="px-8 py-4 bg-gradient-to-r from-[#0c1829] to-[#1a365d] text-white rounded-xl font-bold hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto">
                View All Programs
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - Dark Theme */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4 border border-amber-500/30 animate-fade-in-up">
                <Star className="h-4 w-4" />
                About SNIK
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 animate-fade-in-up animate-delay-200">
                Be Transformative.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Discover Excellence.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 animate-fade-in-up animate-delay-300">
                Siddhagiri Nursing Institute is a premier healthcare education institution, 
                part of Siddhagiri Gurukul Foundation. Affiliated to Maharashtra University 
                of Health Sciences (MUHS), Nashik, we offer comprehensive nursing programs 
                with state-of-the-art facilities and 150-bedded multispecialty hospital.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-amber-400 font-medium hover:text-amber-300 transition-colors group animate-fade-in-up animate-delay-400">
                <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Know More About Us
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 hover:bg-white/10 transition-all duration-500 hover:scale-105 animate-fade-in-up"
                >
                  <stat.icon className="h-8 w-8 text-amber-400 mb-3" />
                  <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className={`text-center mb-12 transition-all duration-1000 ease-out ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-600 rounded-full text-sm font-medium mb-4 border border-amber-500/20 animate-fade-in-up">
              <Target className="h-4 w-4" />
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0c1829] mb-3 animate-fade-in-up animate-delay-200">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">SNIK?</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full animate-scale-in animate-delay-300"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, index) => (
              <div 
                key={index} 
                className={`group p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-amber-100/50 hover:-translate-y-2 transition-all duration-500 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#0c1829] to-[#1a365d] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <item.icon className="h-7 w-7 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-[#0c1829] mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4 border border-amber-500/30">
                <Calendar className="h-4 w-4" />
                Latest Updates
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Happenings at <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">SNIK</span>
              </h2>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-2 text-amber-400 font-medium hover:text-amber-300 transition-colors">
              View All News <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <div key={index} className="group cursor-pointer animate-fade-in-up">
                <div className="relative rounded-2xl overflow-hidden mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white rounded-xl px-3 py-2 text-center shadow-lg">
                    <div className="text-2xl font-black text-[#0c1829]">{item.date}</div>
                    <div className="text-xs font-medium text-amber-600">{item.month}</div>
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-10">
            <button className="w-10 h-10 border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/10 hover:border-amber-500/50 transition-all">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/10 hover:border-amber-500/50 transition-all">
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/50 to-transparent ml-4"></div>
          </div>
        </div>
      </section>


      {/* Life at SNIK - Clean Video-Focused Gallery */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-sm font-semibold mb-3 border border-amber-500/20">
                <Sparkles className="h-4 w-4" />
                Campus Life
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0c1829]">
                Life@ <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">SNIK</span>
              </h2>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0c1829] text-white rounded-lg font-medium hover:bg-[#1e3a5f] transition-all group">
              View Gallery
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Clean Grid - Videos First */}
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            
            {/* Main Featured Video */}
            <div className="col-span-12 lg:col-span-8 h-[300px] md:h-[450px] rounded-2xl overflow-hidden group relative">
              <video 
                autoPlay muted loop playsInline
                className="w-full h-full object-cover"
              >
                <source src={getVideoUrl('1')} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-amber-500 text-[#0c1829] text-xs font-bold rounded-full">FEATURED</span>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="h-4 w-4 text-white" fill="white" />
              </div>
              <div className="absolute bottom-4 left-4">
                <p className="font-bold text-xl text-white">Campus Overview</p>
              </div>
            </div>

            {/* Side Videos Stack */}
            <div className="col-span-12 lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4 h-auto lg:h-[450px]">
              <div className="h-[150px] lg:h-auto rounded-xl overflow-hidden relative">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src={getVideoUrl('3')} type="video/mp4" />
                </video>
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="h-3 w-3 text-white" fill="white" />
                </div>
              </div>
              <div className="h-[150px] lg:h-auto rounded-xl overflow-hidden relative">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src={getVideoUrl('14')} type="video/mp4" />
                </video>
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="h-3 w-3 text-white" fill="white" />
                </div>
              </div>
            </div>

            {/* Video Row - 4 Videos */}
            <div className="col-span-6 md:col-span-3 h-[140px] md:h-[180px] rounded-xl overflow-hidden relative">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src={getVideoUrl('15')} type="video/mp4" />
              </video>
              <div className="absolute top-2 right-2 w-7 h-7 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="h-3 w-3 text-white" fill="white" />
              </div>
            </div>
            <div className="col-span-6 md:col-span-3 h-[140px] md:h-[180px] rounded-xl overflow-hidden relative">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src={getVideoUrl('16')} type="video/mp4" />
              </video>
              <div className="absolute top-2 right-2 w-7 h-7 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="h-3 w-3 text-white" fill="white" />
              </div>
            </div>
            <div className="col-span-6 md:col-span-3 h-[140px] md:h-[180px] rounded-xl overflow-hidden relative">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src={getVideoUrl('17')} type="video/mp4" />
              </video>
              <div className="absolute top-2 right-2 w-7 h-7 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="h-3 w-3 text-white" fill="white" />
              </div>
            </div>
            <div className="col-span-6 md:col-span-3 h-[140px] md:h-[180px] rounded-xl overflow-hidden relative">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src={getVideoUrl('18')} type="video/mp4" />
              </video>
              <div className="absolute top-2 right-2 w-7 h-7 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="h-3 w-3 text-white" fill="white" />
              </div>
            </div>

            {/* Bottom Row - Large Video + Images */}
            <div className="col-span-12 md:col-span-6 h-[200px] md:h-[280px] rounded-xl overflow-hidden relative">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src={getVideoUrl('19')} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute top-3 right-3 w-9 h-9 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="h-4 w-4 text-white" fill="white" />
              </div>
              <div className="absolute bottom-3 left-3">
                <p className="font-semibold text-white">Community Health Camp</p>
              </div>
            </div>
            <div className="col-span-6 md:col-span-3 h-[200px] md:h-[280px] rounded-xl overflow-hidden relative">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src={getVideoUrl('20')} type="video/mp4" />
              </video>
              <div className="absolute top-2 right-2 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="h-3 w-3 text-white" fill="white" />
              </div>
            </div>
            <div className="col-span-6 md:col-span-3 h-[200px] md:h-[280px] rounded-xl overflow-hidden relative">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src={getVideoUrl('22')} type="video/mp4" />
              </video>
              <div className="absolute top-2 right-2 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="h-3 w-3 text-white" fill="white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-5 animate-fade-in-up">
              <Star className="h-4 w-4 animate-bounce-gentle" />
              Start Your Journey
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 animate-fade-in-up animate-delay-200">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Nursing Career?</span>
            </h2>
            <p className="text-white/60 mb-10 max-w-2xl mx-auto text-lg animate-fade-in-up animate-delay-300">
              Take the first step towards a rewarding career in healthcare. 
              Apply now for admissions to our nursing programs.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up animate-delay-400">
              <Link to="/admissions">
                <button className="px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-[#0c1829] rounded-xl font-bold text-lg hover:from-amber-400 hover:to-orange-400 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  Apply Now
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              <a href="tel:02312687553">
                <button className="px-10 py-5 bg-transparent text-white rounded-xl font-bold text-lg transition-all duration-300 border-2 border-white/30 hover:border-amber-400 hover:text-amber-400 hover:scale-105 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  02312687553
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out both;
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
        
        .animate-delay-200 { animation-delay: 200ms; }
        .animate-delay-300 { animation-delay: 300ms; }
        .animate-delay-400 { animation-delay: 400ms; }
        .animate-delay-500 { animation-delay: 500ms; }
        .animate-delay-700 { animation-delay: 700ms; }
      `}</style>
    </div>
  );
}
