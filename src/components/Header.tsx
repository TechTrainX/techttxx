import React, { useState } from 'react';
import { 
  Phone, Mail, MessageSquare, Award, ChevronDown, 
  Search, ShieldCheck, Menu, X, ArrowRight, BookOpen,
  Calendar, Layers, CheckCircle2
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

export const Header: React.FC<HeaderProps> = ({
  onOpenEnrollment,
  onOpenDedicatedVerifier,
  onOpenConsultation,
  activeSection,
  setActiveSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      const el = document.getElementById('courses');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full bg-white shadow-xs border-b border-gray-100">
      
      {/* Deep Navy Utility Strip */}
      <div className="bg-[#00061a] text-white text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Contact Left Info */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-[12px] tracking-[0.02em]">
            <a 
              href={`tel:${COMPANY_CONFIG.phone}`} 
              className="flex items-center gap-1.5 hover:text-[#0066cc] transition-colors font-medium text-white"
            >
              <Phone className="w-3.5 h-3.5 text-[#0066cc]" />
              <span>{COMPANY_CONFIG.phoneDisplay}</span>
            </a>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <a 
              href={`mailto:${COMPANY_CONFIG.admissionsEmail}`} 
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#0066cc]" />
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
              <ShieldCheck className="w-3.5 h-3.5 text-[#7fffd4]" />
              <span>Verify Certificate</span>
            </button>
            <a
              href={createWhatsAppDirectQueryLink('Admissions')}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
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
            onClick={() => scrollToSection('courses')}
            className={`text-[11px] font-bold uppercase tracking-[0.1em] transition-colors cursor-pointer ${
              activeSection === 'courses' ? 'text-[#0066cc]' : 'text-[#222222] hover:text-[#0066cc]'
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => scrollToSection('tier1-roadmap')}
            className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#0066cc] hover:text-[#004080] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc]" />
            <span>AI & Tech Roadmap</span>
          </button>
          <button
            onClick={() => scrollToSection('programs')}
            className={`text-[11px] font-bold uppercase tracking-[0.1em] transition-colors cursor-pointer ${
              activeSection === 'programs' ? 'text-[#0066cc]' : 'text-[#222222] hover:text-[#0066cc]'
            }`}
          >
            Tracks
          </button>
          <button
            onClick={() => scrollToSection('batches')}
            className={`text-[11px] font-bold uppercase tracking-[0.1em] transition-colors cursor-pointer ${
              activeSection === 'batches' ? 'text-[#0066cc]' : 'text-[#222222] hover:text-[#0066cc]'
            }`}
          >
            Schedules
          </button>
          <button
            onClick={() => scrollToSection('hardware-projects')}
            className={`text-[11px] font-bold uppercase tracking-[0.1em] transition-colors cursor-pointer ${
              activeSection === 'hardware-projects' ? 'text-[#0066cc]' : 'text-[#222222] hover:text-[#0066cc]'
            }`}
          >
            IoT Kits
          </button>
          <button
            onClick={() => scrollToSection('placements')}
            className={`text-[11px] font-bold uppercase tracking-[0.1em] transition-colors cursor-pointer ${
              activeSection === 'placements' ? 'text-[#0066cc]' : 'text-[#222222] hover:text-[#0066cc]'
            }`}
          >
            Placements
          </button>
          <button
            onClick={() => onOpenDedicatedVerifier && onOpenDedicatedVerifier()}
            className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-600 hover:text-[#0066cc] transition-colors cursor-pointer"
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
            className="p-2 rounded-md text-[#333] hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-xl rounded-b-xl animate-in slide-in-from-top-2 duration-200">
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
