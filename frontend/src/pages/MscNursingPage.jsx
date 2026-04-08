import { useState, useEffect } from "react";
import {
  Award,
  Clock,
  Users,
  Calendar,
  Phone,
  FileText,
  Heart,
  ClipboardList,
  ArrowRight,
  ArrowLeft,
  UserCheck,
  BadgeCheck,
  CheckCircle,
  GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../lib/axios";

export function MscNursingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [programme, setProgramme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setContentVisible(true), 300);
    setTimeout(() => setSidebarVisible(true), 600);
    fetchProgramme();
  }, []);

  const fetchProgramme = async () => {
    try {
      const response = await api.get('/programmes/slug/msc-nursing');
      setProgramme(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching programme:', err);
      setError('Failed to load programme details');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading programme details...</p>
        </div>
      </div>
    );
  }

  if (error || !programme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Programme not found'}</p>
          <Link to="/programs" className="text-amber-500 hover:text-amber-600">
            Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  const eligibility = programme.eligibilityDetails || {};
  const admissionProcess = programme.admissionProcess?.steps || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/programs" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8 transition-colors font-medium animate-fade-in-up">
            <ArrowLeft className="h-4 w-4" />
            Back to Programs
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-5 mb-6 animate-fade-in-up animate-delay-200">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-500/15 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-amber-500/30 animate-pulse-gentle">
                <Award className="h-8 w-8 md:h-10 md:w-10 text-amber-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-white">{programme.title}</h1>
                <p className="text-white/60 text-base md:text-lg">{programme.shortDescription}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-8 animate-fade-in-up animate-delay-400">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/15 backdrop-blur-sm rounded-xl border border-amber-500/30 hover:bg-amber-500/25 transition-all">
                <Users className="h-4 w-4 text-amber-400" />
                <span className="text-white font-semibold text-sm">{programme.seats} Seats</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/15 backdrop-blur-sm rounded-xl border border-amber-500/30 hover:bg-amber-500/25 transition-all">
                <Clock className="h-4 w-4 text-amber-400" />
                <span className="text-white font-semibold text-sm">{programme.duration}</span>
              </div>
              {programme.features?.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/15 backdrop-blur-sm rounded-xl border border-amber-500/30 hover:bg-amber-500/25 transition-all">
                  <Award className="h-4 w-4 text-amber-400" />
                  <span className="text-white font-semibold text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Content Section */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className={`lg:col-span-2 space-y-5 transition-all duration-1000 ease-out ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              
              {eligibility.ageLimit && (
                <InfoCard icon={UserCheck} title="Age & Gender" delay={0}>
                  {eligibility.ageLimit}
                </InfoCard>
              )}

              {eligibility.academicRequirements && (
                <InfoCard icon={GraduationCap} title="Educational Qualification" delay={100}>
                  {eligibility.academicRequirements}
                </InfoCard>
              )}

              {eligibility.otherRequirements && (
                <InfoCard icon={BadgeCheck} title="Other Requirements" delay={200}>
                  {eligibility.otherRequirements}
                </InfoCard>
              )}

              {programme.eligibility && (
                <InfoCard icon={Heart} title="Eligibility" delay={300}>
                  {programme.eligibility}
                </InfoCard>
              )}

              {admissionProcess.length > 0 && (
                <InfoCard icon={ClipboardList} title="Admission Process" delay={400}>
                  <div className="space-y-4">
                    {admissionProcess.map((step, i) => (
                      <div key={i} className="flex items-start gap-4 group">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0c1829] to-[#1a365d] flex items-center justify-center text-amber-400 font-bold shrink-0 border border-amber-500/30 group-hover:scale-110 transition-transform text-sm">
                          {i + 1}
                        </div>
                        <div className="pt-1.5">
                          <p className="text-[#0c1829] font-medium text-sm">Step {i + 1}</p>
                          <p className="text-gray-600 text-sm">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </InfoCard>
              )}

              {programme.courseStructure?.overview && (
                <InfoCard icon={FileText} title="Course Structure" delay={500}>
                  <p className="mb-3">{programme.courseStructure.overview}</p>
                  
                  {/* Specializations */}
                  {programme.courseStructure.specializations?.length > 0 && (
                    <div className="mt-4 mb-4">
                      <h4 className="font-semibold mb-3 text-[#0c1829]">Available Specializations:</h4>
                      <div className="space-y-3">
                        {programme.courseStructure.specializations.map((spec, i) => (
                          <div key={i} className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <h5 className="font-bold text-[#0c1829] mb-1">{spec.name}</h5>
                                <p className="text-sm text-gray-600">{spec.description}</p>
                              </div>
                              <div className="shrink-0 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                                {spec.intake} Seats
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {programme.courseStructure.subjects?.length > 0 && (
                    <div className="mt-3">
                      <h4 className="font-semibold mb-2">Key Subjects:</h4>
                      <ul className="space-y-2">
                        {programme.courseStructure.subjects.map((subject, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                            <span>{subject}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </InfoCard>
              )}

              {programme.careerProspects?.overview && (
                <InfoCard icon={Award} title="Career Prospects" delay={600}>
                  <p className="mb-3">{programme.careerProspects.overview}</p>
                  {programme.careerProspects.opportunities?.length > 0 && (
                    <div className="mt-3">
                      <h4 className="font-semibold mb-2">Career Opportunities:</h4>
                      <ul className="space-y-2">
                        {programme.careerProspects.opportunities.map((opp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                            <span>{opp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </InfoCard>
              )}
            </div>

            {/* Sidebar */}
            <div className={`space-y-5 transition-all duration-1000 ease-out ${sidebarVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              
              {programme.admissionProcess?.applicationPeriod && (
                <SideCard icon={Calendar} title="Admission Period" delay={0}>
                  {programme.admissionProcess.applicationPeriod}
                </SideCard>
              )}

              {programme.admissionProcess?.selectionCriteria && (
                <SideCard icon={FileText} title="Selection Criteria" delay={100}>
                  {programme.admissionProcess.selectionCriteria}
                </SideCard>
              )}

              {programme.admissionProcess?.documents?.length > 0 && (
                <SideCard icon={FileText} title="Required Documents" delay={200}>
                  <ul className="space-y-1 text-sm">
                    {programme.admissionProcess.documents.map((doc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500">•</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </SideCard>
              )}

              {programme.fees?.tuitionFee && (
                <SideCard icon={FileText} title="Fees Structure" delay={300}>
                  <div className="space-y-2 text-sm">
                    <p><strong>Tuition Fee:</strong> {programme.fees.tuitionFee}</p>
                    {programme.fees.otherFees && <p><strong>Other Fees:</strong> {programme.fees.otherFees}</p>}
                    {programme.fees.scholarships && <p className="text-amber-600"><strong>Scholarships:</strong> {programme.fees.scholarships}</p>}
                  </div>
                </SideCard>
              )}

              {/* Contact Card */}
              <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-[#0c1829] via-[#1a365d] to-[#0c1829] text-white relative overflow-hidden shadow-xl animate-fade-in-up animate-delay-500">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Phone className="h-5 w-5 text-amber-400 animate-pulse-gentle" />
                    <h3 className="font-bold text-sm">For Admission Call</h3>
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-amber-400 mb-4">02312687553</p>
                  <Link to="/contact">
                    <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-[#0c1829] rounded-xl font-bold hover:from-amber-400 hover:to-orange-400 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25 text-sm">
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </button>
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
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out both; }
        .animate-pulse-gentle { animation: pulse-gentle 3s ease-in-out infinite; }
        .animate-delay-200 { animation-delay: 200ms; }
        .animate-delay-300 { animation-delay: 300ms; }
        .animate-delay-400 { animation-delay: 400ms; }
        .animate-delay-500 { animation-delay: 500ms; }
      `}</style>
    </div>
  );
}

function InfoCard({ icon: Icon, title, children, delay = 0 }) {
  return (
    <div 
      className="p-5 md:p-6 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-500 hover:scale-[1.01] animate-fade-in-up"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0c1829] to-[#1a365d] flex items-center justify-center shadow-lg">
          <Icon className="h-5 w-5 text-amber-400" />
        </div>
        <h2 className="text-lg font-bold text-[#0c1829]">{title}</h2>
      </div>
      <div className="text-gray-700 leading-relaxed text-sm">{children}</div>
    </div>
  );
}

function SideCard({ icon: Icon, title, children, delay = 0 }) {
  return (
    <div 
      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-500 animate-fade-in-up"
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className="h-5 w-5 text-amber-500" />
        <h3 className="font-bold text-[#0c1829] text-sm">{title}</h3>
      </div>
      <div className="text-gray-600 text-sm">{children}</div>
    </div>
  );
}