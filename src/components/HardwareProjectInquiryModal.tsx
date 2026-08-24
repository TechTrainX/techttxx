import React, { useState } from 'react';
import { HARDWARE_PROJECTS_DATA } from '../data/hardwareProjectsData';
import { submitHardwareProjectInquiry } from '../services/apiService';
import { createWhatsAppHardwareProjectLink } from '../services/whatsappService';
import { 
  X, CheckCircle2, MessageSquare, ArrowRight, User, Mail, Cpu, MapPin, GraduationCap
} from 'lucide-react';
import { ValidatedInput } from './ui/ValidatedInput';
import { ValidatedPhoneInput } from './ui/ValidatedPhoneInput';
import { ValidatedSelect } from './ui/ValidatedSelect';
import { ValidatedTextarea } from './ui/ValidatedTextarea';
import { validateFullName, validateEmail, validatePhoneNumber, validateCollegeOrOrg, validateCity } from '../utils/validators';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white max-w-xl w-full p-6 sm:p-7 rounded-[20px] border border-gray-200 relative max-h-[92vh] overflow-y-auto shadow-elevation-3 space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-gray-400 hover:text-gray-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-elevation-1">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#00061a]">Hardware Kit Inquiry Received</h3>
              <p className="text-xs text-[#555] max-w-md mx-auto">
                Thank you <strong className="text-[#0066cc]">{fullName}</strong>. Our hardware engineers & director have received your order details for <strong className="text-[#00061a]">{selectedProjectTitle}</strong>.
              </p>
              {submissionRefId && (
                <div className="mt-2 inline-block bg-blue-50 text-[#0066cc] px-3 py-1 rounded-md text-[11px] font-mono font-bold">
                  Tracking Ref: {submissionRefId}
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#f0f8ff] border border-blue-100 text-xs text-[#444] space-y-1.5 text-left">
              <p className="font-bold text-[#00061a]">Deliverables Included with Kit:</p>
              <ul className="space-y-1 list-disc list-inside text-[#555]">
                <li>Tested electronic sensors, microcontrollers & cables</li>
                <li>Complete Arduino / ESP32 source code & PDF schematics</li>
                <li>Project documentation for viva / college presentations</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleWhatsAppDirect}
                className="custom-btn w-full sm:w-auto bg-[#25d366] hover:bg-[#20bd5a] text-xs py-2.5 px-6 shadow-elevation-1 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Hardware Lab</span>
              </button>
              <button
                onClick={onClose}
                className="custom-btn-outline w-full sm:w-auto text-xs py-2.5 px-6 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-[#0066cc] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full">
                Hardware Engineering Lab
              </span>
              <h3 className="text-xl font-bold text-[#00061a] mt-1">
                Inquire Project Kit & Schematics
              </h3>
              <p className="text-xs text-[#666]">
                Order verified hardware kits with working code and 1:1 project assistance.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 font-semibold">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <ValidatedInput
                label="Your Full Name"
                required
                icon={User}
                placeholder="e.g. Anand Verma"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <ValidatedInput
                label="Email Address"
                required
                type="email"
                icon={Mail}
                placeholder="e.g. anand@gmail.com"
                value={email}
                onChange={setEmail}
                error={emailValidation.error}
                isValid={emailValidation.isValid}
                maxLength={100}
              />

              <ValidatedInput
                label="College & Branch"
                icon={GraduationCap}
                placeholder="e.g. CBIT - ECE 4th Year"
                value={collegeName}
                onChange={setCollegeName}
                error={collegeValidation.error}
                isValid={collegeValidation.isValid}
                maxLength={100}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                label="Delivery City / Town"
                icon={MapPin}
                placeholder="e.g. Hyderabad / Bangalore"
                value={deliveryCity}
                onChange={setDeliveryCity}
                error={cityValidation.error}
                isValid={cityValidation.isValid}
                maxLength={50}
              />
            </div>

            <ValidatedTextarea
              label="Customization or Sensor Add-on Needs (Optional)"
              placeholder="e.g. Need extra ultrasonic sensors, GSM module, or custom PCB layout..."
              rows={2}
              minLen={0}
              maxLen={400}
              value={kitCustomizationNeeds}
              onChange={setKitCustomizationNeeds}
            />

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="custom-btn-outline py-2.5 px-5 text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !isFormValid}
                className="custom-btn py-2.5 px-7 text-xs font-bold shadow-elevation-2"
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
