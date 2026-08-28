import React from 'react';
import { 
  Building, Phone, Mail, MapPin, ShieldCheck, 
  ArrowUp, Lock, Award, Clock, Sparkles, ExternalLink, ChevronRight, CheckCircle2
} from 'lucide-react';
import { TechTrainXLogo } from './TechTrainXLogo';
import { COMPANY_CONFIG } from '../config/companyConfig';

interface FooterProps {
  onOpenCertificateVerifier?: () => void;
  onOpenAdminPortal: () => void;
  onOpenEnrollment: () => void;
  onOpenDedicatedVerifier?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCertificateVerifier,
  onOpenAdminPortal,
  onOpenEnrollment,
  onOpenDedicatedVerifier
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative bg-[#050814] text-slate-300 pt-16 pb-12 px-4 border-t border-slate-800/80 overflow-hidden">
      
      {/* Subtle Top Glow Divider */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#0066cc]/50 to-transparent" />
      
      {/* Background Soft Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main 4-Column Balanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1: Brand Info & Accreditation (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <TechTrainXLogo size="md" showTagline={true} theme="dark" />
            
            <p className="text-xs leading-relaxed max-w-sm font-sans text-slate-300">
              TechTrainX is an applied deep-tech training academy and research foundry. Practical software engineering, embedded IoT systems, and verified career placements.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/70 border border-blue-800/50 text-[#7fffd4] text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7fffd4]" />
                <span>Govt. MSME Registered</span>
              </div>
            </div>

            {/* Standard Rectangular Action Button with subtle border radius */}
            <div className="pt-2">
              <button
                onClick={() => onOpenDedicatedVerifier && onOpenDedicatedVerifier()}
                className="w-full sm:w-auto h-10 px-4 rounded-md bg-[#0066cc] hover:bg-[#0052a3] text-white text-[11px] font-bold tracking-[0.08em] uppercase flex items-center justify-center gap-2 transition-all duration-200 shadow-sm cursor-pointer"
              >
                <Award className="w-4 h-4 text-white" />
                <span>Verify Student Certificate</span>
              </button>
            </div>
          </div>

          {/* Col 2: Curriculum & Labs (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.14em] font-sans border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc]" />
              <span>Curriculum & Labs</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-slate-300">
              <li>
                <button onClick={() => scrollToSection('courses')} className="hover:text-[#7fffd4] hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#0066cc] shrink-0" />
                  <span>All Engineering Courses</span>
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('programs')} className="hover:text-[#7fffd4] hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#0066cc] shrink-0" />
                  <span>Full-Stack & Cloud Tracks</span>
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('hardware-projects')} className="hover:text-[#7fffd4] hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#0066cc] shrink-0" />
                  <span>Hardware & IoT Lab Kits</span>
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('batches')} className="hover:text-[#7fffd4] hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#0066cc] shrink-0" />
                  <span>Live Cohort Timetable</span>
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('gallery')} className="hover:text-[#7fffd4] hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#0066cc] shrink-0" />
                  <span>Campus & Hackathon Gallery</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Career & Credentials (2.5 Cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.14em] font-sans border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc]" />
              <span>Career & Hub</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-slate-300">
              <li>
                <button onClick={() => scrollToSection('placements')} className="hover:text-[#7fffd4] hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#0066cc] shrink-0" />
                  <span>Placement Statistics</span>
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('software-services')} className="hover:text-[#7fffd4] hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#0066cc] shrink-0" />
                  <span>Software Services</span>
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-[#7fffd4] hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#0066cc] shrink-0" />
                  <span>Admissions Office</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAdminPortal} 
                  className="hover:text-[#7fffd4] hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-left text-slate-400 hover:text-white"
                >
                  <Lock className="w-3 h-3 text-gray-500 shrink-0" />
                  <span>Staff & Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus & Admissions (2.5 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.14em] font-sans border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc]" />
              <span>Campus & Admissions</span>
            </h4>
            
            <div className="space-y-3 text-xs font-sans">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-950/80 border border-blue-800/60 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#0066cc]" />
                </div>
                <a href={`tel:${COMPANY_CONFIG.phone}`} className="text-white font-semibold hover:text-[#7fffd4] transition-colors">
                  {COMPANY_CONFIG.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-950/80 border border-blue-800/60 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-[#0066cc]" />
                </div>
                <a href={`mailto:${COMPANY_CONFIG.admissionsEmail}`} className="text-slate-300 hover:text-white transition-colors">
                  {COMPANY_CONFIG.admissionsEmail}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-950/80 border border-blue-800/60 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0066cc]" />
                </div>
                <span className="text-[11px] leading-relaxed text-slate-300">{COMPANY_CONFIG.campusAddress}</span>
              </div>

              <div className="flex items-center gap-2.5 pt-1 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 text-[#7fffd4] shrink-0" />
                <span>Mon – Sat: 09:00 AM – 08:00 PM IST</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-400">
          <div className="flex flex-wrap items-center gap-3">
            <p>© {new Date().getFullYear()} {COMPANY_CONFIG.brandName} — A Unit of <a href="https://xnava.in" target="_blank" rel="noreferrer" className="text-slate-300 font-semibold hover:text-[#7fffd4] transition-colors underline">Xnava Enterprise</a>. All rights reserved.</p>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-700" />
            <span className="hidden sm:inline-block text-[11px] text-slate-400">Govt. Registered (MSME)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenEnrollment}
              className="h-8 px-3.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Enroll Now
            </button>
            <button 
              onClick={scrollToTop} 
              className="h-8 px-3.5 rounded-md bg-slate-900 hover:bg-[#0066cc] text-slate-300 hover:text-white border border-slate-700/80 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
