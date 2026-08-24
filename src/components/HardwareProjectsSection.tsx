import React, { useState, useMemo } from 'react';
import { HardwareProject } from '../types';
import { HARDWARE_PROJECTS_DATA, HARDWARE_CATEGORIES } from '../data/hardwareProjectsData';
import { 
  Cpu, Wrench, Download, Search, CheckCircle2, 
  ArrowRight, X, Layers, FileText, Zap
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
    <section id="hardware-projects" className="py-16 px-4 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0066cc] text-xs font-bold uppercase tracking-wider">
            Electronics & IoT
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00061a]">
            Hardware Kits & <span className="text-[#0066cc]">Project Assistance</span>
          </h2>
          <p className="text-sm text-[#555555]">
            Complete working hardware kits with verified circuit schematics, source code, and 1:1 guidance for college & commercial projects.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#f0f8ff] p-3 rounded-[16px] border border-blue-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {HARDWARE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0066cc] text-white shadow-xs'
                    : 'bg-white text-[#333333] hover:bg-blue-50 hover:text-[#0066cc] border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-[#0066cc] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Arduino, ESP32, sensor..."
              className="w-full bg-white border border-gray-300 rounded-full pl-8 pr-3 py-1.5 text-xs text-[#333] placeholder-gray-400 focus:outline-none focus:border-[#0066cc]"
            />
          </div>
        </div>

        {/* Hardware Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="course-card flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-white/95 text-[#0066cc] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      {project.microcontroller}
                    </span>
                    <span className="bg-[#00061a] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 space-y-3">
                  <h3 className="text-base font-bold text-[#00061a] group-hover:text-[#0066cc] transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Components Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.hardwareComponents.slice(0, 3).map((comp, idx) => (
                      <span key={idx} className="bg-slate-100 text-[#444] text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {comp}
                      </span>
                    ))}
                    {project.hardwareComponents.length > 3 && (
                      <span className="text-[10px] text-[#888] font-semibold self-center">
                        +{project.hardwareComponents.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenInquiryModal ? onOpenInquiryModal(project.title) : null}
                  className="custom-btn flex-1 py-2 text-xs"
                >
                  <span>Inquire Kit</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setActiveDetailProject(project)}
                  className="custom-btn-outline py-2 text-xs px-3.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#0066cc]" />
                  <span>Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Details Modal */}
      {activeDetailProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[20px] max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-[#0066cc] uppercase tracking-wider">
                  {activeDetailProject.microcontroller} • {activeDetailProject.category}
                </span>
                <h3 className="text-xl font-bold text-[#00061a] mt-0.5">
                  {activeDetailProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveDetailProject(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#555] leading-relaxed">
              {activeDetailProject.shortDescription}
            </p>

            {/* Components List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-[#333] tracking-wider">
                Hardware Included in Kit
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {activeDetailProject.hardwareComponents.map((comp, idx) => (
                  <div key={idx} className="p-2.5 bg-[#f0f8ff] rounded-[8px] border border-blue-100 text-xs text-[#333] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => setActiveDetailProject(null)}
                className="custom-btn-outline py-2 px-4 text-xs"
              >
                Close
              </button>
              <a
                href={createWhatsAppHardwareProjectLink(activeDetailProject.title)}
                target="_blank"
                rel="noreferrer"
                className="custom-btn py-2 px-6 text-xs"
              >
                Order Kit on WhatsApp
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
