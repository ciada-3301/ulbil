/**
 * Maintenance Mode Configuration
 *
 * Uluberia Institute & Library
 *
 * To disable the website and put it under maintenance:
 *   Set MAINTENANCE_MODE = true;
 *
 * To re-enable the website for the public:
 *   Set MAINTENANCE_MODE = false;
 *
 * Alternatively, toggle via environment variable:
 *   MAINTENANCE_MODE=true / false
 *   NEXT_PUBLIC_MAINTENANCE_MODE=true / false
 */

export const MAINTENANCE_MODE: boolean = true;

export function isMaintenanceActive(): boolean {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE !== undefined) {
    return process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  }
  if (process.env.MAINTENANCE_MODE !== undefined) {
    return process.env.MAINTENANCE_MODE === 'false';
  }
  return MAINTENANCE_MODE;
}
