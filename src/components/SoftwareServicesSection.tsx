import React, { useState } from 'react';
import { submitServiceQuote } from '../services/apiService';
import { 
  Code2, Smartphone, Cpu, Cloud, CheckCircle2, 
  Send, User, Building, Mail, MessageSquare, RefreshCw,
  ShieldCheck, Clock, Lock, FileText, ArrowRight, Sparkles,
  Layers, Check, ExternalLink, HelpCircle
} from 'lucide-react';
import { ValidatedInput } from './ui/ValidatedInput';
import { ValidatedPhoneInput } from './ui/ValidatedPhoneInput';
import { ValidatedSelect } from './ui/ValidatedSelect';
import { ValidatedTextarea } from './ui/ValidatedTextarea';
import { validateFullName, validateEmail, validatePhoneNumber, validateTextMessage, validateCollegeOrOrg } from '../utils/validators';
import { getServiceWhatsAppUrl } from '../utils/whatsappHelper';
import { COMPANY_CONFIG } from '../config/companyConfig';

export const SoftwareServicesSection: React.FC = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    projectType: 'Website / Web Application' as const,
    budgetRange: 'Under ₹50,000 (Simple Project)',
    timeline: 'Flexible (1 - 3 Months)',
    projectDetails: '',
    requiresNDA: false
  });

  const [loading, setLoading] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<{ success: boolean; message: string; refId?: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Validations
  const nameValidation = validateFullName(formData.clientName);
  const companyValidation = validateCollegeOrOrg(formData.companyName, false);
  const emailValidation = validateEmail(formData.email);
  const phoneValidation = validatePhoneNumber(formData.phone);
  const detailsValidation = validateTextMessage(formData.projectDetails, 10, 1000);

  const isFormValid = nameValidation.isValid && emailValidation.isValid && phoneValidation.isValid && detailsValidation.isValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nameValidation.isValid) {
      setErrorMessage(nameValidation.error || 'Please enter your name.');
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
    if (!detailsValidation.isValid) {
      setErrorMessage(detailsValidation.error || 'Please describe your project briefly (min 10 characters).');
      return;
    }

    setLoading(true);
    try {
      const res = await submitServiceQuote({
        clientName: nameValidation.sanitized,
        companyName: companyValidation.sanitized,
        email: emailValidation.sanitized,
        phone: phoneValidation.formatted,
        projectType: formData.projectType as any,
        budgetRange: formData.budgetRange,
        projectDetails: `${formData.projectDetails}\n[Target Timeline: ${formData.timeline} | NDA Requested: ${formData.requiresNDA ? 'YES' : 'NO'}]`
      });
      setLoading(false);

      if (res.success) {
        setSubmittedResponse({
          success: true,
          message: res.message || 'Thanks! Your project inquiry has been received. We\'ll get back to you shortly.',
          refId: (res as any).refId || `INQ-${Date.now().toString(36).toUpperCase()}`
        });
      } else {
        setErrorMessage(res.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || 'Network error. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      clientName: '',
      companyName: '',
      email: '',
      phone: '',
      projectType: 'Website / Web Application',
      budgetRange: 'Under ₹50,000 (Simple Project)',
      timeline: 'Flexible (1 - 3 Months)',
      projectDetails: '',
      requiresNDA: false
    });
    setSubmittedResponse(null);
    setErrorMessage('');
  };

  const services = [
    {
      icon: Code2,
      tag: 'Websites',
      title: 'Website Development',
      desc: 'Professional business websites, portfolios, and landing pages that load fast and look great.',
      stack: ['HTML/CSS/JS', 'React', 'WordPress'],
      sla: 'Affordable',
      deliverables: ['Business Website', 'Portfolio Site', 'Landing Page']
    },
    {
      icon: Smartphone,
      tag: 'Mobile',
      title: 'Mobile App Development',
      desc: 'Simple Android and iOS apps for small businesses, e-commerce, and service booking.',
      stack: ['Flutter', 'React Native', 'Firebase'],
      sla: 'Budget Friendly',
      deliverables: ['Android App', 'iOS App', 'App Publishing Help']
    },
    {
      icon: Cpu,
      tag: 'IoT / Hardware',
      title: 'IoT & Automation',
      desc: 'Basic sensor integration, smart device prototypes, and home/office automation.',
      stack: ['Arduino', 'ESP32', 'Python'],
      sla: 'Prototype Support',
      deliverables: ['Sensor Setup', 'Automation Demo', 'Basic Dashboard']
    },
    {
      icon: Cloud,
      tag: 'Cloud',
      title: 'Cloud Setup & Maintenance',
      desc: 'Hosting, domain setup, email, and basic cloud server management for small teams.',
      stack: ['AWS', 'Google Cloud', 'Hosting'],
      sla: 'Reliable',
      deliverables: ['Hosting Setup', 'Domain & Email', 'Server Maintenance']
    }
  ];

  return (
    <section id="software-services" className="py-14 sm:py-20 px-4 bg-white border-b border-slate-200/80 relative overflow-hidden bg-tech-grid">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00061a] text-white text-[10px] font-bold uppercase tracking-[0.14em]">
            <Sparkles className="w-3.5 h-3.5 text-[#7fffd4]" />
            <span>TechTrainX Software Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-luxury-title font-bold text-[#0a0a0f] tracking-tight">
            Custom Software for <span className="text-[#0066cc] italic font-normal">Small Businesses</span>
          </h2>
          <p className="text-xs text-slate-600 font-sans">
            Affordable websites, mobile apps, and automation solutions — built by experienced trainers and students.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border border-slate-200/90 hover:border-[#0066cc] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 text-[#0066cc] flex items-center justify-center group-hover:bg-[#00061a] group-hover:text-white transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">
                      {svc.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-sans group-hover:text-[#0066cc] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1 font-sans">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="pt-0.5">
                    <div className="flex flex-wrap gap-1">
                      {svc.stack.map((stk, sIdx) => (
                        <span key={sIdx} className="text-[9px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                          {stk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ul className="space-y-1 pt-2.5 border-t border-slate-100 font-sans">
                    {svc.deliverables.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {svc.sla}
                  </span>
                  <a
                    href={getServiceWhatsAppUrl(svc.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-[#0066cc] hover:text-[#00061a] inline-flex items-center gap-1 font-sans"
                  >
                    <span>Discuss</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inquiry Form */}
        <div className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            
            {/* Left Column - Trust Points */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-[#0066cc] text-[10px] font-bold uppercase tracking-[0.14em] border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Why Choose Us</span>
                </div>
                <h3 className="text-xl font-luxury-title font-bold text-[#0a0a0f] tracking-tight">
                  Get a Free <span className="text-[#0066cc] italic font-normal">Project Quote</span>
                </h3>
                <p className="text-xs text-slate-600 font-sans">
                  Tell us about your idea — we'll respond within one business day with a simple estimate.
                </p>
              </div>

              <div className="space-y-2.5">
                
                <div className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-slate-200/80">
                  <div className="w-7 h-7 rounded bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0 mt-0.5">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-slate-900 block font-sans">
                      You Own 100% of Your Code
                    </strong>
                    <span className="text-[11px] text-slate-600 font-sans">
                      All source files and IP are transferred to you on completion.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-slate-200/80">
                  <div className="w-7 h-7 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-slate-900 block font-sans">
                      Quick Response
                    </strong>
                    <span className="text-[11px] text-slate-600 font-sans">
                      We reply within 24 hours, often same day.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-slate-200/80">
                  <div className="w-7 h-7 rounded bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-slate-900 block font-sans">
                      Clear Milestones
                    </strong>
                    <span className="text-[11px] text-slate-600 font-sans">
                      Pay in installments as we deliver working features.
                    </span>
                  </div>
                </div>

              </div>

              <div className="p-3.5 bg-[#00061a] text-white rounded-xl space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 uppercase tracking-wider font-mono">WhatsApp</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </span>
                </div>
                <a
                  href={getServiceWhatsAppUrl('Small Business Software Inquiry')}
                  target="_blank"
                  rel="noreferrer"
                  className="custom-btn w-full justify-center h-[36px] text-[10px] tracking-[0.08em] bg-[#25d366] hover:bg-[#20bd5a] border-transparent"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Right Form */}
            <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-slate-900 font-sans">
                    Project Inquiry
                  </h4>
                  <p className="text-[11px] text-slate-500 font-sans">
                    Fill in your details and project idea. We'll get back with a simple quote.
                  </p>
                </div>
                <span className="text-[9px] font-mono bg-blue-50 text-[#0066cc] px-2 py-0.5 rounded font-bold border border-blue-200">
                  FREE QUOTE
                </span>
              </div>

              {submittedResponse ? (
                <div className="p-6 bg-slate-50 rounded-xl border border-emerald-200 text-center space-y-4 shadow-2xs">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 font-sans">Inquiry Received!</h4>
                    <p className="text-xs text-slate-600 mt-1 font-sans max-w-md mx-auto">{submittedResponse.message}</p>
                    {submittedResponse.refId && (
                      <div className="mt-3 inline-block bg-white text-[#0066cc] border border-blue-200 px-4 py-1.5 rounded-md text-xs font-mono font-bold shadow-2xs">
                        Reference: {submittedResponse.refId}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                    <a
                      href={getServiceWhatsAppUrl(`Project Inquiry Ref: ${submittedResponse.refId}`)}
                      target="_blank"
                      rel="noreferrer"
                      className="custom-btn h-[40px] text-[10px] tracking-[0.08em] px-5 justify-center bg-[#25d366] hover:bg-[#20bd5a] rounded-lg shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Follow up on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="custom-btn-outline h-[40px] text-[10px] tracking-[0.08em] px-5 justify-center cursor-pointer rounded-lg"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Submit Another</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-semibold font-sans">
                      {errorMessage}
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 flex items-center gap-2">
                      <span>Your Contact Details</span>
                      <div className="h-px flex-1 bg-slate-100"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <ValidatedInput
                        label="Your Name"
                        required
                        icon={User}
                        placeholder="e.g. Rahul Sharma"
                        value={formData.clientName}
                        onChange={(val) => setFormData({ ...formData, clientName: val })}
                        error={nameValidation.error}
                        isValid={nameValidation.isValid}
                        maxLength={60}
                      />

                      <ValidatedInput
                        label="Business / Shop Name"
                        icon={Building}
                        placeholder="e.g. Sharma Traders (optional)"
                        value={formData.companyName}
                        onChange={(val) => setFormData({ ...formData, companyName: val })}
                        error={companyValidation.error}
                        isValid={companyValidation.isValid}
                        maxLength={100}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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

                      <ValidatedPhoneInput
                        label="Phone Number"
                        required
                        value={formData.phone}
                        onChange={(val) => setFormData({ ...formData, phone: val })}
                      />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-3 pt-2">
                    <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 flex items-center gap-2">
                      <span>Project Details</span>
                      <div className="h-px flex-1 bg-slate-100"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <ValidatedSelect
                        label="What do you need?"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value as any })}
                      >
                        <option value="Website / Web Application">Website / Web Application</option>
                        <option value="Mobile App (Android/iOS)">Mobile App (Android/iOS)</option>
                        <option value="IoT / Hardware / Automation">IoT / Hardware / Automation</option>
                        <option value="Cloud Setup / Hosting">Cloud Setup / Hosting</option>
                        <option value="Other / Not Sure">Other / Not Sure</option>
                      </ValidatedSelect>

                      <ValidatedSelect
                        label="Estimated Budget"
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      >
                        <option value="Under ₹50,000 (Simple Project)">Under ₹50,000 (Simple)</option>
                        <option value="₹50,000 - ₹1,00,000 (Medium)">₹50,000 - ₹1,00,000 (Medium)</option>
                        <option value="₹1,00,000 - ₹2,50,000 (Large)">₹1,00,000 - ₹2,50,000 (Large)</option>
                        <option value="Need Discussion">Need Discussion</option>
                      </ValidatedSelect>
                    </div>

                    <ValidatedSelect
                      label="Timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    >
                      <option value="Flexible (1 - 3 Months)">Flexible (1 - 3 Months)</option>
                      <option value="Urgent (Within 1 Month)">Urgent (Within 1 Month)</option>
                      <option value="Long Term (3+ Months)">Long Term (3+ Months)</option>
                    </ValidatedSelect>
                  </div>

                  {/* Project Description */}
                  <div className="space-y-3 pt-2">
                    <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 flex items-center gap-2">
                      <span>Describe Your Project</span>
                      <div className="h-px flex-1 bg-slate-100"></div>
                    </div>

                    <ValidatedTextarea
                      label="What are you trying to build?"
                      required
                      rows={3}
                      minLen={10}
                      maxLen={1000}
                      placeholder="Briefly describe what you need — e.g., a website for my shop, an app for booking services, a simple automation system, etc."
                      value={formData.projectDetails}
                      onChange={(val) => setFormData({ ...formData, projectDetails: val })}
                      error={detailsValidation.error}
                      isValid={detailsValidation.isValid}
                    />

                    <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                      <input
                        type="checkbox"
                        id="nda-checkbox"
                        checked={formData.requiresNDA}
                        onChange={(e) => setFormData({ ...formData, requiresNDA: e.target.checked })}
                        className="w-4 h-4 rounded text-[#0066cc] focus:ring-[#0066cc] border-slate-300 cursor-pointer"
                      />
                      <label htmlFor="nda-checkbox" className="text-xs text-slate-700 cursor-pointer font-sans select-none flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-slate-500" />
                        <span>I'd like to sign an NDA before sharing details (optional)</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || !isFormValid}
                      className="custom-btn w-full justify-center h-[46px] text-[11px] tracking-[0.12em] font-bold shadow-sm rounded-lg bg-[#00061a] hover:bg-[#0066cc] transition-all"
                    >
                      <Send className="w-3.5 h-3.5 text-[#7fffd4]" />
                      <span>{loading ? 'Sending...' : 'Request Free Quote'}</span>
                    </button>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-slate-500 pt-3 font-sans">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>No spam, ever</span>
                      </span>
                      <span className="text-slate-300">•</span>
                      <span>You own your code</span>
                      <span className="text-slate-300">•</span>
                      <span>Friendly pricing</span>
                    </div>
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};