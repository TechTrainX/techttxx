import React, { useState } from 'react';
import { 
  Phone, Mail, MessageSquare, Award, ChevronDown, 
  Search, ShieldCheck, Menu, X, ArrowRight, BookOpen,
  Calendar, Layers, CheckCircle2
} from 'lucide-react';
import { createWhatsAppDirectQueryLink } from '../services/whatsappService';
import { TechTrainXLogo } from './TechTrainXLogo';
import { COMPANY_CONFIG } from '../config/companyConfig';

interface HeaderProps {
  onOpenEnrollment: (courseOrProgram?: string) => void;
  onOpenQuickSearch?: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEnrollment,
  onOpenQuickSearch,
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
    <header id="main-header" className="sticky top-0 z-50 w-full bg-white shadow-xs">
      
      {/* Deep Navy Utility Strip */}
      <div className="bg-[#00061a] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Contact Left Info */}
          <div className="flex items-center gap-4 text-[13px]">
            <a 
              href={`tel:${COMPANY_CONFIG.phone}`} 
              className="flex items-center gap-1.5 hover:text-[#0066cc] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#0066cc]" />
              <span>{COMPANY_CONFIG.phoneDisplay}</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a 
              href={`mailto:${COMPANY_CONFIG.admissionsEmail}`} 
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#0066cc]" />
              <span>{COMPANY_CONFIG.admissionsEmail}</span>
            </a>
          </div>

          {/* Utility Quick Links Right */}
          <div className="flex items-center gap-4 text-[12px]">
            <button 
              onClick={() => scrollToSection('batches')}
              className="hidden md:inline-block text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              New Batches
            </button>
            <button 
              onClick={() => scrollToSection('placements')}
              className="hidden md:inline-block text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Placements
            </button>
            <button 
              onClick={() => scrollToSection('verifier')}
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
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
              <span className="hidden sm:inline">WhatsApp Help</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main White Navbar */}
      <nav className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div onClick={() => scrollToSection('hero')} className="shrink-0">
          <TechTrainXLogo size="md" showTagline={true} theme="light" />
        </div>

        {/* Course Search Box */}
        <form onSubmit={handleSearch} className="hidden lg:flex items-stretch max-w-sm w-full mx-2">
          <div className="relative w-full flex items-center">
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search course (e.g. MERN, AI, Java)..."
              className="w-full bg-slate-50 border border-gray-300 rounded-l-[10px] pl-3.5 pr-2 py-2 text-xs text-[#333] focus:outline-none focus:border-[#0066cc] focus:bg-white"
            />
            <button
              type="submit"
              className="bg-[#0066cc] hover:bg-[#00061a] text-white px-4 py-2 rounded-r-[10px] flex items-center justify-center transition-colors cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('courses')}
            className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeSection === 'courses' ? 'text-[#0066cc]' : 'text-[#333333] hover:text-[#0066cc]'
            }`}
          >
            All Courses
          </button>
          <button
            onClick={() => scrollToSection('programs')}
            className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeSection === 'programs' ? 'text-[#0066cc]' : 'text-[#333333] hover:text-[#0066cc]'
            }`}
          >
            Training Tracks
          </button>
          <button
            onClick={() => scrollToSection('batches')}
            className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeSection === 'batches' ? 'text-[#0066cc]' : 'text-[#333333] hover:text-[#0066cc]'
            }`}
          >
            Batch Schedule
          </button>
          <button
            onClick={() => scrollToSection('hardware-projects')}
            className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeSection === 'hardware-projects' ? 'text-[#0066cc]' : 'text-[#333333] hover:text-[#0066cc]'
            }`}
          >
            Project Kits
          </button>
          <button
            onClick={() => scrollToSection('placements')}
            className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeSection === 'placements' ? 'text-[#0066cc]' : 'text-[#333333] hover:text-[#0066cc]'
            }`}
          >
            Placements
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeSection === 'contact' ? 'text-[#0066cc]' : 'text-[#333333] hover:text-[#0066cc]'
            }`}
          >
            Contact
          </button>
        </div>

        {/* Primary CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenEnrollment()}
            className="custom-btn"
          >
            <span>Enroll Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            onClick={() => onOpenEnrollment()}
            className="custom-btn py-1.5 px-3.5 text-xs sm:hidden"
          >
            Enroll
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#333] hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3 shadow-lg">
          <form onSubmit={handleSearch} className="flex mb-3">
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search courses..."
              className="w-full bg-slate-50 border border-gray-300 rounded-l-[10px] px-3 py-2 text-xs text-[#333]"
            />
            <button
              type="submit"
              className="bg-[#0066cc] text-white px-4 py-2 rounded-r-[10px]"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => scrollToSection('courses')}
              className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#333] hover:bg-blue-50 hover:text-[#0066cc]"
            >
              All Courses
            </button>
            <button
              onClick={() => scrollToSection('programs')}
              className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#333] hover:bg-blue-50 hover:text-[#0066cc]"
            >
              Training Tracks
            </button>
            <button
              onClick={() => scrollToSection('batches')}
              className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#333] hover:bg-blue-50 hover:text-[#0066cc]"
            >
              New Batch Schedule
            </button>
            <button
              onClick={() => scrollToSection('hardware-projects')}
              className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#333] hover:bg-blue-50 hover:text-[#0066cc]"
            >
              Hardware & Project Kits
            </button>
            <button
              onClick={() => scrollToSection('placements')}
              className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#333] hover:bg-blue-50 hover:text-[#0066cc]"
            >
              Placement Records
            </button>
            <button
              onClick={() => scrollToSection('verifier')}
              className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#333] hover:bg-blue-50 hover:text-[#0066cc]"
            >
              Certificate Verification
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#333] hover:bg-blue-50 hover:text-[#0066cc]"
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
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
