import React from 'react';
import { 
  Building, Phone, Mail, MapPin, ShieldCheck, 
  ArrowUp, Lock, Award
} from 'lucide-react';
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

  const popularCourses = [
    'Full Stack MERN',
    'Python & AI / ML',
    'Java Spring Boot',
    'React Native',
    'Embedded IoT',
    'AWS Cloud & DevOps',
    'Data Science',
    'C++ Core & DSA'
  ];

  return (
    <footer id="main-footer" className="bg-[#00061a] text-[#ffffff8e] pt-14 pb-8 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <TechTrainXLogo size="md" showTagline={true} theme="dark" />
            <p className="text-xs leading-relaxed max-w-sm">
              Job-oriented software and hardware engineering training institute. Practical hands-on curriculum, industry certifications, and 100% placement support.
            </p>
            
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollToSection('courses')} className="footer-link cursor-pointer">
                  All Courses
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('programs')} className="footer-link cursor-pointer">
                  Training Tracks
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('batches')} className="footer-link cursor-pointer">
                  Batch Schedule
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('placements')} className="footer-link cursor-pointer">
                  Placements Record
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('hardware-projects')} className="footer-link cursor-pointer">
                  Hardware Kits
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('software-services')} className="footer-link cursor-pointer">
                  Software Services
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Course Tags */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Trending Courses
            </h4>
            <div className="flex flex-wrap gap-1">
              {popularCourses.map((c, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSection('courses')}
                  className="footer-course-link cursor-pointer"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Col 4: Contact & Verification */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact & Support
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0066cc]" />
                <a href={`tel:${COMPANY_CONFIG.phone}`} className="text-white font-medium hover:underline">
                  {COMPANY_CONFIG.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0066cc]" />
                <a href={`mailto:${COMPANY_CONFIG.admissionsEmail}`} className="hover:underline">
                  {COMPANY_CONFIG.admissionsEmail}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0066cc] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">{COMPANY_CONFIG.campusAddress}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => scrollToSection('verifier')}
                className="footer-course-link flex items-center gap-1 cursor-pointer bg-blue-900/30 text-blue-300 border-blue-700/50 hover:bg-[#0066cc]"
              >
                <Award className="w-3 h-3 text-[#7fffd4]" />
                <span>Verify Certificate</span>
              </button>
              <button
                onClick={onOpenAdminPortal}
                className="footer-course-link flex items-center gap-1 cursor-pointer"
                title="Staff Portal"
              >
                <Lock className="w-3 h-3" />
                <span>Admin</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>
            © {new Date().getFullYear()} {COMPANY_CONFIG.brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={scrollToTop} className="footer-link flex items-center gap-1 cursor-pointer">
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
