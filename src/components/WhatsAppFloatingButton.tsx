import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      
      {/* Popover Chat Widget */}
      {popoverOpen && (
        <div className="glass-card w-80 p-5 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-4 animate-in slide-in-from-bottom-4 duration-200">
          
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <h4 className="text-sm font-bold text-white">TechTrainX WhatsApp Live</h4>
                <p className="text-[10px] text-slate-400">Usually replies in &lt;5 mins</p>
              </div>
            </div>
            <button
              onClick={() => setPopoverOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/5 text-xs text-slate-300 space-y-1">
            <p className="font-bold text-white">👋 Hi there!</p>
            <p>Looking for Summer Training, Fee Details, or Course Syllabi? Chat directly with our admission leads on WhatsApp.</p>
          </div>

          <form onSubmit={handleSendQuickMsg} className="space-y-2">
            <input
              type="text"
              value={quickMessage}
              onChange={(e) => setQuickMessage(e.target.value)}
              placeholder="Type your question or course name..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all cursor-pointer relative group"
        title="Direct WhatsApp Support"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30 pointer-events-none" />
        <MessageSquare className="w-7 h-7 text-white" />
      </button>

    </div>
  );
};
