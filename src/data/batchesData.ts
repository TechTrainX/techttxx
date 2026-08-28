import { BatchSchedule } from '../types';

/**
 * ==============================================================================
 * TECHTRAINX — BATCH SCHEDULES
 * ==============================================================================
 */
export const BATCH_SCHEDULES_DATA: BatchSchedule[] = [
  {
    id: 'batch-01',
    courseTitle: 'Python Full Stack with Django',
    programType: 'Placement Training',
    startDate: '1st September 2026-27',
    timing: '10:00 AM – 12:00 PM',
    mode: 'Offline (Center)',
    totalSeats: 20,
    seatsFilled: 5,
    instructorName: '',
    instructorExp: '',
    status: 'Filling Fast'
  },
  {
    id: 'batch-02',
    courseTitle: 'VLSI Training Certification Course',
    programType: 'Certification Course',
    startDate: 'Enquire for Batch Dates',
    timing: 'Flexible (Morning/Evening)',
    mode: 'Offline (Center)',
    totalSeats: 20,
    seatsFilled: 0,
    instructorName: '',
    instructorExp: '',
    status: 'Seats Available'
  },
  {
    id: 'batch-03',
    courseTitle: 'Offline Placement Bootcamp',
    programType: 'Placement Bootcamp',
    startDate: 'Free Demo — Contact for Dates',
    timing: '12:00 PM – 2:00 PM',
    mode: 'Offline (Center)',
    totalSeats: 15,
    seatsFilled: 6,
    instructorName: '',
    instructorExp: '',
    status: 'Filling Fast'
  }
];