import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Terminal, Cpu, Layers } from 'lucide-react';

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
    <section id="hero" className="relative overflow-hidden border-b border-slate-200/80 bg-[#f8fafc]">

      {/* Full Viewport Elite Hero */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="group relative h-[92vh] min-h-[600px] max-h-[980px] w-full overflow-hidden bg-[#050d24]"
      >
        {/* Background Image */}
        <img
          src={currentVisual.imageUrl}
          alt={currentVisual.title}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          loading="eager"
        />

        {/* Deep Editorial Overlay */}
        <div className="absolute inset-0 bg-[#050d24]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050d24] via-[#050d24]/70 to-[#050d24]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050d24]/95 sm:from-[#050d24]/85 via-[#050d24]/45 to-transparent" />

        {/* Top Bar — refined, hairline divider, hidden on mobile */}
        <div className="absolute inset-x-0 top-0 z-10 hidden items-center justify-between px-6 pt-6 sm:px-10 lg:flex">
          <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0066cc] shadow-[0_0_10px_rgba(0,102,204,0.9)]" />
            <span>TechTrainX — Lucknow</span>
          </div>
          
        </div>

        {/* Stat Pill — quiet luxury, minimal chrome */}
        <div className="absolute right-5 top-5 z-10 rounded-2xl border border-white/15 bg-[#050d24]/45 px-4 py-3 text-right shadow-[0_16px_40px_rgba(0,0,0,0.2)] backdrop-blur-md sm:right-10 sm:top-7">
          <p className="font-luxury-title text-xl font-semibold leading-none text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.5)] sm:text-3xl">
            {currentVisual.stat}
          </p>
          <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-blue-100/75 sm:text-[9px]">
            {currentVisual.statLabel}
          </p>
        </div>

        {/* Technical Capability Console */}
        <div className="absolute bottom-28 right-6 z-10 hidden w-64 rounded-2xl border border-white/15 bg-[#050d24]/45 p-4 text-white shadow-[0_20px_55px_rgba(0,0,0,0.22)] backdrop-blur-md xl:block">
          <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-blue-200"><Terminal className="h-3.5 w-3.5" />Active track</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#0066cc] shadow-[0_0_10px_rgba(0,102,204,0.9)]" />
          </div>
          <p className="text-sm font-semibold text-white">{currentVisual.title}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.06] p-2.5"><Cpu className="mb-2 h-3.5 w-3.5 text-blue-300" /><span className="block text-[9px] uppercase tracking-[0.12em] text-slate-300">Build</span><span className="mt-1 block font-mono text-[10px] text-white">hands-on</span></div>
            <div className="rounded-xl border border-white/10 bg-white/[0.06] p-2.5"><Layers className="mb-2 h-3.5 w-3.5 text-blue-300" /><span className="block text-[9px] uppercase tracking-[0.12em] text-slate-300">Mode</span><span className="mt-1 block font-mono text-[10px] text-white">lab-led</span></div>
          </div>
        </div>

        {/* Center Content — elite editorial typography */}
        <div className="absolute inset-0 z-10 flex max-w-3xl flex-col justify-center px-6 sm:px-10 lg:px-16">
          <div className="mb-5 flex items-center gap-2.5">
            <span className="h-px w-10 bg-[#0066cc] shadow-[0_0_12px_rgba(0,102,204,0.8)]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-200">
              {currentVisual.badge}
            </span>
          </div>

          <h1 className="font-luxury-title text-4xl font-light leading-[1.02] tracking-[-0.045em] text-white [text-shadow:0_4px_28px_rgba(0,0,0,0.65)] xs:text-5xl sm:text-6xl lg:text-[76px]">
            Lucknow's Software
            <br />
            <span className="font-light italic text-blue-300">& Electronics Foundry</span>
          </h1>

          <p className="mt-6 hidden max-w-lg font-sans text-base font-light leading-relaxed tracking-wide text-slate-100/90 sm:block">
            Coding labs, live IoT hardware kits, verified credentials & campus hiring drives.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-8">
            <button
              onClick={() => onOpenEnrollment(currentVisual.actionTitle)}
              className="custom-btn min-h-11 justify-center rounded-xl bg-[#0066cc] px-5 shadow-[0_14px_32px_rgba(0,102,204,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#0052a3]"
            >
              <span>Admissions Open</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="hidden min-h-11 items-center justify-center gap-1.5 rounded-xl border border-white/25 bg-white/[0.06] px-5 text-sm font-medium tracking-wide text-white/90 shadow-[0_10px_26px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15 xs:inline-flex"
              >
                <span>1:1 Diagnostic</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Strip — minimal, hairline rule, refined dots */}
        <div
          onClick={() => onOpenEnrollment(currentVisual.actionTitle)}
          className="absolute inset-x-0 bottom-0 z-10 cursor-pointer p-5 text-white sm:p-7 lg:px-16"
        >
          <div className="flex items-center justify-between border-t border-white/15 pt-4 text-xs">
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/75">
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
                    activeSlide === idx ? 'w-8 bg-[#0066cc] shadow-[0_0_12px_rgba(0,102,204,0.8)]' : 'w-3 bg-white/30 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Metric Highlights — quiet, refined cards */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-8 sm:grid-cols-4 sm:gap-4 sm:px-6 sm:py-10">
        <div className="group rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 text-center shadow-[0_12px_30px_rgba(15,23,42,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0066cc]/60 hover:shadow-[0_18px_38px_rgba(0,102,204,0.14)] sm:p-4">
          <p className="text-xl sm:text-3xl font-luxury-title font-semibold text-[#0066cc]">15+</p>
          <p className="mt-0.5 text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-[0.15em] font-sans font-medium">Graduates</p>
        </div>
        <div className="group rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 text-center shadow-[0_12px_30px_rgba(15,23,42,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0066cc]/60 hover:shadow-[0_18px_38px_rgba(0,102,204,0.14)] sm:p-4">
          <p className="text-xl sm:text-3xl font-luxury-title font-semibold text-[#0a0a0f]">100%</p>
          <p className="mt-0.5 text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-[0.15em] font-sans font-medium">Placement</p>
        </div>
        <div className="group rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 text-center shadow-[0_12px_30px_rgba(15,23,42,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0066cc]/60 hover:shadow-[0_18px_38px_rgba(0,102,204,0.14)] sm:p-4">
          <p className="text-xl sm:text-3xl font-luxury-title font-semibold text-[#0066cc]">5+</p>
          <p className="mt-0.5 text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-[0.15em] font-sans font-medium">Workbenches</p>
        </div>
        <div className="group rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 text-center shadow-[0_12px_30px_rgba(15,23,42,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0066cc]/60 hover:shadow-[0_18px_38px_rgba(0,102,204,0.14)] sm:p-4">
          <p className="text-xl sm:text-3xl font-luxury-title font-semibold text-[#0a0a0f]">12+</p>
          <p className="mt-0.5 text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-[0.15em] font-sans font-medium">Partners</p>
        </div>
      </div>
    </section>
  );
};