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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#00061a] text-white p-5 border-b border-white/10 flex items-center justify-between">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-900/80 text-[#7fffd4] text-[9px] font-sans font-semibold uppercase tracking-wider border border-blue-700/60">
              <Sparkles className="w-2.5 h-2.5" />
              <span>1:1 Consultation</span>
            </span>
            <h3 className="text-base font-bold">
              Book Technical Consultation
            </h3>
            <p className="text-[11px] text-slate-400">
              Connect with Senior Staff Engineers & Mentors.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          
          {isBooked ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#0a0a0f]">Session Reserved!</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Your 15-minute diagnostic slot is confirmed for <strong className="text-[#0a0a0f]">{preferredSlot}</strong>.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1 text-left">
                <div className="flex justify-between"><span>Candidate:</span> <strong>{fullName}</strong></div>
                <div className="flex justify-between"><span>Domain:</span> <strong>{targetDomain}</strong></div>
                <div className="flex justify-between"><span>Google Meet Link:</span> <span className="text-[#0066cc] font-medium">meet.google.com/ttx-diag</span></div>
              </div>

              <button
                onClick={handleReset}
                className="custom-btn w-full justify-center h-[38px] text-[10px] tracking-[0.08em] font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-3">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  className="custom-btn w-full justify-center h-[38px] text-[10px] tracking-[0.08em] font-bold uppercase rounded-xl cursor-pointer disabled:opacity-50"
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
