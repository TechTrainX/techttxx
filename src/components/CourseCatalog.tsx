import React, { useState, useMemo } from 'react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import {
  Star, Clock, Search, ArrowUpRight, FileText, Hash,
  CheckCircle2, X, Briefcase, Award, MessageSquare, Terminal, Cpu, Layers
} from 'lucide-react';
import { createWhatsAppDirectQueryLink } from '../services/whatsappService';

interface CourseCatalogProps {
  onOpenEnrollment: (courseTitle: string) => void;
  searchFilterQuery?: string;
}

// Category → 2-letter spec code, mirrors the TTX-YYYY-CC-NNNN certificate
// convention so the card stamp reads as "the same system", not a new one.
const CATEGORY_CODE: Record<string, string> = {
  'Web Development': 'WD',
  'Programming & Backend': 'BE',
  'AI & Data Science': 'AI',
  'Mobile & Cross Platform': 'MB',
};

const getSpecCode = (course: Course, index: number) =>
  `TTX/${CATEGORY_CODE[course.category] ?? 'GN'}-${String(index + 1).padStart(2, '0')}`;

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
    <section id="courses" className="relative overflow-hidden border-b border-slate-200/80 bg-white px-4 py-12 sm:py-16">

      {/* Blueprint corner marks — quiet schematic framing, not decoration for its own sake */}
      <div className="pointer-events-none absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-[#0066CC]/20 hidden sm:block" />
      <div className="pointer-events-none absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-[#0066CC]/20 hidden sm:block" />
      <div className="pointer-events-none absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-[#0066CC]/20 hidden sm:block" />
      <div className="pointer-events-none absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-[#0066CC]/20 hidden sm:block" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-7 sm:space-y-8">
        {/* Curriculum command panel: focal strength without changing the site’s white rhythm. */}
        <div className="relative overflow-hidden rounded-[1.75rem] bg-[#050d24] p-5 text-white shadow-[0_24px_70px_rgba(5,13,36,0.2)] sm:p-7 lg:p-8">
          <div aria-hidden="true" className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#0066cc]/20 blur-3xl" />
          <div aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#0066cc] to-transparent" />
          <div className="relative z-10 grid items-end gap-7 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-[#0066cc]/15 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-100"><Terminal className="h-3.5 w-3.5 text-blue-300" />Curriculum engine</span>
              <h2 className="font-luxury-title text-3xl font-bold tracking-[-0.05em] text-white sm:text-5xl">Build depth. <span className="font-normal italic text-blue-300">Ship confidence.</span></h2>
              <p className="max-w-xl text-sm leading-6 text-slate-300 sm:text-base">A focused catalog of software tracks designed around real stacks, guided practice, and work that moves from first commit to finished system.</p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:min-w-[110px]"><Cpu className="mx-auto mb-2 h-4 w-4 text-blue-300" /><span className="block font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-white">Real stacks</span><span className="mt-1 block text-[9px] text-slate-400">Current tools</span></div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:min-w-[110px]"><Layers className="mx-auto mb-2 h-4 w-4 text-blue-300" /><span className="block font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-white">Guided paths</span><span className="mt-1 block text-[9px] text-slate-400">Clear sequence</span></div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:min-w-[110px]"><Award className="mx-auto mb-2 h-4 w-4 text-blue-300" /><span className="block font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-white">Project proof</span><span className="mt-1 block text-[9px] text-slate-400">Show your work</span></div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col gap-1 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0066CC]">[ TTX Curriculum Index ]</span>
            <h2 className="mt-1 font-luxury-title text-2xl font-bold tracking-tight text-[#0A0E1A] sm:text-3xl">Practical <span className="font-normal italic text-[#0066CC]">Course Tracks</span></h2>
          </div>
          <p className="font-mono text-[11px] tracking-wide text-slate-400">// hands-on tracks · guided projects · code review</p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col items-stretch justify-between gap-3 rounded-2xl border border-slate-200/80 bg-[#F7F9FC] p-2.5 shadow-[0_10px_26px_rgba(15,23,42,0.05)] md:flex-row md:items-center">

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const count = cat.value === 'All'
                ? COURSES_DATA.length
                : COURSES_DATA.filter(c => c.category === cat.value).length;
              const isActive = selectedCategory === cat.value;

              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`h-9 px-3.5 rounded-lg text-[11px] font-mono font-medium uppercase tracking-wide whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-[#0066CC] text-white border-[#0066CC] shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-[#0066CC]/50 hover:text-[#0066CC]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={isActive ? 'text-white/70' : 'text-slate-400'}>[{count}]</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-[#0066CC] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="grep --tech-stack"
              aria-label="Search courses by technology"
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-8 h-9 text-xs font-mono text-[#333] placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC] focus:border-[#0066CC] shadow-xs"
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC] rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Course Grid — datasheet cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-1">
          {filteredCourses.map((course, index) => (
            <div
              key={course.id}
              className="course-card group relative flex flex-col justify-between rounded-[1.35rem] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0066CC] hover:shadow-[0_22px_50px_-14px_rgba(0,102,204,0.36)]"
            >
              {/* Spec-code stamp — same ID convention as the certificate system */}
              <div className="absolute -top-2.5 left-4 z-10 flex items-center gap-1 bg-[#0A0E1A] text-[#4DA3FF] font-mono text-[10px] font-semibold px-2 py-0.5 rounded tracking-wider shadow-sm">
                <Hash className="w-2.5 h-2.5" strokeWidth={2.5} />
                {getSpecCode(course, index)}
              </div>

              <div>
                <div className="relative h-40 overflow-hidden rounded-t-xl bg-slate-100">
                  <img
                    src={course.bannerImage}
                    alt={course.title}
                    className="h-full w-full object-cover grayscale-[10%] transition-all duration-500 group-hover:scale-[1.06] group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-2.5 right-2.5 bg-white/95 text-[#0066CC] text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded shadow-xs">
                    {course.category}
                  </span>
                  <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[#0A0E1A] text-[10px] font-mono font-semibold px-2 py-0.5 rounded shadow-xs">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {course.rating}
                  </span>
                </div>

                <div className="p-4 pt-5 space-y-2.5">
                  <h3 className="text-sm font-bold text-[#0A0E1A] group-hover:text-[#0066CC] transition-colors line-clamp-1">
                    {course.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="flex items-center gap-1 text-[#0066CC] font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wide font-semibold">
                      {String(course.syllabus?.length || 6).padStart(2, '0')} Modules
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="relative pl-3 pr-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[10px] font-mono font-medium text-slate-600 before:content-[''] before:absolute before:left-1.5 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-[#0066CC]"
                      >
                        {tech}
                      </span>
                    ))}
                    {course.technologies.length > 4 && (
                      <span className="text-[10px] font-mono text-slate-400 self-center">
                        +{course.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center gap-2">
                <button
                  onClick={() => onOpenEnrollment(course.title)}
                  className="flex-1 h-[38px] rounded-lg bg-[#0066CC] text-white text-[10px] font-mono font-semibold uppercase tracking-[0.08em] flex items-center justify-center gap-1.5 hover:bg-[#0052A3] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:ring-offset-2"
                >
                  Enroll
                  <ArrowUpRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setActiveModalTab('syllabus');
                  }}
                  className="h-[38px] px-3.5 rounded-lg border border-slate-200 text-slate-700 text-[10px] font-mono font-semibold uppercase tracking-[0.08em] flex items-center gap-1.5 hover:border-[#0066CC] hover:text-[#0066CC] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:ring-offset-2"
                >
                  <FileText className="w-3 h-3" />
                  Syllabus
                </button>
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <div className="col-span-full text-center py-14 border border-dashed border-slate-200 rounded-xl">
              <p className="text-xs font-mono text-slate-400">
                // no matches for "{localSearch || searchFilterQuery}" — try a different stack or category
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Spec Sheet Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050d24]/75 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-h-[90vh] w-full max-w-2xl space-y-4 overflow-y-auto rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_28px_90px_rgba(5,13,36,0.35)] sm:p-6">

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#0066CC] tracking-[0.14em] bg-blue-50 px-2.5 py-0.5 rounded">
                  <Hash className="w-2.5 h-2.5" strokeWidth={2.5} />
                  {getSpecCode(selectedCourse, COURSES_DATA.indexOf(selectedCourse))} — Spec Sheet
                </span>
                <h3 className="text-lg sm:text-xl font-luxury-title font-bold text-[#0A0E1A] mt-1.5">
                  {selectedCourse.title}
                </h3>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                  {selectedCourse.duration} · {selectedCourse.level}
                </p>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                aria-label="Close"
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs — underline, distinct from the filter pills above */}
            <div className="flex items-center gap-5 border-b border-slate-200/80 overflow-x-auto scrollbar-none">
              {([
                ['syllabus', 'Curriculum'],
                ['projects', 'Deliverables'],
                ['career', 'Career Roles'],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveModalTab(key)}
                  className={`text-[11px] font-mono font-semibold uppercase tracking-wider pb-2.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-none ${
                    activeModalTab === key
                      ? 'border-[#0066CC] text-[#0066CC]'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Tab: Curriculum — numbered timeline (order is real: week/day sequence) */}
            {activeModalTab === 'syllabus' && (
              <div className="max-h-[50vh] overflow-y-auto pr-1">
                {selectedCourse.syllabus?.map((mod, idx, arr) => (
                  <div key={idx} className="relative pl-11 pb-5 last:pb-0">
                    {idx !== arr.length - 1 && (
                      <span className="absolute left-[15px] top-8 bottom-0 w-px bg-slate-200" />
                    )}
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-lg bg-[#0A0E1A] text-[#4DA3FF] font-mono text-[11px] font-bold flex items-center justify-center">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="p-3.5 bg-[#F7F9FC] rounded-lg border border-slate-200/80">
                      <span className="text-xs font-bold text-[#0A0E1A]">
                        {mod.weekOrDay}: {mod.title}
                      </span>
                      <ul className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {mod.topics.map((t, tidx) => (
                          <li key={tidx} className="text-xs text-slate-600 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-[#0066CC] shrink-0" />
                            <span className="line-clamp-1">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Deliverables & Stack */}
            {activeModalTab === 'projects' && (
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-[#F7F9FC] border border-slate-200/80">
                  <h4 className="text-[10px] font-mono font-bold text-[#0A0E1A] uppercase tracking-widest mb-2">
                    Course Deliverables
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedCourse.keyHighlights?.map((hl, hidx) => (
                      <li key={hidx} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066CC] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white border border-blue-100">
                  <h4 className="text-[10px] font-mono font-bold text-[#0A0E1A] uppercase tracking-widest mb-2">
                    Technologies Mastered
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCourse.technologies.map((tech, tidx) => (
                      <span
                        key={tidx}
                        className="relative pl-3.5 pr-2.5 py-0.5 rounded bg-blue-50/60 border border-blue-200 text-[#0066CC] text-xs font-mono font-semibold before:content-[''] before:absolute before:left-1.5 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-[#0066CC]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Career Roles */}
            {activeModalTab === 'career' && (
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-[#F7F9FC] border border-blue-100">
                  <h4 className="text-[10px] font-mono font-bold text-[#0A0E1A] uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#0066CC]" />
                    Possible Career Paths
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {selectedCourse.careerRoles?.map((role, ridx) => (
                      <div key={ridx} className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-[#0A0E1A] flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0066CC] shrink-0" />
                        {role}
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

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-slate-100">
              <a
                href={createWhatsAppDirectQueryLink(selectedCourse.title)}
                target="_blank"
                rel="noreferrer"
                className="h-[38px] px-4 rounded-lg border border-emerald-300 text-emerald-700 text-[10px] font-mono font-semibold uppercase tracking-[0.08em] flex items-center justify-center gap-1.5 hover:bg-emerald-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp Counselor
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 sm:flex-initial h-[38px] px-4 rounded-lg border border-slate-200 text-slate-700 text-[10px] font-mono font-semibold uppercase tracking-[0.08em] hover:border-slate-300 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedCourse.title;
                    setSelectedCourse(null);
                    onOpenEnrollment(title);
                  }}
                  className="flex-1 sm:flex-initial h-[38px] px-5 rounded-lg bg-[#0066CC] text-white text-[10px] font-mono font-semibold uppercase tracking-[0.08em] hover:bg-[#0052A3] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:ring-offset-2"
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