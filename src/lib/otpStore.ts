/**
 * In-memory OTP storage with 10-minute TTL
 */

import { cleanPhone } from './members/store';

interface OtpRecord {
  code: string;
  expiresAt: number; // timestamp in ms
}

// Global store to persist across fast-refresh in dev
const globalForOtp = globalThis as unknown as {
  ulbilOtpMap?: Map<string, OtpRecord>;
};

const otpStore = globalForOtp.ulbilOtpMap || new Map<string, OtpRecord>();
if (process.env.NODE_ENV !== 'production') {
  globalForOtp.ulbilOtpMap = otpStore;
}

function normalizeKey(identifier: string): string {
  const trimmed = identifier.trim();
  if (trimmed.includes('@')) {
    return trimmed.toLowerCase();
  }
  const digits = cleanPhone(trimmed);
  return digits.length > 0 ? digits : trimmed.toUpperCase();
}

export function saveOtp(identifier: string, code: string): void {
  const key = normalizeKey(identifier);
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
  otpStore.set(key, { code, expiresAt });
}

export function verifyOtp(identifier: string, candidateCode: string): boolean {
  const key = normalizeKey(identifier);
  const record = otpStore.get(key);

  if (!record) {
    // For convenience in local testing if no code in store:
    // If the entered code is 123456 or matches simulated code
    if (process.env.NODE_ENV !== 'production' && candidateCode === '123456') {
      return true;
    }
    return false;
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(key);
    return false;
  }

  if (record.code === candidateCode.trim()) {
    otpStore.delete(key); // consume OTP
    return true;
  }

  return false;
}
