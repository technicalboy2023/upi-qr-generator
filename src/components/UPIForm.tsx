'use client';

import { useState, useCallback } from 'react';
import { AtSign, IndianRupee, FileText, QrCode, Sparkles } from 'lucide-react';
import { validateUPIId, validateAmount, validateNote, commonUPIProviders, parseUPIId } from '@/lib/upi';
import { UPIFormData, ValidationResult } from '@/types/upi';

interface UPIFormProps {
  onGenerate: (data: UPIFormData) => void;
}

export default function UPIForm({ onGenerate }: UPIFormProps) {
  const [formData, setFormData] = useState<UPIFormData>({
    upiId: '',
    amount: '',
    note: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof UPIFormData, string>>>({});
  const [showProviders, setShowProviders] = useState(false);
  const [focused, setFocused] = useState<keyof UPIFormData | null>(null);

  const validateField = useCallback((name: keyof UPIFormData, value: string): ValidationResult => {
    switch (name) {
      case 'upiId': return validateUPIId(value);
      case 'amount': return validateAmount(value);
      case 'note': return validateNote(value);
      default: return { isValid: true };
    }
  }, []);

  const handleChange = (name: keyof UPIFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    const result = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: result.isValid ? undefined : result.error }));
  };

  const selectProvider = (suffix: string) => {
    const username = formData.upiId.split('@')[0];
    handleChange('upiId', `${username}${suffix}`);
    setShowProviders(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const upiResult = validateField('upiId', formData.upiId);
    const amountResult = validateField('amount', formData.amount);
    const noteResult = validateField('note', formData.note);
    if (!upiResult.isValid || !amountResult.isValid || !noteResult.isValid) {
      setErrors({
        upiId: upiResult.error,
        amount: amountResult.error,
        note: noteResult.error,
      });
      return;
    }
    onGenerate(formData);
  };

  const parsed = parseUPIId(formData.upiId);

  const inputClass = (name: keyof UPIFormData) =>
    `w-full pl-10 pr-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${
      errors[name]
        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
        : focused === name
          ? 'border-blue-500 ring-4 ring-blue-50'
          : 'border-gray-200 hover:border-gray-300'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">UPI ID</label>
        <div className="relative">
          <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={formData.upiId}
            onChange={e => handleChange('upiId', e.target.value)}
            onFocus={() => { setFocused('upiId'); setShowProviders(true); }}
            onBlur={() => { setTimeout(() => setFocused(null), 200); setTimeout(() => setShowProviders(false), 300); }}
            placeholder="e.g., yourname@okhdfc"
            className={inputClass('upiId')}
          />
          {formData.upiId && !errors.upiId && parsed && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              {parsed.provider}
            </span>
          )}
        </div>
        {errors.upiId && <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1"><span className="w-1 h-1 bg-red-500 rounded-full" />{errors.upiId}</p>}
        {showProviders && !errors.upiId && (
          <div className="mt-2 p-2 bg-gray-50 border border-gray-200 rounded-xl">
            <p className="text-xs text-gray-500 px-2 pb-1.5 font-medium">Quick select provider</p>
            <div className="grid grid-cols-2 gap-1">
              {commonUPIProviders.map(p => (
                <button
                  key={p.suffix}
                  type="button"
                  onMouseDown={() => selectProvider(p.suffix)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-left text-sm"
                >
                  <span>{p.logo}</span>
                  <span className="text-gray-700 font-medium">{p.suffix}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Amount <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <div className="relative">
          <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="number"
            min="1"
            max="100000"
            value={formData.amount}
            onChange={e => handleChange('amount', e.target.value)}
            onFocus={() => setFocused('amount')}
            onBlur={() => setFocused(null)}
            placeholder="Enter amount"
            className={inputClass('amount')}
          />
        </div>
        {errors.amount && <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1"><span className="w-1 h-1 bg-red-500 rounded-full" />{errors.amount}</p>}
      </div>

      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Note <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <div className="relative">
          <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={formData.note}
            onChange={e => handleChange('note', e.target.value)}
            onFocus={() => setFocused('note')}
            onBlur={() => setFocused(null)}
            placeholder="What's this for?"
            maxLength={50}
            className={inputClass('note')}
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">{formData.note.length}/50</span>
        </div>
        {errors.note && <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1"><span className="w-1 h-1 bg-red-500 rounded-full" />{errors.note}</p>}
      </div>

      <button
        type="submit"
        className="relative w-full py-3.5 px-6 rounded-xl font-semibold text-white overflow-hidden group transition-all duration-300 active:scale-[0.98]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800" />
        <span className="relative flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          Generate QR Code
          <QrCode className="w-4 h-4" />
        </span>
      </button>
    </form>
  );
}