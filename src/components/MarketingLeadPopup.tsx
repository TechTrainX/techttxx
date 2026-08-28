import React, { useState, useEffect } from 'react';
import { 
  X, Gift, CheckCircle2, 
  ArrowRight, User, BookOpen
} from 'lucide-react';
import { submitEnrollment } from '../services/apiService.js';
import { ValidatedInput } from './ui/ValidatedInput';
import { ValidatedPhoneInput } from './ui/ValidatedPhoneInput';
import { ValidatedSelect } from './ui/ValidatedSelect';
import { validateFullName, validatePhoneNumber } from '../utils/validators.js';

interface MarketingLeadPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenEnrollment: (course?: string) => void;
}

export const MarketingLeadPopup: React.FC<MarketingLeadPopupProps> = ({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  onOpenEnrollment
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [minimizedBadge, setMinimizedBadge] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    course: 'Full Stack Web Development'
  });

  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

  // Real-time Validation
  const nameValidation = validateFullName(formData.fullName);
  const phoneValidation = validatePhoneNumber(formData.phone);
  const isFormValid = nameValidation.isValid && phoneValidation.isValid;

  useEffect(() => {
    const dismissedAt = localStorage.getItem('ttx_lead_popup_dismissed');
    const isDismissedRecently = dismissedAt && (Date.now() - parseInt(dismissedAt, 10)) < 1000 * 60 * 60 * 12;

    if (!isDismissedRecently && controlledIsOpen === undefined) {
      const timer = setTimeout(() => {
        setInternalOpen(true);
      }, 9000);
      return () => clearTimeout(timer);
    } else if (isDismissedRecently) {
      setMinimizedBadge(true);
    }
  }, [controlledIsOpen]);

  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalOpen(false);
      setMinimizedBadge(true);
      localStorage.setItem('ttx_lead_popup_dismissed', Date.now().toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nameValidation.isValid) {
      setErrorMessage(nameValidation.error || 'Please enter a valid full name.');
      return;
    }
    if (!phoneValidation.isValid) {
      setErrorMessage(phoneValidation.error || 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitEnrollment({
        fullName: nameValidation.sanitized,
        email: formData.email ? formData.email.trim().toLowerCase() : `${phoneValidation.rawDigits}@lead.techtrainx.online`,
        phone: phoneValidation.formatted,
        whatsappPhone: phoneValidation.formatted,
        collegeName: 'Web Early Bird Inquiry',
        branchYear: 'Final Year / Fresher',
        selectedCourseOrProgram: formData.course,
        trainingMode: 'Offline (Tech Foundry Campus)',
        preferredTiming: 'Morning (9 AM - 2 PM)',
        queryOrNotes: 'Special Early Bird Batch Discount Claimed'
      });

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error processing request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Minimized bottom-left trigger button */}
      {minimizedBadge && !isModalOpen && (
        <button
          onClick={() => {
            setMinimizedBadge(false);
            setInternalOpen(true);
          }}
          className="group fixed bottom-5 left-5 z-40 flex h-11 items-center gap-2 rounded-2xl border border-blue-300/30 bg-[#050d24] px-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_16px_35px_rgba(5,13,36,0.28)] transition-all hover:-translate-y-1 hover:bg-[#0066cc] hover:shadow-[0_20px_42px_rgba(0,102,204,0.3)] cursor-pointer"
        >
          <Gift className="h-4 w-4 text-blue-200 transition-transform group-hover:rotate-12" />
          <span>Special Offer</span>
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050d24]/75 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md space-y-4 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_28px_90px_rgba(5,13,36,0.35)] sm:p-6">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#0066cc]/10 blur-3xl" />
            <div className="relative z-10 mb-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#0066cc]"><span className="h-1.5 w-1.5 rounded-full bg-[#0066cc] shadow-[0_0_8px_rgba(0,102,204,0.7)]" />TechTrainX early access</div>
            
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 z-20 rounded-xl border border-slate-200 bg-white/80 p-2 text-slate-400 shadow-sm backdrop-blur-sm transition-all hover:border-[#0066cc] hover:bg-[#0066cc] hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="space-y-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 text-center animate-in zoom-in-95 duration-200">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-600 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-[#050d24]">Scholarship Claimed!</h3>
                <p className="text-xs text-slate-600">
                  Application recorded for <strong>{formData.course}</strong>. Our counseling desk will WhatsApp you the fee structure and schedule.
                </p>
                <button
                  onClick={handleClose}
                  className="custom-btn mt-2 h-11 rounded-xl px-6 text-[10px] font-bold uppercase tracking-[0.1em] shadow-[0_10px_24px_rgba(0,102,204,0.2)] transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Got It
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2 border-b border-slate-200 pb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0066cc]">
                    Limited Period Offer
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-[#050d24]">
                    Claim Early Bird Scholarship
                  </h3>
                  <p className="max-w-sm text-xs leading-5 text-slate-600">
                    Fee waiver for upcoming industrial engineering batches.
                  </p>
                </div>

                {errorMessage && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-3">
                  <ValidatedInput
                    label="Full Name"
                    required
                    icon={User}
                    placeholder="Rahul Verma"
                    value={formData.fullName}
                    onChange={(val) => setFormData({ ...formData, fullName: val })}
                    error={nameValidation.error}
                    isValid={nameValidation.isValid}
                    maxLength={60}
                  />

                  <ValidatedPhoneInput
                    label="WhatsApp Mobile"
                    required
                    value={formData.phone}
                    onChange={(val) => setFormData({ ...formData, phone: val })}
                  />

                  <ValidatedSelect
                    label="Target Course Track"
                    icon={BookOpen}
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  >
                    <option value="Full Stack Web Development">Full Stack Web Development</option>
                    <option value="Artificial Intelligence & ML">Artificial Intelligence & ML</option>
                    <option value="Embedded Systems & IoT">Embedded Systems & IoT</option>
                    <option value="Java Full Stack Microservices">Java Full Stack Microservices</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                  </ValidatedSelect>
                </div>

                <div className="pt-1.5">
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className="custom-btn h-11 w-full justify-center rounded-xl text-[10px] font-bold uppercase tracking-[0.1em] shadow-[0_12px_28px_rgba(0,102,204,0.22)] transition-all hover:-translate-y-0.5"
                  >
                    <span>{isSubmitting ? 'Processing...' : 'Claim Discount & Syllabus'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
};
