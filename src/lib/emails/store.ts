import fs from 'fs';
import path from 'path';

export interface StoredEmail {
  id: string;
  from: string;
  fromName?: string;
  to: string[];
  replyTo?: string;
  subject: string;
  text?: string;
  html?: string;
  snippet: string;
  folder: 'inbox' | 'sent' | 'trash';
  department: string; // The owner account: 'it@ulbil.com' | 'secretary@ulbil.com' | 'satta@ulbil.com'
  createdAt: string;
  isRead: boolean;
  isStarred?: boolean;
}

const INITIAL_EMAILS: StoredEmail[] = [
  // IT Department Initial Mail
  {
    id: 'em-seed-it-1',
    from: 'Hostinger DNS Admin <support@hostinger.com>',
    fromName: 'Hostinger System Notice',
    to: ['it@ulbil.com'],
    subject: 'DNS Records & Resend Mail Authentication Configured for ulbil.com',
    text: `Hello IT Team,\n\nThe DNS MX, SPF, and DKIM verification records for ulbil.com have been updated. Your domain is ready for sending and receiving messages through Resend mail infrastructure.\n\nActive accounts:\n- it@ulbil.com\n- secretary@ulbil.com\n- satta@ulbil.com\n\nPlease ensure your Resend API key is configured.\n\nWarm regards,\nHostinger Systems Desk`,
    snippet: 'The DNS MX, SPF, and DKIM verification records for ulbil.com have been updated...',
    folder: 'inbox',
    department: 'it@ulbil.com',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    isRead: false,
    isStarred: true
  },
  {
    id: 'em-seed-it-2',
    from: 'Secretary Office <secretary@ulbil.com>',
    fromName: 'Secretary Office',
    to: ['it@ulbil.com'],
    subject: 'Request: Setup web outreach portal for 125th Jubilee publications',
    text: `Dear IT Department,\n\nPlease coordinate with the Satta council regarding the digital publication schedule for the upcoming quasquicentennial souvenir catalog.\n\nThank you,\nGeneral Secretary`,
    snippet: 'Please coordinate with the Satta council regarding the digital publication schedule...',
    folder: 'inbox',
    department: 'it@ulbil.com',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    isRead: true,
    isStarred: false
  },

  // Secretary Initial Mail
  {
    id: 'em-seed-sec-1',
    from: 'Department of Public Libraries <wb.publib@wb.gov.in>',
    fromName: 'WB Public Libraries Directorate',
    to: ['secretary@ulbil.com'],
    subject: 'Official Commendation on 125th Anniversary Observance (1902–2027)',
    text: `To,\nThe General Secretary,\nUluberia Institute & Library,\nHowrah, West Bengal.\n\nSubject: Recognition of Quasquicentennial Milestone.\n\nThe Directorate of Library Services conveys its warmest congratulations to the Governing Council and life-members of Uluberia Institute & Library on reaching its 125th anniversary.\n\nWe acknowledge your pivotal role in fostering civic literacy, community education, and archival preservation in Howrah district.\n\nSincerely,\nDirector of Library Services, Govt. of West Bengal`,
    snippet: 'The Directorate of Library Services conveys its warmest congratulations on reaching 125 years...',
    folder: 'inbox',
    department: 'secretary@ulbil.com',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    isRead: false,
    isStarred: true
  },
  {
    id: 'em-seed-sec-2',
    from: 'IT Department <it@ulbil.com>',
    fromName: 'IT Department',
    to: ['secretary@ulbil.com'],
    subject: 'System Online: Departmental email system active on @ulbil.com',
    text: `Dear Secretary,\n\nThe new encrypted departmental email service is now active for official communications on ulbil.com.\n\nAll messages can now be monitored and composed directly from the webmail dashboard at /emails.\n\nRegards,\nIT Wing`,
    snippet: 'The new encrypted departmental email service is now active for official communications...',
    folder: 'inbox',
    department: 'secretary@ulbil.com',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    isRead: true,
    isStarred: false
  },

  // Satta Magazine Council Initial Mail
  {
    id: 'em-seed-sat-1',
    from: 'Prof. Alok Mukherjee <editor.bengallit@univ.ac.in>',
    fromName: 'Prof. Alok Mukherjee',
    to: ['satta@ulbil.com'],
    subject: 'Submission: Manuscript for the 125th Special Jubilee Edition of Satta',
    text: `Respected Editorial Board of Satta,\n\nI am pleased to submit my research paper entitled "Centenary of Regional Literary Societies: The Uluberia Movement (1902–2027)" for review in the upcoming special jubilee issue of Satta.\n\nKindly acknowledge receipt of the submission.\n\nWith regards,\nProf. Alok Mukherjee`,
    snippet: 'I am pleased to submit my research paper entitled Centenary of Regional Literary Societies...',
    folder: 'inbox',
    department: 'satta@ulbil.com',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    isRead: false,
    isStarred: true
  }
];

// Persistent file storage helper
function getStoreFilePath(): string {
  // Use project root .data or fallback to /tmp for serverless/readonly environments
  const projectDataDir = path.join(process.cwd(), '.data');
  try {
    if (!fs.existsSync(projectDataDir)) {
      fs.mkdirSync(projectDataDir, { recursive: true });
    }
    return path.join(projectDataDir, 'emails.json');
  } catch {
    return path.join('/tmp', 'ulbil_emails.json');
  }
}

// In-memory cache
let inMemoryEmails: StoredEmail[] | null = null;

export function getStoredEmails(): StoredEmail[] {
  if (inMemoryEmails) {
    return inMemoryEmails;
  }

  const filePath = getStoreFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      inMemoryEmails = JSON.parse(data);
      return inMemoryEmails || [];
    }
  } catch (err) {
    console.error('Error reading emails from store:', err);
  }

  inMemoryEmails = [...INITIAL_EMAILS];
  saveStoredEmails(inMemoryEmails);
  return inMemoryEmails;
}

export function saveStoredEmails(emails: StoredEmail[]): void {
  inMemoryEmails = emails;
  const filePath = getStoreFilePath();
  try {
    fs.writeFileSync(filePath, JSON.stringify(emails, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving emails to store:', err);
  }
}

export function addEmail(email: Omit<StoredEmail, 'id' | 'createdAt' | 'snippet'>): StoredEmail {
  const emails = getStoredEmails();
  const plainText = email.text || email.html?.replace(/<[^>]*>/g, '') || '';
  const snippet = plainText.slice(0, 120).trim() + (plainText.length > 120 ? '...' : '');

  const newEmail: StoredEmail = {
    ...email,
    id: `em-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    snippet
  };

  emails.unshift(newEmail);
  saveStoredEmails(emails);
  return newEmail;
}

export function updateEmail(id: string, updates: Partial<StoredEmail>): StoredEmail | null {
  const emails = getStoredEmails();
  const index = emails.findIndex((e) => e.id === id);
  if (index === -1) return null;

  emails[index] = { ...emails[index], ...updates };
  saveStoredEmails(emails);
  return emails[index];
}

export function deleteEmailPermanently(id: string): boolean {
  const emails = getStoredEmails();
  const filtered = emails.filter((e) => e.id !== id);
  if (filtered.length !== emails.length) {
    saveStoredEmails(filtered);
    return true;
  }
  return false;
}
