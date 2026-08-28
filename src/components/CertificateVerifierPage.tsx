import React, { useState, useEffect } from 'react';
import { verifyCertificateById } from '../services/apiService.js';
import { CertificateData } from '../types';
import {
  Award, ShieldCheck, Search, CheckCircle2, AlertTriangle,
  ArrowLeft, Download, Printer, Share2, ExternalLink, QrCode,
  Building, Calendar, User, FileCheck, Check, Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TechTrainXLogo } from './TechTrainXLogo.js';
import { COMPANY_CONFIG } from '../config/companyConfig.js';
import { validateCertificateId } from '../utils/validators.js';

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
    <div className="min-h-screen bg-[#f4f7fb] text-[#111827] selection:bg-[#0066cc] selection:text-white flex flex-col justify-between relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-[-12rem] top-24 h-[28rem] w-[28rem] rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute right-[-10rem] top-[30rem] h-[25rem] w-[25rem] rounded-full bg-cyan-100/30 blur-3xl" />
        <div className="absolute inset-0 bg-tech-grid opacity-[0.22]" />
      </div>

      {/* Top Academic Registry Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 shadow-[0_8px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={onBackToHome}
              className="group inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-[#0066cc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden xs:inline sm:inline">Back to Campus</span>
            </button>
            <div className="hidden h-7 w-px bg-slate-200 sm:block" />
            <div className="hidden sm:block">
              <TechTrainXLogo size="sm" showTagline={false} theme="light" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0066cc] md:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]" />
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Official Academic Registry</span>
            </span>
            <button
              onClick={onBackToHome}
              className="custom-btn-outline h-10 rounded-xl px-3 text-[10px] font-bold tracking-[0.1em] sm:hidden"
            >
              Main Site
            </button>
          </div>
        </div>
      </header>

      {/* Main Verification Content Area */}
      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:gap-12">
        {/* Title and Registry Description */}
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0066cc] shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0066cc]" />
            <span>Student Credential Verification Engine</span>
          </div>
          <h1 className="font-luxury-title text-4xl font-bold leading-[1.05] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
            Digital Certificate<br className="hidden sm:block" />{' '}
            <span className="font-normal italic text-[#0066cc]">Verification Portal</span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Validate authentic academic credentials, course transcripts, capstone project titles, and mentor evaluations issued by TechTrainX Placement Foundry.
          </p>
        </div>

        {/* Verification Search Bar */}
        <div className="mx-auto w-full max-w-2xl space-y-4">
          <form
            onSubmit={(e) => handleVerify(e)}
            className="group flex min-h-[4.5rem] items-stretch overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_18px_45px_rgba(15,23,42,0.09)] transition-all focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100/70"
          >
            <div className="flex w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors group-focus-within:text-[#0066cc]">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              required
              value={certInput}
              onChange={handleInputChange}
              placeholder="ENTER CERTIFICATE ID (E.G. TTXIN26271102)"
              className="min-w-0 w-full px-3 text-xs font-mono font-semibold uppercase tracking-[0.12em] text-slate-950 outline-none placeholder:text-slate-400 placeholder:tracking-[0.07em]"
            />
            <button
              type="submit"
              disabled={loading || !certInput.trim()}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0066cc] px-4 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-[#0052a3] hover:shadow-blue-900/30 disabled:cursor-not-allowed disabled:opacity-45 sm:px-7 cursor-pointer"
            >
              <span>{loading ? 'Validating...' : 'Verify Now'}</span>
              {!loading && <CheckCircle2 className="h-4 w-4" />}
            </button>
          </form>

          {validationError && (
            <p className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600">
              <AlertTriangle className="h-4 w-4" />
              <span>{validationError}</span>
            </p>
          )}

          {/* Sample IDs for instant lookup */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500">
            <span className="font-medium">Instant Demo Lookup:</span>
            <button
              type="button"
              onClick={() => handleVerify(undefined, 'TTXIN26272937')}
              className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 font-mono font-bold tracking-wide text-[#0066cc] transition-colors hover:border-blue-300 hover:bg-blue-100 hover:underline cursor-pointer"
            >
              TTXIN26272937
            </button>
          </div>
        </div>

        {/* Verification Result Portal Display */}
        {searched && (
          <div className="mx-auto w-full max-w-4xl animate-fade-in">
            {resultCert && resultCert.isVerified ? (
              <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.12)]">
                {/* Official Verification Header Strip */}
                <div className="relative overflow-hidden bg-[#071b24] p-6 text-white sm:p-8">
                  <div className="absolute right-[-4rem] top-[-7rem] h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
                  <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-emerald-300/0 via-emerald-300/70 to-emerald-300/0" />
                  <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-300/10 text-emerald-200 shadow-inner">
                        <FileCheck className="h-7 w-7" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-200">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Official Authenticated Credential</span>
                        </div>
                        <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl">
                          {resultCert.studentName}
                        </h2>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 sm:text-right">
                      <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-200/75">Certificate Serial</span>
                      <span className="mt-1 block font-mono text-sm font-bold tracking-[0.14em] text-white">{resultCert.certificateId}</span>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="space-y-7 p-5 sm:p-8 lg:p-10">
                  {/* Detailed Field Grid */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 transition-colors hover:border-blue-200 hover:bg-blue-50/30">
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Course / Track Completed</span>
                      <strong className="block text-sm font-bold text-slate-900">{resultCert.courseName}</strong>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 transition-colors hover:border-blue-200 hover:bg-blue-50/30">
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Program Format</span>
                      <strong className="block text-sm font-bold text-slate-900">{resultCert.programType}</strong>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 transition-colors hover:border-blue-200 hover:bg-blue-50/30">
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Date of Completion</span>
                      <span className="block text-sm font-bold text-[#0066cc]">{resultCert.completionDate || resultCert.issueDate}</span>
                    </div>
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-600/70">Performance Grade</span>
                      <span className="block text-sm font-bold text-emerald-700">{resultCert.grade || 'A+ (Exemplary Performance & Code Defense)'}</span>
                    </div>
                  </div>

                  {/* Project / Capstone Verification */}
                  {resultCert.projectTitle && (
                    <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50/60 p-5">
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#0066cc]">Verified Capstone Project Defense</span>
                      <p className="text-sm font-bold leading-6 text-slate-900">{resultCert.projectTitle}</p>
                    </div>
                  )}

                  {/* Cryptographic Security Stamp & QR Verification Note */}
                  <div className="flex flex-col gap-5 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="block font-bold text-slate-900">TechTrainX Digital Ledger</span>
                        <p className="mt-1 max-w-sm text-[11px] leading-5">Issued by TechTrainX — A unit of Xnava Enterprises. Cryptographically secured.</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={handleCopyLink}
                        className="custom-btn-outline inline-flex h-10 items-center gap-1.5 rounded-xl px-3.5 text-[10px] font-bold tracking-wider"
                      >
                        {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copied ? 'Link Copied' : 'Share Verification'}</span>
                      </button>
                      <button
                        onClick={handlePrint}
                        className="custom-btn inline-flex h-10 items-center gap-1.5 rounded-xl px-4 text-[10px] font-bold tracking-wider"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        <span>Print Official Record</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-red-200 bg-white p-7 text-center shadow-[0_20px_55px_rgba(15,23,42,0.08)] sm:p-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 ring-8 ring-red-50/60">
                  <AlertTriangle className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.02em] text-slate-950">Certificate Record Not Found</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                  The Certificate ID <span className="font-mono font-bold text-red-600">{certInput}</span> is not registered in our active ledger. Please verify the serial number from your physical document or contact academic registrar.
                </p>
                <div className="mt-6">
                  <a
                    href={`mailto:${COMPANY_CONFIG.admissionsEmail}?subject=Certificate Verification Query: ${certInput}`}
                    className="custom-btn-outline inline-flex h-11 items-center gap-2 rounded-xl px-5 text-[10px] font-bold tracking-[0.1em]"
                  >
                    <span>Contact Academic Registrar</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Academic Registry Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white/75 px-4 py-7 text-center font-sans text-xs text-slate-500 backdrop-blur-xl">
        <p>© {new Date().getFullYear()} {COMPANY_CONFIG.brandName} Academic Registry & Placement Foundry.</p>
        <p className="mt-1 text-[11px] text-slate-400">A Unit of <a href="https://xnava.in" target="_blank" rel="noreferrer" className="font-semibold text-[#0066cc] underline decoration-blue-200 underline-offset-2">Xnava Enterprise.</a> Government MSME Registered.</p>
      </footer>
    </div>
  );
};
