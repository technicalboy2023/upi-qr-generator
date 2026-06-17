'use client';

import { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, Share2, Check, ArrowLeft, Smartphone, Link2, ChevronDown, Image } from 'lucide-react';
import { downloadQRCode, downloadSVG, copyToClipboard, shareUPILink } from '@/lib/utils';

interface QRDisplayProps {
  upiLink: string;
  upiId: string;
  onBack: () => void;
}

const DOWNLOAD_OPTIONS = [
  { id: 'png' as const, label: 'PNG', icon: Image, action: (ref: SVGSVGElement | null, id: string) => downloadQRCode(ref, `upi-${id}`) },
  { id: 'svg' as const, label: 'SVG', icon: Download, action: (ref: SVGSVGElement | null, id: string) => downloadSVG(ref, `upi-${id}`) },
];

export default function QRDisplay({ upiLink, upiId, onBack }: QRDisplayProps) {
  const qrRef = useRef<SVGSVGElement>(null);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = async () => {
    if (await copyToClipboard(upiLink)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (await shareUPILink(upiLink, `Pay ${upiId}`)) {
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
        <button
          onClick={onBack}
          className="p-2.5 -ml-2 rounded-xl hover:bg-white/[0.08] border border-transparent hover:border-white/[0.1] transition-all duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-white">Your QR Code</h2>
          <p className="text-sm text-white/40">Scan with any UPI app to pay</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className="absolute -inset-3 bg-gradient-to-br from-violet-500/30 via-blue-500/20 to-cyan-400/30 rounded-3xl opacity-40 group-hover:opacity-60 blur-xl transition-all duration-700 animate-glow-pulse" />
          <div className="relative bg-white/[0.03] backdrop-blur-xl p-5 rounded-2xl border border-white/[0.1] shadow-2xl">
            <QRCodeSVG
              ref={qrRef}
              value={upiLink}
              size={220}
              level="M"
              includeMargin={true}
              bgColor="transparent"
              fgColor="#ffffff"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-full text-xs w-fit mx-auto">
        <Smartphone className="w-3.5 h-3.5 text-white/50" />
        <span className="text-white/50">Works on GPay, PhonePe, Paytm & more</span>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.15em] pl-1">Download</p>
        <div className="grid grid-cols-2 gap-2.5">
          {DOWNLOAD_OPTIONS.map(({ id, label, icon: Icon, action }) => (
            <button
              key={id}
              onClick={() => action(qrRef.current, upiId)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-violet-400/40 hover:bg-violet-400/10 transition-all duration-300 text-sm font-medium text-white/70 hover:text-white"
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.15em] pl-1">Share</p>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-400/40 hover:bg-emerald-400/10 transition-all duration-300 text-sm font-medium text-white/70 hover:text-emerald-300"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-violet-400/40 hover:bg-violet-400/10 transition-all duration-300 text-sm font-medium text-white/70 hover:text-violet-300"
          >
            {shared ? <Check className="w-4 h-4 text-violet-400" /> : <Share2 className="w-4 h-4" />}
            {shared ? 'Shared!' : 'Share'}
          </button>
        </div>
      </div>

      <details className="group">
        <summary className="flex items-center gap-2 text-sm text-white/30 cursor-pointer hover:text-white/60 transition-colors duration-200 select-none py-1">
          <Link2 className="w-3.5 h-3.5" />
          <span>Show deep link</span>
          <ChevronDown className="w-3.5 h-3.5 ml-auto transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <div className="mt-2 p-3 bg-white/[0.03] border border-white/[0.08] rounded-xl backdrop-blur-sm">
          <code className="text-[11px] text-white/50 break-all select-all font-mono leading-relaxed block">{upiLink}</code>
        </div>
      </details>
    </div>
  );
}
