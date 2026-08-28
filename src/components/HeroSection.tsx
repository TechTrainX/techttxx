import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Calendar, ChevronRight,
  Sparkles, Award, ShieldCheck, CheckCircle2
} from 'lucide-react';

interface HeroSectionProps {
  onOpenEnrollment: (courseOrProgram?: string) => void;
  onOpenConsultation?: () => void;
  onSearchCourse?: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEnrollment,
  onOpenConsultation
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const heroVisuals = [
    {
      id: 'ai-labs',
      title: 'Applied AI & Neural Systems',
      subtitle: 'LLMs, Computer Vision & High-Performance Compute',
      badge: 'ADMISSIONS OPEN',
      stat: '₹12.5 LPA',
      statLabel: 'Top Offer',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85',
      actionTitle: 'Artificial Intelligence & ML'
    },
    {
      id: 'fullstack-dev',
      title: 'Full-Stack Software Foundry',
      subtitle: 'Production React, Node.js & Cloud Deployments',
      badge: 'DAILY LABS',
      stat: '₹8.5 LPA',
      statLabel: 'Avg Package',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85',
      actionTitle: 'Full Stack MERN Stack Development'
    },
    {
      id: 'iot-hardware',
      title: 'Embedded Robotics & IoT Studio',
      subtitle: 'Physical MCUs, RTOS Firmware & Circuit Design',
      badge: 'HARDWARE LABS',
      stat: '50+ Labs',
      statLabel: 'Live Kits',
      imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=85',
      actionTitle: 'Embedded Systems & IoT Engineering'
    },
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps Engineering',
      subtitle: 'Kubernetes, CI/CD Pipelines & Terraform Clusters',
      badge: 'ENTERPRISE',
      stat: '150+',
      statLabel: 'Hiring Partners',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85',
      actionTitle: 'AWS Cloud & DevOps Engineering'
    }
  ];

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroVisuals.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [isHovered, heroVisuals.length]);

  const currentVisual = heroVisuals[activeSlide];

  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBatches = () => {
    const el = document.getElementById('batches');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative bg-lvmh-canvas pt-10 sm:pt-16 pb-14 sm:pb-20 border-b border-gray-200/80 overflow-hidden bg-tech-grid">
      
      {/* 3D Depth Specular Lighting Aura */}
      <div className="absolute inset-0 bg-aura-glow pointer-events-none -z-10" />

      {/* Subtle Technical Coordinates */}
      <div className="absolute top-3 left-6 hidden lg:flex items-center gap-2 text-[10px] font-mono text-gray-400 tracking-widest pointer-events-none uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc]" />
        <span>TECHTRAINX // APPLIED DEEP-TECH FOUNDRY // BATCH 2026-27</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main 2-Column Minimal Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Ultra-Clean Typography with Minimal Words */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Accreditation Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#f0f8ff] border border-blue-200/80 text-[#0066cc] text-[10px] font-bold uppercase tracking-[0.12em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] animate-pulse" />
                <span>Govt. MSME Registered</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[10px] font-bold uppercase tracking-[0.12em]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>100% Placement Support</span>
              </div>
            </div>

            {/* Editorial Title */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-luxury-title text-[#0a0a0f] leading-[1.12] sm:leading-[1.08] tracking-tight">
              Software & Electronics <br className="hidden sm:inline" />
              <span className="text-[#0066cc] italic font-normal">Engineering Foundry</span>
            </h1>

            {/* Minimal Subtext */}
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-md font-sans">
              Practical coding labs, live IoT hardware kits, verified credentials, and direct campus hiring drives.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 pt-1">
              <button
                onClick={() => onOpenEnrollment()}
                className="custom-btn justify-center shadow-md shadow-blue-500/15"
              >
                <span>Admissions Open</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <button
                onClick={() => {
                  const el = document.getElementById('tier1-roadmap');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="custom-btn-outline justify-center border-blue-200 text-[#0066cc] bg-blue-50/50 hover:bg-blue-50"
              >
                <span>AI & Tech Roadmap</span>
              </button>

              {onOpenConsultation && (
                <button
                  onClick={onOpenConsultation}
                  className="custom-btn-outline justify-center hidden sm:inline-flex text-slate-700 hover:text-[#0066cc]"
                >
                  <span>1:1 Diagnostic</span>
                </button>
              )}
            </div>

            {/* Key Outcomes */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-slate-600 font-medium font-sans">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Free Demo Session</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0066cc]" />
                <span>Easy Installments</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#0066cc]" />
                <span>Campus Drives</span>
              </span>
            </div>

          </div>

          {/* Right Column: LVMH-Grade 3D Visual Gallery Showcase */}
          <div className="lg:col-span-6">
            <div 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => setIsHovered(false)}
              onClick={() => onOpenEnrollment(currentVisual.actionTitle)}
              className="relative bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-gray-200 group cursor-pointer aspect-16/11 transition-all duration-500 hover:shadow-blue-500/10 hover:border-[#0066cc]"
            >
              {/* Background Image with Smooth Depth Zoom */}
              <img
                src={currentVisual.imageUrl}
                alt={currentVisual.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />

              {/* Gradient Vignette Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/20" />

              {/* Top Floating Status Tags */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="bg-white/95 backdrop-blur-md text-[#0066cc] text-[10px] font-bold px-3 py-1 rounded-md shadow-md uppercase tracking-wider">
                  {currentVisual.badge}
                </span>

                <div className="bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-md text-right text-white shadow-xl flex items-center gap-2">
                  <p className="text-xs sm:text-sm font-bold font-mono text-[#7fffd4]">
                    {currentVisual.stat}
                  </p>
                  <p className="text-[9px] text-gray-300 uppercase font-sans">
                    {currentVisual.statLabel}
                  </p>
                </div>
              </div>

              {/* Bottom Editorial Content Strip */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white z-10 space-y-1.5">
                <div className="flex items-center gap-2 text-[10px] text-blue-300 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7fffd4] animate-pulse" />
                  <span>Interactive Foundry View</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-luxury-title text-white tracking-tight leading-snug">
                  {currentVisual.title}
                </h3>

                <p className="text-xs text-gray-300 font-sans line-clamp-1">
                  {currentVisual.subtitle}
                </p>

                {/* Bottom Action Indicator & Navigation Dots */}
                <div className="pt-2 flex items-center justify-between border-t border-white/15 text-xs">
                  <span className="text-[#7fffd4] text-[11px] font-bold tracking-wider uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Curriculum & Enroll</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>

                  {/* Indicator Pills */}
                  <div className="flex items-center gap-1.5">
                    {heroVisuals.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSlide(idx);
                        }}
                        className={`h-1.5 rounded-sm transition-all duration-300 ${
                          activeSlide === idx ? 'w-5 bg-[#0066cc]' : 'w-2 bg-white/40 hover:bg-white'
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      {/* 4 Metric Highlights - Translucent Tinted Cards */}
        <div className="mt-10 pt-6 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/90 text-center hover:border-[#0066cc] transition-all shadow-xs">
            <p className="text-2xl sm:text-3xl font-luxury-title font-bold text-[#0066cc]">15,000+</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-sans font-semibold">Graduates</p>
          </div>
          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/90 text-center hover:border-[#0066cc] transition-all shadow-xs">
            <p className="text-2xl sm:text-3xl font-luxury-title font-bold text-[#0a0a0f]">100%</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-sans font-semibold">Placement Drives</p>
          </div>
          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/90 text-center hover:border-[#0066cc] transition-all shadow-xs">
            <p className="text-2xl sm:text-3xl font-luxury-title font-bold text-[#0066cc]">50+</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-sans font-semibold">Hardware Workbenches</p>
          </div>
          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/90 text-center hover:border-[#0066cc] transition-all shadow-xs">
            <p className="text-2xl sm:text-3xl font-luxury-title font-bold text-[#0a0a0f]">150+</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-sans font-semibold">Hiring Partners</p>
          </div>
        </div>

      </div>

    </section>
  );
};
