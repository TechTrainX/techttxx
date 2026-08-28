import React, { useState, useEffect, useRef, useMemo } from 'react';
import { HardwareProject } from '../types';
import { HARDWARE_PROJECTS_DATA, HARDWARE_CATEGORIES } from '../data/hardwareProjectsData';
import { 
  Cpu, Search, CheckCircle2, ChevronLeft, ChevronRight,
  ArrowRight, X, FileText, MessageSquare, Play, Pause, Sparkles, Maximize2, ShieldCheck
} from 'lucide-react';
import { createWhatsAppHardwareProjectLink } from '../services/whatsappService';

interface HardwareProjectsSectionProps {
  onOpenInquiryModal?: (projectTitle?: string) => void;
}

export const HardwareProjectsSection: React.FC<HardwareProjectsSectionProps> = ({
  onOpenInquiryModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDetailProject, setActiveDetailProject] = useState<HardwareProject | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    return HARDWARE_PROJECTS_DATA.filter((proj) => {
      const matchCat = selectedCategory === 'All Projects' || proj.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        proj.title.toLowerCase().includes(q) ||
        proj.hardwareComponents.some(c => c.toLowerCase().includes(q)) ||
        proj.microcontroller.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Smooth Auto-Scrolling Carousel Loop (Right-to-Left Continuous Gliding)
  useEffect(() => {
    const el = carouselRef.current;
    if (!el || isPaused) return;

    let animationFrameId: number;
    const speed = 0.7; // Luxurious non-rushed gliding speed

    const step = () => {
      if (el) {
        el.scrollLeft += speed;
        // When nearing end, reset smoothly to beginning
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, filteredProjects]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = 390;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section id="hardware-projects" className="py-12 sm:py-16 px-4 bg-[#f8fafc] bg-tech-dots border-b border-slate-200/80 relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-aura-glow pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0066cc] text-[10px] font-bold uppercase tracking-[0.14em] border border-blue-200/80">
              <Sparkles className="w-3 h-3 text-[#0066cc]" />
              <span>Hardware Studio</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-luxury-title font-bold text-[#0a0a0f] tracking-tight">
              Project Kits & <span className="text-[#0066cc] italic font-normal">Capstones</span>
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              IoT & embedded kits with schematics, firmware code, and reports.
            </p>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-3 h-[38px] rounded-full border border-gray-200 hover:border-[#0066cc] bg-white text-gray-700 hover:text-[#0066cc] text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#0066cc]" /> : <Pause className="w-3.5 h-3.5 text-gray-500" />}
              <span>{isPaused ? 'Auto Play' : 'Pause'}</span>
            </button>

            <button
              onClick={() => handleManualScroll('left')}
              className="w-[38px] h-[38px] rounded-full border border-gray-200 hover:border-[#0066cc] bg-white text-gray-700 hover:text-[#0066cc] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="w-[38px] h-[38px] rounded-full border border-gray-200 hover:border-[#0066cc] bg-white text-gray-700 hover:text-[#0066cc] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#f7f9fc] p-2.5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {HARDWARE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`h-9 px-4 rounded-full text-[11px] font-bold uppercase tracking-[0.06em] whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-sm shadow-blue-500/20'
                    : 'bg-white text-[#374151] hover:bg-blue-50 hover:text-[#0066cc] border-gray-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-[#0066cc] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ESP32, Arduino, Drone..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 h-9 text-xs text-[#333] placeholder-gray-400 focus:outline-none focus:border-[#0066cc] font-sans shadow-xs"
            />
          </div>
        </div>

        {/* Continuous Horizontal Auto-Running Product Carousel */}
        <div
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex items-stretch gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth no-scrollbar select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProjects.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="w-[320px] sm:w-[380px] shrink-0 bg-white rounded-2xl overflow-hidden border border-gray-200/90 group cursor-pointer relative shadow-sm hover:shadow-xl hover:border-[#0066cc] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Container with Consistent Aspect Ratio */}
              <div 
                onClick={() => setActiveDetailProject(project)}
                className="relative h-64 overflow-hidden bg-slate-900"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Always-on Top Floating Microcontroller & Category Pill */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <span className="bg-white/95 backdrop-blur-md text-[#0066cc] text-[9px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider border border-white/40">
                    {project.microcontroller}
                  </span>
                  
                  <span className="bg-[#050814]/90 backdrop-blur-md text-[#7fffd4] text-[9px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider border border-white/10">
                    {project.category}
                  </span>
                </div>

                {/* Top-Right Quick Expand Icon */}
                <div className="absolute bottom-28 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg hover:bg-[#0066cc] transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* High-Contrast Bottom Detail Strip */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-12 pb-4 px-4 text-white z-10 space-y-1.5 transition-all duration-300">
                  <div className="flex items-center justify-between text-[10px] text-blue-300 font-mono">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7fffd4] animate-pulse" />
                      <span>{project.badge || 'Complete Kit'}</span>
                    </span>
                    <span className="text-emerald-400 font-semibold">100% Tested HW</span>
                  </div>

                  <h3 className="text-sm font-bold leading-snug text-white drop-shadow-sm font-sans line-clamp-1">
                    {project.title}
                  </h3>

                  {/* Included Components Tags */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {project.hardwareComponents.slice(0, 3).map((comp, cIdx) => (
                      <span key={cIdx} className="bg-white/15 backdrop-blur-md text-gray-200 text-[9px] font-medium px-2 py-0.5 rounded-full">
                        {comp}
                      </span>
                    ))}
                    {project.hardwareComponents.length > 3 && (
                      <span className="text-[9px] text-blue-300 font-semibold self-center">
                        +{project.hardwareComponents.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons Strip */}
              <div className="p-3.5 bg-white border-t border-gray-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenInquiryModal ? onOpenInquiryModal(project.title) : null}
                  className="custom-btn flex-1 h-[38px] text-[10px] tracking-[0.08em] rounded-xl shadow-xs"
                >
                  <span>Inquire Kit</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setActiveDetailProject(project)}
                  className="custom-btn-outline h-[38px] text-[10px] tracking-[0.08em] px-3.5 rounded-xl"
                >
                  <FileText className="w-3 h-3 text-[#0066cc]" />
                  <span>Specs</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Specs Details Modal */}
      {activeDetailProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveDetailProject(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 space-y-4 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#0066cc] tracking-[0.14em] bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {activeDetailProject.microcontroller} • {activeDetailProject.category}
                </span>
                <h3 className="text-lg font-luxury-title font-bold text-[#0a0a0f] mt-1">
                  {activeDetailProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveDetailProject(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-gray-400 hover:text-gray-700 cursor-pointer transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 font-sans">
              <p className="text-xs text-[#555] leading-relaxed">
                {activeDetailProject.fullDescription || activeDetailProject.shortDescription}
              </p>

              {/* Hardware Components */}
              <div className="p-4 bg-[#f7f9fc] rounded-2xl border border-blue-100/80">
                <h4 className="text-xs font-bold text-[#0a0a0f] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#0066cc]" />
                  <span>Hardware Components Included in Kit</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeDetailProject.hardwareComponents.map((comp, idx) => (
                    <span key={idx} className="bg-white border border-blue-200 text-[#0066cc] text-xs font-medium px-2.5 py-0.5 rounded-full shadow-xs">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200">
                <h4 className="text-xs font-bold text-[#0a0a0f] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0066cc]" />
                  <span>Kit Deliverables & Defense Support</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#444]">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Tested Pre-Assembled Hardware</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Complete Working Source Code</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Verified Circuit Diagram & Pinouts</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Project Report & Presentation PPT</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-gray-100">
              <a
                href={createWhatsAppHardwareProjectLink(activeDetailProject.title)}
                target="_blank"
                rel="noreferrer"
                className="custom-btn-outline h-[40px] text-[10px] tracking-[0.08em] px-4 text-emerald-700 hover:text-emerald-800 border-emerald-300 rounded-xl flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Lab Team</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveDetailProject(null)}
                  className="custom-btn-outline flex-1 sm:flex-none h-[40px] text-[10px] tracking-[0.08em] px-4 rounded-xl"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = activeDetailProject.title;
                    setActiveDetailProject(null);
                    if (onOpenInquiryModal) onOpenInquiryModal(title);
                  }}
                  className="custom-btn flex-1 sm:flex-none h-[40px] text-[10px] tracking-[0.08em] px-5 rounded-xl"
                >
                  Inquire This Kit
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
