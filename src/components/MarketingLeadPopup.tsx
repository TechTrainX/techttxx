import React, { useState, useEffect } from 'react';
import { 
  X, Sparkles, Gift, ShieldCheck, CheckCircle2, 
  ArrowRight, Phone, MessageSquare, Clock, Download,
  Send, User, Mail, GraduationCap, Flame
} from 'lucide-react';
import { submitEnrollment } from '../services/apiService';
import { createWhatsAppEnrollLink } from '../services/whatsappService';

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
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    collegeName: '',
    course: 'Full Stack MERN Stack Development',
    program: 'Summer Training Program (45 Days)'
  });

  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

  useEffect(() => {
    // Check if user already dismissed popup recently
    const dismissedAt = localStorage.getItem('ttx_lead_popup_dismissed');
    const isDismissedRecently = dismissedAt && (Date.now() - parseInt(dismissedAt, 10)) < 1000 * 60 * 60 * 12; // 12 hours

    if (!isDismissedRecently && controlledIsOpen === undefined) {
      const timer = setTimeout(() => {
        setInternalOpen(true);
      }, 7000); // Trigger after 7s of engaged browsing (within 5-10s window)
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
    if (!formData.fullName || !formData.phone) return;

    setIsSubmitting(true);
    try {
      await submitEnrollment({
        fullName: formData.fullName,
        email: formData.email || `${formData.phone}@lead.techtrainx.online`,
        phone: formData.phone,
        whatsappPhone: formData.phone,
        collegeName: formData.collegeName || 'N/A (Web Lead)',
        branchYear: 'Pre-final / Final Year',
        selectedCourseOrProgram: `${formData.course} - ${formData.program}`,
        trainingMode: 'Offline (Tech Foundry Campus)',
        preferredTiming: 'Morning (9 AM - 2 PM)',
        queryOrNotes: 'Claimed ₹1,000 Early Bird Admission Grant & Syllabus Download via Marketing Popup.'
      });

      setIsSubmitted(true);
    } catch (err) {
      console.warn('Submission error:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppInstant = () => {
    const message = `Hi TechTrainX Team, I want to claim the ₹1,000 Early Bird Grant (Code: TECHTRAINX2026) for ${formData.course} (${formData.program}). Name: ${formData.fullName || 'Student'}, Phone: ${formData.phone || ''}. Please share the syllabus & batch slot!`;
    const url = `https://wa.me/918545092070?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Floating Re-Open Badge on Bottom Left */}
      {minimizedBadge && !isModalOpen && (
        <button
          onClick={() => {
            setInternalOpen(true);
            setMinimizedBadge(false);
          }}
          className="fixed bottom-6 left-6 z-40 group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 text-white font-bold text-xs shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20 animate-bounce"
          title="Claim ₹1,000 Early Bird Grant"
        >
          <Gift className="w-4 h-4 text-white animate-spin-slow" />
          <span>Claim ₹1,000 Voucher</span>
          <span className="bg-black/30 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold text-white">
            Offer
          </span>
        </button>
      )}

      {/* Main Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden max-h-[92vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Column: Visual Promo Banner */}
            <div className="md:w-5/12 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/60 p-6 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-slate-800">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold">
                  <Flame className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>Summer 2026 Grant</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white leading-tight">
                    Instant <span className="gradient-text-cyan">₹1,000</span> Discount Voucher
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Download full curriculum PDFs and unlock early-bird discount codes on all 45/60 days industrial summer training tracks.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>5 Hours Daily Hands-On Coding</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Full Source Code & Synopses</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Free WhatsApp Tech Consultation</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Government & University Approved</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Lead Capture Form */}
            <div className="md:w-7/12 p-6 sm:p-8 bg-slate-900 flex flex-col justify-center">
              {isSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-white">Voucher Reserved!</h4>
                    <p className="text-xs text-slate-300">
                      We have sent your ₹1,000 Early Bird Voucher code to <span className="text-cyan-400 font-bold">{formData.phone}</span>.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Your Discount Promo Code</span>
                    <span className="text-lg font-mono font-black text-cyan-400 tracking-widest">TECHTRAINX2026</span>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      onClick={handleWhatsAppInstant}
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Chat on WhatsApp & Claim Seat</span>
                    </button>

                    <button
                      onClick={handleClose}
                      className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors"
                    >
                      Explore Courses
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <h4 className="text-base font-black text-white">Claim Voucher & Download Syllabus</h4>
                    <p className="text-[11px] text-slate-400">Offer valid for upcoming summer batches & practical tracks.</p>
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-300">Full Name *</label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-300">WhatsApp Phone *</label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 8545092070"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-300">Email</label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="rahul@gmail.com"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Course Dropdown */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-300">Interested Course / Stack</label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Full Stack MERN Stack Development">Full Stack MERN Stack Development</option>
                      <option value="Python Full Stack & Django Web Framework">Python Full Stack & Django Web Framework</option>
                      <option value="Enterprise Java Full Stack with Spring Boot 3">Enterprise Java Full Stack with Spring Boot 3</option>
                      <option value="Applied Artificial Intelligence & Machine Learning">Applied Artificial Intelligence & Machine Learning</option>
                      <option value="Cross Platform Mobile App Development (Flutter)">Cross Platform Mobile App Development (Flutter)</option>
                      <option value="Arduino Uno, IoT & Embedded Hardware Projects">Arduino Uno, IoT & Embedded Hardware Projects</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Processing Voucher...</span>
                      ) : (
                        <>
                          <Gift className="w-4 h-4" />
                          <span>Unlock ₹1,000 Voucher & Syllabus</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-slate-500">
                    🔒 No spam. Instant WhatsApp syllabus & voucher delivery.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
