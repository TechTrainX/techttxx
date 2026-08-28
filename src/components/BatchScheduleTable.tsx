import React, { useState } from 'react';
import { BATCH_SCHEDULES_DATA } from '../data/batchesData.js';
import { BatchSchedule } from '../types';
import { Calendar, Clock, User, ArrowRight, Flame, X, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
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
    <section id="batches" className="py-14 sm:py-20 px-4 bg-[#f8fafc] border-b border-gray-200/80 relative overflow-hidden bg-tech-grid">
      
      {/* 3D Depth Lighting Background */}
      <div className="absolute inset-0 bg-aura-glow pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto space-y-1.5">
          <span className="inline-block px-3 py-0.5 rounded-md bg-white text-[#0066cc] text-[10px] font-bold uppercase tracking-[0.14em] border border-blue-200/80">
            Batch Calendar
          </span>
          <h2 className="text-2xl sm:text-3xl font-luxury-title font-bold text-[#0a0a0f] tracking-tight">
            Upcoming <span className="text-[#0066cc] italic font-normal">Batches</span>
          </h2>
          <p className="text-xs text-slate-600 font-sans">
            Prayagraj Campus & Live Online cohorts starting this month.
          </p>
        </div>

        {/* Filter Switcher - Clean Rectangular Buttons */}
        <div className="flex items-center justify-center gap-2">
          {['All', 'Classroom', 'Online'].map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`h-9 px-4 rounded-md text-[11px] font-bold uppercase tracking-[0.08em] cursor-pointer transition-all border ${
                filterMode === mode
                  ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-xs'
                  : 'bg-white text-[#374151] hover:bg-blue-50 border-gray-200'
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
                className="bg-white rounded-xl border border-gray-200/90 p-4 shadow-sm space-y-3.5 hover:border-[#0066cc] transition-all flex flex-col justify-between"
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
        <div className="hidden md:block bg-white rounded-xl border border-gray-200/90 overflow-hidden shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/90 border-b border-gray-200 text-[10px] text-[#0a0a0f] font-bold uppercase tracking-[0.12em]">
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
                    <tr key={batch.id} className="hover:bg-blue-50/40 transition-colors">
                      
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setSelectedBatch(null)}
        >
          <div 
            className="bg-white rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-gray-200"
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
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
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
