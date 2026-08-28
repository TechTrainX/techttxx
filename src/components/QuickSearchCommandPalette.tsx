import React, { useState, useEffect } from 'react';
import { 
  Search, X, Cpu, Calendar, ShieldCheck, 
  ArrowRight, Sparkles, MessageSquare
} from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#050b1a]/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white border border-slate-200/80 rounded-[26px] shadow-[0_28px_70px_-18px_rgba(7,26,53,0.4)] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brand accent rail */}
        <div className="h-1 w-full bg-gradient-to-r from-[#0066cc] via-[#3b82f6] to-[#0052a3]" />

        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-white">
          <Search className="w-4 h-4 text-[#0066cc] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stacks, hardware kits, batches, syllabus..."
            className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none font-sans"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-[10px] text-slate-500 hover:text-slate-800 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer transition-colors"
            >
              Clear
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4 font-sans">
          
          {/* Quick Actions Shortcuts */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-2">
              Quick Navigation
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenEnrollment();
                }}
                className="p-3 rounded-xl bg-[#f7f9fc] hover:bg-[#eef4fb] border border-slate-200/80 hover:border-[#0066cc]/50 hover:shadow-sm text-left transition-all cursor-pointer group"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0066cc] mb-1 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-[#0a0a0f]">Enroll Today</p>
                <p className="text-[10px] text-slate-500">Upcoming Batch</p>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenCertificateVerifier();
                }}
                className="p-3 rounded-xl bg-[#f7f9fc] hover:bg-emerald-50/60 border border-slate-200/80 hover:border-emerald-300 hover:shadow-sm text-left transition-all cursor-pointer group"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-[#0a0a0f]">Verify Certificate</p>
                <p className="text-[10px] text-slate-500">Instant Check</p>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigateSection('hardware-projects');
                }}
                className="p-3 rounded-xl bg-[#f7f9fc] hover:bg-[#eef4fb] border border-slate-200/80 hover:border-[#0066cc]/50 hover:shadow-sm text-left transition-all cursor-pointer group"
              >
                <Cpu className="w-3.5 h-3.5 text-[#0066cc] mb-1 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-[#0a0a0f]">Hardware Kits</p>
                <p className="text-[10px] text-slate-500">Arduino &amp; IoT</p>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigateSection('batches');
                }}
                className="p-3 rounded-xl bg-[#f7f9fc] hover:bg-[#eef4fb] border border-slate-200/80 hover:border-[#0066cc]/50 hover:shadow-sm text-left transition-all cursor-pointer group"
              >
                <Calendar className="w-3.5 h-3.5 text-[#0066cc] mb-1 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-[#0a0a0f]">Batch Schedule</p>
                <p className="text-[10px] text-slate-500">Seat Availability</p>
              </button>
            </div>
          </div>

          {/* Software Courses Matches */}
          {filteredCourses.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0066cc] mb-2 flex items-center justify-between">
                <span>Software Courses ({filteredCourses.length})</span>
                <span className="text-slate-400 text-[9px]">Click for syllabus</span>
              </p>
              <div className="space-y-2">
                {filteredCourses.map(course => (
                  <div
                    key={course.id}
                    onClick={() => {
                      onClose();
                      onSelectCourse(course.id);
                    }}
                    className="p-3.5 rounded-xl bg-[#f7f9fc] hover:bg-white border border-slate-200/80 hover:border-[#0066cc] hover:shadow-sm flex items-center justify-between transition-all cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#0a0a0f] group-hover:text-[#0066cc] transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        {course.duration} • {course.level} • {course.technologies.slice(0, 3).join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#0066cc]">₹{course.price.toLocaleString()}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066cc] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hardware Projects Matches */}
          {filteredHardware.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700 mb-2 flex items-center justify-between">
                <span>Hardware &amp; Robotics Projects ({filteredHardware.length})</span>
                <span className="text-slate-400 text-[9px]">Ready Kits &amp; Schematics</span>
              </p>
              <div className="space-y-2">
                {filteredHardware.map(project => (
                  <div
                    key={project.id}
                    onClick={() => {
                      onClose();
                      onSelectHardwareProject(project.id);
                    }}
                    className="p-3.5 rounded-xl bg-[#f7f9fc] hover:bg-white border border-slate-200/80 hover:border-emerald-500 hover:shadow-sm flex items-center justify-between transition-all cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-[#0a0a0f] group-hover:text-emerald-700 transition-colors">
                          {project.title}
                        </h4>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
                          {project.level}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Microcontroller: <strong className="text-slate-700">{project.microcontroller}</strong> • {project.hardwareComponents.slice(0, 2).join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-700">{project.badge || 'Ready Kit'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-[#f7f9fc] border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-sans">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-2 py-0.5 rounded-md bg-white border border-slate-300 text-slate-700 font-mono text-[10px]">ESC</kbd> to exit</span>
            <span><kbd className="px-2 py-0.5 rounded-md bg-white border border-slate-300 text-slate-700 font-mono text-[10px]">Cmd / Ctrl + K</kbd> anytime</span>
          </div>

          <a
            href={createWhatsAppDirectQueryLink('Admissions Helpline')}
            target="_blank"
            rel="noreferrer"
            className="text-[#0066cc] hover:underline flex items-center gap-1 font-semibold"
          >
            <MessageSquare className="w-3 h-3" />
            <span>Admissions WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};