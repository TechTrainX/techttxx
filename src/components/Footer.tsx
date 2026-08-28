import React from 'react';
import {
  Building, Phone, Mail, MapPin, ShieldCheck,
  ArrowUp, Lock, Award, Clock, Sparkles, ExternalLink, ChevronRight, CheckCircle2
} from 'lucide-react';
import { TechTrainXLogo } from './TechTrainXLogo';
import { COMPANY_CONFIG } from '../config/companyConfig.js';

interface FooterProps {
  onOpenCertificateVerifier?: () => void;
  onOpenAdminPortal: () => void;
  onOpenEnrollment: () => void;
  onOpenDedicatedVerifier?: () => void;
}

const BLUE = '#0066cc';

/** A labelled schematic column header — a rule, an index dot, a title. Reused four times. */
const ColumnHeader: React.FC<{ index: string; title: string }> = ({ index, title }) => (
  <h4 className="flex items-center gap-2 pb-2 border-b border-slate-800 font-sans text-xs font-bold uppercase tracking-[0.14em] text-white">
    <span className="font-mono text-[9px] text-[#0066cc]">{index}</span>
    <span className="w-1 h-1 rounded-full bg-[#0066cc]" />
    <span>{title}</span>
  </h4>
);

const FooterLink: React.FC<{ onClick: () => void; children: React.ReactNode; muted?: boolean }> = ({ onClick, children, muted }) => (
  <button
    onClick={onClick}
    className={`group flex items-center gap-1.5 text-left text-xs font-sans transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0066cc] rounded-sm ${
      muted ? 'text-slate-500 hover:text-slate-300' : 'text-slate-300 hover:text-white'
    }`}
  >
    <ChevronRight className="w-3 h-3 text-[#0066cc] shrink-0 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5" />
    <span className="group-hover:translate-x-0.5 motion-safe:transition-transform motion-safe:duration-200">{children}</span>
  </button>
);

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
    <footer id="main-footer" className="relative bg-[#050814] text-slate-300 pt-16 pb-10 px-4 border-t border-slate-800/80 overflow-hidden">

      {/* Blueprint grid — faint graph paper, the same material language as the rest of the site */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0066cc 1px, transparent 1px), linear-gradient(to bottom, #0066cc 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Top glow divider */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#0066cc]/60 to-transparent" />

      {/* Background soft glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0066cc]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Col 1: Brand + accreditation */}
          <div className="lg:col-span-4 space-y-4">
            <TechTrainXLogo size="md" showTagline={true} theme="dark" />

            <p className="text-xs leading-relaxed max-w-sm font-sans text-slate-300">
              TechTrainX is an applied deep-tech training academy and research foundry. Practical software engineering, embedded IoT systems, and verified career placements.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/70 border border-[#0066cc]/40 text-[#0066cc] text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Govt. MSME Registered</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenDedicatedVerifier && onOpenDedicatedVerifier()}
                className="w-full sm:w-auto h-10 px-4 rounded-md bg-[#0066cc] hover:bg-[#0052a3] text-white text-[11px] font-bold tracking-[0.08em] uppercase flex items-center justify-center gap-2 transition-all duration-200 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050814] focus-visible:ring-[#0066cc]"
              >
                <Award className="w-4 h-4 text-white" />
                <span>Verify Student Certificate</span>
              </button>
            </div>
          </div>

          {/* Col 2: Curriculum & Labs */}
          <div className="lg:col-span-3 space-y-3.5">
            <ColumnHeader index="01" title="Curriculum & Labs" />
            <ul className="space-y-2.5">
              <li><FooterLink onClick={() => scrollToSection('courses')}>All Engineering Courses</FooterLink></li>
              <li><FooterLink onClick={() => scrollToSection('programs')}>Full-Stack & Cloud Tracks</FooterLink></li>
              <li><FooterLink onClick={() => scrollToSection('hardware-projects')}>Hardware & IoT Lab Kits</FooterLink></li>
              <li><FooterLink onClick={() => scrollToSection('batches')}>Live Cohort Timetable</FooterLink></li>
              <li><FooterLink onClick={() => scrollToSection('gallery')}>Campus & Hackathon Gallery</FooterLink></li>
            </ul>
          </div>

          {/* Col 3: Career & Hub */}
          <div className="lg:col-span-2 space-y-3.5">
            <ColumnHeader index="02" title="Career & Hub" />
            <ul className="space-y-2.5">
              <li><FooterLink onClick={() => scrollToSection('placements')}>Placement Statistics</FooterLink></li>
              <li><FooterLink onClick={() => scrollToSection('software-services')}>Software Services</FooterLink></li>
              <li><FooterLink onClick={() => scrollToSection('contact')}>Admissions Office</FooterLink></li>
              <li>
                <button
                  onClick={onOpenAdminPortal}
                  className="group flex items-center gap-1.5 text-left text-xs font-sans text-slate-500 hover:text-slate-300 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0066cc] rounded-sm"
                >
                  <Lock className="w-3 h-3 shrink-0" />
                  <span>Staff & Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus & Admissions */}
          <div className="lg:col-span-3 space-y-3.5">
            <ColumnHeader index="03" title="Campus & Admissions" />

            <div className="space-y-3 text-xs font-sans">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-950/80 border border-[#0066cc]/40 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#0066cc]" />
                </div>
                <a href={`tel:${COMPANY_CONFIG.phone}`} className="text-white font-semibold hover:text-[#0066cc] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0066cc] rounded-sm">
                  {COMPANY_CONFIG.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-950/80 border border-[#0066cc]/40 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-[#0066cc]" />
                </div>
                <a href={`mailto:${COMPANY_CONFIG.admissionsEmail}`} className="text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0066cc] rounded-sm">
                  {COMPANY_CONFIG.admissionsEmail}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-950/80 border border-[#0066cc]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0066cc]" />
                </div>
                <span className="text-[11px] leading-relaxed text-slate-300">{COMPANY_CONFIG.campusAddress}</span>
              </div>

              <div className="flex items-center gap-2.5 pt-1 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                <span>Mon – Sat: 09:00 AM – 08:00 PM IST</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom strip */}
        <div className="pt-8 border-t border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-400">
          <div className="flex flex-wrap items-center gap-3">
            <p>
              © {new Date().getFullYear()} {COMPANY_CONFIG.brandName} — A Unit of{' '}
              <a
                href="https://xnava.in"
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 font-semibold hover:text-[#0066cc] transition-colors underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0066cc] rounded-sm"
              >
                Xnava Enterprise
              </a>
              . All rights reserved.
            </p>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-700" />
            <span className="hidden sm:inline-block text-[11px] text-slate-400">Govt. Registered (MSME)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenEnrollment}
              className="h-8 px-3.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050814] focus-visible:ring-[#0066cc]"
            >
              Enroll Now
            </button>
            <button
              onClick={scrollToTop}
              className="h-8 px-3.5 rounded-md bg-slate-900 hover:bg-[#0066cc] text-slate-300 hover:text-white border border-slate-700/80 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050814] focus-visible:ring-[#0066cc]"
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