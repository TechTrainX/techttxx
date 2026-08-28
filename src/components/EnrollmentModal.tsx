import React, { useState } from 'react';
import { EnrollmentFormData } from '../types';
import { submitEnrollment } from '../services/apiService.js';
import { createWhatsAppEnrollLink } from '../services/whatsappService';
import { COURSES_DATA } from '../data/coursesData';
import { TRAINING_PROGRAMS_DATA } from '../data/programsData';
import { X, CheckCircle2, MessageSquare, ArrowRight, User, Mail, GraduationCap, Clock } from 'lucide-react';
import { ValidatedInput } from './ui/ValidatedInput';
import { ValidatedPhoneInput } from './ui/ValidatedPhoneInput';
import { ValidatedSelect } from './ui/ValidatedSelect';
import { validateFullName, validateEmail, validatePhoneNumber, validateCollegeOrOrg } from '../utils/validators.js';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourseOrProgram?: string;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  preselectedCourseOrProgram = 'Full Stack MERN Stack Development'
}) => {
  const [formData, setFormData] = useState<EnrollmentFormData>({
    fullName: '',
    email: '',
    phone: '',
    whatsappPhone: '',
    collegeName: '',
    branchYear: 'B.Tech CS / IT - 3rd Year',
    selectedCourseOrProgram: preselectedCourseOrProgram,
    trainingMode: 'Offline (Tech Foundry Campus)',
    preferredTiming: 'Morning (9 AM - 2 PM)',
    queryOrNotes: ''
  });

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');
  const [submissionRefId, setSubmissionRefId] = useState('');

  if (!isOpen) return null;

  // Validations
  const nameValidation = validateFullName(formData.fullName);
  const emailValidation = validateEmail(formData.email);
  const phoneValidation = validatePhoneNumber(formData.phone);
  const collegeValidation = validateCollegeOrOrg(formData.collegeName || '', false);

  const isFormValid = nameValidation.isValid && emailValidation.isValid && phoneValidation.isValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nameValidation.isValid) {
      setErrorMessage(nameValidation.error || 'Please provide a valid full name.');
      return;
    }
    if (!phoneValidation.isValid) {
      setErrorMessage(phoneValidation.error || 'Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!emailValidation.isValid) {
      setErrorMessage(emailValidation.error || 'Please provide a valid email.');
      return;
    }

    setLoading(true);

    const waUrl = createWhatsAppEnrollLink({
      studentName: nameValidation.sanitized,
      courseOrProgram: formData.selectedCourseOrProgram,
      phone: phoneValidation.formatted,
      email: emailValidation.sanitized,
      collegeName: collegeValidation.sanitized,
      preferredTiming: formData.preferredTiming
    });
    setWhatsappRedirectUrl(waUrl);

    try {
      const res = await submitEnrollment({
        ...formData,
        fullName: nameValidation.sanitized,
        email: emailValidation.sanitized,
        phone: phoneValidation.formatted,
        whatsappPhone: phoneValidation.formatted,
        collegeName: collegeValidation.sanitized
      });
      setLoading(false);

      if (res.success) {
        setSubmissionRefId((res as any).refId || `ENR-${Date.now().toString(36).toUpperCase()}`);
        setCompleted(true);
      } else {
        setErrorMessage(res.message || 'Failed to submit registration. Please retry.');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || 'Server connection error.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050b1a]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white max-w-lg w-full max-h-[90vh] overflow-hidden rounded-[26px] border border-slate-200/80 shadow-[0_24px_60px_-15px_rgba(7,26,53,0.35)] animate-in zoom-in-95 duration-200">

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

          {completed ? (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="relative w-14 h-14 mx-auto">
                <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-40" />
                <div className="relative w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm ring-1 ring-emerald-200">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-[#0a0a0f] tracking-tight">Enrollment Request Received</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you <strong className="text-[#0066cc]">{formData.fullName}</strong>. Your provisional registration for <strong className="text-[#0a0a0f]">{formData.selectedCourseOrProgram}</strong> has been logged.
                </p>
                {submissionRefId && (
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-[#eef4fb] text-[#0052a3] border border-[#0066cc]/15 px-3 py-1 rounded-lg text-[11px] font-bold tracking-wide">
                    <span className="text-[#0066cc]">Ref</span>
                    <span className="text-slate-300">·</span>
                    {submissionRefId}
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200/80 text-xs text-slate-600 space-y-2 text-left">
                <p className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider">Next Steps</p>
                <ul className="space-y-1.5 text-slate-600 text-[11px]">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-[#0066cc] shrink-0" />
                    Our academic counselor will reach out with syllabus and schedule details.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-[#0066cc] shrink-0" />
                    Your seat in the {formData.preferredTiming} slot is reserved for 48 hours.
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
                {whatsappRedirectUrl && (
                  <a
                    href={whatsappRedirectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="custom-btn w-full sm:w-auto bg-[#25d366] hover:bg-[#20bd5a] h-[40px] text-[10px] tracking-[0.08em] px-5 rounded-xl shadow-sm transition-transform hover:-translate-y-0.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Confirm on WhatsApp</span>
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="custom-btn-outline w-full sm:w-auto h-[40px] text-[10px] tracking-[0.08em] px-5 rounded-xl cursor-pointer border-slate-200"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1.5">
                <span className="inline-block px-2.5 py-1 rounded-md bg-[#eef4fb] text-[#0066cc] text-[10px] font-bold uppercase tracking-wider">
                  Admissions Portal
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#0a0a0f] tracking-tight">
                  Enroll in Training Track
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Fill in your candidate details to reserve a batch seat.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-semibold">
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
                  space-y-3.5
                "
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ValidatedInput
                    label="Full Name"
                    required
                    icon={User}
                    placeholder="Priya Sharma"
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
                    onChange={(val) => setFormData({ ...formData, phone: val, whatsappPhone: val })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ValidatedInput
                    label="Email Address"
                    required
                    type="email"
                    icon={Mail}
                    placeholder="priya@example.com"
                    value={formData.email}
                    onChange={(val) => setFormData({ ...formData, email: val })}
                    error={emailValidation.error}
                    isValid={emailValidation.isValid}
                    maxLength={100}
                  />

                  <ValidatedInput
                    label="College / Institute"
                    icon={GraduationCap}
                    placeholder="Institution name"
                    value={formData.collegeName || ''}
                    onChange={(val) => setFormData({ ...formData, collegeName: val })}
                    error={collegeValidation.error}
                    isValid={collegeValidation.isValid}
                    maxLength={100}
                  />
                </div>

                <ValidatedSelect
                  label="Course Track"
                  value={formData.selectedCourseOrProgram}
                  onChange={(e) => setFormData({ ...formData, selectedCourseOrProgram: e.target.value })}
                >
                  <optgroup label="Industrial Courses">
                    {COURSES_DATA.map((c) => (
                      <option key={c.id} value={c.title}>{c.title} ({c.duration})</option>
                    ))}
                  </optgroup>
                  <optgroup label="Academic Tracks">
                    {TRAINING_PROGRAMS_DATA.map((p) => (
                      <option key={p.id} value={p.title}>{p.title} ({p.duration})</option>
                    ))}
                  </optgroup>
                </ValidatedSelect>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ValidatedSelect
                    label="Training Mode"
                    value={formData.trainingMode}
                    onChange={(e) => setFormData({ ...formData, trainingMode: e.target.value })}
                  >
                    <option value="Offline Classroom (In-Person)">Offline Classroom (In-Person)</option>
                    <option value="Online Live Interactive">Online Live Interactive</option>
                    <option value="Hybrid (Lab + Online)">Hybrid (Lab + Online)</option>
                  </ValidatedSelect>

                  <ValidatedSelect
                    label="Preferred Timing"
                    icon={Clock}
                    value={formData.preferredTiming}
                    onChange={(e) => setFormData({ ...formData, preferredTiming: e.target.value as any })}
                  >
                    <option value="Morning (9 AM - 2 PM)">Morning (9 AM - 2 PM)</option>
                    <option value="Evening (2 PM - 7 PM)">Evening (2 PM - 7 PM)</option>
                    <option value="Weekend Special (10 AM - 5 PM)">Weekend Special (10 AM - 5 PM)</option>
                  </ValidatedSelect>
                </div>
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
                  disabled={loading || !isFormValid}
                  className="custom-btn h-[38px] text-[10px] tracking-[0.08em] px-6 font-bold rounded-xl transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{loading ? 'Submitting...' : 'Confirm Registration'}</span>
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