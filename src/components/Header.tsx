import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MessageSquare, Award, ChevronDown, 
  Search, ShieldCheck, Menu, X, Sparkles, ArrowRight, Code2,
  Cpu, Terminal, Command
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
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);

  // Global key listener for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (onOpenQuickSearch) onOpenQuickSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenQuickSearch]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    setCoursesDropdownOpen(false);
    setProgramsDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Announcement & Telemetry Bar */}
      <div id="top-announcement-bar" className="bg-[#030712] border-b border-slate-800/80 text-xs py-1.5 px-3 sm:px-4 text-cyan-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Mobile View: Compact Helpline & Admissions Badge */}
          <div className="flex md:hidden items-center gap-2 overflow-hidden">
            <a 
              href={`tel:${COMPANY_CONFIG.phone}`} 
              className="inline-flex items-center gap-1 text-[11px] font-bold text-white hover:text-cyan-400 shrink-0 py-0.5"
            >
              <Phone className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>{COMPANY_CONFIG.phoneDisplay}</span>
            </a>
            <span className="inline-flex items-center gap-1 bg-cyan-950/90 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/40 text-[10px] font-extrabold shrink-0">
              <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
              <span>Placement Batches Active</span>
            </span>
          </div>

          {/* Desktop Left Telemetry Info */}
          <div className="hidden md:flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-mono">LIVE LABS</span>
              <span className="text-slate-600">|</span>
              <a href={`tel:${COMPANY_CONFIG.phone}`} className="flex items-center gap-1 hover:text-white transition-colors">
                <Phone className="w-3 h-3 text-cyan-400" />
                <span>{COMPANY_CONFIG.phoneDisplay}</span>
              </a>
            </div>
            <a href={`mailto:${COMPANY_CONFIG.admissionsEmail}`} className="flex items-center gap-1.5 hover:text-white text-slate-400 transition-colors text-xs">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{COMPANY_CONFIG.admissionsEmail}</span>
            </a>
            <span className="inline-flex items-center gap-1 bg-slate-900 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-500/30 text-[11px] font-medium">
              <ShieldCheck className="w-3 h-3 text-cyan-400" /> Deep-Tech Placement & Industrial Foundry
            </span>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            {onOpenQuickSearch && (
              <button
                onClick={onOpenQuickSearch}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-700 hover:bg-slate-800"
                title="Search Command Palette"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            )}
            <a
              href={createWhatsAppDirectQueryLink('Admissions & Placement Track')}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {onOpenQuickSearch && (
              <button
                onClick={onOpenQuickSearch}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 hover:text-white border border-slate-700/80 text-[11px] transition-colors cursor-pointer"
              >
                <Search className="w-3 h-3 text-cyan-400" />
                <span>Search</span>
                <kbd className="text-[9px] bg-slate-800 px-1 py-0.2 rounded border border-slate-700 text-slate-300">⌘K</kbd>
              </button>
            )}
            <a
              href={createWhatsAppDirectQueryLink('Admissions & Placement Track')}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-semibold transition-colors text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav id="navbar-container" className="glass-panel border-b border-slate-800/90 px-4 py-3 bg-[#080e1e]/90">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Sub-Brand */}
          <div 
            id="brand-logo-button"
            onClick={() => scrollToSection('hero')} 
            className="flex items-center"
          >
            <TechTrainXLogo size="md" showTagline={true} />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-4.5 2xl:gap-5.5">
            <button
              onClick={() => scrollToSection('hero')}
              className={`text-xs 2xl:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeSection === 'hero' ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
            </button>

            {/* Courses Dropdown */}
            <div className="relative group" onMouseEnter={() => setCoursesDropdownOpen(true)} onMouseLeave={() => setCoursesDropdownOpen(false)}>
              <button
                onClick={() => scrollToSection('courses')}
                className="text-xs 2xl:text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1 py-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Courses</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-cyan-400" />
              </button>

              {coursesDropdownOpen && (
                <div className="absolute top-full left-0 w-[560px] p-4 bg-slate-900/98 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-2xl grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div>
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Software & Cloud</h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      <li><a onClick={() => scrollToSection('courses')} className="hover:text-cyan-300 hover:translate-x-1 transition-transform inline-block cursor-pointer">Full Stack MERN Engineering</a></li>
                      <li><a onClick={() => scrollToSection('courses')} className="hover:text-cyan-300 hover:translate-x-1 transition-transform inline-block cursor-pointer">Python Enterprise & Django 5</a></li>
                      <li><a onClick={() => scrollToSection('courses')} className="hover:text-cyan-300 hover:translate-x-1 transition-transform inline-block cursor-pointer">Java Spring Boot & Microservices</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">AI, Mobile & Data</h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      <li><a onClick={() => scrollToSection('courses')} className="hover:text-indigo-300 hover:translate-x-1 transition-transform inline-block cursor-pointer">AI, Machine Learning & GenAI</a></li>
                      <li><a onClick={() => scrollToSection('courses')} className="hover:text-indigo-300 hover:translate-x-1 transition-transform inline-block cursor-pointer">Flutter Cross-Platform Apps</a></li>
                      <li><a onClick={() => scrollToSection('courses')} className="hover:text-indigo-300 hover:translate-x-1 transition-transform inline-block cursor-pointer">Data Structures & Placement Prep</a></li>
                      <li><a onClick={() => scrollToSection('courses')} className="hover:text-indigo-300 hover:translate-x-1 transition-transform inline-block cursor-pointer">PostgreSQL & Redis DBs</a></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Training Programs Dropdown */}
            <div className="relative group" onMouseEnter={() => setProgramsDropdownOpen(true)} onMouseLeave={() => setProgramsDropdownOpen(false)}>
              <button
                onClick={() => scrollToSection('programs')}
                className="text-xs 2xl:text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1 py-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Programs</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-cyan-400" />
              </button>

              {programsDropdownOpen && (
                <div className="absolute top-full left-0 w-72 p-3 bg-slate-900/98 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-2xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div onClick={() => scrollToSection('programs')} className="p-2 hover:bg-slate-800 rounded-xl cursor-pointer">
                    <p className="text-xs font-bold text-white">Summer Industrial Internship (4-6 Weeks)</p>
                    <p className="text-[11px] text-slate-400">For B.Tech / BCA / MCA / Diploma</p>
                  </div>
                  <div onClick={() => scrollToSection('programs')} className="p-2 hover:bg-slate-800 rounded-xl cursor-pointer">
                    <p className="text-xs font-bold text-white">6-Month Placement Apprenticeship</p>
                    <p className="text-[11px] text-slate-400">Live Production Project Mentorship</p>
                  </div>
                  <div onClick={() => scrollToSection('programs')} className="p-2 hover:bg-slate-800 rounded-xl cursor-pointer">
                    <p className="text-xs font-bold text-white">Minor & Major Project Guidance</p>
                    <p className="text-[11px] text-slate-400">University Approved Synopses & Code</p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection('batches')}
              className="text-xs 2xl:text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              Batches
            </button>

            <button
              onClick={() => scrollToSection('placements')}
              className="text-xs 2xl:text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              Placements
            </button>

            {/* Hardware Projects Link */}
            <button
              onClick={() => scrollToSection('hardware-projects')}
              className={`text-xs 2xl:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                activeSection === 'hardware-projects' ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-300'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Projects & Kits</span>
            </button>

            <button
              onClick={() => scrollToSection('software-services')}
              className="text-xs 2xl:text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="text-xs 2xl:text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              Contact
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <button
              id="header-enroll-btn"
              onClick={() => onOpenEnrollment()}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 p-px shadow-md shadow-cyan-500/15 cursor-pointer whitespace-nowrap"
            >
              <div className="px-3.5 2xl:px-4 py-2 rounded-[11px] bg-slate-950 transition-all group-hover:bg-transparent flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:text-slate-950 transition-colors shrink-0" />
                <span className="text-xs 2xl:text-sm font-bold text-white group-hover:text-slate-950">Fast-Track Admission</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:text-slate-950 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            </button>
          </div>

          {/* Mobile / Tablet Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenEnrollment()}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 text-xs font-black shadow-md cursor-pointer whitespace-nowrap"
            >
              Enroll
            </button>
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#080e1e] border-b border-slate-800 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <button onClick={() => scrollToSection('hero')} className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">Home</button>
            <button onClick={() => scrollToSection('courses')} className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">Courses & Stacks</button>
            <button onClick={() => scrollToSection('programs')} className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">Industrial Programs</button>
            <button onClick={() => scrollToSection('batches')} className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">Live Batches</button>
            <button onClick={() => scrollToSection('placements')} className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">Placement Records</button>
            <button onClick={() => scrollToSection('hardware-projects')} className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-cyan-400 font-bold">Hardware & Academic Projects</button>
            <button onClick={() => scrollToSection('software-services')} className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">Software Services</button>
            <button onClick={() => scrollToSection('contact')} className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-400">Contact Us</button>
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <a
              href={createWhatsAppDirectQueryLink('Summer Placement Admissions')}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Admissions Desk</span>
            </a>
            <a 
              href={`tel:${COMPANY_CONFIG.phone}`} 
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-800"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Direct Helpline: {COMPANY_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
