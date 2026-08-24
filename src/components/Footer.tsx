import React from 'react';
import { 
  Building, Phone, Mail, MapPin, Award, ShieldCheck, 
  MessageSquare, ArrowUp, Code2, Heart, ExternalLink, Lock, KeyRound, Cpu 
} from 'lucide-react';
import { createWhatsAppDirectQueryLink } from '../services/whatsappService';
import { TechTrainXLogo } from './TechTrainXLogo';
import { COMPANY_CONFIG } from '../config/companyConfig';

interface FooterProps {
  onOpenCertificateVerifier?: () => void;
  onOpenAdminPortal: () => void;
  onOpenEnrollment: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCertificateVerifier,
  onOpenAdminPortal,
  onOpenEnrollment
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#050811] text-slate-300 border-t border-slate-800 pt-16 pb-8 px-4 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand & Certification */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <TechTrainXLogo size="md" showTagline={true} />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              TechTrainX is an advanced Software Engineering, Cloud Systems & Placement-First Industrial Training Foundry. Empowering engineers with 5-hour daily hands-on coding in Full-Stack MERN, Python/Django, Java Spring Boot Microservices, AI/GenAI, and Embedded Systems.
            </p>

            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="bg-slate-900 text-cyan-400 text-[11px] font-bold px-2.5 py-1 rounded border border-cyan-500/25 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Digital Credentials & ISO Verified
              </span>
              <span className="bg-slate-900 text-slate-300 text-[11px] font-bold px-2.5 py-1 rounded border border-slate-800">
                120+ Recruiter Network
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Engineering Tracks</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollToSection('courses')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Industrial Courses & Syllabus
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('programs')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Training & Internship Programs
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('placements')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Placements & Alumni Record
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('batches')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Live Batch Timings
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('hardware-projects')} className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1">
                  <span>Hardware & Academic Kits</span>
                  <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-500/30">Assistance</span>
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('software-services')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Enterprise Software Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('gallery')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Campus & Hackathon Labs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals & Verification */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Student & Tech Portals</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => scrollToSection('verifier')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Verify Student Certificate</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEnrollment}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Summer Training Registration</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('hardware-projects')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Minor & Major Project Help</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdminPortal}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer pt-2 font-semibold"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Center Staff / Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Admissions & Mailboxes</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="leading-relaxed">
                {COMPANY_CONFIG.campusAddress}
              </p>
              <p>
                <a href={`tel:${COMPANY_CONFIG.phone}`} className="text-white hover:text-cyan-400 font-bold block">
                  📞 {COMPANY_CONFIG.phoneDisplay}
                </a>
              </p>
              <div className="space-y-1 pt-1 font-mono text-[11px]">
                <p>
                  <span className="text-slate-500">Admissions:</span>{' '}
                  <a href={`mailto:${COMPANY_CONFIG.admissionsEmail}`} className="text-cyan-400 hover:underline">
                    {COMPANY_CONFIG.admissionsEmail}
                  </a>
                </p>
                <p>
                  <span className="text-slate-500">Tech/Center:</span>{' '}
                  <a href={`mailto:${COMPANY_CONFIG.ttxEmail}`} className="text-indigo-300 hover:underline">
                    {COMPANY_CONFIG.ttxEmail}
                  </a>
                </p>
                <p>
                  <span className="text-slate-500">General Info:</span>{' '}
                  <a href={`mailto:${COMPANY_CONFIG.infoEmail}`} className="text-slate-300 hover:underline">
                    {COMPANY_CONFIG.infoEmail}
                  </a>
                </p>
              </div>
              <div className="pt-2">
                <a
                  href={createWhatsAppDirectQueryLink('Admissions Support')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-bold text-[11px] hover:bg-emerald-900/80 transition-colors"
                >
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                  <span>Live WhatsApp Support</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>{COMPANY_CONFIG.copyright}</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span>
              A Unit of{' '}
              <a 
                href={COMPANY_CONFIG.parentCompanyUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-cyan-400 hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>{COMPANY_CONFIG.parentCompanyName}</span>
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={COMPANY_CONFIG.parentCompanyUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-400 hover:text-cyan-400 transition-colors text-[11px]"
            >
              xnava.in
            </a>
            <span className="text-slate-700">•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-800 flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
