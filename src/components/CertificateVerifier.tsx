import React, { useState } from 'react';
import { verifyCertificateById } from '../services/apiService.js';
import { CertificateData } from '../types';
import { Award, ShieldCheck, Search, CheckCircle2, AlertTriangle, X, ShieldAlert, ExternalLink } from 'lucide-react';
import { validateCertificateId } from '../utils/validators.js';
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
          colors: ['#0066cc', '#4da3ff', '#050d24']
        });
      } catch (err) {
        // fallback
      }
    }
  };

  const content = (
    <div className="space-y-7 sm:space-y-8">
      {/* Trust-center header */}
      <div className="relative overflow-hidden rounded-[1.75rem] bg-[#050d24] p-5 text-white shadow-[0_24px_70px_rgba(5,13,36,0.2)] sm:p-7 lg:p-8">
        <div aria-hidden="true" className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#0066cc]/20 blur-3xl" />
        <div className="relative z-10 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-[#0066cc]/15 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-100"><ShieldCheck className="h-3.5 w-3.5 text-blue-300" />Credential trust center</span>
            <h2 className="font-luxury-title text-3xl font-bold tracking-[-0.05em] text-white sm:text-5xl">Proof that <span className="font-normal italic text-blue-300">travels with you.</span></h2>
            <p className="max-w-xl text-sm leading-6 text-slate-300 sm:text-base">Verify a TechTrainX credential against the academic registry and inspect the project, track, and completion details behind it.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:min-w-[118px]"><ShieldCheck className="mx-auto mb-2 h-4 w-4 text-blue-300" /><span className="block font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-white">Registry</span><span className="mt-1 block text-[9px] text-slate-400">ID lookup</span></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:min-w-[118px]"><Award className="mx-auto mb-2 h-4 w-4 text-blue-300" /><span className="block font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-white">Evidence</span><span className="mt-1 block text-[9px] text-slate-400">Project record</span></div>
          </div>
        </div>
      </div>

      {/* Verification Input Box */}
      <div className="max-w-md mx-auto space-y-2.5">
        <form 
          onSubmit={(e) => handleVerify(e)} 
          className="flex items-stretch overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.08)] transition-all focus-within:border-[#0066cc] focus-within:ring-4 focus-within:ring-[#0066cc]/10"
        >
          <input
            type="text"
            required
            value={certInput}
            onChange={handleInputChange}
            placeholder="e.g. TTXIN26271102"
            className="h-12 w-full px-4 text-xs font-mono font-medium uppercase tracking-wider text-slate-800 outline-none placeholder:font-light placeholder:text-slate-400/50"
          />
          <button
            type="submit"
            disabled={loading || !certInput.trim()}
            className="flex h-12 shrink-0 items-center gap-1.5 bg-[#0066cc] px-5 text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_8px_20px_rgba(0,102,204,0.2)] transition-all hover:bg-[#0052a3] hover:shadow-[0_12px_26px_rgba(0,102,204,0.3)] cursor-pointer disabled:opacity-50"
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
            className="rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1 font-mono font-semibold text-[#0066cc] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0066cc] hover:shadow-md cursor-pointer"
          >
            TTXIN26271102
          </button>
          <button
            type="button"
            onClick={() => handleVerify(undefined, 'TTX2026-278809')}
            className="rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1 font-mono font-semibold text-[#0066cc] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0066cc] hover:shadow-md cursor-pointer"
          >
            TTX2026-278809
          </button>
        </div>
      </div>

      {/* Verification Results Card - Standard Rectangular */}
      {searched && (
        <div className="max-w-xl mx-auto">
          {resultCert && resultCert.isVerified ? (
            <div className="space-y-4 rounded-[1.35rem] border border-emerald-200 bg-white p-5 shadow-[0_18px_45px_rgba(16,185,129,0.1)] sm:p-6">
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
            <div className="space-y-2 rounded-[1.35rem] border border-red-200 bg-white p-5 text-center shadow-[0_18px_45px_rgba(239,68,68,0.08)]">
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050d24]/75 p-4 backdrop-blur-sm">
        <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_28px_90px_rgba(5,13,36,0.35)]">
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
    <section id="verify-cert" className="relative overflow-hidden border-b border-gray-200/80 bg-white px-4 py-14 sm:py-20 bg-tech-grid">
      <div className="max-w-7xl mx-auto">
        {content}
      </div>
    </section>
  );
};
