import React, { useState } from 'react';
import { ContactFormData } from '../types';
import { submitContactMessage } from '../services/apiService';
import { COMPANY_CONFIG } from '../config/companyConfig';
import { 
  Phone, Mail, MapPin, MessageSquare, Send, 
  Building, Clock, User, CheckCircle2, RefreshCw
} from 'lucide-react';
import { ValidatedInput } from './ui/ValidatedInput';
import { ValidatedPhoneInput } from './ui/ValidatedPhoneInput';
import { ValidatedTextarea } from './ui/ValidatedTextarea';
import { ValidatedSelect } from './ui/ValidatedSelect';
import { validateFullName, validateEmail, validatePhoneNumber, validateTextMessage } from '../utils/validators';
import { createWhatsAppDirectQueryLink } from '../services/whatsappService';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Course Admission & Syllabus Inquiry',
    message: '',
    purpose: 'Course Admission'
  });

  const [loading, setLoading] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<{ success: boolean; message: string; refId?: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Validations
  const nameValidation = validateFullName(formData.fullName);
  const emailValidation = validateEmail(formData.email);
  const phoneValidation = validatePhoneNumber(formData.phone);
  const messageValidation = validateTextMessage(formData.message, 10, 1000);

  const isFormValid = nameValidation.isValid && emailValidation.isValid && phoneValidation.isValid && messageValidation.isValid;

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
    if (!messageValidation.isValid) {
      setErrorMessage(messageValidation.error || 'Please enter your message.');
      return;
    }

    setLoading(true);
    try {
      const res = await submitContactMessage({
        ...formData,
        fullName: nameValidation.sanitized,
        email: emailValidation.sanitized,
        phone: phoneValidation.formatted,
        message: messageValidation.sanitized
      });
      setLoading(false);

      if (res.success) {
        setSubmittedResponse({
          success: true,
          message: res.message || 'Thank you! Your inquiry has been dispatched to the TechTrainX Owner & Admissions desk.',
          refId: (res as any).refId || `TTX-${Date.now().toString(36).toUpperCase()}`
        });
      } else {
        setErrorMessage(res.message || 'Failed to submit inquiry. Please retry.');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || 'Network error connecting to admissions server.');
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: 'Course Admission & Syllabus Inquiry',
      message: '',
      purpose: 'Course Admission'
    });
    setSubmittedResponse(null);
    setErrorMessage('');
  };

  return (
    <section id="contact" className="py-16 px-4 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0066cc] text-xs font-bold uppercase tracking-wider">
            Admissions Desk
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00061a]">
            Connect With Our <span className="text-[#0066cc]">Academic Counselors</span>
          </h2>
          <p className="text-sm text-[#555555]">
            Have questions about summer batches, fee structures, IoT project kits, or corporate training? Reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards & Campus Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#f0f8ff] p-6 rounded-[20px] border border-blue-100 space-y-4 shadow-elevation-1">
              <div>
                <h3 className="font-bold text-base text-[#00061a] flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#0066cc]" />
                  <span>{COMPANY_CONFIG.brandName} Training Center</span>
                </h3>
                <p className="text-xs text-[#0066cc] font-semibold mt-0.5">
                  {COMPANY_CONFIG.legalName}
                </p>
              </div>

              <div className="space-y-3 text-xs text-[#444]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#00061a] block font-bold">Campus Address:</strong>
                    <span>{COMPANY_CONFIG.campusAddress}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#0066cc] shrink-0" />
                  <div>
                    <strong className="text-[#00061a] block font-bold">Helpline & Admissions:</strong>
                    <a href={`tel:${COMPANY_CONFIG.phone}`} className="text-[#0066cc] font-bold hover:underline">
                      {COMPANY_CONFIG.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#0066cc] shrink-0" />
                  <div>
                    <strong className="text-[#00061a] block font-bold">Official Email:</strong>
                    <a href={`mailto:${COMPANY_CONFIG.admissionsEmail}`} className="text-[#0066cc] hover:underline">
                      {COMPANY_CONFIG.admissionsEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#0066cc] shrink-0" />
                  <div>
                    <strong className="text-[#00061a] block font-bold">Office Hours:</strong>
                    <span>Monday - Saturday: 8:30 AM to 7:30 PM (IST)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={createWhatsAppDirectQueryLink('Admissions & Course Fees')}
                  target="_blank"
                  rel="noreferrer"
                  className="custom-btn w-full justify-center text-xs py-2.5 shadow-elevation-1"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Helpline</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map Preview */}
            <div className="rounded-[20px] overflow-hidden border border-blue-100 h-44 shadow-elevation-1">
              <iframe
                title="TechTrainX Center Location"
                src="https://www.google.com/maps?q=techtrainx&z=14&t=m&hl=en&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: High-Craft Validated Contact Form */}
          <div className="lg:col-span-7 bg-[#f0f8ff] p-6 sm:p-8 rounded-[20px] border border-blue-100 shadow-elevation-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-[#00061a]">
                Send an Inquiry Message
              </h3>
              <span className="text-[11px] font-semibold text-[#0066cc] bg-blue-100/60 px-2.5 py-0.5 rounded-full">
                ⚡ Direct to Owner & Counselors
              </span>
            </div>
            <p className="text-xs text-[#666] mb-5">
              Please enter your valid details. Our academic counselors and director receive submissions in real-time.
            </p>

            {submittedResponse ? (
              <div className="p-6 bg-white rounded-2xl border border-emerald-200 text-center space-y-4 shadow-elevation-1 animate-in zoom-in-95 duration-200">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#00061a]">Inquiry Dispatched Successfully!</h4>
                  <p className="text-xs text-gray-600 mt-1">{submittedResponse.message}</p>
                  {submittedResponse.refId && (
                    <div className="mt-3 inline-block bg-gray-100 px-3 py-1 rounded-md text-[11px] font-mono font-semibold text-gray-700">
                      Tracking Ref: {submittedResponse.refId}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2 justify-center">
                  <a
                    href={createWhatsAppDirectQueryLink(`Reference: ${submittedResponse.refId}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="custom-btn text-xs py-2 px-4 justify-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Follow Up on WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="custom-btn-outline text-xs py-2 px-4 justify-center cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ValidatedInput
                    label="Full Name"
                    required
                    icon={User}
                    placeholder="e.g. Rahul Sharma"
                    value={formData.fullName}
                    onChange={(val) => setFormData({ ...formData, fullName: val })}
                    error={nameValidation.error}
                    isValid={nameValidation.isValid}
                    maxLength={60}
                  />

                  <ValidatedPhoneInput
                    label="WhatsApp Phone"
                    required
                    value={formData.phone}
                    onChange={(val) => setFormData({ ...formData, phone: val })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ValidatedInput
                    label="Email Address"
                    required
                    type="email"
                    icon={Mail}
                    placeholder="e.g. rahul@gmail.com"
                    value={formData.email}
                    onChange={(val) => setFormData({ ...formData, email: val })}
                    error={emailValidation.error}
                    isValid={emailValidation.isValid}
                    maxLength={100}
                  />

                  <ValidatedSelect
                    label="Inquiry Purpose"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value as any })}
                  >
                    <option value="Course Admission">Course Admission</option>
                    <option value="Summer Training (45 Days)">Summer Training (45 Days)</option>
                    <option value="Hardware Kit Purchase">Hardware Kit Purchase</option>
                    <option value="Corporate Training">Corporate Training</option>
                    <option value="Software Service Inquiry">Software Service Inquiry</option>
                    <option value="College Partnership / MoU">College Partnership / MoU</option>
                  </ValidatedSelect>
                </div>

                <ValidatedTextarea
                  label="Your Query or Requirement"
                  required
                  rows={3}
                  minLen={10}
                  maxLen={1000}
                  placeholder="Describe your course interest, batch preference, or questions..."
                  value={formData.message}
                  onChange={(val) => setFormData({ ...formData, message: val })}
                  error={messageValidation.error}
                  isValid={messageValidation.isValid}
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || !isFormValid}
                    className="custom-btn w-full justify-center py-3 text-xs sm:text-sm font-bold shadow-elevation-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Routing Message to Director...' : 'Submit Inquiry'}</span>
                  </button>
                  <p className="text-[11px] text-gray-500 text-center mt-2">
                    🔒 Submissions are encrypted & forwarded directly to the TechTrainX Owner & Lead Mentors.
                  </p>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
