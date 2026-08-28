import React, { useState } from 'react';
import { RECRUITER_PARTNERS } from '../data/placementsData';
import { PlacementCarousel } from './PlacementCarousel';
import { Building2, Sparkles, CheckCircle2, TrendingUp, Award } from 'lucide-react';

interface PlacementsShowcaseProps {
  onOpenEnrollment?: (courseTitle?: string) => void;
}

export const PlacementsShowcase: React.FC<PlacementsShowcaseProps> = ({
  onOpenEnrollment
}) => {
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);

  // Divide partners into two smooth marquee rows for visual density
  const halfLength = Math.ceil(RECRUITER_PARTNERS.length / 2);
  const row1 = RECRUITER_PARTNERS.slice(0, halfLength);
  const row2 = RECRUITER_PARTNERS.slice(halfLength);

  return (
    <section id="placements" className="py-12 sm:py-16 px-4 bg-[#ffffff] bg-tech-dots border-b border-slate-200/80 relative overflow-hidden">
      
      {/* Background ambient aura */}
      <div className="absolute inset-0 bg-aura-glow pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto space-y-1.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#eef4fb] text-[#0066cc] text-[10px] font-bold uppercase tracking-[0.14em] border border-[#0066cc]/15 shadow-2xs">
            <Award className="w-3 h-3 text-[#0066cc]" />
            <span>Placement Records</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-luxury-title font-bold text-[#0a0a0f] tracking-tight">
            Graduate <span className="text-[#0066cc] italic font-normal">Placements</span>
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Direct hiring drives across 150+ technology firms.
          </p>
        </div>

        {/* 4 Placement Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-50/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/90 text-center shadow-2xs hover:border-[#0066cc] hover:shadow-[0_10px_24px_-16px_rgba(0,102,204,0.4)] hover:-translate-y-0.5 transition-all duration-300">
            <span className="text-[10px] font-bold text-[#0066cc] uppercase tracking-[0.12em] block">Top CTC</span>
            <p className="text-2xl sm:text-3xl font-bold font-luxury-title text-[#0a0a0f] my-0.5">₹7.25 <span className="text-xs font-semibold text-[#0066cc]">LPA</span></p>
            <p className="text-[10px] text-slate-500 font-sans uppercase font-medium">Service &amp; Product</p>
          </div>
          <div className="bg-slate-50/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/90 text-center shadow-2xs hover:border-[#0066cc] hover:shadow-[0_10px_24px_-16px_rgba(0,102,204,0.4)] hover:-translate-y-0.5 transition-all duration-300">
            <span className="text-[10px] font-bold text-[#0066cc] uppercase tracking-[0.12em] block">Average CTC</span>
            <p className="text-2xl sm:text-3xl font-bold font-luxury-title text-[#0066cc] my-0.5">₹7.25 <span className="text-xs font-semibold text-[#0a0a0f]">LPA</span></p>
            <p className="text-[10px] text-slate-500 font-sans uppercase font-medium">Full-Stack &amp; Embedded</p>
          </div>
          <div className="bg-slate-50/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/90 text-center shadow-2xs hover:border-[#0066cc] hover:shadow-[0_10px_24px_-16px_rgba(0,102,204,0.4)] hover:-translate-y-0.5 transition-all duration-300">
            <span className="text-[10px] font-bold text-[#0066cc] uppercase tracking-[0.12em] block">Hiring Network</span>
            <p className="text-2xl sm:text-3xl font-bold font-luxury-title text-[#0a0a0f] my-0.5">15+</p>
            <p className="text-[10px] text-slate-500 font-sans uppercase font-medium">Active Partners</p>
          </div>
          <div className="bg-slate-50/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/90 text-center shadow-2xs hover:border-[#0066cc] hover:shadow-[0_10px_24px_-16px_rgba(0,102,204,0.4)] hover:-translate-y-0.5 transition-all duration-300">
            <span className="text-[10px] font-bold text-[#0066cc] uppercase tracking-[0.12em] block">Support</span>
            <p className="text-2xl sm:text-3xl font-bold font-luxury-title text-[#0066cc] my-0.5">100%</p>
            <p className="text-[10px] text-slate-500 font-sans uppercase font-medium">Interview Pipeline</p>
          </div>
        </div>

        {/* Verified Student Placements Carousel */}
        <PlacementCarousel onOpenEnrollment={onOpenEnrollment} />

        {/* High-End Animated Company Marquee Showcase */}
        <div 
          onMouseEnter={() => setIsMarqueeHovered(true)}
          onMouseLeave={() => setIsMarqueeHovered(false)}
          className="bg-[#f7f9fc] p-6 sm:p-8 rounded-3xl border border-slate-200/90 space-y-5 shadow-sm overflow-hidden relative"
        >
          {/* Header Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#eef4fb] text-[#0066cc] flex items-center justify-center border border-[#0066cc]/15">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0a0a0f] font-sans">
                  Active Hiring Network
                </h3>
                <p className="text-[11px] text-slate-500 font-sans">
                  Weekly placement drives, salary negotiation support &amp; interview pipelines
                </p>
              </div>
            </div>

            <span className="text-[10px] font-bold text-emerald-700 bg-white border border-emerald-200 px-3.5 py-1.5 rounded-full self-start sm:self-center uppercase tracking-wider shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Direct Drive Invitations Active</span>
            </span>
          </div>

          {/* Dual-Row Smooth Infinite Gliding Marquee */}
          <div className="space-y-3 relative overflow-hidden py-1">
            
            {/* Fade Gradients at Edges */}
            <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#f7f9fc] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#f7f9fc] to-transparent z-10 pointer-events-none" />

            {/* Row 1: Left to Right Marquee */}
            <div 
              className={`flex items-center gap-3 whitespace-nowrap overflow-x-hidden ${isMarqueeHovered ? 'opacity-90' : ''}`}
            >
              <div className="flex items-center gap-3 animate-marquee-left shrink-0">
                {[...row1, ...row1, ...row1].map((partner, idx) => (
                  <div
                    key={`r1-${idx}`}
                    className="bg-white border border-slate-200/80 px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold text-[#1f2937] hover:text-[#0066cc] hover:border-[#0066cc] hover:shadow-md transition-all duration-300 font-sans cursor-pointer group shadow-xs shrink-0"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#0066cc]/40 group-hover:bg-[#0066cc] transition-colors" />
                    <span>{partner}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Reverse Scroll Marquee */}
            <div 
              className={`flex items-center gap-3 whitespace-nowrap overflow-x-hidden ${isMarqueeHovered ? 'opacity-90' : ''}`}
            >
              <div className="flex items-center gap-3 animate-marquee-right shrink-0">
                {[...row2, ...row2, ...row2].map((partner, idx) => (
                  <div
                    key={`r2-${idx}`}
                    className="bg-white border border-slate-200/80 px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold text-[#1f2937] hover:text-[#0066cc] hover:border-[#0066cc] hover:shadow-md transition-all duration-300 font-sans cursor-pointer group shadow-xs shrink-0"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500/40 group-hover:bg-emerald-600 transition-colors" />
                    <span>{partner}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Placement Guarantee Strip */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 border-t border-slate-200/60 font-sans">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Unlimited Interview Calls</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Resume &amp; Portfolio Reviews</span>
              </span>
            </div>

            <button
              onClick={() => onOpenEnrollment ? onOpenEnrollment('Placement Assistance Program') : null}
              className="text-[#0066cc] hover:text-[#00061a] font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Download Placement Report PDF</span>
              <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PlacementsShowcase;