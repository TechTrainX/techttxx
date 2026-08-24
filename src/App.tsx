import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HardwareProjectsSection } from './components/HardwareProjectsSection';
import { ProgramsGrid } from './components/ProgramsGrid';
import { CourseCatalog } from './components/CourseCatalog';
import { BatchScheduleTable } from './components/BatchScheduleTable';
import { CertificateVerifier } from './components/CertificateVerifier';
import { SoftwareServicesSection } from './components/SoftwareServicesSection';
import { PlacementsShowcase } from './components/PlacementsShowcase';
import { CampusGallery } from './components/CampusGallery';
import { ContactSection } from './components/ContactSection';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { EnrollmentModal } from './components/EnrollmentModal';
import { AdminCertificatePortal } from './components/AdminCertificatePortal';
import { HardwareProjectInquiryModal } from './components/HardwareProjectInquiryModal';
import { MarketingLeadPopup } from './components/MarketingLeadPopup';
import { Footer } from './components/Footer';
import { CubeSolverLoader } from './components/CubeSolverLoader';
import { HardwareProject } from './types';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [preselectedCourse, setPreselectedCourse] = useState('Full Stack MERN Stack Development');
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Hardware Projects Inquiry Modal State
  const [hardwareInquiryModalOpen, setHardwareInquiryModalOpen] = useState(false);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState('Smart 4WD RC Car with Bluetooth & Obstacle Radar');

  useEffect(() => {
    // Pure dark cyber tech theme enforcement
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
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

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-300">
      
      {/* 3D Cube Solver Opening Experience */}
      <CubeSolverLoader onLoadingComplete={() => setLoading(false)} minDurationMs={1600} />

      {/* Top Navbar */}
      <Header
        onOpenEnrollment={handleOpenEnrollment}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1 space-y-4">
        
        {/* 3D Glass Hero Section */}
        <HeroSection
          onOpenEnrollment={handleOpenEnrollment}
          onSearchCourse={handleSearchCourse}
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

        {/* Live Batch Schedule Table & Seat Reservation */}
        <BatchScheduleTable
          onOpenEnrollment={handleOpenEnrollment}
        />

        {/* Secondary: Hardware Projects, Minor/Major Kits & Assistance */}
        <HardwareProjectsSection
          onOpenInquiryModal={handleOpenHardwareInquiry}
        />

        {/* Certificate Verification Engine */}
        <CertificateVerifier />

        {/* Corporate Software Engineering Services & Project Quote Estimator */}
        <SoftwareServicesSection />

        {/* ImageKit Media & Campus Labs Gallery */}
        <CampusGallery />

        {/* Direct Contact & Location Map */}
        <ContactSection />

      </main>

      {/* Enterprise Footer */}
      <Footer
        onOpenAdminPortal={() => setAdminPortalOpen(true)}
        onOpenEnrollment={() => handleOpenEnrollment()}
      />

      {/* Direct Floating WhatsApp Action */}
      <WhatsAppFloatingButton />

      {/* Modal Dialogs */}
      <EnrollmentModal
        isOpen={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
        preselectedCourseOrProgram={preselectedCourse}
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
