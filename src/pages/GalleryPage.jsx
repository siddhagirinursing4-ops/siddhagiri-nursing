import { useState, useEffect } from "react";
import { X, Play, Calendar, Video, Image, Sparkles } from "lucide-react";
import api from "../lib/axios";

const categories = ["All", "Campus", "Training", "Events", "Academic"];

export function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [contentVisible, setContentVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Staggered animations
    setTimeout(() => setFiltersVisible(true), 300);
    setTimeout(() => setContentVisible(true), 600);
    
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/gallery');
      setGalleryItems(data.data);
    } catch (error) {
      console.error('Failed to fetch gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = activeFilter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const videos = filteredItems.filter(item => item.type === "video");
  const images = filteredItems.filter(item => item.type === "image");

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero */}
      <div className="relative py-16 md:py-24 bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse" />
        </div>
        
        <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-sm font-semibold mb-5 border border-amber-500/30 animate-fade-in-up animate-delay-300">
            <Sparkles className="h-4 w-4" />
            Visual Journey
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 animate-fade-in-up animate-delay-500">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Gallery</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-5 rounded-full animate-scale-in animate-delay-700" />
          <p className="text-lg text-slate-300 max-w-xl mx-auto animate-fade-in-up animate-delay-900">
            Campus life, events, and student experiences at SNIK
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-6 mt-8 animate-fade-in-up animate-delay-1000">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <Video className="h-4 w-4 text-amber-400 animate-pulse-gentle" />
              <span className="text-white font-bold">{videos.length}</span>
              <span className="text-slate-400 text-sm">Videos</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <Image className="h-4 w-4 text-amber-400 animate-pulse-gentle" />
              <span className="text-white font-bold">{images.length}</span>
              <span className="text-slate-400 text-sm">Photos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm transition-all duration-1000 ease-out ${filtersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((cat, index) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all animate-fade-in-up ${
                  activeFilter === cat
                    ? 'bg-[#0c1829] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className={`container mx-auto px-4 py-10 md:py-14 transition-all duration-1000 ease-out ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="text-center py-20">
            <Image className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No media found</h3>
            <p className="text-gray-500">Gallery is empty. Please import media from Cloudinary.</p>
          </div>
        ) : (
          <>
        {/* Videos Section */}
        {videos.length > 0 && (
          <div className="mb-12 animate-fade-in-up">
            <h2 className="text-xl font-bold text-[#0c1829] mb-6 flex items-center gap-2 animate-slide-in-left">
              <Video className="h-5 w-5 text-amber-500" />
              Videos
            </h2>
            
            <div className="grid grid-cols-12 gap-3 md:gap-4">
              {/* Featured Video - Large */}
              {videos[0] && (
                <div 
                  onClick={() => setSelectedItem(videos[0])}
                  className="col-span-12 lg:col-span-8 h-[280px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer group relative animate-scale-in"
                >
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src={videos[0].file.url} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-amber-500 text-[#0c1829] text-xs font-bold rounded">FEATURED</span>
                  </div>
                  <div className="absolute top-3 right-3 w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                    <Play className="h-4 w-4 text-white" fill="white" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <p className="font-bold text-lg text-white">{videos[0].title || "Untitled"}</p>
                    <span className="text-white/70 text-sm">{videos[0].category}</span>
                  </div>
                </div>
              )}

              {/* Side Videos */}
              <div className="col-span-12 lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
                {videos.slice(1, 3).map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedItem(item)}
                    className="h-[140px] lg:h-[192px] rounded-xl overflow-hidden cursor-pointer group relative animate-fade-in-up"
                    style={{ animationDelay: `${(idx + 1) * 150}ms` }}
                  >
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                      <source src={item.file.url} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all"></div>
                    <div className="absolute top-2 right-2 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="h-3 w-3 text-white" fill="white" />
                    </div>
                    <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-all">
                      <p className="font-medium text-sm">{item.title || "Untitled"}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Video Grid */}
              {videos.slice(3).map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedItem(item)}
                  className="col-span-6 md:col-span-4 lg:col-span-3 h-[160px] md:h-[200px] rounded-xl overflow-hidden cursor-pointer group relative animate-fade-in-up"
                  style={{ animationDelay: `${(idx + 3) * 100}ms` }}
                >
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src={item.file.url} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all"></div>
                  <div className="absolute top-2 right-2 w-7 h-7 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="h-3 w-3 text-white" fill="white" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-all">
                    <p className="font-medium text-sm truncate">{item.title || "Untitled"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Images Section */}
        {images.length > 0 && (
          <div className="animate-fade-in-up animate-delay-300">
            <h2 className="text-xl font-bold text-[#0c1829] mb-6 flex items-center gap-2 animate-slide-in-left">
              <Image className="h-5 w-5 text-amber-500" />
              Photos
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {images.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedItem(item)}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative animate-scale-in"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <img src={item.file.url} alt={item.title || "Untitled"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-all">
                    <p className="font-medium text-sm">{item.title || "Untitled"}</p>
                    <span className="text-white/70 text-xs">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
          </>
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all animate-scale-in"
            onClick={() => setSelectedItem(null)}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="max-w-5xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            {selectedItem.type === "image" ? (
              <img
                src={selectedItem.file.url}
                alt={selectedItem.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
            ) : (
              <video
                src={selectedItem.file.url}
                controls
                autoPlay
                className="w-full max-h-[80vh] rounded-lg"
              />
            )}

            <div className="mt-4 text-center text-white animate-fade-in-up animate-delay-300">
              <h3 className="text-lg font-bold">{selectedItem.title}</h3>
              <span className="text-amber-400 text-sm">{selectedItem.category}</span>
            </div>
          </div>
        </div>
      )}

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
        
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
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
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out both;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
        
        .animate-delay-300 { animation-delay: 300ms; }
        .animate-delay-500 { animation-delay: 500ms; }
        .animate-delay-700 { animation-delay: 700ms; }
        .animate-delay-900 { animation-delay: 900ms; }
        .animate-delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </div>
  );
}

