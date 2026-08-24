import React, { useState, useEffect } from 'react';
import { 
  Search, X, BookOpen, Cpu, Calendar, ShieldCheck, Briefcase, 
  ArrowRight, Sparkles, MessageSquare, Terminal, ExternalLink 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COURSES_DATA } from '../data/coursesData';
import { HARDWARE_PROJECTS_DATA } from '../data/hardwareProjectsData';
import { createWhatsAppDirectQueryLink } from '../services/whatsappService';

interface QuickSearchCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (courseId: string) => void;
  onSelectHardwareProject: (projectId: string) => void;
  onOpenEnrollment: (courseOrProgram?: string) => void;
  onOpenCertificateVerifier: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const QuickSearchCommandPalette: React.FC<QuickSearchCommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectCourse,
  onSelectHardwareProject,
  onOpenEnrollment,
  onOpenCertificateVerifier,
  onNavigateSection
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredCourses = COURSES_DATA.filter(c => 
    c.title.toLowerCase().includes(normalizedQuery) ||
    c.category.toLowerCase().includes(normalizedQuery) ||
    c.technologies.some(t => t.toLowerCase().includes(normalizedQuery))
  ).slice(0, 4);

  const filteredHardware = HARDWARE_PROJECTS_DATA.filter(p =>
    p.title.toLowerCase().includes(normalizedQuery) ||
    p.category.toLowerCase().includes(normalizedQuery) ||
    p.microcontroller.toLowerCase().includes(normalizedQuery) ||
    p.hardwareComponents.some(c => c.toLowerCase().includes(normalizedQuery))
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search stacks, hardware kits, batches, syllabus..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded-md"
            >
              Clear
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          
          {/* Quick Actions Shortcuts */}
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              ⚡ Quick Actions
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenEnrollment();
                }}
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-white">Enroll Today</p>
                <p className="text-[10px] text-slate-400">Summer '26 Batch</p>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenCertificateVerifier();
                }}
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all cursor-pointer group"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-white">Verify Certificate</p>
                <p className="text-[10px] text-slate-400">Instant Authenticity</p>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigateSection('hardware-projects');
                }}
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all cursor-pointer group"
              >
                <Cpu className="w-4 h-4 text-indigo-400 mb-1 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-white">Hardware Foundry</p>
                <p className="text-[10px] text-slate-400">Arduino & IoT Kits</p>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigateSection('batches');
                }}
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all cursor-pointer group"
              >
                <Calendar className="w-4 h-4 text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-white">Live Batch Radar</p>
                <p className="text-[10px] text-slate-400">Seat Availability</p>
              </button>
            </div>
          </div>

          {/* Software Courses Matches */}
          {filteredCourses.length > 0 && (
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 mb-2 flex items-center justify-between">
                <span>💻 Software & Engineering Tracks ({filteredCourses.length})</span>
                <span className="text-slate-500 text-[9px]">Click to view details</span>
              </p>
              <div className="space-y-1.5">
                {filteredCourses.map(course => (
                  <div
                    key={course.id}
                    onClick={() => {
                      onClose();
                      onSelectCourse(course.id);
                    }}
                    className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between transition-all cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {course.duration} • {course.level} • {course.technologies.slice(0, 3).join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400">₹{course.price.toLocaleString()}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hardware Projects Matches */}
          {filteredHardware.length > 0 && (
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 mb-2 flex items-center justify-between">
                <span>🤖 Hardware & Robotics Projects ({filteredHardware.length})</span>
                <span className="text-slate-500 text-[9px]">Ready Kits & Schematics</span>
              </p>
              <div className="space-y-1.5">
                {filteredHardware.map(project => (
                  <div
                    key={project.id}
                    onClick={() => {
                      onClose();
                      onSelectHardwareProject(project.id);
                    }}
                    className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 flex items-center justify-between transition-all cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {project.title}
                        </h4>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-900 border border-slate-700 text-slate-300">
                          {project.level}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Microcontroller: <strong className="text-slate-300">{project.microcontroller}</strong> • {project.hardwareComponents.slice(0, 2).join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-400">{project.badge || 'Ready Kit'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">ESC</kbd> to exit</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Cmd / Ctrl + K</kbd> anytime</span>
          </div>

          <a
            href={createWhatsAppDirectQueryLink('Admissions Helpline')}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <MessageSquare className="w-3 h-3" />
            <span>Chat with Academic Mentor</span>
          </a>
        </div>

      </div>
    </div>
  );
};
