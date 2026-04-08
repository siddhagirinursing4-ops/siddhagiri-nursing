import { useState, useEffect } from "react";
import axios from "axios";
import { 
  FileText, 
  Calendar, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Phone,
  GraduationCap,
  Users,
  Award,
  Sparkles,
  Star,
  IndianRupee,
  Building2,
  ClipboardList,
  BadgeCheck,
  ExternalLink,
  MapPin,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get icon for admission steps
const getStepIcon = (step) => {
  const icons = {
    1: ClipboardList,
    2: FileText,
    3: BadgeCheck,
    4: ClipboardList,
    5: Users,
    6: CheckCircle
  };
  return icons[step] || ClipboardList;
};

export function AdmissionsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Dynamic data from backend
  const [heroData, setHeroData] = useState({
    title: "Begin Your Nursing Journey",
    subtitle: "Join Siddhagiri Nursing Institute and embark on a rewarding career in healthcare. Admissions through Maharashtra CET Counseling.",
    cetLink: "https://cetcell.mahacet.org"
  });
  const [feeStructure, setFeeStructure] = useState([]);
  const [comparisonColleges, setComparisonColleges] = useState([]);
  const [eligibility, setEligibility] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [admissionSteps, setAdmissionSteps] = useState([]);
  const [importantDates, setImportantDates] = useState([]);

  // Fetch admissions content from backend
  useEffect(() => {
    const fetchAdmissionsContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/admissions`);
        
        if (response.data.success) {
          const data = response.data.data;
          
          // Update state with backend data
          if (data.hero) {
            setHeroData(data.hero);
          }
          if (data.feeStructure && data.feeStructure.length > 0) {
            setFeeStructure(data.feeStructure);
          }
          if (data.comparisonColleges && data.comparisonColleges.length > 0) {
            setComparisonColleges(data.comparisonColleges);
          }
          if (data.eligibility) {
            setEligibility(data.eligibility);
          }
          if (data.documents) {
            setDocuments(data.documents);
          }
          if (data.admissionSteps) {
            setAdmissionSteps(data.admissionSteps);
          }
          if (data.importantDates) {
            setImportantDates(data.importantDates);
          }
        }
      } catch (err) {
        console.error('Error fetching admissions content:', err);
        setError('Failed to load admissions content');
        // Keep default data if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissionsContent();
  }, []);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setContentVisible(true), 400);
    setTimeout(() => setTableVisible(true), 800);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-amber-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading admissions information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1000ms' }} />
        </div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        
        <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6 animate-fade-in-up">
            <Sparkles className="h-4 w-4 animate-pulse-gentle" />
            Admissions 2025-26
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 animate-fade-in-up animate-delay-200">
            {heroData.title.split(' ').slice(0, 2).join(' ')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">{heroData.title.split(' ').slice(2).join(' ')}</span>
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-6 rounded-full animate-scale-in animate-delay-300" />
          
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8 animate-fade-in-up animate-delay-400">
            {heroData.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up animate-delay-500">
            <a 
              href={heroData.cetLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-[#0c1829] rounded-xl font-bold hover:from-amber-400 hover:to-orange-400 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Apply via CET Cell
              <ExternalLink className="h-5 w-5" />
            </a>
            <Link to="/contact">
              <button className="px-8 py-4 bg-transparent text-white rounded-xl font-bold transition-all duration-300 border-2 border-white/30 hover:border-amber-400 hover:text-amber-400 hover:scale-105 flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Fee Structure - SNIK Highlight */}
      <div className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className={`text-center mb-12 transition-all duration-1000 ease-out ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-600 rounded-full text-sm font-semibold mb-4 border border-amber-500/20 animate-fade-in-up">
              <IndianRupee className="h-4 w-4" />
              Fee Structure A.Y. 2025-2026
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0c1829] mb-3 animate-fade-in-up animate-delay-200">
              Approved Fee Structure
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full animate-scale-in animate-delay-300" />
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto animate-fade-in-up animate-delay-400">
              As per Maharashtra Unaided Private Professional Educational Institutions Act, 2015 - शु.नि.प्रा. dated 22.05.2025
            </p>
          </div>

          {/* SNIK Fee Cards - Dynamic from Backend */}
          <div className={`mb-12 space-y-6 transition-all duration-1000 ease-out ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {feeStructure.length > 0 ? (
              feeStructure.map((card, index) => (
                <div key={index} className="bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl animate-fade-in-up" style={{ animationDelay: `${index * 100 + 500}ms` }}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 rounded-full text-amber-400 text-xs font-medium mb-3">
                          <Star className="h-3 w-3" />
                          College Code: {card.code}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{card.name}</h3>
                        <div className="flex items-center gap-2 text-white/60">
                          <MapPin className="h-4 w-4" />
                          <span>{card.location}</span>
                        </div>
                      </div>
                      <div className="text-center md:text-right">
                        <div className="text-sm text-amber-400 mb-1">Annual Fee</div>
                        <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                          ₹{card.annualFee}
                        </div>
                        <div className="text-white/50 text-sm mt-1">Per Year</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
                      <div className="text-center p-4 bg-white/5 rounded-xl">
                        <GraduationCap className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                        <div className="text-white font-bold">{card.course}</div>
                        <div className="text-white/50 text-sm">Course</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-xl">
                        <Clock className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                        <div className="text-white font-bold">{card.duration}</div>
                        <div className="text-white/50 text-sm">Duration</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-xl">
                        <Users className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                        <div className="text-white font-bold">{card.seats} Seats</div>
                        <div className="text-white/50 text-sm">Intake</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-xl">
                        <Award className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                        <div className="text-white font-bold">MUHS</div>
                        <div className="text-white/50 text-sm">Affiliated</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Fallback if no data from backend
              <div className="bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl">
                <p className="text-white text-center">Fee structure information will be updated soon.</p>
              </div>
            )}
          </div>

          {/* Comparison Table - Optional */}
          {comparisonColleges.length > 0 && (
            <div className={`transition-all duration-1000 ease-out ${tableVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-fade-in-up animate-delay-600">
                <div className="p-6 bg-slate-50 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-[#0c1829] flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-amber-500" />
                    Fee Comparison - Maharashtra Nursing Colleges (2025-26)
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#0c1829] to-[#1a365d] text-white">
                        <th className="px-4 py-4 text-left text-sm font-semibold">Sr.</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">College Code</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Name of Institute</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Course</th>
                        <th className="px-4 py-4 text-right text-sm font-semibold">Approved Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonColleges.map((item, index) => {
                        const isOurCollege = item.code === "BSCN09180" && item.name.includes("Siddhagiri");
                        return (
                          <tr 
                            key={`${item.code}-${index}`}
                            className={`border-b border-slate-100 transition-colors ${
                              isOurCollege
                                ? 'bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100' 
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <td className="px-4 py-4 text-sm text-gray-500">{index + 9}</td>
                            <td className="px-4 py-4 text-sm font-mono text-gray-600">{item.code}</td>
                            <td className="px-4 py-4">
                              <span className={`text-sm ${isOurCollege ? 'font-bold text-[#0c1829]' : 'text-gray-700'}`}>
                                {item.name}
                              </span>
                              {isOurCollege && (
                                <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                                  <Star className="h-3 w-3" /> Our College
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-600">{item.course}</td>
                            <td className={`px-4 py-4 text-right text-sm font-bold ${isOurCollege ? 'text-amber-600' : 'text-gray-700'}`}>
                              {item.fee}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <p className="text-xs text-gray-500 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Source: शु.नि.प्रा. (Shu.Ni.Pra.) dated 22.05.2025 | As per u/s. 2(g) of Maharashtra Act, 2015
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Eligibility & Documents */}
      <div className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Eligibility */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fade-in-up">
              <div className="p-6 bg-gradient-to-r from-[#0c1829] to-[#1a365d]">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <BadgeCheck className="h-5 w-5 text-amber-400" />
                  </div>
                  Eligibility Criteria
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {eligibility.length > 0 ? (
                    eligibility.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 group">
                        <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">Eligibility criteria will be updated soon.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fade-in-up animate-delay-200">
              <div className="p-6 bg-gradient-to-r from-[#0c1829] to-[#1a365d]">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <FileText className="h-5 w-5 text-amber-400" />
                  </div>
                  Documents Required
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {documents.length > 0 ? (
                    documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 group">
                        <CheckCircle className="h-4 w-4 text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-gray-700 text-sm">{doc}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4 col-span-2">Document requirements will be updated soon.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Admission Process */}
      <div className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-600 rounded-full text-sm font-semibold mb-4 border border-amber-500/20">
              <ClipboardList className="h-4 w-4" />
              How to Apply
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0c1829] mb-3">Admission Process</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {admissionSteps.length > 0 ? (
              admissionSteps.map((item, index) => {
                const IconComponent = getStepIcon(item.step);
                return (
                  <div 
                    key={item.step} 
                    className="group bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0c1829] to-[#1a365d] rounded-xl flex items-center justify-center text-amber-400 font-black text-lg group-hover:scale-110 transition-transform shadow-lg">
                        {item.step}
                      </div>
                      <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-amber-500" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#0c1829] mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Admission process steps will be updated soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Important Dates */}
      <div className="py-16 md:py-20 bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
        </div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 text-amber-400 rounded-full text-sm font-semibold mb-4 border border-amber-500/30">
              <Calendar className="h-4 w-4" />
              Important Dates
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Admission Timeline</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {importantDates.length > 0 ? (
              importantDates.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:bg-white/10 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Calendar className="h-6 w-6 text-amber-400 mx-auto mb-3" />
                  <div className="text-white font-bold mb-1">{item.date}</div>
                  <div className="text-white/50 text-sm">{item.event}</div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-white/50">Important dates will be updated soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* CTA Section */}
      <div className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-amber-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-fade-in-up">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-sm font-medium mb-4">
                  <Phone className="h-4 w-4" />
                  Need Help?
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[#0c1829] mb-4">
                  Have Questions About Admissions?
                </h3>
                <p className="text-gray-600 mb-6">
                  Our admission counselors are here to guide you through the entire process. 
                  Feel free to reach out for any queries.
                </p>
                <div className="space-y-3">
                  <a href="tel:+919356872628" className="flex items-center gap-3 text-[#0c1829] hover:text-amber-600 transition-colors">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-amber-500" />
                    </div>
                    <span className="font-bold text-lg">+91 9356872628</span>
                  </a>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#0c1829] to-[#1a365d] p-8 md:p-10 flex flex-col justify-center">
                <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
                <div className="space-y-3">
                  <a 
                    href="https://cetcell.mahacet.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/80 hover:text-amber-400 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Maharashtra CET Cell
                  </a>
                  <a 
                    href="https://www.muhs.ac.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/80 hover:text-amber-400 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    MUHS Nashik
                  </a>
                  <Link to="/programs" className="flex items-center gap-3 text-white/80 hover:text-amber-400 transition-colors">
                    <ArrowRight className="h-4 w-4" />
                    View All Programs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out both; }
        .animate-scale-in { animation: scale-in 0.6s ease-out both; }
        .animate-pulse-gentle { animation: pulse-gentle 3s ease-in-out infinite; }
        .animate-delay-200 { animation-delay: 200ms; }
        .animate-delay-300 { animation-delay: 300ms; }
        .animate-delay-400 { animation-delay: 400ms; }
        .animate-delay-500 { animation-delay: 500ms; }
        .animate-delay-600 { animation-delay: 600ms; }
      `}</style>
    </div>
  );
}
