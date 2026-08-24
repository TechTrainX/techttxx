/**
 * TechTrainX Enterprise Platform - Top-Level Admin & Verification Configuration
 * 
 * Edit these settings at the top level to change the administrator passcode,
 * certificate issuing authority, and center verification keys.
 */

export interface AdminPortalConfig {
  /** Primary security token for issuing blockchain-style digitally verified certificates */
  issuerAuthority: string;
  /** Digital signature signatory designation */
  signatoryDesignation: string;
  /** Default certificate template series prefix (e.g., TTX-2026) */
  certificatePrefix: string;
  /** Admin support hotline */
  adminSupportPhone: string;
  /** Admin support email */
  adminSupportEmail: string;
}

export const ADMIN_CONFIG: AdminPortalConfig = {
  issuerAuthority: 'TechTrainX Academic & Industry Placement Board',
  signatoryDesignation: 'Director of Deep-Tech Training & Placement Operations',
  certificatePrefix: 'TTX-2026',
  adminSupportPhone: '+91 8545092070',
  adminSupportEmail: 'ttx@xnava.in'
};

export default ADMIN_CONFIG;
