'use client';

import { useState, useCallback }  from 'react';
import { AtSign, IndianRupee, FileText, Sparkles } from 'lucide-react';
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
    `w-full pl-12 pr-4 py-3.5 bg-white/[0.03] backdrop-blur-sm border rounded-xl outline-none transition-all duration-300 text-white placeholder:text-white/50 ${
      errors[name]
        ? 'border-rose-500/50 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20'
        : focused === name
          ? 'border-violet-400/60 ring-2 ring-violet-400/20 bg-white/[0.06]'
          : 'border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.05]'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="relative">
        <label className="block text-sm font-medium text-white/70 mb-2 tracking-wide">
          UPI ID
        </label>
        <div className="relative group">
          <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-violet-300 transition-colors duration-300" />
          <input
            type="text"
            value={formData.upiId}
            onChange={e => handleChange('upiId', e.target.value)}
            onFocus={() => { setFocused('upiId'); setShowProviders(true); }}
            onBlur={() => { setTimeout(() => setFocused(null), 200); setTimeout(() => setShowProviders(false), 300); }}
            placeholder="yourname@okhdfc"
            className={inputClass('upiId')}
          />
          {formData.upiId && !errors.upiId && parsed && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {parsed.provider}
            </span>
          )}
        </div>
        {errors.upiId && (
          <p className="mt-2 text-sm text-rose-400 flex items-center gap-2 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse" />
            {errors.upiId}
          </p>
        )}
        {showProviders && !errors.upiId && (
          <div className="mt-2 p-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl animate-scale-in overflow-hidden">
            <p className="text-xs text-white/40 px-2 pb-2 font-medium uppercase tracking-wider">Quick select</p>
            <div className="grid grid-cols-2 gap-1">
              {commonUPIProviders.map(p => (
                <button
                  key={p.suffix}
                  type="button"
                  onMouseDown={() => selectProvider(p.suffix)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-white/[0.08] hover:border-white/[0.12] border border-transparent transition-all duration-200 text-left text-sm group"
                >
                  <span className="text-base group-hover:scale-110 transition-transform duration-200">{p.logo}</span>
                  <span className="text-white/60 font-medium group-hover:text-white/90 transition-colors">{p.suffix}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-white/70 mb-2 tracking-wide">
          Amount <span className="font-normal text-white/30">(optional)</span>
        </label>
        <div className="relative group">
          <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-violet-300 transition-colors duration-300" />
          <input
            type="number"
            min="1"
            max="100000"
            value={formData.amount}
            onChange={e => handleChange('amount', e.target.value)}
            onFocus={() => setFocused('amount')}
            onBlur={() => setFocused(null)}
            placeholder="Enter amount in ₹"
            className={inputClass('amount')}
          />
        </div>
        {errors.amount && (
          <p className="mt-2 text-sm text-rose-400 flex items-center gap-2 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse" />
            {errors.amount}
          </p>
        )}
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-white/70 mb-2 tracking-wide">
          Note <span className="font-normal text-white/30">(optional)</span>
        </label>
        <div className="relative group">
          <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-violet-300 transition-colors duration-300" />
          <input
            type="text"
            value={formData.note}
            onChange={e => handleChange('note', e.target.value)}
            onFocus={() => setFocused('note')}
            onBlur={() => setFocused(null)}
            placeholder="What's this payment for?"
            maxLength={50}
            className={inputClass('note')}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-medium text-white/20 tabular-nums">
            {formData.note.length}/50
          </span>
        </div>
        {errors.note && (
          <p className="mt-2 text-sm text-rose-400 flex items-center gap-2 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse" />
            {errors.note}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="relative w-full py-4 px-6 rounded-xl font-semibold text-white overflow-hidden group transition-all duration-300 active:scale-[0.98] mt-2"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-1 rounded-[10px] bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-2 rounded-[8px] bg-gradient-to-r from-violet-600/80 via-blue-600/80 to-cyan-500/80 group-hover:opacity-0 transition-opacity duration-300" />
        <span className="relative flex items-center justify-center gap-2.5">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="text-sm tracking-wide">Generate QR Code</span>
          <Sparkles className="w-4 h-4 animate-pulse" />
        </span>
      </button>
    </form>
  );
}
