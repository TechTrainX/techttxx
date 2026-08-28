import React, { useState } from 'react';
import { TRAINING_PROGRAMS_DATA } from '../data/programsData';
import { TrainingProgram } from '../types';
import { 
  Sun, Briefcase, Building2, BookOpen, Clock, 
  CheckCircle2, ArrowRight, X, FileText, Award, MessageSquare, Terminal, Cpu, Layers
} from 'lucide-react';
import { createWhatsAppDirectQueryLink } from '../services/whatsappService';

interface ProgramsGridProps {
  onOpenEnrollment: (programName: string) => void;
}

export const ProgramsGrid: React.FC<ProgramsGridProps> = ({ onOpenEnrollment }) => {
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-4 h-4 text-[#0066cc]" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-[#0066cc]" />;
      case 'Building2': return <Building2 className="w-4 h-4 text-[#0066cc]" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-[#0066cc]" />;
      default: return <Briefcase className="w-4 h-4 text-[#0066cc]" />;
    }
  };

  return (
    <section id="programs" className="relative isolate overflow-hidden border-b border-slate-200/80 bg-[#050d24] px-4 py-14 text-white sm:py-20 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#050d24]" />
        <div className="absolute -left-40 -top-48 h-[30rem] w-[30rem] rounded-full bg-[#0066cc]/15 blur-3xl" />
        <div className="absolute -right-32 top-[-8rem] h-[25rem] w-[25rem] rounded-[38%] border border-white/10 bg-[#0066cc]/10 shadow-[0_0_100px_rgba(0,102,204,0.18)] rotate-12" />
        <div className="absolute bottom-[-16rem] left-[10%] h-[30rem] w-[70rem] rounded-[50%] border border-white/10 bg-[#0066cc]/[0.06] rotate-[-5deg]" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:52px_52px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl space-y-10 sm:space-y-12">
        
        {/* Strength-led Section Header */}
        <div className="grid items-end gap-7 border-b border-white/10 pb-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-[#0066cc]/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-100 shadow-[0_8px_24px_rgba(0,102,204,0.14)]">
              <Terminal className="h-3.5 w-3.5 text-blue-300" />
              <span>TechTrainX Capability Tracks</span>
            </span>
            <h2 className="font-luxury-title text-3xl font-bold tracking-[-0.05em] text-white sm:text-5xl">
              Learn to <span className="font-normal italic text-blue-300">build what matters.</span>
            </h2>
            <p className="max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Project-led programs for learners who want real technical depth, mentor guidance, and work they can confidently show.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:min-w-[112px]">
              <Cpu className="mx-auto mb-2 h-4 w-4 text-blue-300" />
              <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-white">Hands-on</span>
              <span className="mt-1 block text-[9px] text-slate-400">Build-first</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:min-w-[112px]">
              <Layers className="mx-auto mb-2 h-4 w-4 text-blue-300" />
              <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-white">Structured</span>
              <span className="mt-1 block text-[9px] text-slate-400">Clear path</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:min-w-[112px]">
              <Award className="mx-auto mb-2 h-4 w-4 text-blue-300" />
              <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-white">Career-ready</span>
              <span className="mt-1 block text-[9px] text-slate-400">Show your work</span>
            </div>
          </div>
        </div>

        {/* 4 Clean Symmetrical Minimal Program Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRAINING_PROGRAMS_DATA.map((prog) => (
            <div
              key={prog.id}
              className="group flex flex-col justify-between rounded-[1.35rem] border border-white/10 bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300/70 hover:shadow-[0_26px_60px_rgba(0,102,204,0.2)]"
            >
              <div className="space-y-3">
                
                {/* Header Icon + Duration */}
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-[#0066cc] transition-all group-hover:bg-[#0066cc] group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(0,102,204,0.25)]">
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
                  <h3 className="line-clamp-1 font-sans text-sm font-bold text-slate-950 transition-colors group-hover:text-[#0066cc] sm:text-base">
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
                  className="custom-btn h-10 flex-1 justify-center rounded-xl text-[10px] font-bold tracking-[0.08em] shadow-[0_8px_18px_rgba(0,102,204,0.18)] transition-all hover:-translate-y-0.5"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setSelectedProgram(prog)}
                  className="custom-btn-outline h-10 rounded-xl border-slate-200 px-3 text-[10px] tracking-[0.08em] transition-all hover:-translate-y-0.5 hover:border-[#0066cc]"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050d24]/75 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-h-[90vh] w-full max-w-xl space-y-4 overflow-y-auto rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_28px_90px_rgba(5,13,36,0.35)] sm:p-7">
            
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
