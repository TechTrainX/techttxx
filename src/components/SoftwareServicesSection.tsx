import React, { useState } from 'react';
import { submitServiceQuote } from '../services/apiService';
import { createWhatsAppSoftwareQuoteLink } from '../services/whatsappService';
import { 
  Building, Code2, Smartphone, Cpu, Cloud, Check, 
  ArrowRight, MessageSquare, Send, Sparkles, CheckCircle2,
  Terminal, ShieldCheck, Zap
} from 'lucide-react';

export const SoftwareServicesSection: React.FC = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    projectType: 'Web Application' as const,
    budgetRange: '₹50,000 - ₹1,50,000',
    projectDetails: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await submitServiceQuote(formData);
    setLoading(false);
    if (res.success) {
      setSuccessMsg(res.message);
    }
  };

  return (
    <section id="software-services" className="py-20 px-4 relative bg-[#030712] border-t border-b border-slate-850 cyber-dots-bg">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5 text-cyan-400" /> Enterprise Solutions & Foundry
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Software Development <span className="gradient-text-cyan">& Engineering</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            TechTrainX Technologies engineers high-performance web applications, iOS/Android mobile apps, enterprise ERP solutions, and cloud native microservices for growing businesses and tech startups.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="glass-card-interactive p-6 rounded-3xl border border-cyan-500/25 space-y-3.5 bg-slate-900/90 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-lg">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-white">Full Stack Web Apps</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              React, Next.js, Node.js, Python, and Java Spring Boot SaaS platforms built for extreme scale, zero downtime, and high security.
            </p>
            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px] text-slate-300 font-medium">
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> SaaS & Customer Portals</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Enterprise Admin Dashboards</div>
            </div>
          </div>

          <div className="glass-card-interactive p-6 rounded-3xl border border-indigo-500/25 space-y-3.5 bg-slate-900/90 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shadow-lg">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-white">Mobile Apps (iOS/Android)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Cross-platform React Native and Flutter applications with offline sync, payment gateways, and real-time push notifications.
            </p>
            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px] text-slate-300 font-medium">
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> E-commerce & Delivery Apps</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> Fintech & Healthcare Solutions</div>
            </div>
          </div>

          <div className="glass-card-interactive p-6 rounded-3xl border border-emerald-500/25 space-y-3.5 bg-slate-900/90 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-white">AI & ML Automation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Custom LLM integration, automated document processing, computer vision pipelines, and intelligent business analytics.
            </p>
            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px] text-slate-300 font-medium">
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> RAG Knowledge Assistants</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Predictive Forecasting Models</div>
            </div>
          </div>

          <div className="glass-card-interactive p-6 rounded-3xl border border-amber-500/25 space-y-3.5 bg-slate-900/90 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-lg">
              <Cloud className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-white">Cloud & DevOps</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              AWS / GCP architecture, Docker containerization, Kubernetes clusters, and automated CI/CD deployment pipelines.
            </p>
            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px] text-slate-300 font-medium">
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Infrastructure as Code (IaC)</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Zero-Downtime Blue-Green Deploys</div>
            </div>
          </div>

        </div>

        {/* Project Estimation Quote Form Box */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 bg-slate-900/95 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-black">
                <Zap className="w-3.5 h-3.5 text-cyan-400" /> Fast Technical Turnaround & NDA
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Request a Software Architecture Estimate</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect directly with our Lead Solutions Architect. We provide strict NDAs, fixed-cost estimates, and dedicated engineering sprints.
              </p>

              <div className="pt-2">
                <a
                  href={createWhatsAppSoftwareQuoteLink('Custom Enterprise Software Solution', 'Web & Mobile App Development')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-slate-950" />
                  <span>Chat with Solutions Lead on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 bg-slate-950/90 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
              {successMsg ? (
                <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Quote Request Logged!</span>
                  </div>
                  <p>{successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="e.g. Rahul Verma"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300">Company / Organization</label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Apex Healthcare"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300">Mobile Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300">Project Type</label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value as any })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="Web Application">Web Application (React / Node / Django)</option>
                        <option value="Mobile App">Mobile App (Flutter / React Native)</option>
                        <option value="AI / ML System">AI / ML System & Custom LLM</option>
                        <option value="Enterprise ERP">Enterprise ERP & Billing Portal</option>
                        <option value="Cloud / DevOps">Cloud / DevOps Infrastructure</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300">Estimated Budget Range</label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000 (MVP / Prototype)</option>
                        <option value="₹50,000 - ₹1,50,000">₹50,000 - ₹1,50,000 (Production App)</option>
                        <option value="₹1,50,000 - ₹5,00,000">₹1,50,000 - ₹5,00,000 (Enterprise Solution)</option>
                        <option value="₹5,00,000+">₹5,00,000+ (High-Scale Ecosystem)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Project Scope / Brief</label>
                    <textarea
                      rows={2}
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      placeholder="Outline key features, target deadline, or technical integrations required..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>Request Architecture Estimate & Call</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

