import React, { useState } from 'react';
import { submitServiceQuote } from '../services/apiService.js';
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
import { validateFullName, validateEmail, validatePhoneNumber, validateTextMessage, validateCollegeOrOrg } from '../utils/validators.js';
import { getServiceWhatsAppUrl } from '../utils/whatsappHelper';
import { COMPANY_CONFIG } from '../config/companyConfig.js';

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
  const [showQuoteForm, setShowQuoteForm] = useState(false);

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
    <section id="software-services" className="relative isolate overflow-hidden bg-[#050d24] px-4 py-16 text-white sm:py-24 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <style>{`
          @keyframes techtrainx-float-a {
            0%, 100% { transform: translate3d(0, 0, 0) rotate(-8deg); }
            50% { transform: translate3d(18px, -16px, 0) rotate(-5deg); }
          }
          @keyframes techtrainx-float-b {
            0%, 100% { transform: translate3d(0, 0, 0) rotate(18deg); }
            50% { transform: translate3d(-14px, 12px, 0) rotate(23deg); }
          }
          @keyframes techtrainx-drift {
            0%, 100% { transform: translateX(-2%) rotate(-5deg); }
            50% { transform: translateX(2%) rotate(-2deg); }
          }
          @media (prefers-reduced-motion: reduce) {
            .techtrainx-motion { animation: none !important; }
          }
        `}</style>
        <div className="absolute inset-0 bg-[#050d24]" />
        <div className="techtrainx-motion absolute -left-40 -top-48 h-[32rem] w-[32rem] rounded-full bg-[#0066cc]/18 blur-3xl [animation:techtrainx-float-a_16s_ease-in-out_infinite]" />
        <div className="techtrainx-motion absolute -right-32 top-[-7rem] h-[25rem] w-[25rem] rotate-12 rounded-[38%] border border-white/15 bg-[#0066cc]/12 shadow-[0_0_120px_rgba(0,102,204,0.28)] [animation:techtrainx-float-b_20s_ease-in-out_infinite]" />
        <div className="techtrainx-motion absolute bottom-[-15rem] left-[12%] h-[30rem] w-[70rem] rounded-[50%] border border-white/10 bg-[#0066cc]/10 shadow-[0_-30px_100px_rgba(0,102,204,0.25)] [animation:techtrainx-drift_22s_ease-in-out_infinite]" />
        <div className="absolute left-[8%] top-[16%] h-0 w-0 border-l-[5rem] border-r-[5rem] border-b-[9rem] border-l-transparent border-r-transparent border-b-[#0066cc]/35 drop-shadow-[0_18px_30px_rgba(2,12,40,0.45)] sm:left-[14%] sm:top-[22%]" />
        <div className="techtrainx-motion absolute right-[10%] top-[42%] h-20 w-20 rotate-45 rounded-[1.25rem] border border-white/15 bg-[#0066cc]/12 shadow-[0_18px_45px_rgba(0,0,0,0.38)] [animation:techtrainx-float-b_18s_ease-in-out_infinite]" />
        <div className="absolute inset-x-[-12%] top-[38%] h-44 rotate-[-6deg] rounded-[50%] border border-white/10 bg-[#0066cc]/10 shadow-[0_20px_70px_rgba(0,0,0,0.3)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.28)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050d24] via-[#050d24]/70 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl space-y-12 sm:space-y-16">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-400/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100 shadow-lg shadow-blue-950/20">
            <Sparkles className="h-4 w-4 text-blue-200" />
            <span>TechTrainX Software Services</span>
          </div>
          <h2 className="text-4xl font-luxury-title font-bold tracking-[-0.055em] text-white sm:text-6xl">
            Custom Software for <span className="text-blue-300 italic font-normal">Small Businesses</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Affordable websites, mobile apps, and automation solutions — built by experienced trainers and students.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={i}
                className="group flex flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white p-6 shadow-[0_16px_45px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_25px_65px_rgba(0,60,150,0.24)]"
              >
                <div className="space-y-3.5">
                  
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-[#0066cc] transition-all duration-300 group-hover:bg-[#0066cc] group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/25">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">
                      {svc.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-950 font-sans transition-colors group-hover:text-[#0066cc]">
                      {svc.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 font-sans">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="pt-0.5">
                    <div className="flex flex-wrap gap-1">
                      {svc.stack.map((stk, sIdx) => (
                        <span key={sIdx} className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-600 font-mono">
                          {stk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ul className="space-y-2 border-t border-slate-100 pt-4 font-sans">
                    {svc.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0066cc]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {svc.sla}
                  </span>
                  <a
                    href={getServiceWhatsAppUrl(svc.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0066cc] transition-all hover:translate-x-0.5 hover:text-[#003b78] font-sans"
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
        <div className="rounded-[2rem] border border-blue-100/80 bg-[#eef4fb] p-5 shadow-[0_25px_80px_rgba(0,30,90,0.2)] sm:p-8 lg:p-10">
          
          <div className="space-y-6">
            
            {/* Left Column - Trust Points */}
            <div className="grid items-center gap-6 lg:grid-cols-12">
              
              <div className="space-y-3 lg:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0066cc]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Why Choose Us</span>
                </div>
                <h3 className="text-3xl font-luxury-title font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Build it right. <span className="text-[#0066cc] italic font-normal">From day one.</span>
                </h3>
                <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                  Tell us about your idea and we’ll respond within one business day with a simple estimate.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowQuoteForm(true)}
                    className="group inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl border border-blue-400/40 bg-[#071a35] px-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_16px_35px_rgba(0,42,110,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0066cc] hover:shadow-[0_20px_45px_rgba(0,102,204,0.35)] focus:outline-none focus:ring-4 focus:ring-blue-300/40 sm:flex-none sm:px-5"
                  >
                    <Sparkles className="h-4 w-4 text-blue-200 transition-transform group-hover:rotate-12" />
                    <span>Get a Free Quote</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <a
                    href={getServiceWhatsAppUrl('Small Business Software Inquiry')}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-[#25d366] px-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#052e16] shadow-[0_12px_28px_rgba(37,211,102,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] focus:outline-none focus:ring-4 focus:ring-emerald-300/40 sm:flex-none sm:px-5"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:col-span-7">
                
                <div className="flex h-full items-start gap-2.5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066cc] mt-0.5">
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

                <div className="flex h-full items-start gap-2.5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mt-0.5">
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

                <div className="flex h-full items-start gap-2.5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 mt-0.5">
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

              

            </div>

            {/* Quote form: hidden until the visitor explicitly requests a quote */}
            <div
              aria-hidden={!showQuoteForm}
              className={`relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white p-5 shadow-xl shadow-blue-950/10 transition-all duration-500 ease-out sm:p-7 lg:col-span-12 ${showQuoteForm ? 'max-h-[3200px] translate-y-0 opacity-100' : 'pointer-events-none max-h-0 translate-y-4 border-transparent p-0 opacity-0 shadow-none'}`}
            >
              <button
                type="button"
                onClick={() => setShowQuoteForm(false)}
                className="absolute right-5 top-4 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 transition-colors hover:text-[#0066cc] focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Close
              </button>
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-slate-950 font-sans">
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

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                      <Send className="h-4 w-4 text-blue-200" />
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
