export type Role = 'MEMBER' | 'SCHOLAR' | 'LIBRARIAN' | 'ADMIN';
export type MembershipStatus = 'ACTIVE' | 'PENDING_VERIFICATION' | 'EXPIRED';
export type LoanStatus = 'ISSUED' | 'RETURNED' | 'OVERDUE';

export interface Patron {
  id: string;
  memberId: string; // e.g. UIL-2026-0142
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: Role;
  tier: 'General Reader' | 'Student & Senior' | 'Honourable Life Patron';
  status: MembershipStatus;
  joinedDate: string;
  validUntil: string;
  address: string;
  photoUrl?: string;
  seniorMode?: boolean;
}

export interface BookLoan {
  id: string;
  userId: string;
  memberId: string;
  borrowerName: string;
  borrowerPhone: string;
  bookAccessionNo: string;
  bookTitle: string;
  author: string;
  issuedDate: string; // YYYY-MM-DD
  dueDate: string;    // YYYY-MM-DD
  returnDate?: string;
  status: LoanStatus;
  fineAmount?: number;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  memberId: string;
  patronName: string;
  amount: number;
  purpose: 'Membership Registration' | 'Annual Renewal' | '125th Jubilee Donation' | 'Souvenir Pre-Order' | 'Library Fine';
  receiptNo: string;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Cash Counter';
  date: string;
  status: 'SUCCESS' | 'PENDING' | 'REFUNDED';
}

export interface DonationRecord {
  id: string;
  donorName: string;
  email: string;
  phone: string;
  panNumber?: string;
  amount: number;
  date: string;
  receiptNo: string;
  message?: string;
  isAnonymous?: boolean;
}

// Initial realistic dataset
export const INITIAL_PATRONS: Patron[] = [
  {
    id: 'usr-1',
    memberId: 'UIL-2026-0001',
    name: 'Sri Siddhartha Das',
    email: 'siddhartha.das@ulbil.org',
    phone: '+91 98363 30911',
    emailVerified: true,
    phoneVerified: true,
    role: 'ADMIN',
    tier: 'Honourable Life Patron',
    status: 'ACTIVE',
    joinedDate: '2010-01-15',
    validUntil: 'Lifetime',
    address: 'Institute Road, Uluberia, Howrah - 711315',
    photoUrl: 'https://www.ulbil.org/files/contents/siddhartha_das.jpg'
  },
  {
    id: 'usr-2',
    memberId: 'UIL-2026-0142',
    name: 'Ananya Roy Chowdhury',
    email: 'ananya.rc@gmail.com',
    phone: '+91 98301 22456',
    emailVerified: true,
    phoneVerified: true,
    role: 'MEMBER',
    tier: 'General Reader',
    status: 'ACTIVE',
    joinedDate: '2024-04-10',
    validUntil: '2027-04-09',
    address: 'Station Road, Uluberia Bazaar, Howrah'
  },
  {
    id: 'usr-3',
    memberId: 'UIL-2026-0289',
    name: 'Priyabrata Mukherjee (Senior)',
    email: 'p.mukherjee@yahoo.com',
    phone: '+91 94330 88712',
    emailVerified: true,
    phoneVerified: true,
    role: 'MEMBER',
    tier: 'Student & Senior',
    status: 'ACTIVE',
    joinedDate: '2023-08-20',
    validUntil: '2026-08-19',
    address: 'College Ghat Road, Uluberia',
    seniorMode: true
  },
  {
    id: 'usr-4',
    memberId: 'UIL-2026-0310',
    name: 'Subhankar Sen',
    email: 'subhankar.sen2025@gmail.com',
    phone: '+91 91234 56789',
    emailVerified: true,
    phoneVerified: false,
    role: 'MEMBER',
    tier: 'General Reader',
    status: 'PENDING_VERIFICATION',
    joinedDate: '2026-02-18',
    validUntil: '2027-02-17',
    address: 'Bazar Para, Uluberia'
  }
];

