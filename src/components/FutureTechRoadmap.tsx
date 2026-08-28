import React, { useEffect, useState } from 'react';
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

/**
 * A single accent — the same blue as the "Explore Track" button — used
 * everywhere: tabs, corner marks, capstone strip. One consistent signal
 * color rather than a different one per track.
 */
type Accent = { hex: string; soft: string; text: string; ring: string };

const BLUE_ACCENT: Accent = { hex: '#0066cc', soft: 'rgba(0,102,204,0.10)', text: 'text-[#0066cc]', ring: 'ring-[#0066cc]/40' };

const getAccent = (_iconName?: string): Accent => BLUE_ACCENT;

/** Technical-drawing corner brackets — the recurring motif that frames every panel. */
const CornerMarks: React.FC<{ color: string; size?: number }> = ({ color, size = 14 }) => {
  const base = 'absolute w-[14px] h-[14px] border-current pointer-events-none motion-safe:transition-opacity motion-safe:duration-300';
  return (
    <span aria-hidden="true" style={{ color }}>
      <span className={`${base} top-2 left-2 border-t-2 border-l-2`} style={{ width: size, height: size }} />
      <span className={`${base} top-2 right-2 border-t-2 border-r-2`} style={{ width: size, height: size }} />
      <span className={`${base} bottom-2 left-2 border-b-2 border-l-2`} style={{ width: size, height: size }} />
      <span className={`${base} bottom-2 right-2 border-b-2 border-r-2`} style={{ width: size, height: size }} />
    </span>
  );
};

