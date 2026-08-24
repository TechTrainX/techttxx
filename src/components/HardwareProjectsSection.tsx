import React, { useState, useMemo } from 'react';
import { HardwareProject } from '../types';
import { HARDWARE_PROJECTS_DATA, HARDWARE_CATEGORIES } from '../data/hardwareProjectsData';
import { 
  Cpu, Wrench, ShieldCheck, Download, Search, CheckCircle2, 
  Sparkles, MessageSquare, ArrowRight, ExternalLink, X, BookOpen,
  Layers, Video, Zap, Activity, Info, Compass
} from 'lucide-react';
import { 
  createWhatsAppHardwareProjectLink, 
  createWhatsAppCircuitDiagramLink 
} from '../services/whatsappService';

interface HardwareProjectsSectionProps {
  onOpenInquiryModal?: (projectTitle?: string) => void;
}

export const HardwareProjectsSection: React.FC<HardwareProjectsSectionProps> = ({
  onOpenInquiryModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDetailProject, setActiveDetailProject] = useState<HardwareProject | null>(null);
  const [activeCircuitModalProject, setActiveCircuitModalProject] = useState<HardwareProject | null>(null);

  const filteredProjects = useMemo(() => {
    return HARDWARE_PROJECTS_DATA.filter((proj) => {
      const matchCat = selectedCategory === 'All Projects' || proj.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        proj.title.toLowerCase().includes(q) ||
        proj.shortDescription.toLowerCase().includes(q) ||
        proj.hardwareComponents.some(c => c.toLowerCase().includes(q)) ||
        proj.microcontroller.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="hardware-projects" className="py-20 px-4 relative bg-[#030712] border-t border-slate-850 cyber-dots-bg">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-inner">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Embedded Systems & Hardware Lab
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Physical Hardware Kits <span className="gradient-text-cyan">& IoT Prototypes</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Order complete hardware kits, download verified Fritzing/PDF schematics, and get <strong>1-on-1 live mentoring</strong> to build, debug, and present final-year university projects.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 glass-panel p-3.5 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {HARDWARE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-slate-950 font-black shadow-lg shadow-cyan-500/25 border border-cyan-400/40'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800/80 bg-slate-950/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Arduino, ESP32, sensor..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
            />
          </div>

        </div>

        {/* Hardware Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800/90 flex flex-col justify-between group bg-slate-900/90 hover:border-cyan-500/40 transition-all shadow-xl"
            >
              <div>
                
                {/* Project Image Banner */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Microcontroller & Category Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                    <span className="bg-cyan-500/90 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm">
                      {project.microcontroller}
                    </span>
                    <span className="bg-slate-900/90 text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border border-cyan-500/30">
                      {project.badge}
                    </span>
                  </div>

                  {/* Level Badge */}
                  <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md text-emerald-300 text-[10px] font-black px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    {project.level} Level
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 space-y-4">
                  
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Embedded Concepts Chips */}
                  {project.embeddedConcepts && project.embeddedConcepts.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Embedded Architecture:</span>
                      <div className="flex flex-wrap gap-1">
                        {project.embeddedConcepts.slice(0, 3).map((concept, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hardware Components Preview */}
                  <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-200">
                      <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Components Included:</span>
                    </div>
                    <ul className="text-[11px] text-slate-400 space-y-1 pl-1">
                      {project.hardwareComponents.slice(0, 3).map((comp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                          <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Circuit Quick View Button */}
                  <button
                    onClick={() => setActiveCircuitModalProject(project)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">View Circuit Schematic & Pinouts</span>
                  </button>

                </div>
              </div>

              {/* Card Footer & Actions */}
              <div className="p-6 pt-0 space-y-3 border-t border-slate-800/80 mt-2">
                
                {/* Target Branches */}
                <div className="pt-3 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 block font-semibold">Recommended Stream:</span>
                  <span className="text-[10px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {project.targetBranch[0]}
                  </span>
                </div>

                {/* Direct Action Buttons with Zero Overlap */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setActiveDetailProject(project)}
                    className="min-w-0 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">Specs & Kit</span>
                  </button>

                  <a
                    href={createWhatsAppHardwareProjectLink(project.title, undefined, undefined, 'Hardware Kit Order & 1-on-1 Mentorship')}
                    target="_blank"
                    rel="noreferrer"
                    className="min-w-0 px-3 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:brightness-110 text-slate-950 text-xs font-black shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center whitespace-nowrap"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-slate-950 shrink-0" />
                    <span className="truncate">Order Kit</span>
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
            <Cpu className="w-12 h-12 text-slate-600 mx-auto" />
            <h4 className="text-base font-bold text-white">No hardware projects matched "{searchQuery}"</h4>
            <p className="text-xs text-slate-400">Try searching for "Arduino", "RC Car", "Drone", "Agriculture" or clear the filter.</p>
            <button
              onClick={() => { setSelectedCategory('All Projects'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold cursor-pointer"
            >
              View All Projects
            </button>
          </div>
        )}

      </div>

      {/* Circuit Schematic & Pinout Blueprint Interactive Modal */}
      {activeCircuitModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-cyan-500/40 relative max-h-[92vh] overflow-y-auto shadow-2xl space-y-6">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveCircuitModalProject(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Schematic Topology & Pinout Matrix</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {activeCircuitModalProject.title}
              </h3>
              <p className="text-xs text-slate-300 font-mono">
                Microcontroller: <strong className="text-cyan-400">{activeCircuitModalProject.microcontroller}</strong>
              </p>
            </div>

            {/* Interactive Vector Circuit Blueprint Graphic */}
            <div className="rounded-2xl border border-cyan-500/30 bg-[#030914] p-4 relative overflow-hidden shadow-inner space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>Hardware Rail Topology (CAD Verified)</span>
                </span>
                <span className="text-emerald-400 font-bold">⚡ Dual-Rail 5V/12V Regulated</span>
              </div>

              {/* Vector Blueprint SVG Diagram */}
              <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800/80 flex flex-col items-center justify-center space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full text-center">
                  <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-xs">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Core Processing Unit</span>
                    <strong className="text-cyan-300 text-xs">{activeCircuitModalProject.microcontroller}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Signal Bus Interface</span>
                    <strong className="text-emerald-300 text-xs">UART / SPI / I2C Buses</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/40 text-xs">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Isolation & Drivers</span>
                    <strong className="text-indigo-300 text-xs">Opto-Isolated H-Bridges</strong>
                  </div>
                </div>
              </div>

              {/* Circuit Summary Description */}
              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <strong className="text-white block font-bold mb-1">Wiring & Signal Routing Summary:</strong>
                <p>{activeCircuitModalProject.circuitSummary}</p>
              </div>
            </div>

            {/* Pinout Table */}
            {activeCircuitModalProject.pinoutTable && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Hardware Pinout Matrix:</span>
                </h4>
                <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900/90 text-cyan-400 border-b border-slate-800 font-bold">
                        <th className="p-2.5">MCU Pin</th>
                        <th className="p-2.5">Component Connection</th>
                        <th className="p-2.5">Function Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {activeCircuitModalProject.pinoutTable.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40">
                          <td className="p-2.5 font-bold text-cyan-400 font-mono whitespace-nowrap">{item.pin}</td>
                          <td className="p-2.5 text-slate-200 font-medium">{item.componentPin}</td>
                          <td className="p-2.5 text-slate-400">{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={createWhatsAppCircuitDiagramLink(activeCircuitModalProject.title, activeCircuitModalProject.microcontroller)}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>Request High-Res PDF Schematic & Source Code</span>
              </a>

              <button
                onClick={() => setActiveCircuitModalProject(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 cursor-pointer whitespace-nowrap"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Full Project Details Modal */}
      {activeDetailProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-slate-700 relative max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveDetailProject(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Badges */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                  {activeDetailProject.microcontroller}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
                  {activeDetailProject.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  {activeDetailProject.level} Level
                </span>
              </div>

              <h3 className="text-2xl font-black text-white">{activeDetailProject.title}</h3>
              <p className="text-xs text-cyan-400 font-semibold">{activeDetailProject.tagline}</p>
            </div>

            {/* Image Preview */}
            <div className="h-56 rounded-2xl overflow-hidden relative border border-slate-800 bg-slate-950">
              <img
                src={activeDetailProject.imageUrl}
                alt={activeDetailProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>

            {/* Full Description */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Project Architecture Overview</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeDetailProject.fullDescription}</p>
            </div>

            {/* Hardware Components List */}
            <div className="space-y-2 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-cyan-400" />
                <span>Complete Physical Hardware Components Included in Kit:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {activeDetailProject.hardwareComponents.map((comp, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables Included */}
            <div className="space-y-2 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Deliverables Included in Package:</span>
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5">
                {activeDetailProject.deliverablesIncluded.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Assistance Overview */}
            <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl space-y-1">
              <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-indigo-400" />
                <span>1-on-1 Build Mentorship & Viva Defense Coaching:</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeDetailProject.assistanceOverview}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={createWhatsAppHardwareProjectLink(activeDetailProject.title, undefined, undefined, 'Hardware Kit Order & 1-on-1 Mentorship')}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Inquire & Buy on WhatsApp (+91 8545092070)</span>
              </a>

              <button
                onClick={() => {
                  const title = activeDetailProject.title;
                  setActiveDetailProject(null);
                  if (onOpenInquiryModal) onOpenInquiryModal(title);
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 cursor-pointer whitespace-nowrap"
              >
                Custom Inquire Form
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
