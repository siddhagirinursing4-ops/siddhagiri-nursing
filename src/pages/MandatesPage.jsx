import { useState, useEffect, useCallback } from "react";
import {
  FileText,
  Download,
  Eye,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  Loader2,
  Calendar,
  Files,
} from "lucide-react";
import api from "../lib/axios";

// PDF Preview Modal Component
function PdfModal({ isOpen, onClose, pdfUrl, pdfName }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#0c1829] to-[#1a365d] text-white">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-amber-400" />
            <h3 className="font-bold truncate max-w-md">{pdfName}</h3>
          </div>
          <div className="flex items-center gap-2">
            <a href={pdfUrl} download className="px-4 py-2 bg-amber-500 text-[#0c1829] rounded-lg flex items-center gap-2 hover:bg-amber-400 transition font-semibold text-sm">
              <Download size={16} />
              Download
            </a>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="relative h-[calc(90vh-72px)]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <Loader2 className="h-12 w-12 text-amber-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading PDF...</p>
              </div>
            </div>
          )}
          <iframe src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`} className="w-full h-full" onLoad={() => setIsLoading(false)} title={pdfName} />
        </div>
      </div>
    </div>
  );
}


export function MandatesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedYears, setExpandedYears] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [pdfModal, setPdfModal] = useState({ isOpen: false, url: "", name: "" });
  const [contentVisible, setContentVisible] = useState(false);
  const [mandatesData, setMandatesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setContentVisible(true), 400);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch academic years
      const { data: yearsData } = await api.get('/mandates/years');
      const years = yearsData.data;
      
      // Fetch all mandates
      const { data: mandatesResponse } = await api.get('/mandates');
      const allMandates = mandatesResponse.data;
      
      // Group mandates by academic year
      const groupedData = years.map((yearData, index) => {
        const yearMandates = allMandates.filter(m => m.academicYear === yearData.academicYear);
        
        // Determine status and icon
        let status = 'previous';
        let icon = '📋';
        let description = 'Mandate documents and records';
        
        if (yearData.isCurrent) {
          status = 'current';
          icon = '🌟';
          description = 'Latest mandate documents for the current academic year';
        } else if (index === 0) {
          status = 'archived';
          icon = '📜';
          description = 'Archived mandate documents and foundation records';
        }
        
        return {
          year: yearData.academicYear,
          displayYear: yearData.academicYear,
          status,
          icon,
          description,
          documents: yearMandates.map(m => ({
            name: m.title,
            type: m.annexureNumber ? 'annexure' : 'main',
            url: m.pdfFile.url,
            annexureNumber: m.annexureNumber
          }))
        };
      });
      
      setMandatesData(groupedData);
      
      // Auto-expand the current year
      const currentYear = years.find(y => y.isCurrent);
      if (currentYear) {
        setExpandedYears({ [currentYear.academicYear]: true });
      } else if (years.length > 0) {
        setExpandedYears({ [years[years.length - 1].academicYear]: true });
      }
      
    } catch (error) {
      console.error('Failed to fetch mandates:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleYear = (year) => {
    setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  const openPdfModal = useCallback((url, name) => {
    setPdfModal({ isOpen: true, url, name });
  }, []);

  const closePdfModal = useCallback(() => {
    setPdfModal({ isOpen: false, url: "", name: "" });
  }, []);

  const filteredData = mandatesData.map((year) => ({
    ...year,
    documents: year.documents.filter((doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((year) => year.documents.length > 0);

  const totalDocs = mandatesData.reduce((acc, year) => acc + year.documents.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 text-amber-400 rounded-full text-xs font-semibold mb-3 border border-amber-500/30">
            <Files className="h-3.5 w-3.5" />
            Official Documents
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Mandate <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Documents</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-3 rounded-full" />
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            Access official mandate documents and annexures
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-400" />
                <span className="text-white font-semibold text-sm">{mandatesData.length} Years</span>
              </div>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-400" />
                <span className="text-white font-semibold text-sm">{totalDocs} Documents</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className={`container mx-auto px-4 -mt-6 relative z-20 transition-all duration-1000 ease-out ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-xl mx-auto">
          <div className="relative bg-white rounded-xl shadow-lg p-1.5 border border-slate-200">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-gray-700 text-sm"
            />
          </div>
        </div>
      </div>


      {/* Documents Section */}
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="h-12 w-12 text-amber-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-600 animate-pulse">Loading mandates...</p>
              </div>
            </div>
          ) : (
          <div className="space-y-4">
            {filteredData.map((year, yearIndex) => (
              <div
                key={year.year}
                className={`bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl hover:border-amber-200 transition-all duration-500 animate-fade-in-up ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: `${yearIndex * 150}ms` }}
              >
                {/* Year Header */}
                <button
                  onClick={() => toggleYear(year.year)}
                  className="w-full flex justify-between items-center p-4 bg-gradient-to-r from-slate-50 via-white to-slate-50 hover:from-amber-50 hover:via-orange-50 hover:to-amber-50 transition-all duration-500 group border-b border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 bg-gradient-to-br from-[#0c1829] to-[#1a365d] rounded-lg flex items-center justify-center text-lg shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-md group-hover:shadow-lg">
                      <span className="text-amber-400 group-hover:scale-110 transition-transform duration-300">{year.icon}</span>
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-400/0 group-hover:from-amber-400/20 group-hover:to-orange-400/20 rounded-lg transition-all duration-500"></div>
                    </div>
                    <div className="text-left min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-sm md:text-base font-bold text-[#0c1829] group-hover:text-amber-600 transition-colors duration-300 truncate">Academic Year {year.displayYear}</h2>
                        {year.status === "current" && (
                          <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-full animate-pulse shadow-sm">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 group-hover:text-slate-600 transition-colors duration-300">{year.documents.length} documents</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-amber-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <div className={`transition-transform duration-500 ${expandedYears[year.year] ? 'rotate-180' : 'rotate-0'}`}>
                      <ChevronDown className="h-4 w-4 text-slate-600 group-hover:text-amber-600" />
                    </div>
                  </div>
                </button>

                {/* Documents List */}
                {expandedYears[year.year] && (
                  <div className="p-4 bg-gradient-to-b from-slate-50/50 to-white animate-slide-down">
                    <div className="grid gap-2">
                      {year.documents.map((doc, i) => (
                        <div
                          key={i}
                          className="group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 bg-white hover:bg-gradient-to-r hover:from-amber-50 hover:via-orange-50 hover:to-amber-50 rounded-lg transition-all duration-500 border border-slate-200 hover:border-amber-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
                          style={{ animationDelay: `${i * 80}ms` }}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="relative w-9 h-9 bg-gradient-to-br from-[#0c1829] to-[#1a365d] rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-md group-hover:shadow-lg">
                              <FileText className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-400/0 group-hover:from-amber-400/30 group-hover:to-orange-400/30 rounded-lg transition-all duration-500"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-[#0c1829] group-hover:text-amber-600 transition-colors duration-300 text-sm truncate">
                                {doc.name}
                              </p>
                              <p className="text-xs text-gray-500 capitalize">{doc.type} • PDF</p>
                            </div>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto shrink-0">
                            <button
                              onClick={() => openPdfModal(doc.url, doc.name)}
                              className="flex-1 sm:flex-none px-3 py-2 bg-gradient-to-r from-[#0c1829] to-[#1a365d] text-white rounded-lg flex items-center justify-center gap-2 hover:from-[#0f1f33] hover:to-[#1e4175] transition-all duration-300 font-medium text-xs hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                            >
                              <Eye size={14} className="group-hover:scale-110 transition-transform" />
                              <span className="hidden sm:inline">View</span>
                            </button>
                            <a
                              href={doc.url}
                              download
                              className="flex-1 sm:flex-none px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg flex items-center justify-center gap-2 hover:from-amber-400 hover:to-orange-400 transition-all duration-300 font-semibold text-xs hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 active:scale-95"
                            >
                              <Download size={14} className="group-hover:scale-110 transition-transform" />
                              <span className="hidden sm:inline">Download</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredData.length === 0 && (
              <div className="text-center py-16 animate-fade-in-up">
                <div className="inline-block p-4 bg-slate-100 rounded-full mb-4 animate-bounce">
                  <FileText className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No documents found</h3>
                <p className="text-gray-500">Try adjusting your search term</p>
              </div>
            )}
          </div>
          )}
        </div>
      </div>

      {/* PDF Modal */}
      <PdfModal isOpen={pdfModal.isOpen} onClose={closePdfModal} pdfUrl={pdfModal.url} pdfName={pdfModal.name} />


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
            max-height: 0;
            transform: translateY(-20px); 
          }
          to { 
            opacity: 1; 
            max-height: 2000px;
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
          animation: slide-down 0.5s ease-out;
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
        .animate-delay-600 { animation-delay: 600ms; }
        .animate-delay-700 { animation-delay: 700ms; }
        .animate-delay-800 { animation-delay: 800ms; }
        .animate-delay-900 { animation-delay: 900ms; }
        .animate-delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </div>
  );
}