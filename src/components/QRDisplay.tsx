'use client';

import { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, Share2, Check, ArrowLeft, Smartphone, Link2, ExternalLink } from 'lucide-react';
import { downloadQRCode, downloadSVG, copyToClipboard, shareUPILink } from '@/lib/utils';

interface QRDisplayProps {
  upiLink: string;
  upiId: string;
  onBack: () => void;
}

const DOWNLOAD_OPTIONS = [
  { id: 'png', label: 'PNG', icon: Download, action: (ref: SVGSVGElement | null, id: string) => downloadQRCode(ref, `upi-${id}`) },
  { id: 'svg', label: 'SVG', icon: Download, action: (ref: SVGSVGElement | null, id: string) => downloadSVG(ref, `upi-${id}`) },
] as const;

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
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Your QR Code</h2>
          <p className="text-sm text-gray-500">Works on all UPI apps — scan & pay</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
          <div className="relative bg-white p-5 rounded-2xl border border-gray-200 shadow-lg">
            <QRCodeSVG
              ref={qrRef}
              value={upiLink}
              size={220}
              level="M"
              includeMargin={true}
              bgColor="#ffffff"
              fgColor="#1e293b"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 px-3 py-1.5 bg-gray-100 rounded-full text-xs">
          <Smartphone className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-gray-600">Scan with any UPI app</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Download</p>
        <div className="grid grid-cols-2 gap-2">
          {DOWNLOAD_OPTIONS.map(({ id, label, icon: Icon, action }) => (
            <button
              key={id}
              onClick={() => action(qrRef.current, upiId)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-blue-700"
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Share</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-green-700"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-purple-700"
          >
            {shared ? <Check className="w-4 h-4 text-purple-500" /> : <Share2 className="w-4 h-4" />}
            {shared ? 'Shared!' : 'Share'}
          </button>
        </div>
      </div>

      <details className="group">
        <summary className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
          <Link2 className="w-3.5 h-3.5" />
          <span>Show deep link</span>
          <ExternalLink className="w-3 h-3 ml-auto transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-xl">
          <code className="text-xs text-gray-600 break-all select-all">{upiLink}</code>
        </div>
      </details>
    </div>
  );
}