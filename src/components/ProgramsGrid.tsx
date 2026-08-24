import React, { useState } from 'react';
import { TRAINING_PROGRAMS_DATA } from '../data/programsData';
import { 
  Sun, Briefcase, Building2, BookOpen, Clock, 
  CheckCircle2, ArrowRight, Sparkles, Layers
} from 'lucide-react';

interface ProgramsGridProps {
  onOpenEnrollment: (programName: string) => void;
}

export const ProgramsGrid: React.FC<ProgramsGridProps> = ({ onOpenEnrollment }) => {
  const [selectedProgramId, setSelectedProgramId] = useState(TRAINING_PROGRAMS_DATA[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-4 h-4 text-amber-500" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-[#0066cc]" />;
      case 'Building2': return <Building2 className="w-4 h-4 text-indigo-600" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-emerald-600" />;
      default: return <Layers className="w-4 h-4 text-[#0066cc]" />;
    }
  };

  return (
    <section id="programs" className="py-16 px-4 bg-[#f0f8ff] border-b border-blue-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-white text-[#0066cc] text-xs font-bold uppercase tracking-wider border border-blue-200">
            Internships & Tracks
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00061a]">
            Structured <span className="text-[#0066cc]">Training Formats</span>
          </h2>
          <p className="text-sm text-[#555555]">
            Select the right program for your semester goals, final year project, or fast-track job placement.
          </p>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINING_PROGRAMS_DATA.map((prog) => (
            <div
              key={prog.id}
              className="bg-white p-6 rounded-[20px] border border-blue-100/80 shadow-xs hover:shadow-md hover:border-[#0066cc] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Header Icon + Duration */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-blue-50 group-hover:bg-[#0066cc] group-hover:text-white text-[#0066cc] transition-colors">
                    {getIcon(prog.iconName)}
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#666] bg-slate-50 px-2 py-1 rounded-md border border-gray-100">
                    <Clock className="w-3 h-3 text-[#0066cc]" />
                    <span>{prog.duration}</span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-[#0066cc] uppercase tracking-wider block mb-1">
                    {prog.badgeText}
                  </span>
                  <h3 className="text-base font-bold text-[#00061a] group-hover:text-[#0066cc] transition-colors line-clamp-1">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-[#666] mt-1 line-clamp-2">
                    {prog.subtitle}
                  </p>
                </div>

                {/* Key Benefits (Shortened) */}
                <ul className="space-y-1.5 pt-2 border-t border-gray-100">
                  {prog.keyBenefits?.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="text-xs text-[#444] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Action Button */}
              <div className="pt-5 mt-4 border-t border-gray-100">
                <button
                  onClick={() => onOpenEnrollment(prog.title)}
                  className="custom-btn w-full py-2 text-xs"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
