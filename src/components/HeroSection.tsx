import React, { useState } from 'react';
import { 
  ArrowRight, Search, Star, Users, CheckCircle2, 
  Award, Sparkles, BookOpen, Calendar, ChevronRight,
  ShieldCheck, Cpu, Code2, Database, Cloud
} from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onOpenEnrollment: (courseOrProgram?: string) => void;
  onSearchCourse: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEnrollment,
  onSearchCourse
}) => {
  const [searchVal, setSearchVal] = useState('');

  const featuredTracks = [
    {
      title: 'Full Stack Web Development',
      badge: 'MERN & Next.js',
      icon: Code2,
      duration: '4 Months',
      tag: 'Most Popular',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      title: 'Artificial Intelligence & ML',
      badge: 'Python & LLMs',
      icon: Sparkles,
      duration: '3.5 Months',
      tag: 'Trending',
      color: 'from-purple-600 to-indigo-800'
    },
    {
      title: 'Embedded Systems & IoT',
      badge: 'ARM & RTOS',
      icon: Cpu,
      duration: '4 Months',
      tag: 'Hardware Labs',
      color: 'from-emerald-600 to-teal-800'
    },
    {
      title: 'Cloud & DevOps Engineering',
      badge: 'AWS & Kubernetes',
      icon: Cloud,
      duration: '3 Months',
      tag: 'High Demand',
      color: 'from-sky-600 to-blue-800'
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearchCourse(searchVal);
      const el = document.getElementById('courses');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBatches = () => {
    const el = document.getElementById('batches');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative bg-white pt-8 pb-16 lg:pb-20 border-b border-gray-100 overflow-hidden">
      
      {/* Background Soft Pale Blue Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f0f8ff] -z-10 rounded-bl-[100px] hidden lg:block opacity-70" />

      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Punchy Headline & Primary CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f8ff] border border-blue-200 text-[#0066cc] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
              <span>Live Practical Training & Placement Support</span>
            </div>

            {/* Concise Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#00061a] leading-[1.15] tracking-tight">
              Master In-Demand Tech Skills With <span className="text-[#0066cc]">Live Industry Projects</span>
            </h1>

            {/* Reduced 50% Body Copy */}
            <p className="text-base sm:text-lg text-[#333333] font-normal leading-relaxed max-w-2xl">
              Job-oriented programs in Full-Stack, AI, Cloud, and Embedded Systems. Learn directly from working engineers with daily lab practice and interview coaching.
            </p>

            {/* Quick Search Course Field */}
            <form onSubmit={handleSearchSubmit} className="flex max-w-lg items-stretch shadow-xs rounded-[10px] overflow-hidden border border-gray-300 focus-within:border-[#0066cc] focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="What skill do you want to learn today?"
                className="w-full bg-white px-4 py-3 text-sm text-[#333] outline-none"
              />
              <button
                type="submit"
                className="bg-[#0066cc] hover:bg-[#00061a] text-white px-6 font-semibold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>

            {/* Dual Pill Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenEnrollment()}
                className="custom-btn"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={scrollToBatches}
                className="custom-btn-outline"
              >
                <Calendar className="w-4 h-4 text-[#0066cc]" />
                <span>View Batch Schedule</span>
              </button>
            </div>

            {/* Trust Highlights Checklist */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 text-xs text-[#333333] font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0066cc]" />
                <span>100% Practical Labs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0066cc]" />
                <span>Industry Mentor 1:1 Support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0066cc]" />
                <span> Certified Credentials</span>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Track Cards Grid */}
          <div className="lg:col-span-5">
            <div className="bg-[#f0f8ff] p-5 sm:p-6 rounded-[20px] border border-blue-100 shadow-sm space-y-4">
              
              <div className="flex items-center justify-between border-b border-blue-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0066cc]" />
                  <span className="font-bold text-sm text-[#00061a]">Trending Career Programs</span>
                </div>
                <span className="text-[11px] bg-white text-[#0066cc] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                  New Batches Open
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuredTracks.map((track, i) => {
                  const Icon = track.icon;
                  return (
                    <div
                      key={i}
                      onClick={() => onOpenEnrollment(track.title)}
                      className="bg-white p-4 rounded-[14px] border border-gray-200/80 hover:border-[#0066cc] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-2 rounded-lg bg-blue-50 text-[#0066cc] group-hover:bg-[#0066cc] group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            {track.tag}
                          </span>
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-[#00061a] group-hover:text-[#0066cc] transition-colors line-clamp-1 mb-1">
                          {track.title}
                        </h3>
                        <p className="text-[11px] text-[#666666] mb-2 font-medium">
                          {track.badge} • {track.duration}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] font-semibold text-[#0066cc]">
                        <span>Enroll Now</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Callout */}
              <div className="bg-white p-3 rounded-[12px] border border-blue-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-[#333]">Upcoming Batch: <strong className="text-[#00061a]">Monday, 10:00 AM</strong></span>
                </div>
                <button
                  onClick={scrollToBatches}
                  className="text-[#0066cc] font-bold hover:underline"
                >
                  View Details
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Metric Key Stats Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-4 rounded-[14px] border border-gray-100 shadow-xs text-center">
            <p className="text-2xl sm:text-3xl font-black text-[#0066cc]">15,000+</p>
            <p className="text-xs text-[#666666] font-medium mt-0.5">Students Trained</p>
          </div>
          <div className="bg-white p-4 rounded-[14px] border border-gray-100 shadow-xs text-center">
            <p className="text-2xl sm:text-3xl font-black text-[#00061a]">100%</p>
            <p className="text-xs text-[#666666] font-medium mt-0.5">Placement Assistance</p>
          </div>
          <div className="bg-white p-4 rounded-[14px] border border-gray-100 shadow-xs text-center">
            <p className="text-2xl sm:text-3xl font-black text-[#0066cc]">50+</p>
            <p className="text-xs text-[#666666] font-medium mt-0.5">Live Industry Projects</p>
          </div>
          <div className="bg-white p-4 rounded-[14px] border border-gray-100 shadow-xs text-center">
            <p className="text-2xl sm:text-3xl font-black text-[#00061a]">4.9 / 5</p>
            <p className="text-xs text-[#666666] font-medium mt-0.5">Student Satisfaction</p>
          </div>
        </div>

      </div>

    </section>
  );
};