export const FutureTechRoadmap: React.FC<FutureTechRoadmapProps> = ({
  onOpenEnrollment
}) => {
  const roadmaps = FRONTIER_TECH_ROADMAPS_DATA;
  const [activeTrackId, setActiveTrackId] = useState<string>(
    roadmaps.length > 0 ? roadmaps[0].id : ''
  );
  const [settled, setSettled] = useState(true);

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

  const accent = getAccent(currentTrack.iconName);
  const activeIndex = Math.max(roadmaps.findIndex((t) => t.id === activeTrackId), 0);

  // Brief settle animation whenever the selected track changes — a single
  // orchestrated reveal on the blueprint panel, nothing scattered.
  useEffect(() => {
    setSettled(false);
    const id = window.setTimeout(() => setSettled(true), 20);
    return () => window.clearTimeout(id);
  }, [activeTrackId]);

  const selectTrack = (id: string) => setActiveTrackId(id);

  return (
    <section id="tier1-roadmap" className="relative isolate overflow-hidden border-b border-slate-200/90 bg-[#f4f7fb] px-4 py-12 sm:py-16">

      {/* Ultra-subtle engineering background watermark icons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none opacity-[0.04] bg-tech-dots">
        <Code2 className="absolute top-10 left-10 w-32 h-32 text-slate-800" />
        <Cpu className="absolute top-1/2 right-12 w-36 h-36 text-blue-900" />
        <BookOpen className="absolute bottom-8 left-1/4 w-28 h-28 text-slate-800" />
        <Terminal className="absolute top-16 right-1/3 w-32 h-32 text-slate-900" />
        <MousePointer className="absolute bottom-12 right-1/4 w-24 h-24 text-blue-900" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-7 sm:space-y-8">
        {/* Power rail: a compact signal of what the roadmap is built to deliver. */}
        <div className="grid grid-cols-1 gap-2 rounded-2xl border border-slate-200/90 bg-white/80 p-2 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:grid-cols-3">
          <div className="flex items-center gap-2 rounded-xl bg-[#050d24] px-3 py-2.5 text-white shadow-[0_8px_20px_rgba(5,13,36,0.16)]"><BrainCircuit className="h-4 w-4 text-blue-300" /><span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em]">AI systems</span><span className="ml-auto text-[9px] text-blue-200/70">01</span></div>
          <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-slate-950 shadow-sm"><Code2 className="h-4 w-4 text-[#0066cc]" /><span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em]">Production code</span><span className="ml-auto text-[9px] text-slate-400">02</span></div>
          <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-slate-950 shadow-sm"><Cpu className="h-4 w-4 text-[#0066cc]" /><span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em]">Hardware labs</span><span className="ml-auto text-[9px] text-slate-400">03</span></div>
        </div>

        {/* Header — styled like a drawing's title block */}
        <div className="flex flex-col justify-between gap-5 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0066cc] text-[10px] font-mono font-bold uppercase tracking-wider border border-blue-200/70">
              <Compass className="w-3 h-3" />
              <span>Future Technology Matrix</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-400">
                {String(activeIndex + 1).padStart(2, '0')} of {String(roadmaps.length).padStart(2, '0')}
              </span>
            </div>
            <h2 className="font-luxury-title text-2xl font-bold tracking-[-0.04em] text-[#0a0a0f] sm:text-4xl">
              Frontier Tech <span className="text-[#0066cc] italic font-normal">Skill Roadmaps</span>
            </h2>
            <p className="max-w-xl text-sm leading-6 text-slate-600 font-sans">
              Precision architectural blueprints across next-gen computing paradigms.
            </p>
          </div>

          <button
            onClick={() => onOpenEnrollment(currentTrack.title)}
            className="custom-btn h-11 shrink-0 self-start rounded-xl px-5 text-[10px] font-bold uppercase tracking-[0.1em] shadow-[0_12px_26px_rgba(0,102,204,0.2)] transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0066cc] sm:self-auto"
          >
            <span>Explore Track</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Track selector — each button carries its own signature accent and a
            drawing-style index (T-01, T-02…) instead of a decorative marker,
            since the index is the thing that actually maps to the panel below. */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-2"
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))` }}
          role="tablist"
          aria-label="Frontier technology tracks"
        >
          {roadmaps.map((track, idx) => {
            const isSelected = activeTrackId === track.id;
            const trackAccent = getAccent(track.iconName);
            return (
              <button
                key={track.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => selectTrack(track.id)}
                className={`group relative flex cursor-pointer flex-col justify-between gap-2 rounded-2xl border p-3.5 text-left motion-safe:transition-all motion-safe:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'bg-[#050d24] text-white border-transparent shadow-[0_16px_35px_rgba(5,13,36,0.22)] ring-1'
                    : 'bg-white/95 hover:bg-white border-slate-200/90 hover:border-[#0066cc]/50 text-slate-800 shadow-[0_8px_22px_rgba(15,23,42,0.06)] hover:-translate-y-0.5'
                }`}
                style={isSelected ? { boxShadow: `0 0 0 1px ${trackAccent.hex}66, 0 10px 24px -12px ${trackAccent.hex}55` } : undefined}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="p-1.5 rounded-lg"
                    style={{
                      backgroundColor: isSelected ? `${trackAccent.hex}26` : trackAccent.soft,
                      color: isSelected ? trackAccent.hex : trackAccent.hex
                    }}
                  >
                    {renderRoadmapIcon(track.iconName, 'w-4 h-4')}
                  </div>
                  <span
                    className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    T-{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <span className="text-xs font-bold font-sans line-clamp-1">
                  {track.title}
                </span>

                {/* Active-state connector tick, pointing down toward the blueprint panel */}
                {isSelected && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 hidden sm:block"
                    style={{ backgroundColor: trackAccent.hex }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Track Blueprint Panel */}
        <div
          role="tabpanel"
          className={`relative space-y-5 rounded-[1.5rem] border border-slate-200 bg-white/95 p-5 shadow-[0_20px_55px_rgba(15,23,42,0.1)] backdrop-blur-sm motion-safe:transition-all motion-safe:duration-300 sm:p-7 ${
            settled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}
          style={{ borderTop: `2px solid ${accent.hex}` }}
        >
          <CornerMarks color={accent.hex} />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dashed border-slate-200 pb-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[9px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded border"
                  style={{ color: accent.hex, backgroundColor: accent.soft, borderColor: `${accent.hex}40` }}
                >
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
              <p className="text-xs text-slate-500 font-sans max-w-xl">
                {currentTrack.punchline}
              </p>
            </div>

            <a
              href={createWhatsAppDirectQueryLink(`Roadmap Inquiry: ${currentTrack.title}`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50/70 px-3.5 py-2 text-xs font-bold text-[#0066cc] shadow-sm motion-safe:transition-all shrink-0 self-start hover:-translate-y-0.5 hover:bg-blue-50 sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0066cc]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Discuss With Mentor</span>
            </a>
          </div>

          {/* Core Keywords — rendered as signal chips with a connecting tick,
              echoing a schematic's labelled pin-out rather than plain pills. */}
          {currentTrack.coreKeywords && currentTrack.coreKeywords.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                Core Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {currentTrack.coreKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border font-mono text-[11px] font-bold"
                    style={{ color: accent.hex, borderColor: `${accent.hex}33`, backgroundColor: accent.soft }}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: accent.hex }} />
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Skills Matrix — schematic-style panels */}
          {currentTrack.skills && currentTrack.skills.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentTrack.skills.map((col, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-2.5">
                  <div className="flex items-center gap-1.5 border-b border-slate-200/60 pb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.hex }} />
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 font-sans">
                      {col.title}
                    </h4>
                  </div>

                  <ul className="space-y-1.5">
                    {col.tags.map((tag, tagIdx) => (
                      <li key={tagIdx} className="flex items-center gap-1.5 text-xs text-slate-600 font-sans">
                        <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: accent.hex }} />
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Capstone strip — the build spec at the end of the schematic */}
          {currentTrack.capstone && (
            <div className="relative p-3.5 pl-5 rounded-xl bg-[#00061a] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: accent.hex }}
              />
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: accent.hex }}>
                  Capstone Production Build
                </span>
                <p className="text-xs font-bold font-sans text-white">
                  {currentTrack.capstone}
                </p>
              </div>

              <button
                onClick={() => onOpenEnrollment(currentTrack.title)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0066cc] hover:bg-[#0052a3] text-white text-[11px] font-bold uppercase tracking-wider motion-safe:transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#00061a] focus-visible:ring-white"
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