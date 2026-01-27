import { useEffect, useState } from "react";
import { X } from "lucide-react";
import api from "../lib/axios";

export function BannerPopup() {
  const [open, setOpen] = useState(false);
  const [bannerImage, setBannerImage] = useState("/banner.png");

  useEffect(() => {
    // Fetch banner image from API
    const fetchBanner = async () => {
      try {
        const { data } = await api.get('/dynamic-content', {
          params: { section: 'banner' }
        });
        
        if (data.success && data.data.length > 0) {
          // Get the first active banner with an image
          const banner = data.data.find(item => item.image?.url);
          if (banner) {
            setBannerImage(banner.image.url);
          }
        }
      } catch (error) {
        console.error('Failed to fetch banner:', error);
        // Keep default banner on error
      }
    };

    fetchBanner();
    
    const t = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={() => setOpen(false)}
      />

      {/* Modal Wrapper (NO overflow hidden here) */}
      <div
        className="
          relative z-10
          w-full max-w-[420px]
          rounded-[22px]
          bg-white
          shadow-[0_25px_80px_rgba(0,0,0,0.35)]
          animate-premium
        "
      >
        {/* Close Button - always visible */}
        <button
          onClick={() => setOpen(false)}
          className="
            absolute -top-5 -right-5
            w-11 h-11
            rounded-full
            bg-white
            shadow-xl
            flex items-center justify-center
            hover:scale-110
            transition
            z-50
          "
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-800" />
        </button>

        {/* Inner Frame (handles clipping) */}
        <div className="overflow-hidden rounded-[22px]">
          <div className="p-2 bg-gradient-to-b from-white to-gray-50">
            <img
              src={bannerImage}
              alt="B.Sc Nursing Admission Open"
              className="w-full h-auto rounded-[18px] block"
            />
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes premium {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(40px);
          }
          60% {
            opacity: 1;
            transform: scale(1.02) translateY(-4px);
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }
        .animate-premium {
          animation: premium 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </div>
  );
}
