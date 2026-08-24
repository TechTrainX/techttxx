import React, { useState } from 'react';
import { TRAINING_PROGRAMS_DATA } from '../data/programsData';
import { 
  Sun, Briefcase, Building2, BookOpen, Building, Check, 
  ArrowRight, Sparkles, Clock, Calendar, MessageSquare, Shield,
  Layers, Terminal, Award
} from 'lucide-react';
import { createWhatsAppProgramLink } from '../services/whatsappService';

interface ProgramsGridProps {
  onOpenEnrollment: (programName: string) => void;
}

export const ProgramsGrid: React.FC<ProgramsGridProps> = ({ onOpenEnrollment }) => {
  const [selectedProgramId, setSelectedProgramId] = useState(TRAINING_PROGRAMS_DATA[0].id);

  const activeProgram = TRAINING_PROGRAMS_DATA.find(p => p.id === selectedProgramId) || TRAINING_PROGRAMS_DATA[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-4 h-4 text-amber-400" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-cyan-400" />;
      case 'Building2': return <Building2 className="w-4 h-4 text-indigo-400" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-emerald-400" />;
      default: return <Building className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="programs" className="py-20 px-4 relative bg-[#030712] border-t border-b border-slate-850 cyber-dots-bg">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> Industrial Training Verticals
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Comprehensive <span className="gradient-text-cyan">Training Programs</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Choose the ideal training format aligned with your academic semester, university project submission requirements, or career transition timeline.
          </p>
        </div>

        {/* Program Selection Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {TRAINING_PROGRAMS_DATA.map((prog) => {
            const isSelected = prog.id === selectedProgramId;
            return (
              <button
                key={prog.id}
                onClick={() => setSelectedProgramId(prog.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-slate-950 shadow-lg shadow-cyan-500/25 border border-cyan-400/50 font-black'
                    : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {getIcon(prog.iconName)}
                <span>{prog.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Program Detailed Highlight Card */}
        <div className="glass-card p-6 sm:p-10 rounded-3xl border border-cyan-500/30 relative overflow-hidden bg-slate-900/90 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3 py-1 rounded-lg bg-cyan-950/90 text-cyan-300 text-xs font-black border border-cyan-500/40">
                  {activeProgram.badgeText}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> {activeProgram.duration}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-1.5">
                  {activeProgram.title}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-400 font-semibold">
                  {activeProgram.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeProgram.description}
              </p>

              {/* Target Audience */}
              <div>
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Target Students / Eligibility</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProgram.targetAudience.map((target, idx) => (
                    <span key={idx} className="bg-slate-950 border border-slate-800 text-slate-300 text-xs px-3 py-1 rounded-lg">
                      🎓 {target}
                    </span>
                  ))}
                </div>
              </div>

              {/* Daily Structure */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-cyan-400" /> Daily 5-Hour Practical Hands-on Cadence
                </h4>
                <p className="text-xs text-slate-300">
                  Live instructor code-along sessions, daily lab tasks, pull-request code reviews, and weekly production milestone evaluations.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenEnrollment(activeProgram.title)}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply for {activeProgram.title}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <a
                  href={createWhatsAppProgramLink(activeProgram.title, activeProgram.duration)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-emerald-400 font-bold text-xs border border-emerald-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

            {/* Right Features Box */}
            <div className="lg:col-span-5 bg-slate-950/90 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Program Deliverables & Value</span>
              </h4>

              <ul className="space-y-3 text-xs text-slate-300">
                {activeProgram.keyBenefits.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold mb-1">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>University-Approved Certification</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  All programs include verifiable digital credential IDs, synopsis documents, and GitHub repo portfolios.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

