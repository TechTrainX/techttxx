import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FutureTechRoadmap } from './components/FutureTechRoadmap';
import { HardwareProjectsSection } from './components/HardwareProjectsSection';
import { ProgramsGrid } from './components/ProgramsGrid';
import { CourseCatalog } from './components/CourseCatalog';
import { BatchScheduleTable } from './components/BatchScheduleTable';
import { CertificateVerifierPage } from './components/CertificateVerifierPage';
import { SoftwareServicesSection } from './components/SoftwareServicesSection';
import { PlacementsShowcase } from './components/PlacementsShowcase';
import { CampusGallery } from './components/CampusGallery';
import { ContactSection } from './components/ContactSection';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { EnrollmentModal } from './components/EnrollmentModal';
import { TechnicalConsultationModal } from './components/TechnicalConsultationModal';
import { AdminCertificatePortal } from './components/AdminCertificatePortal';
import { HardwareProjectInquiryModal } from './components/HardwareProjectInquiryModal';
import { MarketingLeadPopup } from './components/MarketingLeadPopup';
import { Footer } from './components/Footer';
import { CubeSolverLoader } from './components/CubeSolverLoader';
import { HardwareProject } from './types';
import { COMPANY_CONFIG } from './config/companyConfig';

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
        <CertificateVerifierPage
          initialCertId={verifierInitialId}
          onBackToHome={() => {
            setCurrentRoute('main');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
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

      {/* Top Navbar */}
      <Header
        onOpenEnrollment={handleOpenEnrollment}
        onOpenDedicatedVerifier={() => handleOpenDedicatedVerifier()}
        onOpenConsultation={() => setConsultationModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1">
        
        {/* Minimalist Editorial 3D Hero Section */}
        <HeroSection
          onOpenEnrollment={handleOpenEnrollment}
          onOpenConsultation={() => setConsultationModalOpen(true)}
          onSearchCourse={handleSearchCourse}
        />

        {/* Future Engineering Roadmaps: Agentic AI, GenAI, ML/DL, DSA & Concurrency */}
        <FutureTechRoadmap
          onOpenEnrollment={handleOpenEnrollment}
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
