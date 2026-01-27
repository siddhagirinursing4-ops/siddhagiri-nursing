import { useState, useEffect } from "react";
import { Volume2, Star, Calendar, Megaphone, X } from "lucide-react";
import api from "../lib/axios";

// Default announcements (fallback if API fails or no dynamic content)
const defaultUpdates = [
  { icon: Star, text: "Ranked Among Top 10 Nursing Colleges in India" },
  { icon: Calendar, text: "Entrance Exam Date: July 15, 2026 | Register Today" },
  { icon: Megaphone, text: "Admissions Open for Academic Year 2026-27 | Apply Now!" },
  { icon: Star, text: "100% Placement Record for 2025 Batch" },
];

// Icon mapping for dynamic content
const iconMap = {
  star: Star,
  calendar: Calendar,
  megaphone: Megaphone,
  announcement: Megaphone,
  default: Star
};

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [updates, setUpdates] = useState(defaultUpdates);

  useEffect(() => {
    // Fetch dynamic announcements from API
    const fetchAnnouncements = async () => {
      try {
        const { data } = await api.get('/dynamic-content', {
          params: { section: 'announcement' }
        });
        
        console.log('Fetched announcements:', data); // Debug log
        
        if (data.success && data.data.length > 0) {
          // Transform API data to component format
          const dynamicUpdates = data.data.map(item => {
            // Extract icon name from key or use default
            const iconName = item.key.includes('star') ? 'star' 
              : item.key.includes('calendar') || item.key.includes('exam') || item.key.includes('date') ? 'calendar'
              : item.key.includes('admission') || item.key.includes('announcement') ? 'megaphone'
              : 'default';
            
            return {
              icon: iconMap[iconName],
              text: item.content
            };
          });
          
          console.log('Transformed updates:', dynamicUpdates); // Debug log
          setUpdates(dynamicUpdates);
        } else {
          console.log('No announcements found, using defaults');
        }
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
        // Keep default updates on error
      }
    };

    // Fetch immediately on mount
    fetchAnnouncements();
    
    // Refresh every 30 seconds to get latest updates
    const refreshInterval = setInterval(fetchAnnouncements, 30000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % updates.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, [updates.length]);

  if (!isVisible) return null;

  const currentUpdate = updates[currentIndex];
  const IconComponent = currentUpdate.icon;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 text-white py-1.5 px-2 sm:px-4 text-[10px] sm:text-xs overflow-hidden">
      <div className="container mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 font-semibold tracking-wide uppercase shrink-0">
          <Volume2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-pulse" />
          <span className="hidden xs:inline">Updates</span>
        </div>
        
        <div className="flex-1 flex items-center justify-center overflow-hidden min-w-0">
          <div 
            className={`flex items-center gap-1.5 sm:gap-2 transition-all duration-300 ease-in-out ${
              isAnimating 
                ? "opacity-0 translate-y-2" 
                : "opacity-100 translate-y-0"
            }`}
          >
            <IconComponent className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-yellow-200 shrink-0" />
            <span className="font-medium tracking-wide truncate">{currentUpdate.text}</span>
          </div>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="text-white/70 hover:text-white transition-colors p-1 hover:rotate-90 duration-200 shrink-0"
        >
          <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        </button>
      </div>
    </div>
  );
}
