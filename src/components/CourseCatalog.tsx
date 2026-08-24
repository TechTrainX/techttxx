import React, { useState, useMemo } from 'react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { 
  BookOpen, Star, Clock, Search, Sparkles, 
  ChevronRight, FileText, CheckCircle2, X, Download
} from 'lucide-react';

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
  const [localSearch, setLocalSearch] = useState(searchFilterQuery);

  const categories = ['All', 'Web Development', 'Programming & Backend', 'AI & Data Science', 'Mobile & Cross Platform'];

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
    <section id="courses" className="py-16 px-4 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Crisp Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0066cc] text-xs font-bold uppercase tracking-wider">
            Explore Courses
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00061a]">
            Job-Ready <span className="text-[#0066cc]">Training Programs</span>
          </h2>
          <p className="text-sm text-[#555555]">
            Comprehensive curricula designed with industry experts. Daily practical coding, real microservices, and dedicated placement preparation.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#f0f8ff] p-3 rounded-[16px] border border-blue-100">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
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

          {/* Search Box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-[#0066cc] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search stack or tool..."
              className="w-full bg-white border border-gray-300 rounded-full pl-8 pr-3 py-1.5 text-xs text-[#333] placeholder-gray-400 focus:outline-none focus:border-[#0066cc]"
            />
          </div>

        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="course-card flex flex-col justify-between group"
            >
              <div>
                {/* Course Image */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={course.bannerImage}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-white/95 text-[#0066cc] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      {course.category}
                    </span>
                    {course.isFeatured && (
                      <span className="bg-[#00061a] text-[#7fffd4] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-white/95 text-[#333] text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 space-y-3">
                  <h3 className="text-base font-bold text-[#00061a] group-hover:text-[#0066cc] transition-colors line-clamp-1">
                    {course.title}
                  </h3>

                  <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed font-normal">
                    {course.shortDescription}
                  </p>

                  {/* Metadata Row */}
                  <div className="flex items-center justify-between text-xs text-[#555] pt-1 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#0066cc]" />
                      <span>{course.duration}</span>
                    </span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {course.syllabus?.length || 4}+ Modules
                    </span>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {course.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="bg-slate-100 text-[#444] text-[10px] font-medium px-2 py-0.5 rounded-full">
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
              <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenEnrollment(course.title)}
                  className="custom-btn flex-1 py-2 text-xs"
                >
                  Enroll Now
                </button>
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="custom-btn-outline py-2 text-xs px-3.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#0066cc]" />
                  <span>Syllabus</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Syllabus Modal Dialog */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[20px] max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase text-[#0066cc] tracking-wider">
                  Curriculum Overview
                </span>
                <h3 className="text-xl font-bold text-[#00061a] mt-0.5">
                  {selectedCourse.title}
                </h3>
                <p className="text-xs text-[#666] mt-1">
                  Duration: {selectedCourse.duration} • {selectedCourse.syllabus?.length || 4} Comprehensive Modules
                </p>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modules List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-[#333] tracking-wider">
                Module Breakdown
              </h4>
              <div className="space-y-2">
                {selectedCourse.syllabus?.map((mod, idx) => (
                  <div key={idx} className="p-3 bg-[#f0f8ff] rounded-[10px] border border-blue-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#00061a]">
                        {mod.weekOrDay}: {mod.title}
                      </span>
                    </div>
                    <ul className="mt-1.5 space-y-1">
                      {mod.topics.map((t, tidx) => (
                        <li key={tidx} className="text-xs text-[#555] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-[#0066cc] shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => setSelectedCourse(null)}
                className="custom-btn-outline py-2 px-4 text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = selectedCourse.title;
                  setSelectedCourse(null);
                  onOpenEnrollment(title);
                }}
                className="custom-btn py-2 px-6 text-xs"
              >
                Enroll in this Course
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
