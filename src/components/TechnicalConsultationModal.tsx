import React, { useState } from 'react';
import { 
  X, Calendar, Clock, User, Mail,
  CheckCircle2, Sparkles, GraduationCap, Globe
} from 'lucide-react';
import { ValidatedInput } from './ui/ValidatedInput';
import { ValidatedPhoneInput } from './ui/ValidatedPhoneInput';
import { ValidatedSelect } from './ui/ValidatedSelect';
import { validateFullName, validateEmail, validatePhoneNumber } from '../utils/validators.js';

interface TechnicalConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalConsultationModal: React.FC<TechnicalConsultationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [targetDomain, setTargetDomain] = useState('High-Concurrency Distributed Backend');
  const [preferredSlot, setPreferredSlot] = useState('Tomorrow, 6:00 PM IST');
  const [githubOrLinkedin, setGithubOrLinkedin] = useState('');
  const [loading, setLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const nameVal = validateFullName(fullName);
  const emailVal = validateEmail(email);
  const phoneVal = validatePhoneNumber(phone);
  const isValid = nameVal.isValid && emailVal.isValid && phoneVal.isValid;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsBooked(true);
    }, 800);
  };

  const handleReset = () => {
    setIsBooked(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setCollegeName('');
    setGithubOrLinkedin('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050d24]/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex max-h-[min(92vh,760px)] w-full max-w-xl flex-col overflow-hidden rounded-[1.5rem] border border-white/80 bg-white shadow-[0_28px_90px_rgba(5,13,36,0.35)]">
        
        {/* Header */}
        <div className="relative flex items-center justify-between overflow-hidden border-b border-white/10 bg-[#050d24] p-5 text-white sm:p-6">
          <div className="relative z-10 space-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-300/20 bg-[#0066cc]/20 px-2.5 py-1 text-[9px] font-sans font-semibold uppercase tracking-wider text-blue-100 shadow-inner">
              <Sparkles className="w-2.5 h-2.5" />
              <span>1:1 Technical Consultation</span>
            </span>
            <h3 className="text-lg font-bold tracking-tight sm:text-xl">
              Book Technical Consultation
            </h3>
            <p className="text-[11px] leading-5 text-slate-300">
              Connect with Senior Staff Engineers & Mentors.
            </p>
          </div>

          <button
            onClick={onClose}
            className="relative z-10 rounded-xl border border-white/10 bg-white/10 p-2 text-slate-300 transition-all hover:bg-white/20 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div aria-hidden="true" className="absolute -right-16 -top-24 h-52 w-52 rounded-full bg-[#0066cc]/20 blur-3xl" />
          <div aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#0066cc]/70 to-transparent" />
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6">
          
          {isBooked ? (
            <div className="space-y-5 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 text-center sm:p-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-600 shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold tracking-tight text-[#050d24]">Session Reserved!</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Your 15-minute diagnostic slot is confirmed for <strong className="text-[#0a0a0f]">{preferredSlot}</strong>.
                </p>
              </div>

              <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-4 text-left text-xs text-slate-700 shadow-sm">
                <div className="flex justify-between"><span>Candidate:</span> <strong>{fullName}</strong></div>
                <div className="flex justify-between"><span>Domain:</span> <strong>{targetDomain}</strong></div>
                <div className="flex justify-between"><span>Google Meet Link:</span> <span className="text-[#0066cc] font-medium">meet.google.com/ttx-diag</span></div>
              </div>

              <button
                onClick={handleReset}
                className="custom-btn h-11 w-full justify-center rounded-xl text-[10px] font-bold uppercase tracking-[0.1em] shadow-[0_10px_24px_rgba(0,102,204,0.18)] transition-all hover:-translate-y-0.5"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-4">
              
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ValidatedInput
                  label="Full Name"
                  required
                  value={fullName}
                  onChange={setFullName}
                  error={nameVal.error}
                  isValid={nameVal.isValid}
                  placeholder="Aryan Sharma"
                  icon={User}
                />

                <ValidatedPhoneInput
                  label="WhatsApp Number"
                  required
                  value={phone}
                  onChange={setPhone}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ValidatedInput
                  label="Email Address"
                  required
                  type="email"
                  value={email}
                  onChange={setEmail}
                  error={emailVal.error}
                  isValid={emailVal.isValid}
                  placeholder="aryan@example.com"
                  icon={Mail}
                />

                <ValidatedInput
                  label="College / Institute"
                  value={collegeName}
                  onChange={setCollegeName}
                  placeholder="Institution name"
                  icon={GraduationCap}
                />
              </div>

              <ValidatedSelect
                label="Target Engineering Specialization"
                value={targetDomain}
                onChange={(e) => setTargetDomain(e.target.value)}
              >
                <option>Agentic AI & Multi-Agent Swarms</option>
                <option>Generative AI & LLM Systems (RAG / Fine-Tuning)</option>
                <option>Machine Learning & Deep Learning Core</option>
                <option>DSA, Concurrency & Distributed Systems</option>
                <option>Edge AI & Embedded Robotics</option>
                <option>Full-Stack Scalable Cloud Architecture</option>
              </ValidatedSelect>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ValidatedSelect
                  label="Preferred Time Slot"
                  icon={Clock}
                  value={preferredSlot}
                  onChange={(e) => setPreferredSlot(e.target.value)}
                >
                  <option>Today, 7:30 PM IST</option>
                  <option>Tomorrow, 6:00 PM IST</option>
                  <option>Tomorrow, 8:00 PM IST</option>
                  <option>Saturday Morning, 11:00 AM IST</option>
                  <option>Sunday Evening, 5:00 PM IST</option>
                </ValidatedSelect>

                <ValidatedInput
                  label="GitHub / LinkedIn"
                  value={githubOrLinkedin}
                  onChange={setGithubOrLinkedin}
                  placeholder="profile URL or username"
                  icon={Globe}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !isValid}
                  className="custom-btn h-11 w-full justify-center rounded-xl text-[10px] font-bold uppercase tracking-[0.1em] shadow-[0_12px_28px_rgba(0,102,204,0.22)] transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{loading ? 'Confirming Slot...' : 'Confirm 1:1 Diagnostic Slot'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
