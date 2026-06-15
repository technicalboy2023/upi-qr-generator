import { UPIParams, ValidationResult } from '@/types/upi';

const UPI_ID_REGEX = /^[\w.-]+@[\w.-]+$/;
const MAX_AMOUNT = 100000;
const MAX_NOTE_LENGTH = 50;

export function validateUPIId(upiId: string): ValidationResult {
  if (!upiId.trim()) {
    return { isValid: false, error: 'UPI ID is required' };
  }
  if (!UPI_ID_REGEX.test(upiId.trim())) {
    return { isValid: false, error: 'Invalid UPI ID format (e.g., user@okhdfc)' };
  }
  return { isValid: true };
}

export function validateAmount(amount: string): ValidationResult {
  if (!amount.trim()) {
    return { isValid: true };
  }
  if (!/^\d+(\.\d{1,2})?$/.test(amount.trim())) {
    return { isValid: false, error: 'Amount must be a valid number (up to 2 decimal places)' };
  }
  const num = Number(amount);
  if (num < 1) {
    return { isValid: false, error: 'Amount must be at least ₹1' };
  }
  if (num > MAX_AMOUNT) {
    return { isValid: false, error: `Amount cannot exceed ₹${MAX_AMOUNT.toLocaleString()}` };
  }
  return { isValid: true };
}

export function validateNote(note: string): ValidationResult {
  if (note.length > MAX_NOTE_LENGTH) {
    return { isValid: false, error: `Note cannot exceed ${MAX_NOTE_LENGTH} characters` };
  }
  return { isValid: true };
}

export function buildUPILink(params: UPIParams): string {
  const parts: string[] = [];
  parts.push(`pa=${encodeURIComponent(params.upiId.trim())}`);
  // NPCI UPI spec recommends pn as mandatory; fallback to UPI ID if not provided
  parts.push(`pn=${encodeURIComponent(params.upiId.trim())}`);
  parts.push(`cu=INR`);
  if (params.amount && params.amount > 0) {
    parts.push(`am=${encodeURIComponent(params.amount.toString())}`);
  }
  if (params.note && params.note.trim()) {
    parts.push(`tn=${encodeURIComponent(params.note.trim())}`);
  }
  return `upi://pay?${parts.join('&')}`;
}

export function parseUPIId(upiId: string): { username: string; provider: string } | null {
  const match = upiId.match(/^([\w.-]+)@([\w.-]+)$/);
  if (!match) return null;
  return { username: match[1], provider: match[2] };
}

export const commonUPIProviders = [
  { suffix: '@okhdfc', name: 'HDFC Bank', logo: '🏦' },
  { suffix: '@oksbi', name: 'State Bank of India', logo: '🏦' },
  { suffix: '@okaxis', name: 'Axis Bank', logo: '🏦' },
  { suffix: '@okicici', name: 'ICICI Bank', logo: '🏦' },
  { suffix: '@ybl', name: 'Yes Bank (PhonePe)', logo: '📱' },
  { suffix: '@paytm', name: 'Paytm Payments Bank', logo: '📱' },
  { suffix: '@apl', name: 'Amazon Pay', logo: '📦' },
  { suffix: '@axl', name: 'Axis Bank (Amazon)', logo: '🏦' },
  { suffix: '@ibl', name: 'IDFC First Bank', logo: '🏦' },
  { suffix: '@kotak', name: 'Kotak Mahindra Bank', logo: '🏦' },
];