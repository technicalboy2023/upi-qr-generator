'use client';

import { useState } from 'react';
import UPIForm from '@/components/UPIForm';
import QRDisplay from '@/components/QRDisplay';
import { buildUPILink } from '@/lib/upi';
import { UPIFormData } from '@/types/upi';
import { QrCode, ShieldCheck, Zap, Smartphone, Sparkles, ExternalLink } from 'lucide-react';

const features = [
  { icon: ShieldCheck, label: 'No Data Stored', desc: '100% client-side, private' },
  { icon: Zap, label: 'Instant', desc: 'Generates in milliseconds' },
  { icon: Smartphone, label: 'Works Everywhere', desc: 'GPay, PhonePe, Paytm, BHIM' },
];

export default function UPIGenerator() {
  const [upiLink, setUpiLink] = useState('');
  const [upiId, setUpiId] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleGenerate = (data: UPIFormData) => {
    const link = buildUPILink({
      upiId: data.upiId,
      amount: data.amount ? Number(data.amount) : undefined,
      note: data.note || undefined,
    });
    setUpiLink(link);
    setUpiId(data.upiId);
    setShowQR(true);
  };

  const handleBack = () => setShowQR(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[60%] bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl" />

        <div className="relative">
          <header className="border-b border-white/10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm">
                    <QrCode className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-white">UPI<span className="font-light">QR</span></span>
                </div>
                <a
                  href="/dashboard/"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </a>
              </div>
            </div>
          </header>

          <section className="py-16 sm:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12 animate-slide-up">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-xs font-medium mb-4">
                  <Sparkles className="w-3 h-3" />
                  Free & Open Source
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
                  Generate UPI QR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">Instantly</span>
                </h1>
                <p className="text-lg text-white/70 max-w-lg mx-auto">
                  Turn any UPI ID into a scannable QR code. Add amount & note. Works on every UPI app.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className={`p-6 sm:p-8 transition-opacity duration-500 ${showQR ? 'hidden md:block' : ''}`}>
                      {!showQR ? (
                        <div className="animate-fade-in">
                          <h2 className="text-xl font-semibold text-gray-900 mb-1">Enter Details</h2>
                          <p className="text-sm text-gray-500 mb-6">Fill in your UPI details to generate a QR code</p>
                          <UPIForm onGenerate={handleGenerate} />
                        </div>
                      ) : (
                        <div className="hidden md:block animate-fade-in">
                          <UPIForm onGenerate={handleGenerate} />
                        </div>
                      )}
                    </div>
                    <div className={`bg-gray-50 p-6 sm:p-8 flex items-center justify-center min-h-[400px] ${!showQR ? 'hidden md:flex' : ''}`}>
                      {showQR ? (
                        <div className="w-full max-w-sm animate-scale-in">
                          <QRDisplay upiLink={upiLink} upiId={upiId} onBack={handleBack} />
                        </div>
                      ) : (
                        <div className="text-center animate-fade-in">
                          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                            <QrCode className="w-10 h-10 text-blue-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">QR Preview</h3>
                          <p className="text-sm text-gray-500 max-w-xs">
                            Your QR code will appear here once you submit the form
                          </p>
                          <div className="flex items-center justify-center gap-1 mt-4 text-xs text-gray-400">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse-soft" />
                            Waiting for input
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="py-16 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {features.map((feature, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 mb-3">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.label}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Built with Next.js · Following NPCI UPI Linking Spec v1.7
          </p>
          <p className="text-sm text-gray-400">
            No data stored — everything runs in your browser
          </p>
        </div>
      </footer>
    </div>
  );
}
