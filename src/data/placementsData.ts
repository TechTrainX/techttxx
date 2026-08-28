import { PlacementRecord } from '../types';

export interface ExtendedPlacementRecord {
  id: string;
  name: string;
  photoUrl: string;
  company: string;
  companyLogo?: string;
  role: string;
  packageLPA: string;
  courseTaken: string;
  collegeName: string;
  quote: string;
  batchYear: string;
}

export const PLACEMENTS_LIST: ExtendedPlacementRecord[] = [
  {
    id: 'pl-1',
    name: 'Sajjan Kumar',
    photoUrl: '', // TODO: Add real photo URL when available
    company: 'Jawahar Navodaya Vidyalaya (JNV) Pilibhit',
    role: 'IoT & Embedded Trainer',
    packageLPA: '4',
    courseTaken: 'IoT & Embedded Systems',
    collegeName: 'University of Lucknow',
    quote: '', // TODO: Add real testimonial after collecting
    batchYear: '2026'
  }
];

export const PLACEMENTS_DATA: PlacementRecord[] = PLACEMENTS_LIST.map((p) => ({
  id: p.id,
  studentName: p.name,
  avatarUrl: p.photoUrl,
  companyName: p.company,
  companyLogo: p.companyLogo || '',
  role: p.role,
  packageLPA: p.packageLPA ? `${p.packageLPA} LPA` : 'Package not disclosed',
  courseTaken: p.courseTaken,
  collegeName: p.collegeName,
  testimonialSnippet: p.quote
}));

export const RECRUITER_PARTNERS: string[] = [
  // Real company names will be added once placements are confirmed and permission is obtained.
];