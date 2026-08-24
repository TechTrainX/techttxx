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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      
      {/* Popover Chat Widget */}
      {popoverOpen && (
        <div className="bg-white w-72 p-4 rounded-[16px] border border-emerald-200 shadow-xl space-y-3">
          
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#25d366] animate-pulse" />
              <div>
                <h4 className="text-xs font-bold text-[#00061a]">Admissions WhatsApp Desk</h4>
                <p className="text-[10px] text-[#666]">Replies usually in &lt;5 mins</p>
              </div>
            </div>
            <button
              onClick={() => setPopoverOpen(false)}
              className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-emerald-50 p-2.5 rounded-[10px] text-xs text-emerald-900 leading-snug">
            <p className="font-bold text-[11px] mb-0.5">👋 Hi there!</p>
            <p className="text-[11px]">Have questions regarding upcoming batches, course fees, or syllabus? Chat with our counselors.</p>
          </div>

          <form onSubmit={handleSendQuickMsg} className="space-y-2">
            <input
              type="text"
              value={quickMessage}
              onChange={(e) => setQuickMessage(e.target.value)}
              placeholder="Ask a question..."
              className="w-full bg-slate-50 border border-gray-300 rounded-[10px] px-3 py-1.5 text-xs text-[#333] placeholder-gray-400 focus:outline-none focus:border-[#25d366]"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-full bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
        className="w-13 h-13 rounded-full bg-[#25d366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Support"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </button>

    </div>
  );
};
