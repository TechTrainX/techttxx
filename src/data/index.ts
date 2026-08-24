/**
 * ==============================================================================
 * TECHTRAINX — DATA LAYER INDEX
 * ==============================================================================
 * Re-exports everything from the split data files so the rest of the app can
 * import from a single place, e.g. `import { COURSES_DATA } from './data'`.
 * ==============================================================================
 */

export { SITE_CONFIG } from './siteContent';
export { COURSES_DATA } from './coursesData';
export { TRAINING_PROGRAMS_DATA } from './programsData';
export { BATCH_SCHEDULES_DATA } from './batchesData';
export { PLACEMENTS_DATA, RECRUITER_PARTNERS } from './placementsData';
export { GALLERY_DATA } from './galleryData';
export { HARDWARE_PROJECTS_DATA, HARDWARE_CATEGORIES } from './hardwareProjectsData';
export type { HardwareProject } from '../types';
