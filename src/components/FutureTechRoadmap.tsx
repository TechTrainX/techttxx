import React, { useState } from 'react';
import { 
  Bot, Sparkles, BrainCircuit, Binary, 
  Cpu, ArrowRight, CheckCircle2, ChevronRight,
  Compass, Terminal, MessageSquare, BookOpen,
  MousePointer, Code2, Rocket, Zap
} from 'lucide-react';
import { createWhatsAppDirectQueryLink } from '../services/whatsappService';
import { FRONTIER_TECH_ROADMAPS_DATA } from '../data';
import { FrontierTechRoadmapTrack } from '../types';

interface FutureTechRoadmapProps {
  onOpenEnrollment: (trackName?: string) => void;
}

/**
 * Helper to dynamically render Lucide icons based on the `iconName` specified in `roadmapData.ts`.
 */
const renderRoadmapIcon = (iconName: string, className: string = 'w-4 h-4') => {
  switch (iconName?.toLowerCase()) {
    case 'bot':
    case 'agent':
    case 'robot':
      return <Bot className={className} />;
    case 'sparkles':
    case 'genai':
    case 'ai':
      return <Sparkles className={className} />;
    case 'brain':
    case 'neural':
    case 'ml':
      return <BrainCircuit className={className} />;
    case 'binary':
    case 'dsa':
    case 'code':
      return <Binary className={className} />;
    case 'cpu':
    case 'hardware':
    case 'iot':
      return <Cpu className={className} />;
    case 'rocket':
      return <Rocket className={className} />;
    default:
      return <Zap className={className} />;
  }
};

export const FutureTechRoadmap: React.FC<FutureTechRoadmapProps> = ({
  onOpenEnrollment
}) => {
  const roadmaps = FRONTIER_TECH_ROADMAPS_DATA;
  const [activeTrackId, setActiveTrackId] = useState<string>(
    roadmaps.length > 0 ? roadmaps[0].id : ''
  );

  const currentTrack: FrontierTechRoadmapTrack = 
    roadmaps.find((t) => t.id === activeTrackId) || roadmaps[0] || {
      id: 'default',
      title: 'Deep-Tech Engineering',
      badge: 'TECH LABS',
      iconName: 'sparkles',
      punchline: 'Industry-grade software and hardware engineering blueprints.',
      coreKeywords: [],
      skills: [],
      capstone: 'Enterprise Deep-Tech Capstone'
    };

  return (
    <section id="tier1-roadmap" className="py-10 sm:py-14 px-4 bg-[#f4f7fb] bg-tech-dots border-b border-slate-200/90 relative overflow-hidden">
      
      {/* Ultra-subtle engineering background watermark icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-[0.035]">
        <Code2 className="absolute top-10 left-10 w-32 h-32 text-slate-800" />
        <Cpu className="absolute top-1/2 right-12 w-36 h-36 text-blue-900" />
        <BookOpen className="absolute bottom-8 left-1/4 w-28 h-28 text-slate-800" />
        <Terminal className="absolute top-16 right-1/3 w-32 h-32 text-slate-900" />
        <MousePointer className="absolute bottom-12 right-1/4 w-24 h-24 text-blue-900" />
      </div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0066cc] text-[10px] font-mono font-bold uppercase tracking-wider border border-blue-200/70">
              <Compass className="w-3 h-3" />
              <span>Future Technology Matrix</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-luxury-title font-bold text-[#0a0a0f] tracking-tight">
              Frontier Tech <span className="text-[#0066cc] italic font-normal">Skill Roadmaps</span>
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              Precision architectural blueprints across next-gen computing paradigms.
            </p>
          </div>

          <button
            onClick={() => onOpenEnrollment(currentTrack.title)}
            className="custom-btn h-[36px] px-4 text-[11px] font-bold uppercase tracking-wider rounded-lg cursor-pointer self-start sm:self-auto shrink-0 shadow-xs"
          >
            <span>Explore Track</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Dynamic Pillar Tabs (Driven directly from roadmapData.ts) */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-${Math.min(roadmaps.length, 5)} gap-2`}>
          {roadmaps.map((track) => {
            const isSelected = activeTrackId === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setActiveTrackId(track.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-[#00061a] text-white border-[#0066cc] shadow-md ring-1 ring-blue-500/30'
                    : 'bg-white/90 hover:bg-white border-slate-200/90 hover:border-blue-200 text-slate-800 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-900/60 text-[#7fffd4]' : 'bg-blue-50 text-[#0066cc]'}`}>
                    {renderRoadmapIcon(track.iconName, isSelected ? 'w-4 h-4 text-[#7fffd4]' : 'w-4 h-4 text-[#0066cc]')}
                  </div>
                  <span className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/10 text-[#38bdf8]' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {track.badge}
                  </span>
                </div>

                <span className="text-xs font-bold font-sans line-clamp-1">
                  {track.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Track Blueprint Card */}
        <div className="bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-xs">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-[#0066cc] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {currentTrack.badge}
                </span>
                <h3 className="text-base sm:text-lg font-bold font-sans text-[#0a0a0f]">
                  {currentTrack.title}
                </h3>
                {currentTrack.estimatedDuration && (
                  <span className="text-[10px] font-mono text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 bg-slate-50">
                    {currentTrack.estimatedDuration}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-sans">
                {currentTrack.punchline}
              </p>
            </div>

            <a
              href={createWhatsAppDirectQueryLink(`Roadmap Inquiry: ${currentTrack.title}`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 text-xs font-bold text-[#0066cc] transition-colors shrink-0 self-start sm:self-auto"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Discuss With Mentor</span>
            </a>
          </div>

          {/* Core Keywords Tags */}
          {currentTrack.coreKeywords && currentTrack.coreKeywords.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                Core Tech Stack:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentTrack.coreKeywords.map((kw, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-0.5 rounded-md bg-blue-50/90 border border-blue-200/60 text-[#0066cc] font-mono text-[11px] font-bold"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Skills Matrix Columns */}
          {currentTrack.skills && currentTrack.skills.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentTrack.skills.map((col, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-2.5">
                  <div className="flex items-center gap-1.5 border-b border-slate-200/50 pb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc]" />
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 font-sans">
                      {col.title}
                    </h4>
                  </div>

                  <ul className="space-y-1.5">
                    {col.tags.map((tag, tagIdx) => (
                      <li key={tagIdx} className="flex items-center gap-1.5 text-xs text-slate-600 font-sans">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Capstone Project Strip */}
          {currentTrack.capstone && (
            <div className="p-3.5 rounded-xl bg-[#00061a] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#7fffd4]">
                  Capstone Production Build
                </span>
                <p className="text-xs font-bold font-sans text-white">
                  {currentTrack.capstone}
                </p>
              </div>

              <button
                onClick={() => onOpenEnrollment(currentTrack.title)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0066cc] hover:bg-[#0052a3] text-white text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                <span>Enroll Now</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
