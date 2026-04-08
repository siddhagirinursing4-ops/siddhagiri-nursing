import { Monitor, Beaker, Library, Dumbbell, Bus, Utensils, Wifi, Shield, TreePine, Music } from "lucide-react";

const facilities = [
  { 
    icon: Monitor, 
    title: "Smart Classrooms", 
    description: "Interactive digital learning with projectors, smart boards, and modern audio-visual equipment in every classroom.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop"
  },
  { 
    icon: Beaker, 
    title: "Science Labs", 
    description: "Well-equipped physics, chemistry, and biology laboratories with modern equipment for hands-on learning.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop"
  },
  { 
    icon: Library, 
    title: "Library", 
    description: "Extensive collection of 50,000+ books, journals, digital resources, and quiet study areas.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop"
  },
  { 
    icon: Dumbbell, 
    title: "Sports Complex", 
    description: "Indoor and outdoor sports facilities including basketball, football, cricket, and swimming pool.",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop"
  },
  { 
    icon: Bus, 
    title: "Transport", 
    description: "GPS-enabled buses covering all major routes with trained drivers and attendants.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop"
  },
  { 
    icon: Utensils, 
    title: "Cafeteria", 
    description: "Hygienic and nutritious meals prepared fresh daily with options for different dietary needs.",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&h=300&fit=crop"
  },
];

const additionalFeatures = [
  { icon: Wifi, title: "High-Speed WiFi", description: "Campus-wide internet connectivity" },
  { icon: Shield, title: "24/7 Security", description: "CCTV surveillance and security personnel" },
  { icon: TreePine, title: "Green Campus", description: "Eco-friendly environment with gardens" },
  { icon: Music, title: "Auditorium", description: "500-seat air-conditioned auditorium" },
];

export function FacilitiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-red-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-orange-500 font-semibold">Infrastructure</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              World-Class Facilities
            </h1>
            <p className="text-lg text-gray-600">
              Our campus is equipped with state-of-the-art facilities to provide 
              students with the best learning environment.
            </p>
          </div>
        </div>
      </section>

      {/* Main Facilities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {facilities.map((facility, index) => (
              <div 
                key={facility.title} 
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <facility.icon className="h-8 w-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{facility.title}</h2>
                  <p className="text-gray-600 text-lg">{facility.description}</p>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-80 object-cover rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Additional Amenities
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to See Our Campus?
          </h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Schedule a campus visit or take a virtual tour to experience our 
            world-class facilities firsthand.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-white text-orange-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Schedule Visit
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              Virtual Tour
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
