import React, { useState } from 'react';
import { MessageSquare, X, Send, Terminal, Sparkles } from 'lucide-react';
import { createWhatsAppDirectQueryLink } from '../services/whatsappService';

export const WhatsAppFloatingButton: React.FC = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');

  const handleSendQuickMsg = (e: React.FormEvent) => {
    e.preventDefault();
    const url = createWhatsAppDirectQueryLink(quickMessage.trim() || 'General Admissions Inquiry');
    window.open(url, '_blank');
    setPopoverOpen(false);
    setQuickMessage('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      
      {/* Popover Chat Widget */}
      {popoverOpen && (
        <div className="w-[min(21rem,calc(100vw-2rem))] overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white font-sans shadow-[0_24px_70px_rgba(5,13,36,0.24)] animate-in fade-in slide-in-from-bottom-3 duration-300">
          
          <div className="flex items-center justify-between border-b border-white/10 bg-[#050d24] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-300/20 bg-[#0066cc]/20 text-blue-200 shadow-inner"><Terminal className="h-4 w-4" /></div>
              <div>
                <h4 className="text-xs font-bold tracking-tight text-white">TechTrainX Support Desk</h4>
                <p className="font-mono text-[9px] text-blue-200/80">status: online · reply &lt;5 min</p>
              </div>
            </div>
            <button
              onClick={() => setPopoverOpen(false)}
              className="rounded-full p-1 text-slate-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mx-4 mt-4 rounded-xl border border-blue-100 bg-[#f8fbff] p-3 text-xs leading-snug text-slate-600 shadow-sm">
            <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#0066cc]"><Sparkles className="h-3 w-3" /><span>Quick Connect</span></div>
            <p className="text-[11px]">Have questions about batches, fees, syllabus, or software services? Connect directly with our team.</p>
          </div>

          <form onSubmit={handleSendQuickMsg} className="space-y-2 p-4 pt-3">
            <input
              type="text"
              value={quickMessage}
              onChange={(e) => setQuickMessage(e.target.value)}
              placeholder="Ask about batch, fee or syllabus..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-950 shadow-inner transition-all placeholder:text-slate-400 focus:border-[#0066cc] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
            />
            <button
              type="submit"
              className="flex h-[40px] w-full items-center justify-center gap-1.5 rounded-xl bg-[#25d366] text-[10px] font-bold uppercase tracking-[0.08em] text-[#052e16] shadow-[0_10px_24px_rgba(37,211,102,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-[0_14px_28px_rgba(37,211,102,0.28)] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </button>
          </form>

        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setPopoverOpen(!popoverOpen)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#20bd5a] bg-[#25d366] text-white shadow-[0_14px_35px_rgba(37,211,102,0.32)] transition-all hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_20px_45px_rgba(37,211,102,0.42)] focus:outline-none focus:ring-4 focus:ring-emerald-300/40 cursor-pointer"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Support"
      >
        <span className="absolute inset-1 rounded-xl border border-white/25" /><MessageSquare className="relative h-5 w-5 text-white transition-transform group-hover:scale-110" />
      </button>

    </div>
  );
};
