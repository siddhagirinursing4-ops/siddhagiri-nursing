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
      <div className="relative bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse" />
        </div>
        
        <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4 animate-fade-in-up animate-delay-300">
            <Files className="h-4 w-4" />
            Official Documentation Portal
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up animate-delay-500">
            Mandate <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Documents</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-5 rounded-full animate-scale-in animate-delay-700" />
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto animate-fade-in-up animate-delay-900">
            Access all official mandate documents, annexures, and declarations for academic compliance
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up animate-delay-1000">
            <div className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-400 animate-pulse-gentle" />
                <span className="text-white font-semibold text-sm">{mandatesData.length} Academic Years</span>
              </div>
            </div>
            <div className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-400 animate-pulse-gentle" />
                <span className="text-white font-semibold text-sm">{totalDocs}+ Documents</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className={`container mx-auto px-4 -mt-7 relative z-20 transition-all duration-1000 ease-out ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-2 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-gray-700 text-sm"
            />
          </div>
        </div>
      </div>


      {/* Documents Section */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="h-12 w-12 text-amber-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading mandates...</p>
              </div>
            </div>
          ) : (
          <div className="space-y-6">
            {filteredData.map((year, yearIndex) => (
              <div
                key={year.year}
                className={`bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                {/* Year Header */}
                <button
                  onClick={() => toggleYear(year.year)}
                  className="w-full flex justify-between items-center p-5 md:p-6 bg-gradient-to-r from-[#0c1829] via-[#152a45] to-[#1e3a5f] text-white hover:from-[#0f1f33] hover:to-[#1e4175] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-amber-500/15 rounded-xl flex items-center justify-center text-2xl border border-amber-500/30 group-hover:bg-amber-500/25 group-hover:scale-110 transition-all duration-300 animate-pulse-gentle">
                      {year.icon}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-lg md:text-xl font-bold">Academic Year {year.displayYear}</h2>
                        {year.status === "current" && (
                          <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-[#0c1829] text-xs font-bold rounded-full animate-bounce-gentle">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{year.documents.length} documents available</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                    {expandedYears[year.year] ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </button>

                {/* Documents List */}
                {expandedYears[year.year] && (
                  <div className="p-4 md:p-6 grid gap-3 animate-slide-down">
                    {year.documents.map((doc, i) => (
                      <div
                        key={i}
                        className="group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-300 border border-transparent hover:border-amber-200 hover:shadow-md animate-fade-in-up"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#0c1829] to-[#1a365d] rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300">
                            <FileText className="h-5 w-5 text-amber-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-[#0c1829] group-hover:text-[#1a365d] transition text-sm md:text-base">
                              {doc.name}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">{doc.type} document</p>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => openPdfModal(doc.url, doc.name)}
                            className="flex-1 sm:flex-none px-4 py-2.5 bg-gradient-to-r from-[#0c1829] to-[#1a365d] text-white rounded-lg flex items-center justify-center gap-2 hover:from-[#0f1f33] hover:to-[#1e4175] transition-all duration-300 font-medium text-sm hover:scale-105 hover:shadow-lg"
                          >
                            <Eye size={16} />
                            View
                          </button>
                          <a
                            href={doc.url}
                            download
                            className="flex-1 sm:flex-none px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-[#0c1829] rounded-lg flex items-center justify-center gap-2 hover:from-amber-400 hover:to-orange-400 transition-all duration-300 font-semibold text-sm hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
                          >
                            <Download size={16} />
                            Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {filteredData.length === 0 && (
              <div className="text-center py-16 animate-fade-in-up">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
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