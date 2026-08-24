import React, { useState } from 'react';
import { verifyCertificateById } from '../services/apiService';
import { CertificateData } from '../types';
import { Award, ShieldCheck, Search, CheckCircle, AlertTriangle, Download, X, QrCode, Sparkles, Printer, Check, ExternalLink } from 'lucide-react';
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
  const [showPrintModal, setShowPrintModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    setCertInput(cleaned);
  };

  const handleVerify = async (e?: React.FormEvent, customId?: string) => {
    if (e) e.preventDefault();
    const targetId = (customId || certInput).replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (!targetId) return;
    
    setCertInput(targetId);
    setLoading(true);
    setSearched(true);
    
    // Simulate laser scanning for realism
    await new Promise(r => setTimeout(r, 600));
    const data = await verifyCertificateById(targetId);
    setResultCert(data);
    setLoading(false);

    if (data && data.isVerified) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f2fe', '#06b6d4', '#6366f1', '#10b981']
        });
      } catch (err) {
        // silent fallback
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const content = (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-inner">
          <Award className="w-3.5 h-3.5 text-cyan-400" /> Tamper-Proof Credential Registry
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Verify <span className="gradient-text-cyan">Student Credential</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Instant cryptographic authenticity check for TechTrainX Summer Training, Apprenticeship & Project Certifications.
        </p>
      </div>

      {/* Input Form with Laser Scanner Effect */}
      <div className="max-w-md mx-auto space-y-3">
        <form onSubmit={(e) => handleVerify(e)} className="w-full relative">
          <div className="p-2 rounded-2xl bg-slate-950/90 border border-cyan-500/30 shadow-2xl flex items-center gap-2 focus-within:border-cyan-400 relative overflow-hidden">
            {loading && <div className="scanner-beam" />}
            <Search className="w-4 h-4 text-cyan-400 ml-2 shrink-0" />
            <input
              type="text"
              required
              value={certInput}
              onChange={handleInputChange}
              placeholder="Enter Registration ID e.g. TTXIN26271102"
              className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none uppercase font-mono tracking-wider"
            />
            <button
              type="submit"
              disabled={loading || !certInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-slate-950 font-black text-xs shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-40 whitespace-nowrap"
            >
              {loading ? 'Scanning...' : 'Verify Now'}
            </button>
          </div>
        </form>

        {/* Quick Sample IDs */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 flex-wrap">
          <span>Try Active Sample IDs:</span>
          {['TTXIN26271102', 'TTXFS26190411', 'TTXAI26880915'].map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => handleVerify(undefined, sample)}
              className="text-cyan-400 hover:text-cyan-300 underline font-mono cursor-pointer font-bold"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Result Verification Card */}
      {searched && (
        <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-200">
          {resultCert ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border-2 border-emerald-500/40 shadow-2xl relative space-y-6">
              
              {/* Authenticity Watermark Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle className="w-5 h-5" />
                  <span>Officially Verified & Authentic Credential</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                    Status: {resultCert.isVerified ? 'VERIFIED ACTIVE' : 'PENDING'}
                  </span>
                  <button
                    onClick={() => setShowPrintModal(true)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs flex items-center gap-1 cursor-pointer"
                    title="Print Certificate"
                  >
                    <Printer className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[10px] font-bold">Print View</span>
                  </button>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Awarded To</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">{resultCert.studentName}</h3>
                    <p className="text-xs text-slate-400">{resultCert.issuedBy}</p>
                  </div>
                  
                  {/* Holographic QR Code Box */}
                  <div className="p-2.5 rounded-2xl bg-slate-900 border border-cyan-500/30 flex items-center gap-2.5 self-start sm:self-auto">
                    <div className="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-slate-950" />
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono">
                      <p className="text-white font-bold">SECURE QR</p>
                      <p>{resultCert.certificateId}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Course / Track</span>
                    <p className="font-bold text-white mt-0.5">{resultCert.courseName}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Grade Achieved</span>
                    <p className="font-black text-cyan-400 mt-0.5">{resultCert.grade}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Program Type & Dates</span>
                    <p className="text-slate-300 mt-0.5">{resultCert.programType} ({resultCert.issueDate})</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Verification Hash</span>
                    <p className="text-slate-300 mt-0.5 font-mono text-[11px] truncate">{resultCert.verificationCode}</p>
                  </div>
                </div>

                {/* Skills Certified */}
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold mb-1">
                    Skills Verified & Assessed
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {resultCert.skillsCertified.map((skill, idx) => (
                      <span key={idx} className="bg-slate-900 text-cyan-300 border border-slate-800 text-[11px] px-2.5 py-0.5 rounded-lg font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Signatures & Accreditation Footer */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                <div>
                  <p className="font-semibold text-slate-300">Issued by TechTrainX Academic & Placement Board</p>
                  <p className="text-[10px]">Registration ID: <span className="font-mono text-cyan-400">{resultCert.certificateId}</span></p>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <span className="text-[11px] text-cyan-300 font-bold">Tamper-Proof Digital Record</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-red-950/40 border border-red-500/30 text-center space-y-3">
              <AlertTriangle className="w-8 h-8 text-red-400 mx-auto" />
              <h4 className="text-base font-bold text-white">No Certificate Found</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                No verified record found for ID <code className="text-red-400 font-mono font-bold bg-slate-950 px-2 py-0.5 rounded">{certInput}</code>. Please check the spelling or contact admissions at <span className="text-white font-bold">+91 8545092070</span>.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Official Printable Certificate Preview Modal */}
      {showPrintModal && resultCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-950 max-w-2xl w-full p-8 rounded-3xl border border-cyan-500/40 shadow-2xl relative space-y-6">
            <button
              onClick={() => setShowPrintModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 rounded-2xl bg-white text-slate-900 border-4 border-double border-cyan-700 space-y-4 text-center font-serif">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-sans text-xs font-black tracking-tighter text-cyan-800">TECHTRAINX TECHNOLOGIES</span>
                <span className="font-sans text-[10px] text-slate-500 uppercase">DIGITALLY VERIFIED CREDENTIAL</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 tracking-wide uppercase pt-2">
                Certificate of Industrial Completion
              </h2>
              <p className="text-xs text-slate-600 italic">This is to officially certify that</p>
              
              <h3 className="text-2xl font-black text-cyan-900 underline underline-offset-4 font-sans">
                {resultCert.studentName}
              </h3>
              
              <p className="text-xs text-slate-700 max-w-md mx-auto">
                has successfully completed the intensive industrial program in <strong className="text-slate-900">{resultCert.courseName}</strong> with a performance grade of <strong className="text-cyan-800">{resultCert.grade}</strong>.
              </p>

              <div className="pt-6 flex items-center justify-between text-left text-[11px] font-sans border-t border-slate-300">
                <div>
                  <p className="text-slate-500 text-[9px]">REGISTRATION ID</p>
                  <p className="font-mono font-bold text-slate-800">{resultCert.certificateId}</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-cyan-100 border border-cyan-600 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-cyan-800" />
                  </div>
                  <p className="text-[9px] text-slate-500 mt-1">OFFICIAL SEAL</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-[9px]">ISSUE DATE</p>
                  <p className="font-bold text-slate-800">{resultCert.issueDate}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
        <div className="bg-slate-900 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border border-slate-700 relative shadow-2xl">
          <button
            onClick={onCloseModal}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="verifier" className="py-20 px-4 bg-[#030712] relative border-t border-b border-slate-850 cyber-dots-bg">
      <div className="max-w-7xl mx-auto">
        {content}
      </div>
    </section>
  );
};

