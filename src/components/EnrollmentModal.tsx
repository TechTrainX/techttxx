import React, { useState } from 'react';
import { EnrollmentFormData } from '../types';
import { submitEnrollment } from '../services/apiService';
import { createWhatsAppEnrollLink } from '../services/whatsappService';
import { COURSES_DATA } from '../data/coursesData';
import { TRAINING_PROGRAMS_DATA } from '../data/programsData';
import { X, Sparkles, Send, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';

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
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Generate WhatsApp direct url with rich pre-generated reason message
    const waUrl = createWhatsAppEnrollLink({
      studentName: formData.fullName,
      courseOrProgram: formData.selectedCourseOrProgram,
      phone: formData.phone || formData.whatsappPhone,
      email: formData.email,
      collegeName: formData.collegeName,
      preferredTiming: formData.preferredTiming
    });
    setWhatsappRedirectUrl(waUrl);

    // Call backend endpoint `/api/enroll`
    await submitEnrollment(formData);
    setLoading(false);
    setCompleted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border border-slate-700 relative shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {completed ? (
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Enrollment Registered!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you <strong className="text-cyan-400">{formData.fullName}</strong>. Your provisional admission for <strong className="text-white">{formData.selectedCourseOrProgram}</strong> has been logged in the system.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 text-left">
              <p className="font-bold text-white">Next Steps:</p>
              <ul className="space-y-1 list-disc list-inside text-slate-400">
                <li>Admissions lead will WhatsApp you the detailed PDF syllabus and fee receipt.</li>
                <li>Your seat in the {formData.preferredTiming} slot is reserved for 48 hours.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {whatsappRedirectUrl && (
                <a
                  href={whatsappRedirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp Confirmation</span>
                </a>
              )}

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Student Admission & Seat Booking</span>
              </div>
              <h3 className="text-2xl font-black text-white">Enroll in Industrial Training</h3>
              <p className="text-xs text-slate-300">
                Reserve your practical coding seat in Summer 2026 batches at Tech Foundry Campus or Hybrid Labs.
              </p>
            </div>

            {/* Course Dropdown */}
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Select Course / Training Program *
              </label>
              <select
                required
                value={formData.selectedCourseOrProgram}
                onChange={(e) => setFormData({ ...formData, selectedCourseOrProgram: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <optgroup label="Industrial Tech Courses (45-60 Days)">
                  {COURSES_DATA.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title} (₹{c.price.toLocaleString()})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Training Programs">
                  {TRAINING_PROGRAMS_DATA.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title} ({p.duration})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Hardware Projects">
                  <option value="Smart 4WD RC Car with Bluetooth & Obstacle Radar">Smart 4WD RC Car with Bluetooth & Obstacle Radar (Kit)</option>
                  <option value="IoT Smart Agriculture & Soil Irrigation System">IoT Smart Agriculture & Soil Irrigation System (Kit)</option>
                  <option value="IoT Home Automation with ESP8266 & Relay">IoT Home Automation with ESP8266 & Relay (Kit)</option>
                  <option value="Custom Hardware / Arduino Project Kit">Custom Hardware / Arduino Project Kit</option>
                </optgroup>
              </select>
            </div>

            {/* Name and Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Aman Sharma"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">WhatsApp Mobile *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value, whatsappPhone: e.target.value })}
                  placeholder="+91 8545092070"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Email and College */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@gmail.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">College / University</label>
                <input
                  type="text"
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                  placeholder="e.g. AKTU / BBD / IET"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Mode and Preferred Timing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Training Mode</label>
                <select
                  value={formData.trainingMode}
                  onChange={(e) => setFormData({ ...formData, trainingMode: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Offline (Tech Foundry Campus)">Offline (Tech Foundry Campus - 5 hrs/day)</option>
                  <option value="Online (Live Interactive)">Online (Live Interactive)</option>
                  <option value="Hybrid (Lab + Live Online)">Hybrid (Lab + Live Online)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Preferred Time Slot</label>
                <select
                  value={formData.preferredTiming}
                  onChange={(e) => setFormData({ ...formData, preferredTiming: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Morning (9 AM - 2 PM)">Morning (9:00 AM - 2:00 PM)</option>
                  <option value="Afternoon (1 PM - 6 PM)">Afternoon (1:00 PM - 6:00 PM)</option>
                  <option value="Evening (4 PM - 8 PM)">Evening (4:00 PM - 8:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Questions / Notes (Optional)</label>
              <textarea
                rows={2}
                value={formData.queryOrNotes}
                onChange={(e) => setFormData({ ...formData, queryOrNotes: e.target.value })}
                placeholder="Ask about hostel options, group discount, or syllabus customizations..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Registering Seat...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Registration & Get Instant WhatsApp Details</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
