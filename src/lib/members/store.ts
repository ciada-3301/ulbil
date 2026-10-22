import fs from 'fs';
import path from 'path';
import seedData from '@/data/seedMembers.json';

export interface Member {
  id: string;
  sl?: number;
  memberId: string;
  tier: string;
  membershipType: 'Life Member' | 'General Member' | 'Student & Senior';
  name: string;
  fatherOrHusband?: string | null;
  dob?: string | null;
  joiningDate: string;
  validUntil: string;
  address: string;
  phones: string[];
  phone: string;
  whatsapp?: string | null;
  email?: string | null;
  occupation?: string | null;
  status: 'ACTIVE' | 'PENDING_APPROVAL' | 'REJECTED';
  isApproved: boolean;
  role: 'MEMBER' | 'ADMIN';
  createdAt?: string;
}

function getStoreFilePath(): string {
  const projectDataDir = path.join(process.cwd(), '.data');
  try {
    if (!fs.existsSync(projectDataDir)) {
      fs.mkdirSync(projectDataDir, { recursive: true });
    }
    return path.join(projectDataDir, 'custom_members.json');
  } catch {
    return path.join('/tmp', 'ulbil_custom_members.json');
  }
}

let inMemoryCustomMembers: Member[] | null = null;

function getCustomMembers(): Member[] {
  if (inMemoryCustomMembers) {
    return inMemoryCustomMembers;
  }

  const filePath = getStoreFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      inMemoryCustomMembers = JSON.parse(data);
      return inMemoryCustomMembers || [];
    }
  } catch (err) {
    console.error('Error reading custom members store:', err);
  }

  inMemoryCustomMembers = [];
  return inMemoryCustomMembers;
}

function saveCustomMembers(members: Member[]): void {
  inMemoryCustomMembers = members;
  const filePath = getStoreFilePath();
  try {
    fs.writeFileSync(filePath, JSON.stringify(members, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving custom members store:', err);
  }
}

export function getAllMembers(): Member[] {
  const custom = getCustomMembers();
  const seedMembers = (seedData as unknown as Member[]);
  
  // Custom updates override seed members if ID matches
  const customMap = new Map(custom.map(m => [m.memberId.toUpperCase(), m]));
  const merged = seedMembers.map(m => customMap.get(m.memberId.toUpperCase()) || m);

  // Add brand new custom members (not present in seed)
  const seedMemberIds = new Set(seedMembers.map(m => m.memberId.toUpperCase()));
  for (const c of custom) {
    if (!seedMemberIds.has(c.memberId.toUpperCase())) {
      merged.push(c);
    }
  }

  return merged;
}

export function cleanPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length >= 10) {
    return digits.slice(-10);
  }
  return digits;
}

export function findMemberByIdentifier(rawIdentifier: string): Member | undefined {
  if (!rawIdentifier) return undefined;
  const cleanId = rawIdentifier.trim();
  const cleanNumber = cleanPhone(cleanId);
  const upperId = cleanId.toUpperCase();

  const all = getAllMembers();

  return all.find(m => {
    // 1. Check exact memberId (e.g. "L/01", "G/15", "UIL-2026-1234")
    if (m.memberId && m.memberId.toUpperCase() === upperId) return true;
    if (m.id && m.id.toUpperCase() === upperId) return true;

    // 2. Check phone number (last 10 digits)
    if (cleanNumber.length === 10) {
      if (m.phone && cleanPhone(m.phone) === cleanNumber) return true;
      if (m.phones && m.phones.some(p => cleanPhone(p) === cleanNumber)) return true;
      if (m.whatsapp && cleanPhone(m.whatsapp) === cleanNumber) return true;
    }

    // 3. Check email
    if (cleanId.includes('@') && m.email && m.email.toLowerCase() === cleanId.toLowerCase()) {
      return true;
    }

    return false;
  });
}

export function registerPendingMember(params: {
  name: string;
  phone: string;
  email?: string;
  address: string;
  tier: string;
}): Member {
  const custom = getCustomMembers();
  const rawPhone = cleanPhone(params.phone);
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newMemberId = `UIL-NEW-${randomNum}`;

  const newMember: Member = {
    id: `mem-${newMemberId}`,
    memberId: newMemberId,
    name: params.name.trim(),
    phone: rawPhone,
    phones: [rawPhone],
    whatsapp: rawPhone,
    email: params.email?.trim() || null,
    address: params.address.trim(),
    tier: params.tier,
    membershipType: params.tier.includes('Life') ? 'Life Member' : 'General Member',
    joiningDate: new Date().toISOString().split('T')[0],
    validUntil: params.tier.includes('Life') ? 'Lifetime Patron' : '2027-08-31',
    status: 'PENDING_APPROVAL',
    isApproved: false,
    role: 'MEMBER',
    createdAt: new Date().toISOString()
  };

  custom.push(newMember);
  saveCustomMembers(custom);
  return newMember;
}

export function approveMember(memberId: string): Member | null {
  const upperId = memberId.trim().toUpperCase();
  const custom = getCustomMembers();
  const seedMembers = seedData as unknown as Member[];

  let existing = custom.find(m => m.memberId.toUpperCase() === upperId);
  if (!existing) {
    const fromSeed = seedMembers.find(m => m.memberId.toUpperCase() === upperId);
    if (fromSeed) {
      existing = { ...fromSeed };
      custom.push(existing);
    }
  }

  if (existing) {
    existing.status = 'ACTIVE';
    existing.isApproved = true;
    saveCustomMembers(custom);
    return existing;
  }

  return null;
}

export function rejectMember(memberId: string): Member | null {
  const upperId = memberId.trim().toUpperCase();
  const custom = getCustomMembers();
  const seedMembers = seedData as unknown as Member[];

  let existing = custom.find(m => m.memberId.toUpperCase() === upperId);
  if (!existing) {
    const fromSeed = seedMembers.find(m => m.memberId.toUpperCase() === upperId);
    if (fromSeed) {
      existing = { ...fromSeed };
      custom.push(existing);
    }
  }

  if (existing) {
    existing.status = 'REJECTED';
    existing.isApproved = false;
    saveCustomMembers(custom);
    return existing;
  }

  return null;
}
