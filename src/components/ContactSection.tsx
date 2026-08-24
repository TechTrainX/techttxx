import React, { useState } from 'react';
import { ContactFormData } from '../types';
import { submitContactMessage } from '../services/apiService';
import { createWhatsAppDirectQueryLink } from '../services/whatsappService';
import { COMPANY_CONFIG } from '../config/companyConfig';
import { 
  Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, 
  Building, Clock, ShieldCheck, Sparkles, Radio, HelpCircle,
  Headphones
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Summer Training Fee & Syllabus',
    message: '',
    purpose: 'Course Admission'
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await submitContactMessage(formData);
    setLoading(false);
    if (res.success) {
      setSuccessMsg(res.message);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-[#030712] relative border-t border-b border-slate-850 cyber-dots-bg">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Headphones className="w-3.5 h-3.5 text-cyan-400" /> Direct Support & Telemetry
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Connect with Our <span className="gradient-text-cyan">Admissions & Technical Leads</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Have questions regarding Summer Batches, Hardware Kits, Course Syllabi, or Corporate Partnerships? Drop us a message or visit our center.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Contact Card 1 */}
            <div className="glass-card p-6 sm:p-7 rounded-3xl border border-cyan-500/30 space-y-4 bg-slate-900/90 shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-white font-black text-base">
                  <Building className="w-4 h-4 text-cyan-400" />
                  <span>TechTrainX Innovation Campus</span>
                </div>
                <p className="text-xs text-cyan-400 font-bold mt-0.5">
                  {COMPANY_CONFIG.legalName}
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">Innovation Campus & Labs:</strong>
                    <span>{COMPANY_CONFIG.campusAddress}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="text-white block font-bold">Admissions & Helpline:</strong>
                    <a href={`tel:${COMPANY_CONFIG.phone}`} className="text-emerald-400 hover:underline font-bold">{COMPANY_CONFIG.phoneDisplay}</a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <strong className="text-white block font-bold">Official Email:</strong>
                    <a href={`mailto:${COMPANY_CONFIG.admissionsEmail}`} className="text-indigo-300 hover:underline">{COMPANY_CONFIG.admissionsEmail}</a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <strong className="text-white block font-bold">Center Lab Hours:</strong>
                    <span>Monday - Saturday: 8:30 AM to 7:30 PM (IST)</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2">
                <a
                  href={createWhatsAppDirectQueryLink('Admissions & Counseling Support')}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-slate-950" />
                  <span>Chat on WhatsApp ({COMPANY_CONFIG.phoneDisplay})</span>
                </a>
              </div>
            </div>

            {/* Accreditations */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
              <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0" />
              <div>
                <strong className="text-white block font-bold">Government & Industry Recognized</strong>
                <span className="text-[11px] text-slate-400">All certificates verified by university project review boards across India.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-slate-900/95 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-4">
            <div>
              <h3 className="text-xl font-black text-white">Send Us a Direct Message</h3>
              <p className="text-xs text-slate-300">
                Fill the form below and an academic counselor will call you within 2 business hours.
              </p>
            </div>

            {successMsg ? (
              <div className="p-6 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs space-y-3 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Message Dispatched!</h4>
                <p>{successMsg}</p>
                <button
                  onClick={() => setSuccessMsg('')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikas Pandey"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">WhatsApp Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 8545092070"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vikas@gmail.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Purpose of Inquiry</label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Course Admission">Course Admission / Summer Training</option>
                      <option value="Hardware Kit / Arduino Project">Hardware Kit / Arduino Project Order</option>
                      <option value="Certificate Verification">Certificate Verification</option>
                      <option value="Software Services Quote">Software Services Quote</option>
                      <option value="Recruitment Partnership">Recruiter / Campus Drive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Summer Batch Seats & Early Bird Discount"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Your Message / Query</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your college, branch, semester, or questions..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-slate-950" />
                      <span>Submit Message to TechTrainX</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

