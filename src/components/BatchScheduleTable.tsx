import React from 'react';
import { BATCH_SCHEDULES_DATA } from '../data/batchesData';
import { Calendar, Clock, User, ArrowRight, Sparkles, AlertCircle, MessageSquare, Flame, CheckCircle2 } from 'lucide-react';
import { createWhatsAppBatchBookingLink } from '../services/whatsappService';

interface BatchScheduleTableProps {
  onOpenEnrollment: (batchInfo: string) => void;
}

export const BatchScheduleTable: React.FC<BatchScheduleTableProps> = ({ onOpenEnrollment }) => {
  return (
    <section id="batches" className="py-20 px-4 relative bg-[#030712] border-t border-b border-slate-850 cyber-dots-bg">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Real-Time Batch Radar
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Upcoming <span className="gradient-text-cyan">Batch Timings & Seat Matrix</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Batches run in Morning, Afternoon, and Evening slots. Daily 5 hours hands-on coding cadence at TechTrainX Foundry Campus & Hybrid Live Labs.
          </p>
        </div>

        {/* Table Container */}
        <div className="glass-card rounded-3xl border border-cyan-500/30 overflow-x-auto shadow-2xl bg-slate-900/90">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/90 text-xs text-cyan-400 font-black uppercase tracking-wider">
                <th className="py-4 px-6">Course / Batch Name</th>
                <th className="py-4 px-6">Start Date</th>
                <th className="py-4 px-6">Slot & Mode</th>
                <th className="py-4 px-6">Seat Matrix</th>
                <th className="py-4 px-6">Lead Architect</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs text-slate-300">
              {BATCH_SCHEDULES_DATA.map((batch) => {
                const fillPercent = Math.round((batch.seatsFilled / batch.totalSeats) * 100);
                const isAlmostFull = fillPercent >= 80;

                return (
                  <tr key={batch.id} className="hover:bg-slate-800/60 transition-colors">
                    
                    {/* Course Title */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {isAlmostFull && (
                          <span className="p-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30" title="Fast filling batch">
                            <Flame className="w-3.5 h-3.5" />
                          </span>
                        )}
                        <div>
                          <p className="font-black text-white text-sm">{batch.courseTitle}</p>
                          <p className="text-[11px] text-slate-400">{batch.programType}</p>
                        </div>
                      </div>
                    </td>

                    {/* Start Date */}
                    <td className="py-4 px-6 whitespace-nowrap font-bold text-cyan-300">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{batch.startDate}</span>
                      </div>
                    </td>

                    {/* Slot & Mode */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{batch.timing}</span>
                      </div>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-950 text-[10px] font-bold text-cyan-400 border border-cyan-500/30">
                        {batch.mode}
                      </span>
                    </td>

                    {/* Seat Progress Bar */}
                    <td className="py-4 px-6 min-w-[170px]">
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="font-semibold text-slate-300">
                          {batch.seatsFilled}/{batch.totalSeats} Enrolled
                        </span>
                        <span className={`font-black ${isAlmostFull ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {batch.totalSeats - batch.seatsFilled} seats left
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isAlmostFull 
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                              : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                          }`}
                          style={{ width: `${fillPercent}%` }}
                        />
                      </div>
                    </td>

                    {/* Instructor */}
                    <td className="py-4 px-6 whitespace-nowrap text-slate-300">
                      <div className="flex items-center gap-1.5 font-medium">
                        <User className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{batch.instructorName}</span>
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={createWhatsAppBatchBookingLink(batch.courseTitle, batch.startDate, batch.timing, batch.mode)}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold transition-all border border-emerald-500/30 flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3 text-emerald-400" />
                          <span>WhatsApp</span>
                        </a>

                        <button
                          onClick={() => onOpenEnrollment(`${batch.courseTitle} (${batch.startDate})`)}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>Reserve Seat</span>
                          <ArrowRight className="w-3 h-3 text-slate-950" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};

