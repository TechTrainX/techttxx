import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5">
      
      {/* Popover Chat Widget */}
      {popoverOpen && (
        <div className="bg-white w-76 p-4 rounded-2xl border border-gray-200 shadow-2xl space-y-3 font-sans animate-in fade-in zoom-in-95 duration-150">
          
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
              <div>
                <h4 className="text-xs font-bold text-[#0a0a0f] tracking-tight">Admissions WhatsApp Desk</h4>
                <p className="text-[10px] text-[#666]">Replies usually in &lt;5 mins</p>
              </div>
            </div>
            <button
              onClick={() => setPopoverOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-[#f7f9fc] p-2.5 rounded-xl border border-gray-200/80 text-xs text-[#444] leading-snug">
            <p className="font-bold text-[11px] text-[#0a0a0f] mb-0.5">Academic Advisory</p>
            <p className="text-[11px]">Have questions regarding upcoming batches, course fees, or syllabus? Connect directly with our mentors.</p>
          </div>

          <form onSubmit={handleSendQuickMsg} className="space-y-2">
            <input
              type="text"
              value={quickMessage}
              onChange={(e) => setQuickMessage(e.target.value)}
              placeholder="Ask about batch, fee or syllabus..."
              className="w-full bg-[#f7f9fc] border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-[#0a0a0f] placeholder-gray-400 focus:outline-none focus:border-[#0066cc]"
            />
            <button
              type="submit"
              className="w-full h-[36px] rounded-xl bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold text-[10px] uppercase tracking-[0.08em] shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
        className="w-12 h-12 rounded-full bg-[#25d366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer border border-[#20bd5a]"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Support"
      >
        <MessageSquare className="w-5 h-5 text-white" />
      </button>

    </div>
  );
};
