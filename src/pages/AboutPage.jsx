import { useState, useEffect } from "react";
import { 
  CheckCircle, 
  Award, 
  Users, 
  BookOpen, 
  Target, 
  Eye, 
  Heart, 
  Building2, 
  GraduationCap, 
  Stethoscope, 
  Calendar, 
  MapPin,
  Star,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Trophy
} from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../config/cloudinary";

const stats = [
  { icon: Users, value: "500+", label: "Students Trained" },
  { icon: GraduationCap, value: "13+", label: "Years of Excellence" },
  { icon: Building2, value: "150", label: "Bedded Hospital" },
  { icon: Stethoscope, value: "4", label: "Nursing Programs" },
];

const features = [
  { icon: Award, text: "Affiliated to MUHS, Nashik" },
  { icon: Shield, text: "Approved by Indian Nursing Council" },
  { icon: Building2, text: "150 Bedded Multispecialty Hospital" },
  { icon: Users, text: "Experienced Nursing Faculty" },
  { icon: Stethoscope, text: "Modern Nursing Labs" },
  { icon: Heart, text: "Holistic Student Development" },
];

const timeline = [
  { year: "2010", event: "Siddhagiri Hospital & Research Centre established as a 150 bedded multispecialty hospital", icon: Building2 },
  { year: "2011", event: "Siddhagiri Nursing Institute started with A.N.M Nursing program", icon: GraduationCap },
  { year: "2015", event: "B.Sc. Nursing program introduced to expand nursing education", icon: BookOpen },
  { year: "Present", event: "Continuing to provide quality nursing education with multiple programs", icon: Trophy },
];

const experientialPoints = [
  "Develop critical thinking abilities and competencies in practice of professional nursing as envisaged in National Health Policy 2002",
  "Prepare graduates to be exemplary citizens by following code of conduct and professional ethics at all times",
  "Attitude Development and Value Building facilitates grooming of students' personality for special recognition as a member of professional fraternity"
];

const affiliations = [
  { title: "MUHS Affiliated", subtitle: "Maharashtra University of Health Sciences, Nashik", icon: Award },
  { title: "MNC Recognized", subtitle: "Maharashtra Nursing Council", icon: Trophy },
];

