import React, { useState } from 'react';
import { ContactFormData } from '../types';
import { submitContactMessage } from '../services/apiService';
import { COMPANY_CONFIG } from '../config/companyConfig';
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

  // Fixed: original string was missing the leading "h" (was "ttps://") and used
  // literal "&amp;" instead of "&" inside a JS template literal, which broke both
  // the "Get Directions" link and the map iframe query string.
  const mapDirectionUrl = `https://www.google.com/maps?q=techtrainX&z=14&t=m&hl=en&output=embed`;

  return (
    <section id="contact" className="relative isolate overflow-hidden rounded-t-[3rem] bg-[#071a35] px-4 py-16 text-white sm:rounded-t-[5rem] sm:py-24 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"><div className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-slate-500/15 blur-3xl" /><div className="absolute -bottom-48 -right-32 h-[42rem] w-[42rem] rounded-full bg-indigo-500/10 blur-3xl" /><div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:48px_48px]" /></div>
      <div className="relative z-10 mx-auto max-w-7xl space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100 shadow-sm backdrop-blur">
            Admissions Desk
          </span>
          <h2 className="text-4xl font-luxury-title font-bold tracking-[-0.05em] text-white sm:text-6xl">
            Campus <span className="text-blue-300 italic font-normal">Counseling</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Inquire about admissions, syllabus tracks, or hardware kits.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Campus Info & Interactive Google Map */}
          <div className="flex h-full flex-col lg:col-span-5">
            
            {/* Campus Info Card */}
            <div className="h-full rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/25 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.09] hover:shadow-[0_24px_60px_rgba(0,30,90,0.28)]">
              <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10">
                    <Building className="h-4.5 w-4.5 text-blue-200" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white sm:text-lg">
                      {COMPANY_CONFIG.brandName} Training Center
                    </h3>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Deep-Tech Labs &amp; Admissions Office
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-[10px] font-bold text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 hover:shadow-lg"
                  title="Copy campus address"
                >
                  {copiedAddress ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedAddress ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="space-y-5 pt-5 text-xs text-slate-300 font-sans">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
                    <MapPin className="h-4 w-4 text-blue-200" />
                  </div>
                  <div>
                    <strong className="mb-1 block font-bold text-white">Campus Address:</strong>
                    <span className="text-slate-400">{COMPANY_CONFIG.campusAddress}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
                      <Phone className="w-4 h-4 text-blue-200" />
                    </div>
                    <div>
                      <strong className="mb-1 block font-bold text-white text-[11px]">Admissions Line:</strong>
                      <a href={`tel:${COMPANY_CONFIG.phone}`} className="text-slate-300 hover:text-white hover:underline font-semibold text-xs">
                        {COMPANY_CONFIG.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
                      <Mail className="w-4 h-4 text-blue-200" />
                    </div>
                    <div>
                      <strong className="mb-1 block font-bold text-white text-[11px]">Official Email:</strong>
                      <a href={`mailto:${COMPANY_CONFIG.admissionsEmail}`} className="text-slate-300 hover:text-white hover:underline text-xs break-all">
                        {COMPANY_CONFIG.admissionsEmail}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
                    <Clock className="w-4 h-4 text-blue-200" />
                  </div>
                  <div>
                    <strong className="mb-1 block font-bold text-white text-[11px]">Lab &amp; Counseling Hours:</strong>
                    <span className="text-slate-400 text-xs">Mon - Sat: 8:00 AM – 8:30 PM (Sun Open for Labs)</span>
                  </div>
                </div>
              </div>

              {/* Direct Quick WhatsApp Action */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <a
                  href={createWhatsAppDirectQueryLink('General Admission & Batch Inquiry')}
                  target="_blank"
                  rel="noreferrer"
                  className="custom-btn w-full justify-center h-[42px] text-[10px] tracking-[0.08em] bg-[#25d366] hover:bg-[#20bd5a] rounded-xl shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Instantly</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="flex h-full flex-col lg:col-span-7 bg-[#f8fafc] p-5 sm:p-7 rounded-[2.25rem] border border-blue-100/80 shadow-[0_24px_70px_rgba(0,10,35,0.32)] transition-all duration-300 hover:shadow-[0_30px_90px_rgba(0,10,35,0.4)] [&_label]:mb-2 [&_label]:block [&_label]:text-[11px] [&_label]:font-bold [&_label]:uppercase [&_label]:tracking-[0.08em] [&_label]:text-slate-700 [&_input]:h-12 [&_input]:rounded-xl [&_input]:border-slate-200 [&_input]:bg-white [&_input]:px-4 [&_input]:text-sm [&_input]:shadow-sm [&_input]:transition-all [&_input]:duration-200 [&_input]:placeholder:text-slate-500 [&_input:focus]:border-[#0066cc] [&_input:focus]:bg-white [&_input:focus]:shadow-[0_0_0_4px_rgba(0,102,204,0.14)] [&_textarea]:min-h-[104px] [&_textarea]:rounded-xl [&_textarea]:border-slate-200 [&_textarea]:bg-white [&_textarea]:p-4 [&_textarea]:text-sm [&_textarea]:shadow-sm [&_textarea]:transition-all [&_textarea]:duration-200 [&_textarea]:placeholder:text-slate-500 [&_textarea:focus]:border-[#0066cc] [&_textarea:focus]:shadow-[0_0_0_4px_rgba(0,102,204,0.14)]">
            {submittedResponse ? (
              <div className="flex h-full flex-col items-center justify-center p-8 bg-white rounded-[1.5rem] border border-emerald-200 text-center space-y-4 shadow-sm sm:p-12">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-2xl bg-emerald-100 animate-ping opacity-40" />
                  <div className="relative w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs ring-1 ring-emerald-200">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-950 font-sans">Inquiry Submitted Successfully</h4>
                  <p className="text-sm text-slate-600 mt-1 font-sans">{submittedResponse.message}</p>
                  {submittedResponse.refId && (
                    <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-[#0066cc]/15 bg-[#eef4fb] px-3 py-1.5 text-xs font-mono font-bold text-[#0052a3]">
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5 border-b border-slate-200 pb-5">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#eef4fb] text-[#0066cc] text-[10px] font-bold uppercase tracking-wider">
                    Admissions Form
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-bold uppercase tracking-[0.08em] text-slate-950 font-sans">
                      Send Admission or Project Query
                    </h3>
                    <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">Replies within 2 hrs</span>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold font-sans">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <ValidatedInput
                    label="Full Name"
                    required
                    icon={User}
                    placeholder="Enter your full name"
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
                  placeholder="you@example.com"
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
                  placeholder="Tell us about your admission, syllabus, batch timing, or project requirements..."
                  value={formData.message}
                  onChange={(val) => setFormData({ ...formData, message: val })}
                  error={messageValidation.error}
                  isValid={messageValidation.isValid}
                />

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={loading || !isFormValid}
                    className="custom-btn w-full justify-center bg-[#0066cc] hover:bg-[#0052a3] h-14 text-[10px] tracking-[0.14em] font-bold shadow-xl shadow-[#0066cc]/20 rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#0066cc]/30 disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? 'Submitting...' : 'Submit Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

            {/* Interactive Google Map Box */}
            <div className="relative mt-8 overflow-hidden rounded-[2.25rem] border border-[#071a35]/30 bg-[#101d35] shadow-2xl shadow-black/30 group sm:mt-10">
              <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-[#0b2d62] via-[#104b96] to-[#071a35] p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Navigation className="w-4 h-4 text-blue-200" />
                  <span>Interactive Campus Map</span>
                </div>

                <a
                  href={mapDirectionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.08em] text-blue-100 hover:text-white transition-colors"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Responsive Map Frame */}
              <div className="relative h-[280px] w-full bg-slate-800 sm:h-[380px] lg:h-[460px]">
                <iframe
                  title="TechTrainX Campus Location Map"
                  src={mapDirectionUrl}
                  className="w-full h-full border-0 saturate-[1.1] contrast-[108%]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  allowFullScreen
                />
                
                {/* Floating Map Pin Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur border border-white px-2.5 py-1.5 rounded-lg shadow-lg text-[9px] font-bold text-slate-900 flex items-center gap-1.5 sm:bottom-4 sm:left-4 sm:right-4 sm:px-3 sm:py-2">
                  <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse" />
                  <span>TechTrainX-Training Center & Software Solutions</span>
                </div>
              </div>
            </div>



      </div>
    </section>
  );
};