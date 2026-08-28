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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050b1a]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white max-w-lg w-full rounded-[26px] border border-slate-200/80 max-h-[90vh] overflow-hidden shadow-[0_24px_60px_-15px_rgba(7,26,53,0.35)] animate-in zoom-in-95 duration-200">

        {/* Brand accent rail */}
        <div className="h-1 w-full bg-gradient-to-r from-[#0066cc] via-[#3b82f6] to-[#0052a3]" />

        <div className="p-5 sm:p-7 max-h-[calc(90vh-4px)] overflow-y-auto space-y-4">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="relative w-14 h-14 mx-auto">
                <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-40" />
                <div className="relative w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm ring-1 ring-emerald-200">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-[#0a0a0f] tracking-tight">Hardware Inquiry Received</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you <strong className="text-[#0066cc]">{fullName}</strong>. Your project kit details for <strong className="text-[#0a0a0f]">{selectedProjectTitle}</strong> have been logged.
                </p>
                {submissionRefId && (
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-[#eef4fb] text-[#0052a3] border border-[#0066cc]/15 px-3 py-1 rounded-lg text-[11px] font-bold tracking-wide">
                    <span className="text-[#0066cc]">Tracking Ref</span>
                    <span className="text-slate-300">·</span>
                    {submissionRefId}
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200/80 text-xs text-slate-600 space-y-2 text-left">
                <p className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider">Kit Deliverables Included</p>
                <ul className="space-y-1.5 text-slate-600 text-[11px]">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-[#0066cc] shrink-0" />
                    Tested electronic sensors, microcontrollers &amp; cables
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-[#0066cc] shrink-0" />
                    Complete Arduino / ESP32 source code &amp; PDF schematics
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-[#0066cc] shrink-0" />
                    Project documentation for viva / presentations
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
                <button
                  onClick={handleWhatsAppDirect}
                  className="custom-btn w-full sm:w-auto bg-[#25d366] hover:bg-[#20bd5a] h-[40px] text-[10px] tracking-[0.08em] px-5 rounded-xl cursor-pointer shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat with Hardware Lab</span>
                </button>
                <button
                  onClick={onClose}
                  className="custom-btn-outline w-full sm:w-auto h-[40px] text-[10px] tracking-[0.08em] px-5 rounded-xl cursor-pointer border-slate-200"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#eef4fb] text-[#0066cc] text-[10px] font-bold uppercase tracking-wider">
                  <Cpu className="w-3 h-3" />
                  Hardware Engineering Lab
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#0a0a0f] tracking-tight">
                  Inquire Project Kit &amp; Schematics
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Verified hardware kits with working code and project assistance.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 font-semibold font-sans">
                  {errorMessage}
                </div>
              )}

              <div
                className="
                  [&_input]:h-11
                  [&_input]:rounded-xl
                  [&_input]:border-slate-200
                  [&_input]:bg-white
                  [&_input]:text-sm
                  [&_input]:shadow-sm
                  [&_input]:transition-colors
                  [&_input]:placeholder:text-slate-400
                  [&_input:focus]:border-[#0066cc]
                  [&_input:focus]:shadow-[0_0_0_4px_rgba(0,102,204,0.10)]
                  [&_select]:h-11
                  [&_select]:rounded-xl
                  [&_select]:border-slate-200
                  [&_select]:bg-white
                  [&_select]:text-sm
                  [&_select]:shadow-sm
                  [&_select:focus]:border-[#0066cc]
                  [&_select:focus]:shadow-[0_0_0_4px_rgba(0,102,204,0.10)]
                  [&_textarea]:rounded-xl
                  [&_textarea]:border-slate-200
                  [&_textarea]:bg-white
                  [&_textarea]:text-sm
                  [&_textarea]:shadow-sm
                  [&_textarea:focus]:border-[#0066cc]
                  [&_textarea:focus]:shadow-[0_0_0_4px_rgba(0,102,204,0.10)]
                  space-y-3.5
                "
              >
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
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="custom-btn-outline h-[38px] text-[10px] tracking-[0.08em] px-4 rounded-xl cursor-pointer border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !isFormValid}
                  className="custom-btn h-[38px] text-[10px] tracking-[0.08em] px-6 font-bold rounded-xl transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{submitting ? 'Submitting...' : 'Inquire Hardware Kit'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};