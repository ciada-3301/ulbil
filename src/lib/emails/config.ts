export interface DepartmentAccount {
  id: string;
  email: string;
  name: string;
  department: string;
  role: string;
  avatarColor: string;
  description: string;
}

export const MASTER_PASSWORD = 'Institute@2026';

export const DEPARTMENTS: Record<string, DepartmentAccount> = {
  'it@ulbil.com': {
    id: 'it',
    email: 'it@ulbil.com',
    name: 'IT & Web Outreach Wing',
    department: 'Information Technology',
    role: 'IT Administrator & Systems Desk',
    avatarColor: 'bg-emerald-600',
    description: 'Technical infrastructure, web services, and digitization projects'
  },
  'secretary@ulbil.com': {
    id: 'secretary',
    email: 'secretary@ulbil.com',
    name: 'General Secretary Office',
    department: 'Secretariat & Governance',
    role: 'General Secretary, Governing Council',
    avatarColor: 'bg-[#D95D24]',
    description: 'Official correspondence, government liaison, and executive council decisions'
  },
  'satta@ulbil.com': {
    id: 'satta',
    email: 'satta@ulbil.com',
    name: 'Satta Editorial Council',
    department: 'Literary Publications',
    role: 'Chief Editor, Satta Magazine Council',
    avatarColor: 'bg-amber-700',
    description: 'Manuscripts, journal submissions, literary seminars, and publications'
  }
};

export function getResendApiKey(): string {
  // Check VERCEL (as requested by user) or RESEND_API_KEY
  return process.env.VERCEL || process.env.RESEND_API_KEY || '';
}

export function isValidDepartment(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return Boolean(DEPARTMENTS[normalized]);
}