export const INITIAL_LOANS: BookLoan[] = [
  {
    id: 'loan-101',
    userId: 'usr-2',
    memberId: 'UIL-2026-0142',
    borrowerName: 'Ananya Roy Chowdhury',
    borrowerPhone: '+91 98301 22456',
    bookAccessionNo: 'UIL-LIT-00104',
    bookTitle: 'Gitanjali (Song Offerings)',
    author: 'Rabindranath Tagore',
    issuedDate: '2026-08-10',
    dueDate: '2026-08-24',
    status: 'ISSUED'
  },
  {
    id: 'loan-102',
    userId: 'usr-3',
    memberId: 'UIL-2026-0289',
    borrowerName: 'Priyabrata Mukherjee (Senior)',
    borrowerPhone: '+91 94330 88712',
    bookAccessionNo: 'UIL-LIT-00342',
    bookTitle: 'Pather Panchali (Song of the Little Road)',
    author: 'Bibhutibhushan Bandyopadhyay',
    issuedDate: '2026-08-01',
    dueDate: '2026-08-15',
    status: 'OVERDUE',
    fineAmount: 16 // 8 days overdue * 2 Rs
  },
  {
    id: 'loan-103',
    userId: 'usr-2',
    memberId: 'UIL-2026-0142',
    borrowerName: 'Ananya Roy Chowdhury',
    borrowerPhone: '+91 98301 22456',
    bookAccessionNo: 'UIL-CHI-00750',
    bookTitle: 'Feluda Samagra (Volume I & II)',
    author: 'Satyajit Ray',
    issuedDate: '2026-08-12',
    dueDate: '2026-08-26',
    status: 'ISSUED'
  },
  {
    id: 'loan-104',
    userId: 'usr-1',
    memberId: 'UIL-2026-0001',
    borrowerName: 'Sri Siddhartha Das',
    borrowerPhone: '+91 98363 30911',
    bookAccessionNo: 'UIL-POL-00512',
    bookTitle: 'The Discovery of India',
    author: 'Jawaharlal Nehru',
    issuedDate: '2026-07-20',
    dueDate: '2026-08-03',
    returnDate: '2026-08-02',
    status: 'RETURNED'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-501',
    userId: 'usr-1',
    memberId: 'UIL-2026-0001',
    patronName: 'Sri Siddhartha Das',
    amount: 5000,
    purpose: '125th Jubilee Donation',
    receiptNo: 'UIL-RCT-2026-0089',
    paymentMethod: 'UPI',
    date: '2026-08-15',
    status: 'SUCCESS'
  },
  {
    id: 'pay-502',
    userId: 'usr-2',
    memberId: 'UIL-2026-0142',
    patronName: 'Ananya Roy Chowdhury',
    amount: 300, // 100 fee + 200 deposit
    purpose: 'Membership Registration',
    receiptNo: 'UIL-RCT-2024-0312',
    paymentMethod: 'UPI',
    date: '2024-04-10',
    status: 'SUCCESS'
  },
  {
    id: 'pay-503',
    userId: 'usr-3',
    memberId: 'UIL-2026-0289',
    patronName: 'Priyabrata Mukherjee (Senior)',
    amount: 150,
    purpose: 'Annual Renewal',
    receiptNo: 'UIL-RCT-2025-0671',
    paymentMethod: 'Cash Counter',
    date: '2025-08-20',
    status: 'SUCCESS'
  }
];

export const INITIAL_DONATIONS: DonationRecord[] = [
  {
    id: 'don-801',
    donorName: 'Sri Siddhartha Das',
    email: 'siddhartha.das@ulbil.org',
    phone: '+91 98363 30911',
    panNumber: 'ABCDE1234F',
    amount: 5000,
    date: '2026-08-15',
    receiptNo: 'UIL-80G-2026-001',
    message: 'For the 125th Jubilee Souvenir & Rare Digitization Fund.'
  },
  {
    id: 'don-802',
    donorName: 'Dr. Akram Hossain & Family',
    email: 'akram.hossain@gmail.com',
    phone: '+91 98310 99887',
    panNumber: 'FGHIJ5678K',
    amount: 10000,
    date: '2026-08-01',
    receiptNo: 'UIL-80G-2026-002',
    message: 'In loving memory of early patrons who built Uluberia College.'
  }
];
