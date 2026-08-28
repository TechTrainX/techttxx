import React, { useState } from 'react';
import { verifyCertificateById } from '../services/apiService';
import { CertificateData } from '../types';
import { Award, ShieldCheck, Search, CheckCircle2, AlertTriangle, X, ShieldAlert, ExternalLink } from 'lucide-react';
import { validateCertificateId } from '../utils/validators';
import confetti from 'canvas-confetti';

interface CertificateVerifierProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  onOpenFullVerifierPage?: (certId?: string) => void;
}

export const CertificateVerifier: React.FC<CertificateVerifierProps> = ({
  isOpenModal = false,
  onCloseModal,
  onOpenFullVerifierPage
}) => {
  const [certInput, setCertInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultCert, setResultCert] = useState<CertificateData | null>(null);
  const [searched, setSearched] = useState(false);
  const [validationError, setValidationError] = useState('');

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
    
    await new Promise(r => setTimeout(r, 400));
    const data = await verifyCertificateById(check.sanitized);
    setResultCert(data);
    setLoading(false);

    if (data && data.isVerified) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0066cc', '#7fffd4', '#00061a']
        });
      } catch (err) {
        // fallback
      }
    }
  };

  const content = (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-block px-3 py-1 rounded-md bg-white text-[#0066cc] text-[10px] font-bold uppercase tracking-[0.16em] border border-blue-200/80 shadow-xs">
          Academic Registry
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-luxury-title font-bold text-[#0a0a0f] tracking-tight">
          Verify <span className="text-[#0066cc] italic font-normal">Student Certificate</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#4b5563] font-sans">
          Enter the unique Certificate ID to verify credentials, verified project defense, and graduation record.
        </p>
      </div>

      {/* Verification Input Box */}
      <div className="max-w-md mx-auto space-y-2.5">
        <form 
          onSubmit={(e) => handleVerify(e)} 
          className="flex items-stretch rounded-lg overflow-hidden border border-slate-200/90 focus-within:border-[#0066cc] focus-within:ring-2 focus-within:ring-[#0066cc]/10 bg-white shadow-2xs"
        >
          <input
            type="text"
            required
            value={certInput}
            onChange={handleInputChange}
            placeholder="e.g. TTXIN26271102"
            className="w-full px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400/40 placeholder:font-light outline-none uppercase font-mono tracking-wider font-medium"
          />
          <button
            type="submit"
            disabled={loading || !certInput.trim()}
            className="bg-[#0066cc] hover:bg-[#0052a3] text-white px-5 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors shrink-0 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{loading ? 'Checking...' : 'Verify'}</span>
          </button>
        </form>

        {validationError && (
          <p className="text-xs text-red-600 font-semibold text-center flex items-center justify-center gap-1 font-sans">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{validationError}</span>
          </p>
        )}

        {/* Quick Sample IDs */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-[#666] flex-wrap font-sans">
          <span>Sample Records:</span>
          <button
            type="button"
            onClick={() => handleVerify(undefined, 'TTXIN26271102')}
            className="font-mono text-[#0066cc] font-semibold hover:underline bg-blue-50 px-2.5 py-0.5 rounded-md cursor-pointer border border-blue-100"
          >
            TTXIN26271102
          </button>
          <button
            type="button"
            onClick={() => handleVerify(undefined, 'TTX2026-278809')}
            className="font-mono text-[#0066cc] font-semibold hover:underline bg-blue-50 px-2.5 py-0.5 rounded-md cursor-pointer border border-blue-100"
          >
            TTX2026-278809
          </button>
        </div>
      </div>

      {/* Verification Results Card - Standard Rectangular */}
      {searched && (
        <div className="max-w-xl mx-auto">
          {resultCert && resultCert.isVerified ? (
            <div className="bg-white rounded-xl border border-emerald-300 p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-[0.14em] bg-emerald-50 px-2 py-0.5 rounded-md">
                      Verified Credential
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#0a0a0f] font-sans mt-0.5">
                      {resultCert.studentName}
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#0066cc] bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                  {resultCert.certificateId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#444] bg-[#f8fafc] p-3.5 rounded-lg border border-gray-200 font-sans">
                <div>
                  <span className="text-[10px] uppercase text-gray-500 block">Course / Track</span>
                  <strong className="text-[#0a0a0f]">{resultCert.courseName}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-gray-500 block">Program Format</span>
                  <strong className="text-[#0a0a0f]">{resultCert.programType}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-gray-500 block">Completion Date</span>
                  <span className="text-[#0066cc] font-semibold">{resultCert.completionDate || resultCert.issueDate}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-gray-500 block">Grade</span>
                  <span className="text-emerald-700 font-bold">{resultCert.grade || 'A+ (Distinction)'}</span>
                </div>
              </div>

              {resultCert.projectTitle && (
                <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-lg text-xs">
                  <span className="text-[10px] font-bold uppercase text-[#0066cc] block">Verified Capstone Project</span>
                  <strong className="text-[#0a0a0f] font-sans">{resultCert.projectTitle}</strong>
                </div>
              )}

              {onOpenFullVerifierPage && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onOpenFullVerifierPage(resultCert.certificateId)}
                    className="custom-btn-outline h-8 px-3 text-[10px] tracking-wider rounded-md flex items-center gap-1.5"
                  >
                    <span>Open Official Verification Document</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-white rounded-xl border border-red-200 p-5 text-center space-y-2">
              <AlertTriangle className="w-6 h-6 text-red-500 mx-auto" />
              <p className="text-xs font-bold text-red-700 font-sans">
                Certificate ID not found in active ledger.
              </p>
              <p className="text-[11px] text-gray-500 font-sans">
                Please double-check the ID or contact admissions support for record retrieval.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Direct link to dedicated full page */}
      {onOpenFullVerifierPage && (
        <div className="text-center pt-2">
          <button
            onClick={() => onOpenFullVerifierPage()}
            className="text-xs text-[#0066cc] hover:text-[#00061a] font-semibold underline underline-offset-4 flex items-center gap-1.5 mx-auto cursor-pointer"
          >
            <span>Switch to Dedicated Full-Screen Registrar Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <div className="bg-white rounded-xl max-w-xl w-full p-6 relative border border-gray-200 shadow-xl max-h-[90vh] overflow-y-auto">
          <button
            onClick={onCloseModal}
            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="verify-cert" className="py-14 sm:py-20 px-4 bg-white border-b border-gray-200/80 relative overflow-hidden bg-tech-grid">
      <div className="max-w-7xl mx-auto">
        {content}
      </div>
    </section>
  );
};
