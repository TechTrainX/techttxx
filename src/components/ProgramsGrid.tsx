import React, { useState } from 'react';
import { TRAINING_PROGRAMS_DATA } from '../data/programsData';
import { TrainingProgram } from '../types';
import { 
  Sun, Briefcase, Building2, BookOpen, Clock, 
  CheckCircle2, ArrowRight, X, FileText, Award, MessageSquare
} from 'lucide-react';
import { createWhatsAppDirectQueryLink } from '../services/whatsappService';

interface ProgramsGridProps {
  onOpenEnrollment: (programName: string) => void;
}

export const ProgramsGrid: React.FC<ProgramsGridProps> = ({ onOpenEnrollment }) => {
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-4 h-4 text-amber-500" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-[#0066cc]" />;
      case 'Building2': return <Building2 className="w-4 h-4 text-indigo-600" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-emerald-600" />;
      default: return <Briefcase className="w-4 h-4 text-[#0066cc]" />;
    }
  };

  return (
    <section id="programs" className="py-12 sm:py-16 px-4 bg-[#f8fafc] bg-tech-dots border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto space-y-1">
          <span className="inline-block px-3 py-0.5 rounded-full bg-white text-[#0066cc] text-[10px] font-bold uppercase tracking-[0.14em] border border-blue-200/80 shadow-2xs">
            Training Formats
          </span>
          <h2 className="text-2xl sm:text-3xl font-luxury-title font-bold text-[#0a0a0f] tracking-tight">
            Structured <span className="text-[#0066cc] italic font-normal">Tracks</span>
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Internships, industrial training, and job-guaranteed tracks.
          </p>
        </div>

        {/* 4 Clean Symmetrical Minimal Program Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRAINING_PROGRAMS_DATA.map((prog) => (
            <div
              key={prog.id}
              className="bg-white/95 backdrop-blur-xs p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#0066cc] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                
                {/* Header Icon + Duration */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-blue-50 group-hover:bg-[#0066cc] group-hover:text-white text-[#0066cc] transition-colors">
                    {getIcon(prog.iconName)}
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                    <Clock className="w-3 h-3 text-[#0066cc]" />
                    <span>{prog.duration}</span>
                  </span>
                </div>

                <div>
                  <span className="text-[9px] font-bold text-[#0066cc] uppercase tracking-[0.14em] block mb-0.5">
                    {prog.badgeText}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0a0a0f] group-hover:text-[#0066cc] transition-colors line-clamp-1 font-sans">
                    {prog.title}
                  </h3>
                </div>

                {/* 2 Key Benefit Items */}
                <ul className="space-y-1.5 pt-2.5 border-t border-slate-100">
                  {prog.keyBenefits?.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-center gap-1.5 font-sans">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Action Buttons with Strict Geometric Symmetry */}
              <div className="pt-3.5 mt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onOpenEnrollment(prog.title)}
                  className="custom-btn flex-1 h-[36px] text-[10px] tracking-[0.08em] justify-center rounded-xl"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setSelectedProgram(prog)}
                  className="custom-btn-outline h-[36px] text-[10px] tracking-[0.08em] px-3 rounded-xl border-slate-200"
                >
                  <FileText className="w-3 h-3 text-[#0066cc]" />
                  <span>Details</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 space-y-4 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#0066cc] tracking-[0.14em] bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {selectedProgram.badgeText} • {selectedProgram.duration}
                </span>
                <h3 className="text-lg font-luxury-title font-bold text-[#0a0a0f] mt-1.5">
                  {selectedProgram.title}
                </h3>
                <p className="text-xs text-[#666] mt-0.5 font-sans">
                  {selectedProgram.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedProgram(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-gray-400 hover:text-gray-700 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-[#f7f9fc] rounded-xl border border-blue-100">
                <h4 className="text-xs font-bold text-[#0a0a0f] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0066cc]" />
                  <span>Key Benefits & Program Deliverables</span>
                </h4>
                <ul className="space-y-1.5">
                  {selectedProgram.keyBenefits?.map((item, idx) => (
                    <li key={idx} className="text-xs text-[#444] flex items-start gap-1.5 font-sans">
                      <CheckCircle2 className="w-3 h-3 text-[#0066cc] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs font-sans">
                <span className="text-[#555]">Target Audience:</span>
                <span className="font-semibold text-[#0a0a0f]">{selectedProgram.targetAudience}</span>
              </div>

              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certificate with QR-code verification, GitHub project review, and internship completion letter provided.</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-gray-100">
              <a
                href={createWhatsAppDirectQueryLink(selectedProgram.title)}
                target="_blank"
                rel="noreferrer"
                className="custom-btn-outline h-[38px] text-[10px] tracking-[0.08em] px-3.5 text-emerald-700 hover:text-emerald-800 border-emerald-300 rounded-xl justify-center"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Counselor</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="custom-btn-outline flex-1 sm:flex-initial h-[38px] text-[10px] tracking-[0.08em] px-4 rounded-xl cursor-pointer justify-center"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedProgram.title;
                    setSelectedProgram(null);
                    onOpenEnrollment(title);
                  }}
                  className="custom-btn flex-1 sm:flex-initial h-[38px] text-[10px] tracking-[0.08em] px-5 rounded-xl cursor-pointer justify-center"
                >
                  Apply for this Track
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
