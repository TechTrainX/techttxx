import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Phone, Mail, MessageSquare, ShieldCheck, Menu, X, ArrowRight,
} from 'lucide-react';
import { createWhatsAppDirectQueryLink } from '../services/whatsappService';
import { TechTrainXLogo } from './TechTrainXLogo';
import { COMPANY_CONFIG } from '../config/companyConfig.js';

interface HeaderProps {
  onOpenEnrollment: (courseOrProgram?: string) => void;
  onOpenDedicatedVerifier?: () => void;
  onOpenConsultation?: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

// CSS custom property that <main> (and anything else that needs to sit
// below the fixed header) reads to know how much top offset to reserve.
// Kept as a var (not a hardcoded px value) so it self-corrects across
// breakpoints, font-size changes, and whenever the utility strip wraps.
const HEADER_HEIGHT_VAR = '--ttx-header-height';

const NAV_ITEMS: { id: string; label: string }[] = [
  { id: 'courses', label: 'Courses' },
  { id: 'programs', label: 'Tracks' },
  { id: 'batches', label: 'Schedules' },
  { id: 'hardware-projects', label: 'IoT Kits' },
  { id: 'placements', label: 'Placements' },
];

export const Header: React.FC<HeaderProps> = ({
  onOpenEnrollment,
  onOpenDedicatedVerifier,
  onOpenConsultation,
  activeSection,
  setActiveSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- Keep the layout spacer in sync with the header's real rendered
  // height. This is what makes `fixed` safe to use instead of `sticky`:
  // instead of guessing a px value, we measure and publish it as a CSS
  // var that <main> (or anything else) can consume via
  // `padding-top: var(--ttx-header-height, <fallback>)`.
  const syncHeaderHeight = useCallback(() => {
    if (headerRef.current) {
      const height = headerRef.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty(HEADER_HEIGHT_VAR, `${height}px`);
    }
  }, []);

  useEffect(() => {
    syncHeaderHeight();

    const ro = new ResizeObserver(() => syncHeaderHeight());
    if (headerRef.current) ro.observe(headerRef.current);

    window.addEventListener('resize', syncHeaderHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', syncHeaderHeight);
    };
    // Re-measure whenever the mobile menu opens/closes, since that
    // changes the header's rendered height.
  }, [syncHeaderHeight, mobileMenuOpen]);

  // Subtle elevation once the page has scrolled — purely cosmetic,
  // doesn't affect positioning.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scroll while the mobile drawer is open, and let
  // Escape close it — small polish, no functional risk.
  useEffect(() => {
    if (mobileMenuOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', onKeyDown);
      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener('keydown', onKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  return (
    <header
      id="main-header"
      ref={headerRef}
      className={`fixed top-0 inset-x-0 z-50 w-full bg-white border-b border-gray-100 transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : 'shadow-xs'
      }`}
    >
      {/* Deep Navy Utility Strip */}
      <div className="bg-[#00061a] text-white text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#0066cc]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">

          {/* Contact Left Info */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-[12px] tracking-[0.02em]">
            <a
              href={`tel:${COMPANY_CONFIG.phone}`}
              className="flex items-center gap-1.5 hover:text-[#4d9fff] transition-colors font-medium text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0066cc] rounded-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#4d9fff]" />
              <span>{COMPANY_CONFIG.phoneDisplay}</span>
            </a>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <a
              href={`mailto:${COMPANY_CONFIG.admissionsEmail}`}
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0066cc] rounded-sm"
            >
              <Mail className="w-3.5 h-3.5 text-[#4d9fff]" />
              <span>{COMPANY_CONFIG.admissionsEmail}</span>
            </a>
          </div>

          {/* Utility Quick Links Right */}
          <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] uppercase tracking-[0.08em]">
            <button
              onClick={() => scrollToSection('batches')}
              className="hidden md:inline-block text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              New Batches
            </button>
            <button
              onClick={() => scrollToSection('placements')}
              className="hidden lg:inline-block text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Placements
            </button>
            <button
              onClick={() => onOpenDedicatedVerifier && onOpenDedicatedVerifier()}
              className="text-slate-200 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#4d9fff]" />
              <span>Verify Certificate</span>
            </button>
            <a
              href={createWhatsAppDirectQueryLink('Admissions')}
              target="_blank"
              rel="noreferrer"
              className="text-[#4d9fff] hover:text-[#7fbaff] font-semibold flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main White Navbar */}
      <nav className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <div onClick={() => scrollToSection('hero')} className="shrink-0 cursor-pointer">
          <TechTrainXLogo size="md" showTagline={true} theme="light" />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center gap-5 font-sans">
          <button
            onClick={() => scrollToSection('tier1-roadmap')}
            className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#0066cc] hover:text-[#004080] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {/* <span className="relative flex w-1.5 h-1.5">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066cc] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0066cc]" />
            </span> */}
            {/* <span>AI & Tech Roadmap</span> */}
          </button>

          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-[11px] font-bold uppercase tracking-[0.1em] transition-colors cursor-pointer ${
                activeSection === item.id ? 'text-[#0066cc]' : 'text-[#222222] hover:text-[#0066cc]'
              }`}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => onOpenDedicatedVerifier && onOpenDedicatedVerifier()}
            className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 hover:text-[#0066cc] transition-colors cursor-pointer"
          >
            Verifier
          </button>
        </div>

        {/* Primary CTA Button */}
        <div className="hidden sm:flex items-center gap-2.5">
          {onOpenConsultation && (
            <button
              onClick={onOpenConsultation}
              className="custom-btn-outline h-[38px] text-[10px] tracking-[0.08em] px-3.5 rounded-lg border-blue-300 text-[#0066cc] hover:bg-blue-50 cursor-pointer"
            >
                <span className="relative flex w-1.5 h-1.5">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066cc] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0066cc]" />
            </span>
              <span>1:1 Diagnostic</span>
            </button>
          )}

          <button
            onClick={() => onOpenEnrollment()}
            className="custom-btn h-[38px] text-[10px] tracking-[0.08em] px-4 rounded-lg"
          >
            <span>Enroll Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            onClick={() => onOpenEnrollment()}
            className="custom-btn custom-btn-sm sm:hidden"
          >
            Enroll
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-[#333] hover:bg-blue-50 hover:text-[#0066cc] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066cc]"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </nav>

      {/* Mobile Drawer Menu — capped to the viewport and scrollable on
          its own, so a tall menu never gets clipped or pushes content
          off-screen underneath the fixed header. */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-xl rounded-b-xl animate-in slide-in-from-top-2 duration-200 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - var(--ttx-header-height, 96px))' }}
        >
          <div className="grid grid-cols-1 gap-1 font-sans">
            <button
              onClick={() => scrollToSection('tier1-roadmap')}
              className="text-left px-3.5 py-2.5 rounded-md text-xs uppercase tracking-[0.08em] font-bold text-[#0066cc] bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              AI & Tech Roadmap
            </button>
            <button
              onClick={() => scrollToSection('courses')}
              className="text-left px-3.5 py-2.5 rounded-md text-xs uppercase tracking-[0.08em] font-semibold text-[#333] hover:bg-blue-50 hover:text-[#0066cc] transition-colors"
            >
              All Courses
            </button>
            <button
              onClick={() => scrollToSection('programs')}
              className="text-left px-3.5 py-2.5 rounded-md text-xs uppercase tracking-[0.08em] font-semibold text-[#333] hover:bg-blue-50 hover:text-[#0066cc] transition-colors"
            >
              Training Tracks
            </button>
            <button
              onClick={() => scrollToSection('batches')}
              className="text-left px-3.5 py-2.5 rounded-md text-xs uppercase tracking-[0.08em] font-semibold text-[#333] hover:bg-blue-50 hover:text-[#0066cc] transition-colors"
            >
              New Batch Schedule
            </button>
            <button
              onClick={() => scrollToSection('hardware-projects')}
              className="text-left px-3.5 py-2.5 rounded-md text-xs uppercase tracking-[0.08em] font-semibold text-[#333] hover:bg-blue-50 hover:text-[#0066cc] transition-colors"
            >
              Hardware & Project Kits
            </button>
            <button
              onClick={() => scrollToSection('placements')}
              className="text-left px-3.5 py-2.5 rounded-md text-xs uppercase tracking-[0.08em] font-semibold text-[#333] hover:bg-blue-50 hover:text-[#0066cc] transition-colors"
            >
              Placement Records
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenDedicatedVerifier) onOpenDedicatedVerifier();
              }}
              className="text-left px-3.5 py-2.5 rounded-md text-xs uppercase tracking-[0.08em] font-bold text-[#0066cc] bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              Verify Certificate (Official Registry)
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left px-3.5 py-2.5 rounded-md text-xs uppercase tracking-[0.08em] font-semibold text-[#333] hover:bg-blue-50 hover:text-[#0066cc] transition-colors"
            >
              Contact Us
            </button>
          </div>

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnrollment();
              }}
              className="custom-btn w-full justify-center"
            >
              <span>Enroll in Course</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </header>
  );
};