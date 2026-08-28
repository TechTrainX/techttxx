import React, { useState } from 'react';
import { ContactFormData } from '../types';
import { submitContactMessage } from '../services/apiService.js';
import { COMPANY_CONFIG } from '../config/companyConfig.js';
import { 
  Phone, Mail, MapPin, Send, 
  Building, Clock, User, CheckCircle2, RefreshCw, MessageSquare,
  Navigation, ExternalLink, Copy, Check
} from 'lucide-react';
import { ValidatedInput } from './ui/ValidatedInput';
import { ValidatedPhoneInput } from './ui/ValidatedPhoneInput';
import { ValidatedTextarea } from './ui/ValidatedTextarea';
import { validateFullName, validateEmail, validatePhoneNumber, validateTextMessage } from '../utils/validators.js';
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
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Validations
  const nameValidation = validateFullName(formData.fullName);
  const emailValidation = validateEmail(formData.email);
  const phoneValidation = validatePhoneNumber(formData.phone);
  const messageValidation = validateTextMessage(formData.message, 10, 1000);

  const isFormValid = nameValidation.isValid && emailValidation.isValid && phoneValidation.isValid && messageValidation.isValid;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(COMPANY_CONFIG.campusAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
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
          message: res.message || 'Thank you! Your inquiry has been dispatched to Admissions.',
          refId: (res as any).refId || `TTX-${Date.now().toString(36).toUpperCase()}`
        });
      } else {
        setErrorMessage(res.message || 'Failed to submit inquiry. Please retry.');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || 'Network error.');
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

  const mapDirectionUrl = `ttps://www.google.com/maps?q=techtrainX&amp;z=14&amp;t=m&amp;hl=en&amp;output=embed`;

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 bg-[#ffffff] bg-tech-dots border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto space-y-1">
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#f0f8ff] text-[#0066cc] text-[10px] font-bold uppercase tracking-[0.14em] border border-blue-200/80 shadow-2xs">
            Admissions Desk
          </span>
          <h2 className="text-2xl sm:text-3xl font-luxury-title font-bold text-[#0a0a0f] tracking-tight">
            Campus <span className="text-[#0066cc] italic font-normal">Counseling</span>
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Inquire about admissions, syllabus tracks, or hardware kits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Campus Info & Interactive Google Map */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Campus Info Card */}
            <div className="bg-[#f8fafc] p-5 sm:p-6 rounded-xl border border-gray-200/80 space-y-4 shadow-xs">
              <div className="flex items-start justify-between gap-2 border-b border-gray-200/80 pb-3">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#0a0a0f] flex items-center gap-2 font-sans">
                    <Building className="w-4 h-4 text-[#0066cc]" />
                    <span>{COMPANY_CONFIG.brandName} Training Center</span>
                  </h3>
                  <p className="text-[11px] text-[#0066cc] font-semibold mt-0.5 uppercase tracking-wider">
                    Deep-Tech Labs & Admissions Office
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 hover:text-[#0066cc] bg-white border border-gray-200 px-2 py-1 rounded-md transition-colors shadow-2xs"
                  title="Copy campus address"
                >
                  {copiedAddress ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedAddress ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="space-y-3 text-xs text-[#444] font-sans">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0a0a0f] block font-bold">Campus Address:</strong>
                    <span className="text-slate-600">{COMPANY_CONFIG.campusAddress}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                    <div>
                      <strong className="text-[#0a0a0f] block font-bold text-[11px]">Admissions Line:</strong>
                      <a href={`tel:${COMPANY_CONFIG.phone}`} className="text-[#0066cc] hover:underline font-semibold text-xs">
                        {COMPANY_CONFIG.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                    <div>
                      <strong className="text-[#0a0a0f] block font-bold text-[11px]">Official Email:</strong>
                      <a href={`mailto:${COMPANY_CONFIG.admissionsEmail}`} className="text-[#0066cc] hover:underline text-xs">
                        {COMPANY_CONFIG.admissionsEmail}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <Clock className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                  <div>
                    <strong className="text-[#0a0a0f] block font-bold text-[11px]">Lab & Counseling Hours:</strong>
                    <span className="text-slate-600 text-xs">Mon - Sat: 8:00 AM – 8:30 PM (Sun Open for Labs)</span>
                  </div>
                </div>
              </div>

              {/* Direct Quick WhatsApp Action */}
              <div className="pt-2 border-t border-gray-200">
                <a
                  href={createWhatsAppDirectQueryLink('General Admission & Batch Inquiry')}
                  target="_blank"
                  rel="noreferrer"
                  className="custom-btn w-full justify-center h-[40px] text-[10px] tracking-[0.08em] bg-[#25d366] hover:bg-[#20bd5a] rounded-lg shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Instantly</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Map Box */}
            <div className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-xs relative group">
              <div className="p-3 bg-slate-50 border-b border-gray-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0a0a0f]">
                  <Navigation className="w-3.5 h-3.5 text-[#0066cc]" />
                  <span>Interactive Campus Map</span>
                </div>

                <a
                  href={mapDirectionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0066cc] hover:text-[#004080] transition-colors"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Responsive Map Frame */}
              <div className="relative w-full h-[200px] sm:h-[220px] bg-slate-100">
                <iframe
                  title="TechTrainX Campus Location Map"
                  src="https://www.google.com/maps?q=techtrainX&amp;z=14&amp;t=m&amp;hl=en&amp;output=embed"
                  className="w-full h-full border-0 filter grayscale-[20%] contrast-[105%]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  allowFullScreen
                />
                
                {/* Floating Map Pin Badge */}
                <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs border border-gray-200 px-2.5 py-1 rounded-md shadow-md text-[10px] font-bold text-[#0a0a0f] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-pulse" />
                  <span>TechTrainX-Training Center & Software Solutions</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-xs p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
            {submittedResponse ? (
              <div className="p-6 bg-white rounded-xl border border-emerald-200 text-center space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#0a0a0f] font-sans">Inquiry Submitted Successfully</h4>
                  <p className="text-xs text-gray-600 mt-0.5 font-sans">{submittedResponse.message}</p>
                  {submittedResponse.refId && (
                    <div className="mt-2 inline-block bg-blue-50 text-[#0066cc] px-3 py-1 rounded-md text-xs font-mono font-bold">
                      Ref: {submittedResponse.refId}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="custom-btn-outline h-[36px] text-[10px] tracking-[0.08em] px-4 cursor-pointer inline-flex items-center gap-1.5 rounded-lg border-slate-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.08em] text-[#0a0a0f] font-sans">
                    Send Admission or Project Query
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">Replies within 2 hrs</span>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-xs font-semibold font-sans">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ValidatedInput
                    label="Full Name"
                    required
                    icon={User}
                    placeholder="Rahul Sharma"
                    value={formData.fullName}
                    onChange={(val) => setFormData({ ...formData, fullName: val })}
                    error={nameValidation.error}
                    isValid={nameValidation.isValid}
                    maxLength={60}
                  />

                  <ValidatedPhoneInput
                    label="Mobile Number"
                    required
                    value={formData.phone}
                    onChange={(val) => setFormData({ ...formData, phone: val })}
                  />
                </div>

                <ValidatedInput
                  label="Email Address"
                  required
                  type="email"
                  icon={Mail}
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={(val) => setFormData({ ...formData, email: val })}
                  error={emailValidation.error}
                  isValid={emailValidation.isValid}
                  maxLength={100}
                />

                <ValidatedTextarea
                  label="Inquiry Details / Query"
                  required
                  rows={3}
                  minLen={10}
                  maxLen={1000}
                  placeholder="Tell us about the batch timing, syllabus track, or project kit assistance..."
                  value={formData.message}
                  onChange={(val) => setFormData({ ...formData, message: val })}
                  error={messageValidation.error}
                  isValid={messageValidation.isValid}
                />

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={loading || !isFormValid}
                    className="custom-btn w-full justify-center h-[38px] text-[10px] tracking-[0.09em] font-bold shadow-xs rounded-xl cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? 'Submitting...' : 'Submit Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
