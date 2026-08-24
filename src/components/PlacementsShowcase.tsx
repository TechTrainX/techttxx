import React from 'react';
import { RECRUITER_PARTNERS } from '../data/placementsData';
import { PlacementCarousel } from './PlacementCarousel';
import { Building2, TrendingUp, Award, CheckCircle2 } from 'lucide-react';

interface PlacementsShowcaseProps {
  onOpenEnrollment?: (courseTitle?: string) => void;
}

export const PlacementsShowcase: React.FC<PlacementsShowcaseProps> = ({
  onOpenEnrollment
}) => {
  return (
    <section id="placements" className="py-16 px-4 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0066cc] text-xs font-bold uppercase tracking-wider">
            Placement Records
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00061a]">
            Where Our <span className="text-[#0066cc]">Graduates Work</span>
          </h2>
          <p className="text-sm text-[#555555]">
            Direct recruitment partnerships with 150+ leading IT product and service companies.
          </p>
        </div>

        {/* Carousel */}
        <PlacementCarousel onOpenEnrollment={onOpenEnrollment} />

        {/* Recruiter Partners Grid */}
        <div className="bg-[#f0f8ff] p-6 sm:p-8 rounded-[20px] border border-blue-100 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/60 pb-3">
            <h3 className="text-sm sm:text-base font-bold text-[#00061a] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0066cc]" />
              <span>Hiring Partners & Enterprise Network</span>
            </h3>
            <span className="text-xs font-semibold text-emerald-700 bg-white border border-emerald-200 px-3 py-0.5 rounded-full self-start sm:self-center">
              100% Placement Drives Access
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {RECRUITER_PARTNERS.map((partner, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-200/80 p-3 rounded-[12px] flex items-center justify-center text-xs font-semibold text-[#333] hover:text-[#0066cc] hover:border-[#0066cc] hover:shadow-xs transition-all text-center"
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
