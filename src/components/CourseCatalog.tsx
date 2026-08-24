import React, { useState, useMemo } from 'react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { 
  BookOpen, Star, Users, Clock, ArrowRight, Filter, 
  Search, CheckCircle, FileText, X, Sparkles, MessageSquare, Download 
} from 'lucide-react';
import { createWhatsAppEnrollLink } from '../services/whatsappService';

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
    <section id="courses" className="py-20 px-4 relative bg-[#050811] border-t border-slate-850">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-inner">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Production-Grade Engineering Tracks
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Industrial Stacks <span className="gradient-text-cyan">& Applied Syllabi</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every curriculum is engineered around 5 hours of daily practical lab development, live microservices, cloud deployments, and rigorous 1-on-1 code reviews.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 glass-panel p-3 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-slate-950 font-black shadow-lg shadow-cyan-500/25 border border-cyan-400/40'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800/80 bg-slate-950/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input inside Filter */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search stack, framework, or tech..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
            />
          </div>

        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between group bg-slate-900/90 hover:border-cyan-500/40 transition-all shadow-xl"
            >
              <div>
                {/* Course Image Banner */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
                  <img
                    src={course.bannerImage}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback image in case of network issue
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap">
                    <span className="bg-slate-900/90 text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border border-cyan-500/40">
                      {course.category}
                    </span>
                    {course.isFeatured && (
                      <span className="bg-cyan-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-lg backdrop-blur-md flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3 text-slate-950" /> Featured
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md text-amber-300 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-slate-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{course.rating} ({course.reviewCount})</span>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-6 space-y-4">
                  <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.technologies.slice(0, 5).map((tech, i) => (
                      <span key={i} className="bg-slate-950 border border-slate-800 text-cyan-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                    {course.technologies.length > 5 && (
                      <span className="text-[10px] text-slate-400 font-bold self-center">
                        +{course.technologies.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Meta Stats */}
                  <div className="flex items-center justify-between pt-3 text-xs text-slate-400 border-t border-slate-800">
                    <div className="flex items-center gap-1.5 font-medium text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium text-slate-300">
                      <Users className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{course.studentsEnrolled}+ Enrolled</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Footer & Pricing */}
              <div className="p-6 pt-0 space-y-3">
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
                  <div>
                    <span className="text-[11px] text-slate-500 line-through mr-1.5">₹{course.originalPrice.toLocaleString()}</span>
                    <span className="text-xl font-black text-white">₹{course.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="text-xs font-bold text-cyan-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Syllabus</span>
                  </button>
                </div>

                {/* Primary Action Buttons without overlapping */}
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={createWhatsAppEnrollLink({
                      studentName: 'Candidate',
                      courseOrProgram: course.title,
                      phone: ''
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className="min-w-0 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <MessageSquare className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                    <span className="truncate">Inquire</span>
                  </a>

                  <button
                    onClick={() => onOpenEnrollment(course.title)}
                    className="min-w-0 px-3 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span className="truncate">Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 text-slate-950" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Detailed Syllabus Modal Popup */}
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-slate-900 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border border-slate-700 relative space-y-6 shadow-2xl">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Title Header */}
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-cyan-950 text-cyan-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                    {selectedCourse.category}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    {selectedCourse.duration} • 5 Hours/Day
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{selectedCourse.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{selectedCourse.fullDescription}</p>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Industrial Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                  {selectedCourse.keyHighlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Week by Week Syllabus Breakdown */}
              <div>
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
                  Comprehensive Week-by-Week Curriculum
                </h4>
                <div className="space-y-3">
                  {selectedCourse.syllabus.map((m, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-black text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
                          {m.weekOrDay}
                        </span>
                        {m.handsOnProject && (
                          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                            🛠️ {m.handsOnProject}
                          </span>
                        )}
                      </div>
                      <h5 className="text-sm font-bold text-white">{m.title}</h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-400 pt-1">
                        {m.topics.map((t, ti) => (
                          <li key={ti} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons inside Modal */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div>
                  <span className="text-xs text-slate-400 block">Total Course Fee:</span>
                  <p className="text-2xl font-black text-white">₹{selectedCourse.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={createWhatsAppEnrollLink({
                      studentName: 'Candidate',
                      courseOrProgram: selectedCourse.title,
                      phone: ''
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  <button
                    onClick={() => {
                      const title = selectedCourse.title;
                      setSelectedCourse(null);
                      onOpenEnrollment(title);
                    }}
                    className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Proceed to Enroll</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
