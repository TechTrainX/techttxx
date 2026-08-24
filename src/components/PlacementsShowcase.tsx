import React from 'react';
import { PLACEMENTS_LIST, RECRUITER_PARTNERS } from '../data/placementsData';
import { PlacementCarousel } from './PlacementCarousel';
import { Building2, Award, Quote, Star, Sparkles, TrendingUp, ArrowUpRight } from 'lucide-react';

interface PlacementsShowcaseProps {
  onOpenEnrollment?: (courseTitle?: string) => void;
}

export const PlacementsShowcase: React.FC<PlacementsShowcaseProps> = ({
  onOpenEnrollment
}) => {
  return (
    <section id="placements" className="py-20 px-4 bg-[#050811] relative border-t border-b border-slate-800">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-black uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>PLACEMENTS & CAREER TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Where Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">Interns Work</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Our intensive 5-hour daily hands-on industrial training and project apprenticeships directly bridge the gap between engineering classrooms and high-paying tech careers.
          </p>
        </div>

        {/* High-Impact Interactive Presentation Carousel */}
        <PlacementCarousel onOpenEnrollment={onOpenEnrollment} />

        {/* 120+ Recruiter Partners Grid */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md shadow-2xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Premier Recruitment Partners & Referral Network</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Companies actively hiring our trained full-stack, cloud, AI, and systems engineers
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full self-start sm:self-center">
              100% Placement Drives Access
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {RECRUITER_PARTNERS.map((partner, idx) => (
              <div 
                key={idx} 
                className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-2xl flex items-center justify-center text-xs font-black text-slate-200 hover:text-white hover:bg-slate-850 hover:border-cyan-500/40 transition-all hover:scale-[1.02] shadow-sm"
              >
                <span>{partner}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PlacementsShowcase;
