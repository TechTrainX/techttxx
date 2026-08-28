/**
 * ==============================================================================
 * TECHTRAINX — DATA LAYER INDEX
 * ==============================================================================
 * Re-exports everything from the split data files so the rest of the app can
 * import from a single place, e.g. `import { COURSES_DATA } from './data'`.
 * ==============================================================================
 */

export { SITE_CONFIG } from './siteContent.js';
export { COURSES_DATA } from './coursesData.js';
export { TRAINING_PROGRAMS_DATA } from './programsData.js';
export { BATCH_SCHEDULES_DATA } from './batchesData.js';
export { PLACEMENTS_DATA, RECRUITER_PARTNERS } from './placementsData.js';
export { GALLERY_DATA } from './galleryData.js';
export { HARDWARE_PROJECTS_DATA, HARDWARE_CATEGORIES } from './hardwareProjectsData.js';
export { FRONTIER_TECH_ROADMAPS_DATA } from './roadmapData.js';
export type { HardwareProject, FrontierTechRoadmapTrack, RoadmapSkillGroup } from '../types';
