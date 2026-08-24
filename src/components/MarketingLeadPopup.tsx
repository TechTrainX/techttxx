import React, { useState, useEffect } from 'react';
import { 
  X, Sparkles, Gift, CheckCircle2, 
  ArrowRight, MessageSquare, User, BookOpen
} from 'lucide-react';
import { submitEnrollment } from '../services/apiService';
import { ValidatedInput } from './ui/ValidatedInput';
import { ValidatedPhoneInput } from './ui/ValidatedPhoneInput';
import { ValidatedSelect } from './ui/ValidatedSelect';
import { validateFullName, validatePhoneNumber } from '../utils/validators';

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
          className="fixed bottom-5 left-5 z-40 bg-[#0066cc] text-white px-3.5 py-2 rounded-full shadow-elevation-2 text-xs font-bold flex items-center gap-1.5 hover:bg-[#00061a] transition-all cursor-pointer"
        >
          <Gift className="w-3.5 h-3.5 text-[#7fffd4]" />
          <span>Special Offer</span>
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full p-6 rounded-[20px] border border-blue-200 relative shadow-elevation-3 space-y-4">
            
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-4 space-y-3 animate-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-elevation-1">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#00061a]">Coupon Claimed!</h3>
                <p className="text-xs text-[#555]">
                  Our counseling team and director have received your application for <strong>{formData.course}</strong>. We will WhatsApp you the fee scholarship details.
                </p>
                <button
                  onClick={handleClose}
                  className="custom-btn py-2 px-6 text-xs mt-2 cursor-pointer shadow-elevation-1"
                >
                  Got It
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <span className="text-[10px] font-bold text-[#0066cc] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full">
                    Limited Period Offer
                  </span>
                  <h3 className="text-lg font-bold text-[#00061a] mt-1">
                    Claim Early Bird Batch Discount
                  </h3>
                  <p className="text-xs text-[#666]">
                    Get instant fee waiver on upcoming software & hardware training batches.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-3">
                  <ValidatedInput
                    label="Your Full Name"
                    required
                    icon={User}
                    placeholder="e.g. Rahul Verma"
                    value={formData.fullName}
                    onChange={(val) => setFormData({ ...formData, fullName: val })}
                    error={nameValidation.error}
                    isValid={nameValidation.isValid}
                    maxLength={60}
                  />

                  <ValidatedPhoneInput
                    label="WhatsApp Mobile Number"
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

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className="custom-btn w-full justify-center py-2.5 text-xs font-bold shadow-elevation-2"
                  >
                    <span>{isSubmitting ? 'Processing...' : 'Claim Discount & Syllabus'}</span>
                    <ArrowRight className="w-4 h-4" />
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
