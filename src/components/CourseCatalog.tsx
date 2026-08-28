import React, { useState, useMemo } from 'react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { 
  Star, Clock, Search, ChevronRight, FileText, 
  CheckCircle2, X, Briefcase, Award, MessageSquare, BookOpen
} from 'lucide-react';
import { createWhatsAppDirectQueryLink } from '../services/whatsappService';

interface CourseCatalogProps {
  onOpenEnrollment: (courseTitle: string) => void;
  searchFilterQuery?: string;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ 
  onOpenEnrollment,
  searchFilterQuery = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'syllabus' | 'projects' | 'career'>('syllabus');
  const [localSearch, setLocalSearch] = useState(searchFilterQuery);

  const categories = [
    { label: 'All Courses', value: 'All' },
    { label: 'Web Development', value: 'Web Development' },
    { label: 'Programming & Backend', value: 'Programming & Backend' },
    { label: 'AI & Data Science', value: 'AI & Data Science' },
    { label: 'Mobile Apps', value: 'Mobile & Cross Platform' }
  ];

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const query = (localSearch || searchFilterQuery).toLowerCase().trim();
      const matchSearch = !query || 
        course.title.toLowerCase().includes(query) ||
        course.technologies.some(t => t.toLowerCase().includes(query)) ||
        course.category.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, localSearch, searchFilterQuery]);

  return (
    <section id="courses" className="py-12 sm:py-16 px-4 bg-[#ffffff] bg-tech-dots border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto space-y-1">
          <span className="inline-block px-3 py-0.5 rounded-full bg-[#f0f8ff] text-[#0066cc] text-[10px] font-bold uppercase tracking-[0.14em] border border-blue-200/80 shadow-2xs">
            Technical Courses
          </span>
          <h2 className="text-2xl sm:text-3xl font-luxury-title font-bold text-[#0a0a0f] tracking-tight">
            Practical <span className="text-[#0066cc] italic font-normal">Course Tracks</span>
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Hands-on technical tracks with guided projects and code reviews.
          </p>
        </div>

        {/* Filter & Search Bar - Rounded Minimalist Strip */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#f7f9fc] p-2.5 rounded-2xl border border-gray-200/80">
          
          {/* Category Tabs - Rounded-full Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const count = cat.value === 'All' 
                ? COURSES_DATA.length 
                : COURSES_DATA.filter(c => c.category === cat.value).length;

              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`h-9 px-4 rounded-full text-[11px] font-semibold uppercase tracking-[0.06em] whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                    selectedCategory === cat.value
                      ? 'bg-[#0066cc] text-white shadow-xs'
                      : 'bg-white text-[#374151] hover:bg-blue-50 hover:text-[#0066cc] border border-gray-200'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full ${
                    selectedCategory === cat.value ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-60 shrink-0">
            <Search className="w-3.5 h-3.5 text-[#0066cc] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search tech stack..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 h-9 text-xs text-[#333] placeholder-gray-400 focus:outline-none focus:border-[#0066cc] font-sans shadow-xs"
            />
            {localSearch && (
              <button 
                onClick={() => setLocalSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>

        {/* Modern Rounded Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="course-card flex flex-col justify-between group rounded-2xl border border-gray-200/80 hover:border-[#0066cc] hover:shadow-lg transition-all"
            >
              <div>
                {/* Course Image */}
                <div className="relative h-40 overflow-hidden bg-slate-100 rounded-t-2xl">
                  <img
                    src={course.bannerImage}
                    alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-white/95 text-[#0066cc] text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-white/95 text-[#0a0a0f] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Card Main Info */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-[#0a0a0f] group-hover:text-[#0066cc] transition-colors line-clamp-1 font-sans">
                      {course.title}
                    </h3>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center justify-between text-xs text-[#555] pt-1">
                    <span className="flex items-center gap-1 text-[#0066cc] font-medium text-[11px] uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {course.syllabus?.length || 6} Modules
                    </span>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {course.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="bg-slate-100 text-[#444] text-[10px] font-medium px-2.5 py-0.5 rounded-full">
                        {tech}
                      </span>
                    ))}
                    {course.technologies.length > 4 && (
                      <span className="text-[10px] text-[#888] font-semibold self-center">
                        +{course.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="p-4 pt-0 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenEnrollment(course.title)}
                  className="custom-btn flex-1 h-[38px] text-[10px] tracking-[0.08em] rounded-xl"
                >
                  <span>Enroll</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setActiveModalTab('syllabus');
                  }}
                  className="custom-btn-outline h-[38px] text-[10px] tracking-[0.08em] px-3.5 rounded-xl"
                >
                  <FileText className="w-3 h-3 text-[#0066cc]" />
                  <span>Syllabus</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Structured Full Details Syllabus Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 space-y-4 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#0066cc] tracking-[0.14em] bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {selectedCourse.category} Track
                </span>
                <h3 className="text-lg sm:text-xl font-luxury-title font-bold text-[#0a0a0f] mt-1">
                  {selectedCourse.title}
                </h3>
                <p className="text-xs text-[#666] mt-0.5 font-sans">
                  Duration: {selectedCourse.duration} • Level: {selectedCourse.level}
                </p>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-1.5 border-b border-gray-200/80 pb-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveModalTab('syllabus')}
                className={`text-[11px] font-semibold uppercase tracking-[0.06em] px-4 h-8 rounded-full cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                  activeModalTab === 'syllabus' ? 'bg-[#0066cc] text-white shadow-xs' : 'text-gray-600 hover:text-[#0066cc] bg-slate-50'
                }`}
              >
                Curriculum Modules
              </button>
              <button
                onClick={() => setActiveModalTab('projects')}
                className={`text-[11px] font-semibold uppercase tracking-[0.06em] px-4 h-8 rounded-full cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                  activeModalTab === 'projects' ? 'bg-[#0066cc] text-white shadow-xs' : 'text-gray-600 hover:text-[#0066cc] bg-slate-50'
                }`}
              >
                Live Projects
              </button>
              <button
                onClick={() => setActiveModalTab('career')}
                className={`text-[11px] font-semibold uppercase tracking-[0.06em] px-4 h-8 rounded-full cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                  activeModalTab === 'career' ? 'bg-[#0066cc] text-white shadow-xs' : 'text-gray-600 hover:text-[#0066cc] bg-slate-50'
                }`}
              >
                Career Roles
              </button>
            </div>

            {/* Tab 1: Curriculum Breakdown */}
            {activeModalTab === 'syllabus' && (
              <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                {selectedCourse.syllabus?.map((mod, idx) => (
                  <div key={idx} className="p-3.5 bg-[#f7f9fc] rounded-xl border border-gray-200/80">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0a0a0f]">
                        {mod.weekOrDay}: {mod.title}
                      </span>
                    </div>
                    <ul className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {mod.topics.map((t, tidx) => (
                        <li key={tidx} className="text-xs text-[#555] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-[#0066cc] shrink-0" />
                          <span className="line-clamp-1">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Projects & Tech */}
            {activeModalTab === 'projects' && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-gray-200/80">
                  <h4 className="text-xs font-bold text-[#0a0a0f] uppercase tracking-wider mb-1.5">
                    Course Deliverables
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedCourse.keyHighlights?.map((hl, hidx) => (
                      <li key={hidx} className="text-xs text-[#444] flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066cc] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#f7f9fc] border border-blue-100">
                  <h4 className="text-xs font-bold text-[#0a0a0f] uppercase tracking-wider mb-1.5">
                    Technologies Mastered
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedCourse.technologies.map((tech, tidx) => (
                      <span key={tidx} className="bg-white border border-blue-200 text-[#0066cc] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Career Roles */}
            {activeModalTab === 'career' && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#f7f9fc] border border-blue-100">
                  <h4 className="text-xs font-bold text-[#0a0a0f] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-[#0066cc]" />
                    <span>Possible Career Paths</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {selectedCourse.careerRoles?.map((role, ridx) => (
                      <div key={ridx} className="bg-white p-2.5 rounded-lg border border-gray-200 text-xs font-semibold text-[#0a0a0f] flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0066cc]" />
                        <span>{role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Course certificate, project feedback, and placement preparation support are provided according to the selected track.</span>
                </div>
              </div>
            )}

            {/* Modal Footer Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-gray-100">
              <a
                href={createWhatsAppDirectQueryLink(selectedCourse.title)}
                target="_blank"
                rel="noreferrer"
                className="custom-btn-outline h-[38px] text-[10px] tracking-[0.08em] px-4 text-emerald-700 hover:text-emerald-800 border-emerald-300 rounded-xl justify-center"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Counselor</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="custom-btn-outline flex-1 sm:flex-initial h-[38px] text-[10px] tracking-[0.08em] px-4 rounded-xl justify-center"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedCourse.title;
                    setSelectedCourse(null);
                    onOpenEnrollment(title);
                  }}
                  className="custom-btn flex-1 sm:flex-initial h-[38px] text-[10px] tracking-[0.08em] px-5 rounded-xl justify-center"
                >
                  Enroll in Track
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};