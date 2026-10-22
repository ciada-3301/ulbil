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

const INITIAL_EMAILS: StoredEmail[] = [];

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

export function addEmail(email: Omit<StoredEmail, 'id' | 'createdAt' | 'snippet'> & { id?: string }): StoredEmail {
  const emails = getStoredEmails();
  const plainText = email.text || email.html?.replace(/<[^>]*>/g, '') || '';
  const snippet = plainText.slice(0, 120).trim() + (plainText.length > 120 ? '...' : '');

  const newEmail: StoredEmail = {
    ...email,
    id: email.id || `em-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
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
