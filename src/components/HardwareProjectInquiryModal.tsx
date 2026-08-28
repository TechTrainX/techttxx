import React, { useState } from 'react';
import { HARDWARE_PROJECTS_DATA } from '../data/hardwareProjectsData';
import { submitHardwareProjectInquiry } from '../services/apiService.js';
import { createWhatsAppHardwareProjectLink } from '../services/whatsappService';
import { 
  X, CheckCircle2, MessageSquare, ArrowRight, User, Mail, Cpu, MapPin, GraduationCap
} from 'lucide-react';
import { ValidatedInput } from './ui/ValidatedInput';
import { ValidatedPhoneInput } from './ui/ValidatedPhoneInput';
import { ValidatedSelect } from './ui/ValidatedSelect';
import { ValidatedTextarea } from './ui/ValidatedTextarea';
import { validateFullName, validateEmail, validatePhoneNumber, validateCollegeOrOrg, validateCity } from '../utils/validators.js';

interface HardwareProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProject?: string;
}

export const HardwareProjectInquiryModal: React.FC<HardwareProjectInquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedProject
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(
    preselectedProject || HARDWARE_PROJECTS_DATA[0]?.title || 'Smart 4WD RC Car with Bluetooth & Obstacle Radar'
  );
  const [deliveryCity, setDeliveryCity] = useState('');
  const [preferredAssistanceMode, setPreferredAssistanceMode] = useState<
    'Online 1-on-1 Mentorship' | 'Offline Center Lab Assistance' | 'Complete Tested & Pre-Assembled Model'
  >('Online 1-on-1 Mentorship');
  const [kitCustomizationNeeds, setKitCustomizationNeeds] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionRefId, setSubmissionRefId] = useState('');

  React.useEffect(() => {
    if (preselectedProject) {
      setSelectedProjectTitle(preselectedProject);
    }
  }, [preselectedProject]);

  if (!isOpen) return null;

  // Real-time Validations
  const nameValidation = validateFullName(fullName);
  const emailValidation = validateEmail(email);
  const phoneValidation = validatePhoneNumber(phone);
  const collegeValidation = validateCollegeOrOrg(collegeName, false);
  const cityValidation = validateCity(deliveryCity, false);

  const isFormValid = nameValidation.isValid && emailValidation.isValid && phoneValidation.isValid;

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
    if (!emailValidation.isValid) {
      setErrorMessage(emailValidation.error || 'Please enter a valid email address.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        fullName: nameValidation.sanitized,
        email: emailValidation.sanitized,
        phone: phoneValidation.formatted,
        collegeName: collegeValidation.sanitized,
        selectedProjectTitle,
        deliveryCity: cityValidation.sanitized,
        preferredAssistanceMode,
        kitCustomizationNeeds
      };

      const result = await submitHardwareProjectInquiry(payload);

      if (result.success) {
        setSubmissionRefId((result as any).refId || `HW-${Date.now().toString(36).toUpperCase()}`);
        setIsSuccess(true);
      } else {
        setErrorMessage(result.message || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error processing hardware request.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const link = createWhatsAppHardwareProjectLink(selectedProjectTitle, fullName, collegeName);
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white max-w-lg w-full p-5 sm:p-7 rounded-2xl border border-slate-200/90 relative max-h-[90vh] overflow-y-auto shadow-2xl space-y-4">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-4 space-y-3.5 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-[#0a0a0f]">Hardware Inquiry Received</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you <strong className="text-[#0066cc]">{fullName}</strong>. Your project kit details for <strong className="text-[#0a0a0f]">{selectedProjectTitle}</strong> have been logged.
              </p>
              {submissionRefId && (
                <div className="mt-1.5 inline-block bg-blue-50 text-[#0066cc] px-3 py-0.5 rounded-md text-[11px] font-bold">
                  Tracking Ref: {submissionRefId}
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-1 text-left">
              <p className="font-semibold text-slate-800 text-[11px]">Kit Deliverables Included:</p>
              <ul className="space-y-0.5 list-disc list-inside text-slate-600 text-[11px]">
                <li>Tested electronic sensors, microcontrollers & cables</li>
                <li>Complete Arduino / ESP32 source code & PDF schematics</li>
                <li>Project documentation for viva / presentations</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
              <button
                onClick={handleWhatsAppDirect}
                className="custom-btn w-full sm:w-auto bg-[#25d366] hover:bg-[#20bd5a] h-[38px] text-[10px] tracking-[0.08em] px-5 rounded-xl cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat with Hardware Lab</span>
              </button>
              <button
                onClick={onClose}
                className="custom-btn-outline w-full sm:w-auto h-[38px] text-[10px] tracking-[0.08em] px-5 rounded-xl cursor-pointer border-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0066cc] text-[10px] font-bold uppercase tracking-wider">
                Hardware Engineering Lab
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#0a0a0f]">
                Inquire Project Kit & Schematics
              </h3>
              <p className="text-xs text-slate-500">
                Verified hardware kits with working code and project assistance.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 font-semibold font-sans">
                {errorMessage}
              </div>
            )}

            <ValidatedSelect
              label="Selected Project Kit"
              icon={Cpu}
              value={selectedProjectTitle}
              onChange={(e) => setSelectedProjectTitle(e.target.value)}
            >
              {HARDWARE_PROJECTS_DATA.map((proj) => (
                <option key={proj.id} value={proj.title}>
                  {proj.title} ({proj.microcontroller})
                </option>
              ))}
            </ValidatedSelect>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ValidatedInput
                label="Full Name"
                required
                icon={User}
                placeholder="Anand Verma"
                value={fullName}
                onChange={setFullName}
                error={nameValidation.error}
                isValid={nameValidation.isValid}
                maxLength={60}
              />

              <ValidatedPhoneInput
                label="WhatsApp Phone"
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
                icon={Mail}
                placeholder="anand@example.com"
                value={email}
                onChange={setEmail}
                error={emailValidation.error}
                isValid={emailValidation.isValid}
                maxLength={100}
              />

              <ValidatedInput
                label="College & Branch"
                icon={GraduationCap}
                placeholder="College - ECE 4th Year"
                value={collegeName}
                onChange={setCollegeName}
                error={collegeValidation.error}
                isValid={collegeValidation.isValid}
                maxLength={100}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ValidatedSelect
                label="Assistance Mode"
                value={preferredAssistanceMode}
                onChange={(e: any) => setPreferredAssistanceMode(e.target.value)}
              >
                <option value="Online 1-on-1 Mentorship">Online 1-on-1 Mentorship</option>
                <option value="Offline Center Lab Assistance">Offline Center Lab Assistance</option>
                <option value="Complete Tested & Pre-Assembled Model">Complete Tested & Pre-Assembled Model</option>
              </ValidatedSelect>

              <ValidatedInput
                label="Delivery City"
                icon={MapPin}
                placeholder="City name"
                value={deliveryCity}
                onChange={setDeliveryCity}
                error={cityValidation.error}
                isValid={cityValidation.isValid}
                maxLength={50}
              />
            </div>

            <ValidatedTextarea
              label="Customization or Add-ons (Optional)"
              placeholder="Sensor changes, extra modules, or viva deadline..."
              rows={2}
              minLen={0}
              maxLen={400}
              value={kitCustomizationNeeds}
              onChange={setKitCustomizationNeeds}
            />

            <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="custom-btn-outline h-[36px] text-[10px] tracking-[0.08em] px-4 rounded-xl cursor-pointer border-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !isFormValid}
                className="custom-btn h-[36px] text-[10px] tracking-[0.08em] px-6 font-bold rounded-xl"
              >
                <span>{submitting ? 'Submitting...' : 'Inquire Hardware Kit'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
