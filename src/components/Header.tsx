import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Mail,
  Menu,
  MessageSquare,
  Phone,
  ShieldCheck,
  X,
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
  /** Set to true on the dedicated certificate verifier page. */
  isVerifierPage?: boolean;
  onNavigateToSection?: (sectionId: string) => void;
}

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
  isVerifierPage = false,
  onNavigateToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // The verifier route does not render the main-page sections. Ask App
      // to switch back to the main route, then scroll after it mounts.
      onNavigateToSection?.(id);
    }
  };

  const syncHeaderHeight = useCallback(() => {
    if (headerRef.current) {
      const height = headerRef.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty(HEADER_HEIGHT_VAR, `${height}px`);
    }
  }, []);

  useEffect(() => {
    syncHeaderHeight();

    const resizeObserver = new ResizeObserver(syncHeaderHeight);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener('resize', syncHeaderHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', syncHeaderHeight);
      document.documentElement.style.removeProperty(HEADER_HEIGHT_VAR);
    };
  }, [syncHeaderHeight, mobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  // The verifier has its own clean, dedicated layout. Do not render the
  // fixed site header on that page, so it cannot cover or push the content.
  if (isVerifierPage) {
    return null;
  }

  return (
    <header
      id="main-header"
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 w-full border-b border-gray-100 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : 'shadow-xs'
      }`}
    >
      <div className="border-b border-[#0066cc]/20 bg-[#00061a] px-3 py-1.5 text-xs text-white sm:px-4 sm:py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-[11px] tracking-[0.02em] sm:gap-3 sm:text-[12px]">
            <a
              href={`tel:${COMPANY_CONFIG.phone}`}
              className="flex items-center gap-1.5 rounded-sm font-medium text-white transition-colors hover:text-[#4d9fff] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0066cc]"
            >
              <Phone className="h-3.5 w-3.5 text-[#4d9fff]" />
              <span>{COMPANY_CONFIG.phoneDisplay}</span>
            </a>

            <span className="hidden text-slate-700 sm:inline">|</span>

            <a
              href={`mailto:${COMPANY_CONFIG.admissionsEmail}`}
              className="hidden items-center gap-1.5 rounded-sm text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0066cc] sm:flex"
            >
              <Mail className="h-3.5 w-3.5 text-[#4d9fff]" />
              <span>{COMPANY_CONFIG.admissionsEmail}</span>
            </a>
          </div>

          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.08em] sm:gap-4 sm:text-[11px]">
            <button
              onClick={() => scrollToSection('batches')}
              className="hidden cursor-pointer text-slate-300 transition-colors hover:text-white md:inline-block"
            >
              New Batches
            </button>

            <button
              onClick={() => scrollToSection('placements')}
              className="hidden cursor-pointer text-slate-300 transition-colors hover:text-white lg:inline-block"
            >
              Placements
            </button>

            <button
              onClick={() => onOpenDedicatedVerifier?.()}
              className="flex cursor-pointer items-center gap-1 font-medium text-slate-200 transition-colors hover:text-white"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#4d9fff]" />
              <span>Verify Certificate</span>
            </button>

            <a
              href={createWhatsAppDirectQueryLink('Admissions')}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 font-semibold text-[#4d9fff] hover:text-[#7fbaff]"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:py-3.5">
        <div onClick={() => scrollToSection('hero')} className="shrink-0 cursor-pointer">
          <TechTrainXLogo size="md" showTagline={true} theme="light" />
        </div>

        <div className="hidden items-center gap-5 font-sans xl:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`cursor-pointer text-[11px] font-bold uppercase tracking-[0.1em] transition-colors ${
                activeSection === item.id
                  ? 'text-[#0066cc]'
                  : 'text-[#222222] hover:text-[#0066cc]'
              }`}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => onOpenDedicatedVerifier?.()}
            className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 transition-colors hover:text-[#0066cc]"
          >
            Verifier
          </button>
        </div>

        <div className="hidden items-center gap-2.5 sm:flex">
          {onOpenConsultation && (
            <button
              onClick={onOpenConsultation}
              className="custom-btn-outline flex h-[38px] items-center gap-2 rounded-lg border-blue-300 px-3.5 text-[10px] tracking-[0.08em] text-[#0066cc] hover:bg-blue-50"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066cc] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0066cc]" />
              </span>
              <span>1:1 Diagnostic</span>
            </button>
          )}

          <button
            onClick={() => onOpenEnrollment()}
            className="custom-btn flex h-[38px] items-center gap-2 rounded-lg px-4 text-[10px] tracking-[0.08em]"
          >
            <span>Enroll Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={() => onOpenEnrollment()}
            className="custom-btn custom-btn-sm sm:hidden"
          >
            Enroll
          </button>

          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="cursor-pointer rounded-md p-2 text-[#333] transition-colors hover:bg-blue-50 hover:text-[#0066cc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066cc]"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="animate-in slide-in-from-top-2 space-y-3 overflow-y-auto rounded-b-xl border-t border-gray-100 bg-white px-4 py-4 shadow-xl duration-200 xl:hidden"
          style={{ maxHeight: 'calc(100vh - var(--ttx-header-height, 96px))' }}
        >
          <div className="grid grid-cols-1 gap-1 font-sans">
            {[
              ['tier1-roadmap', 'AI & Tech Roadmap'],
              ['courses', 'All Courses'],
              ['programs', 'Training Tracks'],
              ['batches', 'New Batch Schedule'],
              ['hardware-projects', 'Hardware & Project Kits'],
              ['placements', 'Placement Records'],
              ['contact', 'Contact Us'],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="rounded-md px-3.5 py-2.5 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#333] transition-colors hover:bg-blue-50 hover:text-[#0066cc]"
              >
                {label}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDedicatedVerifier?.();
              }}
              className="rounded-md bg-blue-50 px-3.5 py-2.5 text-left text-xs font-bold uppercase tracking-[0.08em] text-[#0066cc] transition-colors hover:bg-blue-100"
            >
              Verify Certificate (Official Registry)
            </button>
          </div>

          <div className="flex flex-col gap-2 border-t border-gray-100 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnrollment();
              }}
              className="custom-btn w-full justify-center"
            >
              <span>Enroll in Course</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
