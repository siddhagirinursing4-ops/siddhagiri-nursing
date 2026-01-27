import { useState, useEffect } from "react";
import { 
  GraduationCap, 
  Heart,
  Stethoscope,
  Award,
  Clock,
  Users,
  ArrowRight,
  Building,
  Star,
  CheckCircle,
  BookOpen,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../lib/axios";

const iconMap = {
  'graduation-cap': GraduationCap,
  'heart': Heart,
  'stethoscope': Stethoscope,
  'award': Award
};

const features = [
  { icon: Building, title: "Modern Infrastructure", desc: "State-of-the-art simulation labs and facilities" },
  { icon: Users, title: "Expert Faculty", desc: "Experienced and dedicated teaching staff" },
  { icon: Stethoscope, title: "Clinical Training", desc: "Hands-on hospital experience from day one" },
  { icon: Award, title: "100% Placement", desc: "Guaranteed job assistance for all graduates" }
];

export function ProgramsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setCardsVisible(true), 400);
    setTimeout(() => setFeaturesVisible(true), 800);
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await api.get('/programmes');
      setPrograms(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching programmes:', err);
      setError('Failed to load programmes');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse" />
        </div>
        
        <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4 animate-fade-in-up animate-delay-300">
            <GraduationCap className="h-4 w-4" />
            MUHS Affiliated Programs
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up animate-delay-500">
            Our Nursing <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Programs</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-5 rounded-full animate-scale-in animate-delay-700" />
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto animate-fade-in-up animate-delay-900">
            Shape your career in healthcare with our comprehensive nursing programs designed to create skilled and compassionate professionals.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10 animate-fade-in-up animate-delay-1000">
            {[
              { value: programs.length || "4", label: "Programs", icon: BookOpen },
              { value: programs.reduce((sum, p) => sum + (p.seats || 0), 0) || "130+", label: "Total Seats", icon: Users },
              { value: "100%", label: "Placement", icon: Target }
            ].map((stat, i) => (
              <div key={i} className="text-center px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-amber-400" />
                  <span className="text-2xl md:text-3xl font-black text-amber-400">{stat.value}</span>
                </div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Programs Section */}
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Section Header */}
          <div className={`text-center mb-12 transition-all duration-1000 ease-out ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider animate-fade-in-up">Explore</span>
            <h2 className="text-2xl md:text-4xl font-bold text-[#0c1829] mt-2 mb-3 animate-fade-in-up animate-delay-200">Choose Your Program</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full animate-scale-in animate-delay-300" />
            <p className="text-gray-600 max-w-xl mx-auto mt-4 text-sm md:text-base animate-fade-in-up animate-delay-400">
              Click on any program to view complete details including eligibility, admission process, and more.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {loading && (
              <div className="col-span-2 text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading programmes...</p>
              </div>
            )}
            {error && (
              <div className="col-span-2 text-center py-12">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            {!loading && !error && programs.map((program, index) => {
              const IconComponent = iconMap[program.icon] || GraduationCap;
              
              return (
                <Link 
                  key={program._id} 
                  to={`/programs/${program.slug}`}
                  className={`group transition-all duration-700 ease-out ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  <div className="h-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-300/50 hover:-translate-y-2 transition-all duration-500 hover:scale-[1.02]">
                    {/* Card Header */}
                    <div className="p-5 md:p-6 bg-gradient-to-r from-[#0c1829] via-[#152a45] to-[#1e3a5f] relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
                      
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-amber-500/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-amber-500/30 group-hover:scale-110 group-hover:bg-amber-500/25 transition-all duration-300 animate-pulse-gentle">
                          <IconComponent className="h-7 w-7 md:h-8 md:w-8 text-amber-400" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-amber-100 transition-colors">{program.title}</h3>
                          <p className="text-white/50 text-sm">{program.shortDescription}</p>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 md:p-6">
                      <p className="text-gray-600 mb-5 leading-relaxed text-sm md:text-base">{program.fullDescription || program.shortDescription}</p>
                      
                      {/* Stats */}
                      <div className="flex gap-3 mb-5">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0c1829]/5 border border-[#0c1829]/10 hover:bg-[#0c1829]/10 transition-colors">
                          <Users className="h-4 w-4 text-[#0c1829]" />
                          <span className="text-sm font-semibold text-[#0c1829]">{program.seats} Seats</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-colors">
                          <Clock className="h-4 w-4 text-amber-600" />
                          <span className="text-sm font-semibold text-[#0c1829]">{program.duration}</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {program.highlights?.slice(0, 4).map((highlight, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 rounded-full text-xs font-medium text-gray-600 border border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300">
                            <CheckCircle className="h-3 w-3 text-amber-500" />
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-gradient-to-r from-slate-50 to-amber-50 border border-slate-200 group-hover:from-slate-100 group-hover:to-amber-100 group-hover:border-amber-200 transition-all duration-300">
                        <span className="font-semibold text-[#0c1829] text-sm md:text-base">View Details</span>
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white group-hover:translate-x-2 group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300">
                          <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>


      {/* Why Choose Us Section */}
      <div className={`py-12 md:py-16 bg-slate-50 transition-all duration-1000 ease-out ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10 animate-fade-in-up">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Excellence</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0c1829] mt-2 mb-3">Why Choose SNIK?</h2>
            <div className="w-14 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full animate-scale-in animate-delay-200" />
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((item, i) => (
              <div 
                key={i} 
                className="group text-center p-5 md:p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-amber-100/50 hover:-translate-y-1 transition-all duration-500 animate-fade-in-up"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#0c1829] to-[#1a365d] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                  <item.icon className="h-7 w-7 text-amber-400" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-[#0c1829] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 md:py-16 bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
        </div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-5 animate-fade-in-up animate-delay-300">
              <Star className="h-4 w-4 animate-bounce-gentle" />
              Start Your Journey
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 animate-fade-in-up animate-delay-500">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Nursing Career?</span>
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto text-sm md:text-base animate-fade-in-up animate-delay-700">
              Take the first step towards a rewarding career in healthcare. Contact us today for admissions.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up animate-delay-900">
              <Link to="/contact">
                <button className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-[#0c1829] rounded-xl font-bold hover:from-amber-400 hover:to-orange-400 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm md:text-base">
                  Contact Us
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </Link>
              <Link to="/admissions">
                <button className="px-6 md:px-8 py-3 md:py-4 bg-transparent text-white rounded-xl font-bold transition-all duration-300 border-2 border-white/30 hover:border-amber-400 hover:text-amber-400 hover:scale-105 text-sm md:text-base">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>


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
        .animate-delay-900 { animation-delay: 900ms; }
        .animate-delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </div>
  );
}