import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenEnrollment: (courseOrProgram?: string) => void;
  onOpenConsultation?: () => void;
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
      badge: 'Admissions Open',
      stat: '₹7.5 LPA',
      statLabel: 'Top Offer',
      imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=2000&q=90',
      actionTitle: 'Artificial Intelligence & ML'
    },
    {
      id: 'fullstack-dev',
      title: 'Full-Stack Software Foundry',
      badge: 'Daily Labs',
      stat: '₹7.25 LPA',
      statLabel: 'Avg Package',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=2000&q=90',
      actionTitle: 'Full Stack MERN Stack Development'
    },
    {
      id: 'iot-hardware',
      title: 'Embedded Robotics & IoT Studio',
      badge: 'Hardware Labs',
      stat: '10+ Labs',
      statLabel: 'Live Kits',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=90',
      actionTitle: 'Embedded Systems & IoT Engineering'
    },
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps Engineering',
      badge: 'Enterprise',
      stat: '15+',
      statLabel: 'Hiring Partners',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=90',
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

  return (
    <section id="hero" className="relative bg-lvmh-canvas border-b border-gray-200/80 overflow-hidden">

      {/* Full Viewport Elite Hero */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="relative w-full bg-slate-900 overflow-hidden group h-[92vh] min-h-[560px] max-h-[980px]"
      >
        {/* Background Image */}
        <img
          src={currentVisual.imageUrl}
          alt={currentVisual.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
          loading="eager"
        />

        {/* Deep Editorial Overlay */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 sm:from-black/80 via-black/35 to-transparent" />

        {/* Top Bar — refined, hairline divider, hidden on mobile */}
        <div className="absolute top-0 inset-x-0 pt-6 px-6 sm:px-10 hidden lg:flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5 text-[10px] font-mono text-gray-300/90 tracking-[0.25em] uppercase">
            <span className="w-1 h-1 rounded-full bg-[#7fffd4]" />
            <span>TechTrainX — Lucknow</span>
          </div>
          
        </div>

        {/* Stat Pill — quiet luxury, minimal chrome */}
        <div className="absolute top-5 sm:top-7 right-5 sm:right-10 z-10 text-right">
          <p className="text-lg sm:text-2xl font-luxury-title font-semibold text-white leading-none [text-shadow:0_2px_14px_rgba(0,0,0,0.5)]">
            {currentVisual.stat}
          </p>
          <p className="mt-0.5 text-[8px] sm:text-[9px] text-gray-300/80 uppercase tracking-[0.2em] font-sans">
            {currentVisual.statLabel}
          </p>
        </div>

        {/* Center Content — elite editorial typography */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-16 z-10 max-w-xl lg:max-w-3xl">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-8 h-px bg-[#7fffd4]" />
            <span className="text-[#7fffd4] text-[10px] font-semibold uppercase tracking-[0.3em]">
              {currentVisual.badge}
            </span>
          </div>

          <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-[76px] font-luxury-title font-light text-white leading-[1.02] tracking-tight [text-shadow:0_4px_28px_rgba(0,0,0,0.65)]">
            Lucknow's Software
            <br />
            <span className="text-[#7fffd4] italic font-light">& Electronics Foundry</span>
          </h1>

          <p className="hidden sm:block mt-6 text-base text-gray-100/90 font-light leading-relaxed max-w-md font-sans tracking-wide">
            Coding labs, live IoT hardware kits, verified credentials & campus hiring drives.
          </p>

          <div className="flex items-center gap-3 pt-8">
            <button
              onClick={() => onOpenEnrollment(currentVisual.actionTitle)}
              className="custom-btn justify-center shadow-lg shadow-blue-500/30"
            >
              <span>Admissions Open</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="justify-center hidden xs:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md border border-white/25 text-white/90 text-sm font-medium tracking-wide hover:bg-white/10 hover:border-white/40 transition-all"
              >
                <span>1:1 Diagnostic</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Strip — minimal, hairline rule, refined dots */}
        <div
          onClick={() => onOpenEnrollment(currentVisual.actionTitle)}
          className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:px-16 text-white z-10 cursor-pointer"
        >
          <div className="pt-4 flex items-center justify-between border-t border-white/[0.12] text-xs">
            <span className="text-white/70 text-[11px] font-medium tracking-[0.1em] uppercase">
              {currentVisual.title}
            </span>

            <div className="flex items-center gap-2">
              {heroVisuals.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlide(idx);
                  }}
                  className={`h-[3px] rounded-full transition-all duration-500 ${
                    activeSlide === idx ? 'w-7 bg-[#7fffd4]' : 'w-3 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Metric Highlights — quiet, refined cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7 sm:py-9 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="bg-white/90 backdrop-blur-xs p-3.5 sm:p-4 rounded-xl border border-slate-200/90 text-center hover:border-[#0066cc]/60 hover:-translate-y-0.5 transition-all duration-300 shadow-xs">
          <p className="text-xl sm:text-3xl font-luxury-title font-semibold text-[#0066cc]">15+</p>
          <p className="mt-0.5 text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-[0.15em] font-sans font-medium">Graduates</p>
        </div>
        <div className="bg-white/90 backdrop-blur-xs p-3.5 sm:p-4 rounded-xl border border-slate-200/90 text-center hover:border-[#0066cc]/60 hover:-translate-y-0.5 transition-all duration-300 shadow-xs">
          <p className="text-xl sm:text-3xl font-luxury-title font-semibold text-[#0a0a0f]">100%</p>
          <p className="mt-0.5 text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-[0.15em] font-sans font-medium">Placement</p>
        </div>
        <div className="bg-white/90 backdrop-blur-xs p-3.5 sm:p-4 rounded-xl border border-slate-200/90 text-center hover:border-[#0066cc]/60 hover:-translate-y-0.5 transition-all duration-300 shadow-xs">
          <p className="text-xl sm:text-3xl font-luxury-title font-semibold text-[#0066cc]">5+</p>
          <p className="mt-0.5 text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-[0.15em] font-sans font-medium">Workbenches</p>
        </div>
        <div className="bg-white/90 backdrop-blur-xs p-3.5 sm:p-4 rounded-xl border border-slate-200/90 text-center hover:border-[#0066cc]/60 hover:-translate-y-0.5 transition-all duration-300 shadow-xs">
          <p className="text-xl sm:text-3xl font-luxury-title font-semibold text-[#0a0a0f]">12+</p>
          <p className="mt-0.5 text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-[0.15em] font-sans font-medium">Partners</p>
        </div>
      </div>
    </section>
  );
};