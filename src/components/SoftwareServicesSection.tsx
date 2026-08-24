import React, { useState } from 'react';
import { submitServiceQuote } from '../services/apiService';
import { 
  Code2, Smartphone, Cpu, Cloud, CheckCircle2, 
  ArrowRight, Send, User, Building, Mail, Phone, MessageSquare, RefreshCw
} from 'lucide-react';
import { ValidatedInput } from './ui/ValidatedInput';
import { ValidatedPhoneInput } from './ui/ValidatedPhoneInput';
import { ValidatedSelect } from './ui/ValidatedSelect';
import { ValidatedTextarea } from './ui/ValidatedTextarea';
import { validateFullName, validateEmail, validatePhoneNumber, validateTextMessage, validateCollegeOrOrg } from '../utils/validators';
import { getServiceWhatsAppUrl } from '../utils/whatsappHelper';

export const SoftwareServicesSection: React.FC = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    projectType: 'Web & SaaS Platform' as const,
    budgetRange: '₹50,000 - ₹1,50,000',
    projectDetails: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<{ success: boolean; message: string; refId?: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Validations
  const nameValidation = validateFullName(formData.clientName);
  const companyValidation = validateCollegeOrOrg(formData.companyName, false);
  const emailValidation = validateEmail(formData.email);
  const phoneValidation = validatePhoneNumber(formData.phone);
  const detailsValidation = validateTextMessage(formData.projectDetails, 15, 1500);

  const isFormValid = nameValidation.isValid && emailValidation.isValid && phoneValidation.isValid && detailsValidation.isValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nameValidation.isValid) {
      setErrorMessage(nameValidation.error || 'Please enter client or contact name.');
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
      setErrorMessage(detailsValidation.error || 'Please provide more details on your project requirements (min 15 characters).');
      return;
    }

    setLoading(true);
    try {
      const res = await submitServiceQuote({
        ...formData,
        clientName: nameValidation.sanitized,
        companyName: companyValidation.sanitized,
        email: emailValidation.sanitized,
        phone: phoneValidation.formatted,
        projectDetails: detailsValidation.sanitized
      });
      setLoading(false);

      if (res.success) {
        setSubmittedResponse({
          success: true,
          message: res.message || 'Thank you! Your project requirements have been submitted directly to the Technical Solutions Director.',
          refId: (res as any).refId || `QT-${Date.now().toString(36).toUpperCase()}`
        });
      } else {
        setErrorMessage(res.message || 'Failed to submit quote request. Please retry.');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || 'Network error.');
    }
  };

  const handleReset = () => {
    setFormData({
      clientName: '',
      companyName: '',
      email: '',
      phone: '',
      projectType: 'Web & SaaS Platform',
      budgetRange: '₹50,000 - ₹1,50,000',
      projectDetails: ''
    });
    setSubmittedResponse(null);
    setErrorMessage('');
  };

  const services = [
    {
      icon: Code2,
      title: 'Web & SaaS Platforms',
      desc: 'React, Next.js, and Node.js custom web applications built for speed, security, and enterprise scalability.',
      deliverables: ['Custom Web Applications', 'Admin & CRM Dashboards']
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps (iOS & Android)',
      desc: 'Native-feel Flutter and React Native apps with real-time sync and payment gateway integration.',
      deliverables: ['E-Commerce & Service Apps', 'Cross-Platform Solutions']
    },
    {
      icon: Cpu,
      title: 'AI & IoT Automation',
      desc: 'Smart embedded systems, sensors, LLM integrations, and custom business workflow bots.',
      deliverables: ['Microcontroller Prototypes', 'AI Chatbots & Integrations']
    },
    {
      icon: Cloud,
      title: 'Cloud & Infrastructure',
      desc: 'Secure cloud hosting, Docker deployments, automated CI/CD pipelines, and database tuning.',
      deliverables: ['AWS / GCP Deployments', 'Database & API Architecture']
    }
  ];

  return (
    <section id="software-services" className="py-16 px-4 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0066cc] text-xs font-bold uppercase tracking-wider">
            Enterprise Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00061a]">
            Custom <span className="text-[#0066cc]">Software Engineering</span>
          </h2>
          <p className="text-sm text-[#555555]">
            We design, build, and deploy production web, mobile, and IoT systems for startups, MSMEs, and enterprises.
          </p>
        </div>

        {/* 4 Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={i}
                className="bg-[#f0f8ff] p-5 rounded-[20px] border border-blue-100 hover:border-[#0066cc] shadow-elevation-1 hover:shadow-elevation-2 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-blue-200 text-[#0066cc] flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#00061a]">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-[#555] leading-relaxed">
                    {svc.desc}
                  </p>
                  <ul className="space-y-1.5 pt-2 border-t border-blue-200/50">
                    {svc.deliverables.map((item, idx) => (
                      <li key={idx} className="text-xs text-[#444] flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-2">
                  <a
                    href={getServiceWhatsAppUrl(svc.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="custom-btn-outline w-full justify-center text-[11px] py-1.5 px-3"
                  >
                    <span>Discuss Architecture</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Quote Form with High-Craft Input Controls */}
        <div className="bg-[#f0f8ff] p-6 sm:p-8 rounded-[20px] border border-blue-100 max-w-3xl mx-auto space-y-4 shadow-elevation-2">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-bold text-[#00061a]">
              Request a Project Consultation & Estimate
            </h3>
            <p className="text-xs text-[#666]">
              Share your requirements. Submissions trigger an immediate alert to our Solutions Lead & Owner.
            </p>
          </div>

          {submittedResponse ? (
            <div className="p-6 bg-white rounded-2xl border border-emerald-200 text-center space-y-4 shadow-elevation-1 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#00061a]">Quote Request Logged</h4>
                <p className="text-xs text-gray-600 mt-1">{submittedResponse.message}</p>
                {submittedResponse.refId && (
                  <div className="mt-2 inline-block bg-blue-50 text-[#0066cc] px-3 py-1 rounded-md text-[11px] font-mono font-bold">
                    Tracking Ref: {submittedResponse.refId}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                <a
                  href={getServiceWhatsAppUrl(`Quote Inquiry Ref: ${submittedResponse.refId}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="custom-btn text-xs py-2 px-5 justify-center bg-[#25d366] hover:bg-[#20bd5a]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Discuss on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="custom-btn-outline text-xs py-2 px-5 justify-center cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>New Request</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ValidatedInput
                  label="Contact Person Name"
                  required
                  icon={User}
                  placeholder="e.g. Rakesh Nair"
                  value={formData.clientName}
                  onChange={(val) => setFormData({ ...formData, clientName: val })}
                  error={nameValidation.error}
                  isValid={nameValidation.isValid}
                  maxLength={60}
                />

                <ValidatedInput
                  label="Company / Startup Name"
                  icon={Building}
                  placeholder="e.g. Innovatech Labs Pvt Ltd"
                  value={formData.companyName}
                  onChange={(val) => setFormData({ ...formData, companyName: val })}
                  error={companyValidation.error}
                  isValid={companyValidation.isValid}
                  maxLength={100}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ValidatedInput
                  label="Corporate Email Address"
                  required
                  type="email"
                  icon={Mail}
                  placeholder="e.g. rakesh@innovatech.com"
                  value={formData.email}
                  onChange={(val) => setFormData({ ...formData, email: val })}
                  error={emailValidation.error}
                  isValid={emailValidation.isValid}
                  maxLength={100}
                />

                <ValidatedPhoneInput
                  label="Direct Contact Number"
                  required
                  value={formData.phone}
                  onChange={(val) => setFormData({ ...formData, phone: val })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ValidatedSelect
                  label="Project Scope / Category"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value as any })}
                >
                  <option value="Web & SaaS Platform">Web & SaaS Platform</option>
                  <option value="Mobile App (Flutter / React Native)">Mobile App (Flutter / React Native)</option>
                  <option value="AI / LLM & Business Automation">AI / LLM & Business Automation</option>
                  <option value="IoT Hardware & Firmware">IoT Hardware & Firmware</option>
                  <option value="Custom CRM & Admin Portal">Custom CRM & Admin Portal</option>
                </ValidatedSelect>

                <ValidatedSelect
                  label="Estimated Budget Tier"
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                >
                  <option value="₹30,000 - ₹75,000 (MVP / Prototype)">₹30,000 - ₹75,000 (MVP / Prototype)</option>
                  <option value="₹75,000 - ₹2,00,000 (Full Production App)">₹75,000 - ₹2,00,000 (Full Production App)</option>
                  <option value="₹2,00,000 - ₹5,00,000 (Enterprise Solution)">₹2,00,000 - ₹5,00,000 (Enterprise Solution)</option>
                  <option value="₹5,00,000+ (Comprehensive Ecosystem)">₹5,00,000+ (Comprehensive Ecosystem)</option>
                </ValidatedSelect>
              </div>

              <ValidatedTextarea
                label="Project Requirements & Objectives"
                required
                rows={3}
                minLen={15}
                maxLen={1500}
                placeholder="Describe features, target platforms, timeline, and key technical integrations..."
                value={formData.projectDetails}
                onChange={(val) => setFormData({ ...formData, projectDetails: val })}
                error={detailsValidation.error}
                isValid={detailsValidation.isValid}
              />

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="custom-btn w-full justify-center py-3 text-xs sm:text-sm font-bold shadow-elevation-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting to Solutions Architect...' : 'Request Project Quote'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
