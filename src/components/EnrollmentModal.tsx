import React, { useState } from 'react';
import { EnrollmentFormData } from '../types';
import { submitEnrollment } from '../services/apiService';
import { createWhatsAppEnrollLink } from '../services/whatsappService';
import { COURSES_DATA } from '../data/coursesData';
import { TRAINING_PROGRAMS_DATA } from '../data/programsData';
import { X, CheckCircle2, MessageSquare, ArrowRight, User, Mail, GraduationCap, Clock } from 'lucide-react';
import { ValidatedInput } from './ui/ValidatedInput';
import { ValidatedPhoneInput } from './ui/ValidatedPhoneInput';
import { ValidatedSelect } from './ui/ValidatedSelect';
import { validateFullName, validateEmail, validatePhoneNumber, validateCollegeOrOrg } from '../utils/validators';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-7 rounded-[20px] border border-gray-200 relative shadow-elevation-3 space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-gray-400 hover:text-gray-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {completed ? (
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-elevation-1">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#00061a]">Enrollment Request Dispatched</h3>
              <p className="text-xs text-[#555] max-w-md mx-auto">
                Thank you <strong className="text-[#0066cc]">{formData.fullName}</strong>. Your provisional registration for <strong className="text-[#00061a]">{formData.selectedCourseOrProgram}</strong> has been received by the Owner & Admissions desk.
              </p>
              {submissionRefId && (
                <div className="mt-2 inline-block bg-blue-50 text-[#0066cc] px-3 py-1 rounded-md text-[11px] font-mono font-bold">
                  Reference: {submissionRefId}
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#f0f8ff] border border-blue-100 text-xs text-[#444] space-y-1.5 text-left">
              <p className="font-bold text-[#00061a]">Next Steps:</p>
              <ul className="space-y-1 list-disc list-inside text-[#555]">
                <li>Our academic counselor will contact you via WhatsApp & Call regarding batch timings and syllabus.</li>
                <li>Your seat in the {formData.preferredTiming} slot is reserved for 48 hours.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {whatsappRedirectUrl && (
                <a
                  href={whatsappRedirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="custom-btn w-full sm:w-auto bg-[#25d366] hover:bg-[#20bd5a] text-xs py-2.5 px-6 shadow-elevation-1"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Confirm on WhatsApp</span>
                </a>
              )}
              <button
                onClick={onClose}
                className="custom-btn-outline w-full sm:w-auto text-xs py-2.5 px-6 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-[#0066cc] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full">
                Admission Portal
              </span>
              <h3 className="text-xl font-bold text-[#00061a] mt-1">
                Enroll in Training Program
              </h3>
              <p className="text-xs text-[#666]">
                Provide your candidate details. Submissions are dispatched directly to the director.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <ValidatedInput
                label="Full Name"
                required
                icon={User}
                placeholder="e.g. Priya Sharma"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <ValidatedInput
                label="Email Address"
                required
                type="email"
                icon={Mail}
                placeholder="e.g. priya@gmail.com"
                value={formData.email}
                onChange={(val) => setFormData({ ...formData, email: val })}
                error={emailValidation.error}
                isValid={emailValidation.isValid}
                maxLength={100}
              />

              <ValidatedInput
                label="College / Institution"
                icon={GraduationCap}
                placeholder="e.g. JNTU / AKTU / Amity"
                value={formData.collegeName || ''}
                onChange={(val) => setFormData({ ...formData, collegeName: val })}
                error={collegeValidation.error}
                isValid={collegeValidation.isValid}
                maxLength={100}
              />
            </div>

            <ValidatedSelect
              label="Selected Course or Program Track"
              value={formData.selectedCourseOrProgram}
              onChange={(e) => setFormData({ ...formData, selectedCourseOrProgram: e.target.value })}
            >
              <optgroup label="Industrial Training Courses">
                {COURSES_DATA.map((c) => (
                  <option key={c.id} value={c.title}>{c.title} ({c.duration})</option>
                ))}
              </optgroup>
              <optgroup label="Internship & Academic Tracks">
                {TRAINING_PROGRAMS_DATA.map((p) => (
                  <option key={p.id} value={p.title}>{p.title} ({p.duration})</option>
                ))}
              </optgroup>
            </ValidatedSelect>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <ValidatedSelect
                label="Preferred Mode"
                value={formData.trainingMode}
                onChange={(e) => setFormData({ ...formData, trainingMode: e.target.value })}
              >
                <option value="Offline Classroom (In-Person)">Offline Classroom (In-Person)</option>
                <option value="Online Live Interactive">Online Live Interactive</option>
                <option value="Hybrid (Lab + Online)">Hybrid (Lab + Online)</option>
              </ValidatedSelect>

              <ValidatedSelect
                label="Preferred Slot Timing"
                icon={Clock}
                value={formData.preferredTiming}
                onChange={(e) => setFormData({ ...formData, preferredTiming: e.target.value as any })}
              >
                <option value="Morning (9 AM - 2 PM)">Morning (9 AM - 2 PM)</option>
                <option value="Evening (2 PM - 7 PM)">Evening (2 PM - 7 PM)</option>
                <option value="Weekend Special (10 AM - 5 PM)">Weekend Special (10 AM - 5 PM)</option>
              </ValidatedSelect>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="custom-btn-outline py-2.5 px-5 text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className="custom-btn py-2.5 px-7 text-xs font-bold shadow-elevation-2"
              >
                <span>{loading ? 'Registering...' : 'Confirm Enrollment'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
