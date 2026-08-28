import React, { useState, useEffect } from 'react';
import { verifyCertificateById } from '../services/apiService.js';
import { CertificateData } from '../types';
import { 
  Award, ShieldCheck, Search, CheckCircle2, AlertTriangle, 
  ArrowLeft, Download, Printer, Share2, ExternalLink, QrCode,
  Building, Calendar, User, FileCheck, Check, Copy
} from 'lucide-react';
import { validateCertificateId } from '../utils/validators.js';
import confetti from 'canvas-confetti';
import { TechTrainXLogo } from './TechTrainXLogo.js';
import { COMPANY_CONFIG } from '../config/companyConfig.js';

interface CertificateVerifierPageProps {
  onBackToHome: () => void;
  initialCertId?: string;
}

export const CertificateVerifierPage: React.FC<CertificateVerifierPageProps> = ({
  onBackToHome,
  initialCertId = ''
}) => {
  const [certInput, setCertInput] = useState(initialCertId);
  const [loading, setLoading] = useState(false);
  const [resultCert, setResultCert] = useState<CertificateData | null>(null);
  const [searched, setSearched] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (initialCertId) {
      handleVerify(undefined, initialCertId);
    }
  }, [initialCertId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9-]/g, '').toUpperCase();
    setCertInput(cleaned);
    setValidationError('');
  };

  const handleVerify = async (e?: React.FormEvent, customId?: string) => {
    if (e) e.preventDefault();
    const targetId = (customId || certInput).replace(/[^a-zA-Z0-9-]/g, '').toUpperCase();
    
    const check = validateCertificateId(targetId);
    if (!check.isValid) {
      setValidationError(check.error || 'Please enter a valid certificate ID.');
      return;
    }

    setValidationError('');
    setCertInput(check.sanitized);
    setLoading(true);
    setSearched(true);
    
    await new Promise(r => setTimeout(r, 450));
    const data = await verifyCertificateById(check.sanitized);
    setResultCert(data);
    setLoading(false);

    if (data && data.isVerified) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0066cc', '#7fffd4', '#00061a']
        });
      } catch (err) {
        // Confetti fallback
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] bg-tech-grid text-[#1a1a24] flex flex-col justify-between selection:bg-[#0066cc] selection:text-white">
      
      {/* Top Academic Registry Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#4b5563] hover:text-[#0066cc] bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-md border border-gray-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Campus</span>
            </button>
            <div className="h-5 w-[1px] bg-gray-200 hidden sm:block" />
            <div className="hidden sm:block">
              <TechTrainXLogo size="sm" showTagline={false} theme="light" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#0066cc] text-[10px] font-bold uppercase tracking-wider border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Academic Registry</span>
            </span>
            <button
              onClick={onBackToHome}
              className="custom-btn-outline h-9 px-3 text-[10px] tracking-wider rounded-md sm:hidden"
            >
              Main Site
            </button>
          </div>
        </div>
      </header>

      {/* Main Verification Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        
        {/* Title and Registry Description */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="inline-block px-3 py-1 rounded-md bg-white text-[#0066cc] text-[10px] font-bold uppercase tracking-[0.16em] border border-blue-200/80 shadow-xs">
            Student Credential Verification Engine
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-luxury-title font-bold text-[#0a0a0f] tracking-tight">
            Digital Certificate <span className="text-[#0066cc] italic font-normal">Verification Portal</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#4b5563] font-sans">
            Validate authentic academic credentials, course transcripts, capstone project titles, and mentor evaluations issued by TechTrainX Placement Foundry.
          </p>
        </div>

        {/* Verification Search Bar */}
        <div className="max-w-xl mx-auto space-y-3">
          <form 
            onSubmit={(e) => handleVerify(e)} 
            className="flex items-stretch rounded-lg overflow-hidden border border-gray-300 focus-within:border-[#0066cc] focus-within:ring-2 focus-within:ring-blue-100 bg-white shadow-xs"
          >
            <div className="flex items-center pl-4 text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={certInput}
              onChange={handleInputChange}
              placeholder="ENTER CERTIFICATE ID (E.G. TTXIN26271102)"
              className="w-full px-3 py-3 text-xs text-[#0a0a0f] outline-none uppercase font-mono tracking-wider font-semibold"
            />
            <button
              type="submit"
              disabled={loading || !certInput.trim()}
              className="bg-[#0066cc] hover:bg-[#0052a3] text-white px-6 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors shrink-0 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              <span>{loading ? 'Validating...' : 'Verify Now'}</span>
            </button>
          </form>

          {validationError && (
            <p className="text-xs text-red-600 font-semibold text-center flex items-center justify-center gap-1.5 font-sans">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{validationError}</span>
            </p>
          )}

          {/* Sample IDs for instant lookup */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-[#666] flex-wrap font-sans pt-1">
            <span>Instant Demo Lookups:</span>
            <button
              type="button"
              onClick={() => handleVerify(undefined, 'TTXIN26272937')}
              className="font-mono text-[#0066cc] font-semibold hover:underline bg-blue-50 px-2.5 py-0.5 rounded-md cursor-pointer border border-blue-100"
            >
              TTXIN26272937
            </button>
            
          </div>
        </div>

        {/* Verification Result Portal Display */}
        {searched && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            {resultCert && resultCert.isVerified ? (
              <div className="bg-white rounded-xl border border-emerald-300 shadow-lg overflow-hidden space-y-0">
                
                {/* Official Verification Header Strip */}
                <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-200 border border-white/20 shrink-0">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/30 border border-emerald-300/40 text-emerald-100 text-[10px] font-bold uppercase tracking-widest">
                        <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                        <span>Official Authenticated Credential</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold font-sans mt-1 text-white">
                        {resultCert.studentName}
                      </h2>
                    </div>
                  </div>

                  <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/15 text-left sm:text-right">
                    <span className="text-[10px] text-emerald-200 uppercase font-mono block">Certificate Serial</span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-widest">{resultCert.certificateId}</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Detailed Field Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#f8fafc] p-4 rounded-lg border border-gray-200/80 space-y-1">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Course / Track Completed</span>
                      <strong className="text-sm text-[#0a0a0f] font-sans block">{resultCert.courseName}</strong>
                    </div>

                    <div className="bg-[#f8fafc] p-4 rounded-lg border border-gray-200/80 space-y-1">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Program Format</span>
                      <strong className="text-sm text-[#0a0a0f] font-sans block">{resultCert.programType}</strong>
                    </div>

                    <div className="bg-[#f8fafc] p-4 rounded-lg border border-gray-200/80 space-y-1">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Date of Completion</span>
                      <span className="text-sm font-semibold text-[#0066cc] font-sans block">{resultCert.completionDate || resultCert.issueDate}</span>
                    </div>

                    <div className="bg-[#f8fafc] p-4 rounded-lg border border-gray-200/80 space-y-1">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Performance Grade</span>
                      <span className="text-sm font-bold text-emerald-700 font-sans block">
                        {resultCert.grade || 'A+ (Exemplary Performance & Code Defense)'}
                      </span>
                    </div>
                  </div>

                  {/* Project / Capstone Verification */}
                  {resultCert.projectTitle && (
                    <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-lg space-y-1">
                      <span className="text-[10px] font-bold text-[#0066cc] uppercase tracking-wider block">
                        Verified Capstone Project Defense
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-[#0a0a0f] font-sans">
                        {resultCert.projectTitle}
                      </p>
                    </div>
                  )}

                  {/* Cryptographic Security Stamp & QR Verification Note */}
                  <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-sans">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold text-[#0a0a0f]">TechTrainX Digital Ledger</span>
                        <p className="text-[11px]">Issued by TechTrainX- A unit of Xnava Enterprises.. Cryptographically Secured.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyLink}
                        className="custom-btn-outline h-9 px-3.5 text-[10px] tracking-wider rounded-md flex items-center gap-1.5"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Link Copied' : 'Share Verification'}</span>
                      </button>

                      <button
                        onClick={handlePrint}
                        className="custom-btn h-9 px-4 text-[10px] tracking-wider rounded-md flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Official Record</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="bg-white rounded-xl border border-red-200 p-6 sm:p-8 text-center space-y-3 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0a0a0f] font-sans">
                  Certificate Record Not Found
                </h3>
                <p className="text-xs text-gray-500 font-sans max-w-md mx-auto">
                  The Certificate ID <span className="font-mono font-bold text-red-600">{certInput}</span> is not registered in our active ledger. Please verify the serial number from your physical document or contact academic registrar.
                </p>
                <div className="pt-2">
                  <a
                    href={`mailto:${COMPANY_CONFIG.admissionsEmail}?subject=Certificate Verification Query: ${certInput}`}
                    className="custom-btn-outline h-9 px-4 text-[10px] tracking-wider rounded-md inline-flex items-center gap-2"
                  >
                    <span>Contact Academic Registrar</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Academic Registry Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4 text-center text-xs text-gray-500 font-sans space-y-1">
        <p>© {new Date().getFullYear()} {COMPANY_CONFIG.brandName} Academic Registry & Placement Foundry.</p>
        <p className="text-[11px] text-gray-400">A Unit of <a href="https://xnava.in" target="_blank" rel="noreferrer" className="text-[#0066cc] font-medium underline">Xnava Enterprise.</a>. Government MSME Registered.</p>
      </footer>

    </div>
  );
};
