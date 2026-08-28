import React, { useState } from 'react';
import { BATCH_SCHEDULES_DATA } from '../data/batchesData.js';
import { BatchSchedule } from '../types';
import { Calendar, Clock, User, ArrowRight, Flame, X, CheckCircle2, MessageSquare, Sparkles, Terminal, Cpu, Layers } from 'lucide-react';
import { createWhatsAppDirectQueryLink } from '../services/whatsappService.js';

interface BatchScheduleTableProps {
  onOpenEnrollment: (batchInfo: string) => void;
}

export const BatchScheduleTable: React.FC<BatchScheduleTableProps> = ({ onOpenEnrollment }) => {
  const [filterMode, setFilterMode] = useState<string>('All');
  const [selectedBatch, setSelectedBatch] = useState<BatchSchedule | null>(null);

  const filteredBatches = BATCH_SCHEDULES_DATA.filter((batch) => {
    if (filterMode === 'All') return true;
    return batch.mode.toLowerCase().includes(filterMode.toLowerCase());
  });

  return (
    <section id="batches" className="relative isolate overflow-hidden border-b border-slate-200/80 bg-[#050d24] px-4 py-14 text-white sm:py-20 lg:px-8">
      
      {/* 3D Depth Lighting Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#050d24]" />
        <div className="absolute -left-40 -top-48 h-[30rem] w-[30rem] rounded-full bg-[#0066cc]/15 blur-3xl" />
        <div className="absolute -right-32 top-[-8rem] h-[26rem] w-[26rem] rounded-[40%] border border-white/10 bg-[#0066cc]/10 shadow-[0_0_100px_rgba(0,102,204,0.18)] rotate-12" />
        <div className="absolute bottom-[-16rem] left-[12%] h-[30rem] w-[70rem] rounded-[50%] border border-white/10 bg-[#0066cc]/[0.06] rotate-[-5deg]" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:52px_52px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-10 sm:space-y-12">
        
        {/* Strength-led Section Header */}
        <div className="grid items-end gap-7 border-b border-white/10 pb-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-[#0066cc]/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-100 shadow-[0_8px_24px_rgba(0,102,204,0.14)]">
              <Terminal className="h-3.5 w-3.5 text-blue-300" />
              <span>Live Learning Operations</span>
            </span>
            <h2 className="font-luxury-title text-3xl font-bold tracking-[-0.05em] text-white sm:text-5xl">
              Choose your <span className="font-normal italic text-blue-300">build window.</span>
            </h2>
            <p className="max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Reserve a focused learning track with practical sessions, mentor guidance, and a schedule built for consistent progress.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:min-w-[108px]"><Calendar className="mx-auto mb-2 h-4 w-4 text-blue-300" /><span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-white">Live dates</span><span className="mt-1 block text-[9px] text-slate-400">Plan ahead</span></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:min-w-[108px]"><Cpu className="mx-auto mb-2 h-4 w-4 text-blue-300" /><span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-white">Build-led</span><span className="mt-1 block text-[9px] text-slate-400">Practical work</span></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:min-w-[108px]"><Layers className="mx-auto mb-2 h-4 w-4 text-blue-300" /><span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-white">Two modes</span><span className="mt-1 block text-[9px] text-slate-400">Campus + online</span></div>
          </div>
        </div>

        {/* Filter Switcher - Clean Rectangular Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['All', 'Classroom', 'Online'].map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`h-9 px-4 rounded-md text-[11px] font-bold uppercase tracking-[0.08em] cursor-pointer transition-all border ${
                filterMode === mode
                  ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-[0_10px_24px_rgba(0,102,204,0.24)]'
                  : 'bg-white/95 text-slate-700 shadow-sm hover:bg-blue-50 hover:border-[#0066cc]/50 border-slate-200'
              }`}
            >
              {mode === 'All' ? 'All Batches' : `${mode} Batches`}
            </button>
          ))}
        </div>

        {/* 1. Mobile & Tablet Responsive View (Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {filteredBatches.map((batch) => {
            const fillPercent = Math.round((batch.seatsFilled / batch.totalSeats) * 100);
            const isAlmostFull = fillPercent >= 80;

            return (
              <div 
                key={`mobile-${batch.id}`} 
                className="group flex flex-col justify-between space-y-3.5 rounded-[1.35rem] border border-slate-200 bg-white p-4 text-slate-950 shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0066cc]/60 hover:shadow-[0_25px_55px_rgba(0,102,204,0.18)]"
              >
                {/* Header with Title & Badge */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-[#0066cc] border border-blue-100">
                      {batch.mode}
                    </span>
                    {isAlmostFull && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        <Flame className="w-3 h-3" />
                        <span>Filling Fast</span>
                      </span>
                    )}
                  </div>

                  <h3 
                    onClick={() => setSelectedBatch(batch)}
                    className="text-base font-bold text-[#0a0a0f] font-sans hover:text-[#0066cc] cursor-pointer"
                  >
                    {batch.courseTitle}
                  </h3>
                  <p className="text-xs text-gray-500 font-sans">{batch.programType}</p>
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-2 gap-2 bg-[#f8fafc] p-2.5 rounded-lg border border-gray-100 text-xs text-[#374151] font-sans">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">Start Date</span>
                      <strong className="text-[#0a0a0f] font-semibold">{batch.startDate}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">Timing</span>
                      <span className="font-medium">{batch.timing}</span>
                    </div>
                  </div>
                </div>

                {/* Seats Status */}
                <div className="space-y-1 text-xs font-sans">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-500 flex items-center gap-1">
                      <User className="w-3 h-3 text-gray-400" />
                      <span>{batch.instructorName}</span>
                    </span>
                    <span className={`font-bold ${isAlmostFull ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {batch.totalSeats - batch.seatsFilled} seats left
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isAlmostFull ? 'bg-amber-500' : 'bg-[#0066cc]'}`}
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onOpenEnrollment(`${batch.courseTitle} (${batch.timing} - ${batch.startDate})`)}
                    className="custom-btn flex-1 h-[38px] text-[10px] tracking-[0.08em] rounded-md shadow-xs"
                  >
                    <span>Reserve Seat</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setSelectedBatch(batch)}
                    className="custom-btn-outline h-[38px] text-[10px] tracking-[0.08em] px-3 rounded-md"
                  >
                    Details
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* 2. Desktop High-Contrast Responsive Data Table */}
        <div className="hidden overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-[0_22px_60px_rgba(0,0,0,0.2)] md:block">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-[#f8fafc] text-[10px] font-bold uppercase tracking-[0.12em] text-[#0a0a0f]">
                  <th className="py-4 px-5">Track & Program</th>
                  <th className="py-4 px-4">Start Date</th>
                  <th className="py-4 px-4">Timing & Mode</th>
                  <th className="py-4 px-4">Lead Mentor</th>
                  <th className="py-4 px-4">Seats Availability</th>
                  <th className="py-4 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-[#333]">
                {filteredBatches.map((batch) => {
                  const fillPercent = Math.round((batch.seatsFilled / batch.totalSeats) * 100);
                  const isAlmostFull = fillPercent >= 80;

                  return (
                    <tr key={batch.id} className="transition-colors hover:bg-blue-50/60">
                      
                      {/* Course */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2.5">
                          {isAlmostFull && (
                            <span className="p-1 rounded-md bg-amber-50 text-amber-600 border border-amber-200 shrink-0" title="Fast Filling">
                              <Flame className="w-3.5 h-3.5" />
                            </span>
                          )}
                          <div>
                            <button
                              onClick={() => setSelectedBatch(batch)}
                              className="font-bold text-[#0a0a0f] text-sm text-left hover:text-[#0066cc] cursor-pointer font-sans"
                            >
                              {batch.courseTitle}
                            </button>
                            <p className="text-[11px] text-[#6b7280]">{batch.programType}</p>
                          </div>
                        </div>
                      </td>

                      {/* Start Date */}
                      <td className="py-4 px-4 whitespace-nowrap font-semibold text-[#0066cc]">
                        <div className="flex items-center gap-1.5 font-sans">
                          <Calendar className="w-3.5 h-3.5 text-[#0066cc]" />
                          <span>{batch.startDate}</span>
                        </div>
                      </td>

                      {/* Timing & Mode */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-[#374151] font-medium font-sans">
                          <Clock className="w-3.5 h-3.5 text-[#0066cc]" />
                          <span>{batch.timing}</span>
                        </div>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-[#0066cc] border border-blue-100">
                          {batch.mode}
                        </span>
                      </td>

                      {/* Trainer */}
                      <td className="py-4 px-4 whitespace-nowrap text-[#4b5563]">
                        <div className="flex items-center gap-1.5 font-medium font-sans">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          <span>{batch.instructorName}</span>
                        </div>
                      </td>

                      {/* Seats Status */}
                      <td className="py-4 px-4 min-w-[140px]">
                        <div className="flex items-center justify-between text-[11px] mb-1 font-sans">
                          <span className="text-[#6b7280]">{batch.seatsFilled}/{batch.totalSeats}</span>
                          <span className={`font-bold ${isAlmostFull ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {batch.totalSeats - batch.seatsFilled} left
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isAlmostFull ? 'bg-amber-500' : 'bg-[#0066cc]'}`}
                            style={{ width: `${fillPercent}%` }}
                          />
                        </div>
                      </td>

                      {/* Action Button */}
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <button
                          onClick={() => onOpenEnrollment(`${batch.courseTitle} (${batch.timing} - ${batch.startDate})`)}
                          className="custom-btn h-9 px-4 text-[10px] tracking-[0.08em] inline-flex rounded-md shadow-xs"
                        >
                          <span>Reserve</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Batch Details Modal */}
      {selectedBatch && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050d24]/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedBatch(null)}
        >
          <div 
            className="w-full max-w-lg space-y-4 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_28px_90px_rgba(5,13,36,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0066cc] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                  {selectedBatch.mode} • {selectedBatch.programType}
                </span>
                <h3 className="text-lg font-bold text-[#0a0a0f] font-sans mt-1">
                  {selectedBatch.courseTitle}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedBatch(null)}
                className="rounded-xl border border-slate-200 p-2 text-slate-400 transition-all hover:border-[#0066cc] hover:bg-[#0066cc] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#4b5563] font-sans">
              <p className="leading-relaxed">
                {selectedBatch.notes || 'Full comprehensive batch including daily coding exercises, verified projects, and placement interview rounds.'}
              </p>

              <div className="grid grid-cols-2 gap-2 bg-[#f8fafc] p-3 rounded-lg border border-gray-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-gray-400 block">Commencement Date</span>
                  <strong className="text-[#0a0a0f]">{selectedBatch.startDate}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-gray-400 block">Class Timing</span>
                  <strong className="text-[#0a0a0f]">{selectedBatch.timing}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-gray-400 block">Lead Trainer</span>
                  <strong className="text-[#0a0a0f]">{selectedBatch.instructorName}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-gray-400 block">Available Seats</span>
                  <strong className="text-emerald-700 font-bold">
                    {selectedBatch.totalSeats - selectedBatch.seatsFilled} Seats Remaining
                  </strong>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg space-y-1">
                <p className="text-[11px] font-semibold text-[#0066cc] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Includes 100% Free Demo Session & Counseling</span>
                </p>
                <p className="text-[11px] text-gray-600">
                  Attend the first 2 classes at zero upfront cost to experience the practical teaching foundry.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
              <a
                href={createWhatsAppDirectQueryLink(selectedBatch.courseTitle)}
                target="_blank"
                rel="noreferrer"
                className="custom-btn-outline h-[38px] text-[10px] tracking-[0.08em] px-3.5 text-emerald-700 hover:text-emerald-800 border-emerald-300 rounded-md"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Counselor</span>
              </a>

              <button
                onClick={() => {
                  const info = `${selectedBatch.courseTitle} (${selectedBatch.timing} - ${selectedBatch.startDate})`;
                  setSelectedBatch(null);
                  onOpenEnrollment(info);
                }}
                className="custom-btn h-[38px] text-[10px] tracking-[0.08em] px-4 rounded-md"
              >
                <span>Reserve Seat Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
