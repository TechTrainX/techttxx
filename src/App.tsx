import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.js';
import { HeroSection } from './components/HeroSection.js';

import { HardwareProjectsSection } from './components/HardwareProjectsSection.js';
import { ProgramsGrid } from './components/ProgramsGrid.js';
import { CourseCatalog } from './components/CourseCatalog.js';
import { BatchScheduleTable } from './components/BatchScheduleTable.js';
// import { FutureTechRoadmap } from './components/FutureTechRoadmap.js';
import { CertificateVerifierPage } from './components/CertificateVerifierPage.js';
import { SoftwareServicesSection } from './components/SoftwareServicesSection.js';
import { PlacementsShowcase } from './components/PlacementsShowcase.js';
import { CampusGallery } from './components/CampusGallery.js';
import { ContactSection } from './components/ContactSection.js';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton.js';
import { EnrollmentModal } from './components/EnrollmentModal.js';
import { TechnicalConsultationModal } from './components/TechnicalConsultationModal.js';
import { AdminCertificatePortal } from './components/AdminCertificatePortal.js';
import { HardwareProjectInquiryModal } from './components/HardwareProjectInquiryModal.js';
import { MarketingLeadPopup } from './components/MarketingLeadPopup.js';
import { Footer } from './components/Footer.js';
import { CubeSolverLoader } from './components/CubeSolverLoader.js';
import { HardwareProject } from './types';
import { COMPANY_CONFIG } from './config/companyConfig.js';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState<'main' | 'verifier'>('main');
  const [verifierInitialId, setVerifierInitialId] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [preselectedCourse, setPreselectedCourse] = useState('Full Stack MERN Stack Development');
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Hardware Projects Inquiry Modal State
  const [hardwareInquiryModalOpen, setHardwareInquiryModalOpen] = useState(false);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState('Smart 4WD RC Car with Bluetooth & Obstacle Radar');

  useEffect(() => {
    // Ensure smooth scrolling and clean theme baseline
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');

    // Dynamically synchronize favicon from company configuration if provided
    if (COMPANY_CONFIG.faviconUrl) {
      const faviconElem = document.getElementById('app-favicon') as HTMLLinkElement | null;
      if (faviconElem) {
        faviconElem.href = COMPANY_CONFIG.faviconUrl;
      }
      const touchIconElem = document.getElementById('app-apple-touch-icon') as HTMLLinkElement | null;
      if (touchIconElem) {
        touchIconElem.href = COMPANY_CONFIG.faviconUrl;
      }
    }
  }, []);

  const handleOpenEnrollment = (courseOrProgram?: string) => {
    if (courseOrProgram) {
      setPreselectedCourse(courseOrProgram);
    }
    setEnrollmentModalOpen(true);
  };

  const handleSearchCourse = (query: string) => {
    setSearchQuery(query);
  };

  const handleOpenHardwareInquiry = (projectTitle?: string) => {
    if (projectTitle) {
      setSelectedProjectTitle(projectTitle);
    }
    setHardwareInquiryModalOpen(true);
  };

  const handleOpenDedicatedVerifier = (certId?: string) => {
    if (certId) {
      setVerifierInitialId(certId);
    }
    setCurrentRoute('verifier');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Certificate Verification Page Route
  if (currentRoute === 'verifier') {
    return (
      <div className="min-h-screen bg-[#fbfcfd] text-[#333333] flex flex-col justify-between selection:bg-[#0066cc] selection:text-white">
        {/* Header is fixed even on this route, so the page content
            still needs the same top offset reserved for it. */}
        <div style={{ paddingTop: 'var(--ttx-header-height, 96px)' }}>
          <CertificateVerifierPage
            initialCertId={verifierInitialId}
            onBackToHome={() => {
              setCurrentRoute('main');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
        <WhatsAppFloatingButton />
        <AdminCertificatePortal
          isOpen={adminPortalOpen}
          onClose={() => setAdminPortalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#333333] flex flex-col justify-between selection:bg-[#0066cc] selection:text-white transition-colors duration-300">

      {/* 3D Cube Solver Opening Experience */}
      <CubeSolverLoader onLoadingComplete={() => setLoading(false)} minDurationMs={1500} />

      {/* Top Navbar — now truly `fixed`, not `sticky`. See Header.tsx
          for why: `sticky` silently breaks the moment any ancestor
          gets an overflow/transform/filter applied to it (e.g. the
          cube loader, a modal, or the mobile drawer's animation
          wrapper), and the header just scrolls away with the page. */}
      <Header
        onOpenEnrollment={handleOpenEnrollment}
        onOpenDedicatedVerifier={() => handleOpenDedicatedVerifier()}
        onOpenConsultation={() => setConsultationModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Reserve space for the fixed header. The 96px is only a
          first-paint fallback before Header's ResizeObserver measures
          the real height and sets --ttx-header-height; after that,
          this tracks it automatically at every breakpoint. */}
      <main className="flex-1" style={{ paddingTop: 'var(--ttx-header-height, 96px)' }}>

        {/* Minimalist Editorial 3D Hero Section */}
        <HeroSection
          onOpenEnrollment={handleOpenEnrollment}
          onOpenConsultation={() => setConsultationModalOpen(true)}
        
        />



        {/* Course Catalog & Week-by-Week Placement Syllabus Viewer */}
        <CourseCatalog
          onOpenEnrollment={handleOpenEnrollment}
          searchFilterQuery={searchQuery}
        />

        {/* Training & Placement Internship Programs Grid */}
        <ProgramsGrid
          onOpenEnrollment={handleOpenEnrollment}
        />

        {/* Alumni Placements, Hiring Partners & Package Metrics */}
        <PlacementsShowcase />

        {/* Live Batch Schedule Table & Seat Reservation - Fully Responsive */}
        <BatchScheduleTable
          onOpenEnrollment={handleOpenEnrollment}
        />

        {/* Secondary: Hardware Projects, Minor/Major Kits & Assistance */}
        <HardwareProjectsSection
          onOpenInquiryModal={handleOpenHardwareInquiry}
        />

        {/* Corporate Software Engineering Services & Project Quote Estimator */}
        <SoftwareServicesSection />

        {/* Future Engineering Roadmaps: Agentic AI, GenAI, ML/DL, DSA & Concurrency */}
        {/* <FutureTechRoadmap
          onOpenEnrollment={handleOpenEnrollment}
        /> */}


        {/* Media & Campus Labs Gallery */}
        <CampusGallery />

        {/* Direct Contact & Location Map */}
        <ContactSection />

      </main>

      {/* Enterprise Footer */}
      <Footer
        onOpenAdminPortal={() => setAdminPortalOpen(true)}
        onOpenEnrollment={() => handleOpenEnrollment()}
        onOpenDedicatedVerifier={() => handleOpenDedicatedVerifier()}
      />

      {/* Direct Floating WhatsApp Action */}
      <WhatsAppFloatingButton />

      {/* Modal Dialogs */}
      <EnrollmentModal
        isOpen={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
        preselectedCourseOrProgram={preselectedCourse}
      />

      {/* 1:1 Technical Diagnostic & Resume Consultation Modal */}
      <TechnicalConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />

      <AdminCertificatePortal
        isOpen={adminPortalOpen}
        onClose={() => setAdminPortalOpen(false)}
      />

      {/* Hardware Project Purchase & Assistance Modal */}
      <HardwareProjectInquiryModal
        isOpen={hardwareInquiryModalOpen}
        onClose={() => setHardwareInquiryModalOpen(false)}
        preselectedProject={selectedProjectTitle}
      />

      {/* High-Converting Marketing & Admissions Grant Lead Popup */}
      <MarketingLeadPopup
        onOpenEnrollment={handleOpenEnrollment}
      />

    </div>
  );
}