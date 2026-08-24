import React from 'react';
import { BATCH_SCHEDULES_DATA } from '../data/batchesData';
import { Calendar, Clock, User, ArrowRight, Flame } from 'lucide-react';

interface BatchScheduleTableProps {
  onOpenEnrollment: (batchInfo: string) => void;
}

export const BatchScheduleTable: React.FC<BatchScheduleTableProps> = ({ onOpenEnrollment }) => {
  return (
    <section id="batches" className="py-16 px-4 bg-[#f0f8ff] border-b border-blue-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-white text-[#0066cc] text-xs font-bold uppercase tracking-wider border border-blue-200">
            Batch Timetable
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00061a]">
            Upcoming <span className="text-[#0066cc]">New Batches</span>
          </h2>
          <p className="text-sm text-[#555555]">
            Morning, Afternoon, and Evening batches with flexible Classroom & Live Online options.
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-[20px] border border-blue-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200 text-xs text-[#00061a] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-5">Course</th>
                  <th className="py-3.5 px-5">Start Date</th>
                  <th className="py-3.5 px-5">Timing & Mode</th>
                  <th className="py-3.5 px-5">Trainer</th>
                  <th className="py-3.5 px-5">Seats</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-[#333]">
                {BATCH_SCHEDULES_DATA.map((batch) => {
                  const fillPercent = Math.round((batch.seatsFilled / batch.totalSeats) * 100);
                  const isAlmostFull = fillPercent >= 80;

                  return (
                    <tr key={batch.id} className="hover:bg-blue-50/50 transition-colors">
                      
                      {/* Course */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-2">
                          {isAlmostFull && (
                            <span className="p-1 rounded bg-amber-50 text-amber-600 border border-amber-200" title="Fast filling">
                              <Flame className="w-3.5 h-3.5" />
                            </span>
                          )}
                          <div>
                            <p className="font-bold text-[#00061a] text-sm">{batch.courseTitle}</p>
                            <p className="text-[11px] text-[#666]">{batch.programType}</p>
                          </div>
                        </div>
                      </td>

                      {/* Start Date */}
                      <td className="py-3.5 px-5 whitespace-nowrap font-semibold text-[#0066cc]">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{batch.startDate}</span>
                        </div>
                      </td>

                      {/* Timing & Mode */}
                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-[#444] font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#0066cc]" />
                          <span>{batch.timing}</span>
                        </div>
                        <span className="inline-block mt-0.5 px-2 py-0.2 rounded text-[10px] font-semibold bg-blue-50 text-[#0066cc] border border-blue-100">
                          {batch.mode}
                        </span>
                      </td>

                      {/* Trainer */}
                      <td className="py-3.5 px-5 whitespace-nowrap text-[#555]">
                        <div className="flex items-center gap-1.5 font-medium">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          <span>{batch.instructorName}</span>
                        </div>
                      </td>

                      {/* Seats Status */}
                      <td className="py-3.5 px-5 min-w-[130px]">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-[#666]">{batch.seatsFilled}/{batch.totalSeats}</span>
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

                      {/* Action */}
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        <button
                          onClick={() => onOpenEnrollment(`${batch.courseTitle} (${batch.timing})`)}
                          className="custom-btn py-1.5 px-3.5 text-xs inline-flex"
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
    </section>
  );
};