export function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [timelineVisible, setTimelineVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setContentVisible(true), 400);
    setTimeout(() => setTimelineVisible(true), 800);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse" />
        </div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        
        <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6 animate-fade-in-up">
            <Sparkles className="h-4 w-4 animate-pulse-gentle" />
            About SNIK
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 animate-fade-in-up animate-delay-200">
            Siddhagiri Nursing <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Institute, Kaneri</span>
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-6 rounded-full animate-scale-in animate-delay-300" />
          
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8 animate-fade-in-up animate-delay-400">
            A health care organization committed to establishing necessary facilities to render 
            quality health care of standards and preparing nursing professionals dedicated to patient care.
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animate-delay-500">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              <Calendar className="h-5 w-5 text-amber-400" />
              <span className="text-white font-medium">Est. 2011</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              <MapPin className="h-5 w-5 text-amber-400" />
              <span className="text-white font-medium">Kaneri, Kolhapur</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              <Award className="h-5 w-5 text-amber-400" />
              <span className="text-white font-medium">MUHS Affiliated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-8 relative z-20 -mt-12">
        <div className="container mx-auto px-4">
          <div className={`bg-white rounded-2xl shadow-2xl shadow-slate-200/50 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 border border-slate-100 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 100 + 600}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#0c1829] to-[#1a365d] rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <stat.icon className="h-7 w-7 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-[#0c1829]">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Image Side */}
            <div className="relative animate-fade-in-up">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={getImageUrl('2')}
                  alt="Siddhagiri Nursing Institute"
                  className="w-full h-[450px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1829]/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-12 h-12 bg-amber-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-amber-500/30">
                      <Building2 className="h-6 w-6 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Part of Siddhagiri Gurukul Foundation</p>
                      <p className="text-white/70 text-sm">Serving since 2011</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#0c1829] to-[#1a365d] text-white p-5 rounded-2xl shadow-xl hidden md:block border border-amber-500/20 animate-fade-in-up animate-delay-300">
                <div className="text-3xl font-black text-amber-400">MUHS</div>
                <div className="text-sm text-white/70">Affiliated University</div>
              </div>
              
              {/* Logo Badge */}
              <div className="absolute -top-8 -left-8 bg-white p-8 rounded-2xl shadow-xl hidden md:block border border-slate-100 animate-fade-in-up animate-delay-200">
                <img src="/logo.png" alt="SNIK Logo" className="h-32 w-auto" />
              </div>
            </div>
            
            {/* Content Side */}
            <div className="animate-fade-in-up animate-delay-200">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-600 rounded-full text-sm font-semibold mb-4 border border-amber-500/20">
                <Star className="h-4 w-4" />
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0c1829] mb-6">
                Excellence in Nursing Education
              </h2>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                Siddhagiri Nursing Institute, Kaneri (SNIK) is part of the prestigious 
                Siddhagiri Gurukul Foundation. The foundation started A.N.M Nursing 
                program in 2011, marking the beginning of quality nursing education in the region.
              </p>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                We have a 150 bedded Siddhagiri Hospital & Research Centre, a multispecialty 
                hospital running since 2010, which provides excellent clinical exposure to 
                our nursing students. The college is affiliated to Maharashtra University 
                of Health Sciences, Nashik.
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div 
                    key={feature.text} 
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all duration-300 group animate-fade-in-up"
                    style={{ animationDelay: `${index * 100 + 400}ms` }}
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-[#0c1829] to-[#1a365d] rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-4 w-4 text-amber-400" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Mission, Vision, Aim Section */}
      <div className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className={`text-center mb-12 transition-all duration-1000 ease-out ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-600 rounded-full text-sm font-semibold mb-4 border border-amber-500/20 animate-fade-in-up">
              <Target className="h-4 w-4" />
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0c1829] mb-3 animate-fade-in-up animate-delay-200">
              Our Purpose & Direction
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full animate-scale-in animate-delay-300" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Aim Card */}
            <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up animate-delay-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0c1829] to-[#1a365d] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Target className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-[#0c1829] mb-4">Our Aim</h3>
              <p className="text-gray-600 leading-relaxed">
                To impart nursing education of high standard so that the students passing out 
                from this institute will be able to render quality nursing care to all clients 
                in hospitals, community, and various settings such as schools, industries etc. 
                with compassion and care.
              </p>
            </div>
            
            {/* Mission Card */}
            <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up animate-delay-400">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0c1829] mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide Accessible, Affordable High Quality Education to diverse students 
                for the development of nurse practitioners at all entries of practice, ensuring 
                every aspiring nurse gets the opportunity to serve humanity.
              </p>
            </div>
            
            {/* Values Card */}
            <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up animate-delay-500">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0c1829] mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Compassion, Excellence, Integrity, and Dedication form the foundation of 
                everything we do. We believe in nurturing not just skilled nurses, but 
                caring individuals who make a difference in patients' lives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className={`text-center mb-12 transition-all duration-1000 ease-out ${timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-600 rounded-full text-sm font-semibold mb-4 border border-amber-500/20 animate-fade-in-up">
              <Clock className="h-4 w-4" />
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0c1829] mb-3 animate-fade-in-up animate-delay-200">
              Milestones & Growth
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full animate-scale-in animate-delay-300" />
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 via-orange-500 to-amber-400 transform md:-translate-x-1/2"></div>
            
            {timeline.map((item, index) => (
              <div 
                key={item.year} 
                className={`relative flex items-center gap-6 mb-8 last:mb-0 animate-fade-in-up ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                style={{ animationDelay: `${index * 150 + 400}ms` }}
              >
                {/* Year Badge */}
                <div className={`hidden md:flex w-1/2 ${index % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
                  <div className="px-5 py-2 bg-gradient-to-r from-[#0c1829] to-[#1a365d] rounded-xl text-amber-400 font-black text-lg shadow-lg">
                    {item.year}
                  </div>
                </div>
                
                {/* Center Icon */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#0c1829] to-[#1a365d] rounded-2xl flex items-center justify-center border-4 border-white shadow-xl z-10">
                  <item.icon className="h-7 w-7 text-amber-400" />
                </div>
                
                {/* Content Card */}
                <div className={`w-full md:w-1/2 ml-24 md:ml-0 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300">
                    <div className="md:hidden px-3 py-1 bg-gradient-to-r from-[#0c1829] to-[#1a365d] rounded-lg text-amber-400 font-bold text-sm inline-block mb-2">
                      {item.year}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experiential Learning Section */}
      <div className="py-16 md:py-24 bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
        </div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 text-amber-400 rounded-full text-sm font-semibold mb-4 border border-amber-500/30">
                <Sparkles className="h-4 w-4" />
                Experiential Learning
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                Out of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Classroom</span>
              </h2>
              <p className="text-white/70 mb-8 text-lg leading-relaxed">
                Attitude Development, Value Building, and Self Development - an 'Add-On Program' 
                is formally and informally inculcated into the students through various curricular 
                & extracurricular activities.
              </p>
              
              <div className="space-y-4">
                {experientialPoints.map((point, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 150 + 300}ms` }}
                  >
                    <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center shrink-0">
                      <CheckCircle className="h-5 w-5 text-amber-400" />
                    </div>
                    <span className="text-white/80 leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in-up animate-delay-300">
              <img
                src={getImageUrl('5')}
                alt="Nursing Lab"
                className="rounded-2xl shadow-xl h-40 md:h-48 w-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <img
                src={getImageUrl('6')}
                alt="Students"
                className="rounded-2xl shadow-xl h-40 md:h-48 w-full object-cover mt-8 hover:scale-105 transition-transform duration-500"
              />
              <img
                src={getImageUrl('7')}
                alt="Clinical Training"
                className="rounded-2xl shadow-xl h-40 md:h-48 w-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <img
                src={getImageUrl('8')}
                alt="Campus"
                className="rounded-2xl shadow-xl h-40 md:h-48 w-full object-cover mt-8 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Affiliations Section */}
      <div className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-amber-50/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-600 rounded-full text-sm font-semibold mb-4 border border-amber-500/20">
              <Award className="h-4 w-4" />
              Affiliations & Approvals
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0c1829] mb-3">Recognized Excellence</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {affiliations.map((item, index) => (
              <div 
                key={item.title} 
                className="group bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 150 + 200}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0c1829] to-[#1a365d] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <item.icon className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="font-bold text-[#0c1829] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-20 bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
        </div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-5 animate-fade-in-up">
              <Star className="h-4 w-4 animate-bounce-gentle" />
              Join Our Family
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 animate-fade-in-up animate-delay-200">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Nursing Journey?</span>
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto animate-fade-in-up animate-delay-300">
              Take the first step towards a rewarding career in healthcare. Contact us today for admissions.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up animate-delay-400">
              <Link to="/programs">
                <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-[#0c1829] rounded-xl font-bold hover:from-amber-400 hover:to-orange-400 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  Explore Programs
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-8 py-4 bg-transparent text-white rounded-xl font-bold transition-all duration-300 border-2 border-white/30 hover:border-amber-400 hover:text-amber-400 hover:scale-105">
                  Contact Us
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
        .animate-delay-600 { animation-delay: 600ms; }
        .animate-delay-700 { animation-delay: 700ms; }
      `}</style>
    </div>
  );
}
