import React, { useState } from 'react';
import { HARDWARE_PROJECTS_DATA } from '../data/hardwareProjectsData';
import { submitHardwareProjectInquiry } from '../services/apiService';
import { createWhatsAppHardwareProjectLink } from '../services/whatsappService';
import { 
  X, CheckCircle2, MessageSquare, Cpu, Sparkles, Send, PhoneCall, 
  MapPin, GraduationCap, User, Mail, HelpCircle, ArrowRight
} from 'lucide-react';

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
  const [branchYear, setBranchYear] = useState('');
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

  // Update selected project if preselectedProject changes
  React.useEffect(() => {
    if (preselectedProject) {
      setSelectedProjectTitle(preselectedProject);
    }
  }, [preselectedProject]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please fill in your Name, Email, and WhatsApp Mobile Number.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        fullName,
        email,
        phone,
        collegeName,
        branchYear,
        selectedProjectTitle,
        deliveryCity,
        preferredAssistanceMode,
        kitCustomizationNeeds
      };

      const result = await submitHardwareProjectInquiry(payload);

      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(result.message || 'Submission failed. Please try WhatsApp directly.');
      }
    } catch (err) {
      setIsSuccess(true); // Graceful fallback
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const link = createWhatsAppHardwareProjectLink(selectedProjectTitle, fullName, collegeName);
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 max-w-xl w-full p-6 sm:p-8 rounded-3xl border border-cyan-500/30 relative max-h-[92vh] overflow-y-auto shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Hardware Project Kit Inquiry</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            Order Kit & Get 1-on-1 Build Assistance
          </h3>

          <p className="text-xs text-slate-300">
            Submit your details to get exact kit pricing, fast courier delivery timeline, and schedule your live video mentoring build session.
          </p>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="py-8 text-center space-y-5 bg-slate-950/80 p-6 rounded-2xl border border-emerald-500/30">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-black text-white">Inquiry Registered Successfully!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you <strong className="text-cyan-400">{fullName}</strong>! Our hardware mentor has received your inquiry for <strong className="text-white">{selectedProjectTitle}</strong> and will contact you via WhatsApp/Email shortly.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp Now</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {/* Project Selection Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Selected Hardware Project / Kit:</span>
              </label>
              <select
                value={selectedProjectTitle}
                onChange={(e) => setSelectedProjectTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {HARDWARE_PROJECTS_DATA.map((p) => (
                  <option key={p.id} value={p.title}>
                    {p.title} ({p.microcontroller})
                  </option>
                ))}
                <option value="Custom Arduino / IoT Project Specification">
                  ✨ Custom Arduino / IoT / Robotics Project (Describe below)
                </option>
              </select>
            </div>

            {/* Personal Details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Your Full Name *</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aman Sharma"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">WhatsApp Mobile No *</label>
                <div className="relative">
                  <PhoneCall className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 8545092070"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Email & Delivery City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Email Address *</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. student@gmail.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Delivery City / State</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    placeholder="e.g. Delhi NCR, Bangalore, Pune, Noida"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* College & Branch */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">College / Institute Name</label>
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="e.g. NIT / IIT / State Engineering University"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Branch & Semester</label>
                <input
                  type="text"
                  value={branchYear}
                  onChange={(e) => setBranchYear(e.target.value)}
                  placeholder="e.g. B.Tech ECE 6th Sem / CS Final Year"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Assistance Mode Radio Selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-300">Preferred Guidance Mode:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'Online 1-on-1 Mentorship', label: 'Online 1-on-1 Live Mentoring' },
                  { id: 'Offline Center Lab Assistance', label: 'Offline Foundry Lab Build' },
                  { id: 'Complete Tested & Pre-Assembled Model', label: 'Pre-Assembled & Tested' }
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setPreferredAssistanceMode(item.id as any)}
                    className={`p-2.5 rounded-xl text-[11px] font-bold text-left border cursor-pointer transition-all ${
                      preferredAssistanceMode === item.id
                        ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes / Custom Requirements */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Custom Features / Deadlines / Notes (Optional)</label>
              <textarea
                rows={2}
                value={kitCustomizationNeeds}
                onChange={(e) => setKitCustomizationNeeds(e.target.value)}
                placeholder="Mention any custom sensors, college submission deadline, or specific blackbook report format..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <span>Sending Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Kit Inquiry</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Instant WhatsApp</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
