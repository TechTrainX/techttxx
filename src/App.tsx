import React, { useEffect, useState } from 'react';
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
  const [hardwareInquiryModalOpen, setHardwareInquiryModalOpen] = useState(false);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(
    'Smart 4WD RC Car with Bluetooth & Obstacle Radar',
  );

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');

    if (COMPANY_CONFIG.faviconUrl) {
      const faviconElement = document.getElementById('app-favicon') as HTMLLinkElement | null;
      if (faviconElement) faviconElement.href = COMPANY_CONFIG.faviconUrl;

      const touchIconElement = document.getElementById('app-apple-touch-icon') as HTMLLinkElement | null;
      if (touchIconElement) touchIconElement.href = COMPANY_CONFIG.faviconUrl;
    }
  }, []);

  const handleOpenEnrollment = (courseOrProgram?: string) => {
    if (courseOrProgram) setPreselectedCourse(courseOrProgram);
    setEnrollmentModalOpen(true);
  };

  const handleSearchCourse = (query: string) => {
    setSearchQuery(query);
  };

  const handleOpenHardwareInquiry = (projectTitle?: string) => {
    if (projectTitle) setSelectedProjectTitle(projectTitle);
    setHardwareInquiryModalOpen(true);
  };

  const handleNavigateToSection = (sectionId: string) => {
    setCurrentRoute('main');
    setActiveSection(sectionId);

    // Wait until the main-page sections are mounted, then scroll to the target.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  };

  const handleOpenDedicatedVerifier = (certId?: string) => {
    if (certId) setVerifierInitialId(certId);

    setCurrentRoute('verifier');

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  };

  if (currentRoute === 'verifier') {
    return (
      <div className="min-h-screen bg-[#f4f7fb] text-[#333333] selection:bg-[#0066cc] selection:text-white">
        {/* Complete main website Header remains visible on this page. */}
        <Header
          onOpenEnrollment={handleOpenEnrollment}
          onOpenDedicatedVerifier={() => handleOpenDedicatedVerifier()}
          onOpenConsultation={() => setConsultationModalOpen(true)}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isVerifierPage={false}
          onNavigateToSection={handleNavigateToSection}
        />

        {/* Reserve space once for the fixed Header. */}
        <main
          className="min-h-screen"
          style={{ paddingTop: 'var(--ttx-header-height, 96px)' }}
        >
          <CertificateVerifierPage
            initialCertId={verifierInitialId}
            showHeader={false}
            showFooter={true}
            onBackToHome={() => {
              setCurrentRoute('main');
              window.requestAnimationFrame(() => {
                window.scrollTo({ top: 0, behavior: 'auto' });
              });
            }}
          />
        </main>

        <WhatsAppFloatingButton />

        <AdminCertificatePortal
          isOpen={adminPortalOpen}
          onClose={() => setAdminPortalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#333333] selection:bg-[#0066cc] selection:text-white transition-colors duration-300">
      <CubeSolverLoader
        onLoadingComplete={() => setLoading(false)}
        minDurationMs={1500}
      />

      <Header
        onOpenEnrollment={handleOpenEnrollment}
        onOpenDedicatedVerifier={() => handleOpenDedicatedVerifier()}
        onOpenConsultation={() => setConsultationModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isVerifierPage={false}
      />

      <main className="flex-1" style={{ paddingTop: 'var(--ttx-header-height, 96px)' }}>
        <HeroSection
          onOpenEnrollment={handleOpenEnrollment}
          onOpenConsultation={() => setConsultationModalOpen(true)}
        />

        <CourseCatalog
          onOpenEnrollment={handleOpenEnrollment}
          searchFilterQuery={searchQuery}
        />

        <ProgramsGrid onOpenEnrollment={handleOpenEnrollment} />
        <PlacementsShowcase />
        <BatchScheduleTable onOpenEnrollment={handleOpenEnrollment} />
        <HardwareProjectsSection onOpenInquiryModal={handleOpenHardwareInquiry} />
        <SoftwareServicesSection />
        {/* <FutureTechRoadmap onOpenEnrollment={handleOpenEnrollment} /> */}
        <CampusGallery />
        <ContactSection />
      </main>

      <Footer
        onOpenAdminPortal={() => setAdminPortalOpen(true)}
        onOpenEnrollment={() => handleOpenEnrollment()}
        onOpenDedicatedVerifier={() => handleOpenDedicatedVerifier()}
      />

      <WhatsAppFloatingButton />

      <EnrollmentModal
        isOpen={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
        preselectedCourseOrProgram={preselectedCourse}
      />

      <TechnicalConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />

      <AdminCertificatePortal
        isOpen={adminPortalOpen}
        onClose={() => setAdminPortalOpen(false)}
      />

      <HardwareProjectInquiryModal
        isOpen={hardwareInquiryModalOpen}
        onClose={() => setHardwareInquiryModalOpen(false)}
        preselectedProject={selectedProjectTitle}
      />

      <MarketingLeadPopup onOpenEnrollment={handleOpenEnrollment} />
    </div>
  );
}
