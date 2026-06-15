export interface UPIParams {
  upiId: string;
  amount?: number;
  note?: string;
}

export interface UPIFormData {
  upiId: string;
  amount: string;
  note: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}