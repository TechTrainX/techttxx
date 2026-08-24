import React, { useState } from 'react';
import { verifyCertificateById } from '../services/apiService';
import { CertificateData } from '../types';
import { Award, ShieldCheck, Search, CheckCircle2, AlertTriangle, X, Printer, ShieldAlert } from 'lucide-react';
import { validateCertificateId } from '../utils/validators';
import confetti from 'canvas-confetti';

interface CertificateVerifierProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const CertificateVerifier: React.FC<CertificateVerifierProps> = ({
  isOpenModal = false,
  onCloseModal
}) => {
  const [certInput, setCertInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultCert, setResultCert] = useState<CertificateData | null>(null);
  const [searched, setSearched] = useState(false);
  const [validationError, setValidationError] = useState('');

  const certValidation = validateCertificateId(certInput);

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
      setValidationError(check.error || 'Please provide a valid certificate identifier.');
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
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0066cc', '#7fffd4', '#00061a']
        });
      } catch (err) {
        // silent fallback
      }
    }
  };

  const content = (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-block px-3 py-1 rounded-full bg-white text-[#0066cc] text-xs font-bold uppercase tracking-wider border border-blue-200">
          Official Registry
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#00061a]">
          Verify <span className="text-[#0066cc]">Student Certificate</span>
        </h2>
        <p className="text-sm text-[#555555]">
          Enter the student's unique Certificate ID to instantly verify completion credentials, grade transcripts, and project accreditation.
        </p>
      </div>

      {/* Verification Input Box */}
      <div className="max-w-md mx-auto space-y-2.5">
        <form onSubmit={(e) => handleVerify(e)} className="flex items-stretch shadow-elevation-1 rounded-xl overflow-hidden border border-gray-300 focus-within:border-[#0066cc] focus-within:ring-2 focus-within:ring-blue-100 bg-white">
          <input
            type="text"
            required
            value={certInput}
            onChange={handleInputChange}
            placeholder="Enter Certificate ID (e.g. TTXIN26271102)"
            className="w-full px-4 py-3 text-xs sm:text-sm text-[#333] outline-none uppercase font-mono tracking-wider"
          />
          <button
            type="submit"
            disabled={loading || !certInput.trim()}
            className="bg-[#0066cc] hover:bg-[#00061a] text-white px-5 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? 'Checking...' : 'Verify'}</span>
          </button>
        </form>

        {validationError && (
          <p className="text-xs text-red-600 font-semibold text-center flex items-center justify-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{validationError}</span>
          </p>
        )}

        {/* Quick Sample IDs */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#666] flex-wrap">
          <span>Official Sample Records:</span>
          <button
            type="button"
            onClick={() => handleVerify(undefined, 'TTXIN26271102')}
            className="font-mono text-[#0066cc] font-semibold hover:underline bg-blue-50 px-2.5 py-0.5 rounded cursor-pointer"
          >
            TTXIN26271102
          </button>
          <button
            type="button"
            onClick={() => handleVerify(undefined, 'TTX20268809')}
            className="font-mono text-[#0066cc] font-semibold hover:underline bg-blue-50 px-2.5 py-0.5 rounded cursor-pointer"
          >
            TTX20268809
          </button>
        </div>
      </div>

      {/* Verification Results Card */}
      {searched && (
        <div className="max-w-xl mx-auto">
          {resultCert && resultCert.isVerified ? (
            <div className="bg-white rounded-2xl border border-emerald-300 p-5 sm:p-6 shadow-elevation-2 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                      Verified & Validated Credential
                    </span>
                    <p className="text-sm font-mono font-bold text-[#00061a]">
                      ID: {resultCert.certificateId}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="custom-btn-outline py-1.5 px-3 text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#0066cc]" />
                  <span>Print</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#888] font-medium block">Student Name</span>
                  <span className="font-bold text-[#00061a] text-sm">{resultCert.studentName}</span>
                </div>
                <div>
                  <span className="text-[#888] font-medium block">Course / Industrial Track</span>
                  <span className="font-bold text-[#00061a]">{resultCert.courseName}</span>
                </div>
                <div>
                  <span className="text-[#888] font-medium block">Issue Date</span>
                  <span className="font-semibold text-[#333]">{resultCert.issueDate}</span>
                </div>
                <div>
                  <span className="text-[#888] font-medium block">Performance Grade</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md inline-block">
                    Grade {resultCert.grade || 'A+ (Distinction)'}
                  </span>
                </div>
              </div>

              {resultCert.programType && (
                <div className="p-3 bg-[#f0f8ff] rounded-xl border border-blue-100 text-xs">
                  <span className="text-[#666] font-medium block">Program Credential:</span>
                  <span className="font-bold text-[#0066cc]">{resultCert.programType}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-red-200 p-6 text-center space-y-2 shadow-elevation-1">
              <AlertTriangle className="w-8 h-8 text-red-500 mx-auto" />
              <h3 className="text-sm font-bold text-[#00061a]">No Record Found in TechTrainX Database</h3>
              <p className="text-xs text-[#666]">
                We could not find an active certificate matching "{certInput}". Please verify the serial ID or contact academic admissions support.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <div className="bg-[#f0f8ff] rounded-[20px] max-w-2xl w-full p-6 space-y-5 shadow-elevation-3 border border-blue-100 relative">
          <button
            onClick={onCloseModal}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-200 text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="verifier" className="py-16 px-4 bg-[#f0f8ff] border-b border-blue-100">
      <div className="max-w-4xl mx-auto">
        {content}
      </div>
    </section>
  );
};
