'use client';

import { useState } from 'react';
import UPIForm from '@/components/UPIForm';
import QRDisplay from '@/components/QRDisplay';
import { buildUPILink } from '@/lib/upi';
import { UPIFormData } from '@/types/upi';
import { QrCode, ShieldCheck, Zap, Smartphone, Sparkles, ExternalLink } from 'lucide-react';

const features = [
  { icon: ShieldCheck, label: 'No Data Stored', desc: '100% client-side, nothing leaves your browser' },
  { icon: Zap, label: 'Instant', desc: 'Generates in milliseconds with no server' },
  { icon: Smartphone, label: 'Universal', desc: 'Works on GPay, PhonePe, Paytm, BHIM' },
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
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-1 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[100px] animate-float-delayed" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative">
        {/* Header */}
        <header className="border-b border-white/[0.06] backdrop-blur-md bg-[#0a0a0f]/50 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl blur-md opacity-60" />
                  <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-white/10 backdrop-blur-sm">
                    <QrCode className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-white tracking-tight">UPI</span>
                  <span className="text-lg font-light text-white/50 tracking-tight">QR</span>
                </div>
              </div>
              <a
                href="/dashboard/"
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-all duration-300 px-3 py-1.5 rounded-lg hover:bg-white/[0.05]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dashboard</span>
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-16 sm:pt-24 pb-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm text-white/50 text-xs font-medium mb-6 hover:bg-white/[0.06] transition-colors cursor-default">
                <Sparkles className="w-3 h-3 text-violet-400" />
                Free & Open Source
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight mb-5 leading-[1.1]">
                Generate UPI QR{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300">
                  Instantly
                </span>
              </h1>
              <p className="text-base sm:text-lg text-white/40 max-w-lg mx-auto leading-relaxed">
                Turn any UPI ID into a beautiful, scannable QR code. Add amount and note. Works on every UPI app.
              </p>
            </div>

            {/* Main Card */}
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-cyan-400/20 rounded-3xl blur-2xl opacity-50" />

                <div className="relative bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    {/* Form Side */}
                    <div className={`p-6 sm:p-8 ${showQR ? 'hidden md:block' : ''}`}>
                      <div className="animate-fade-in">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center border border-white/[0.08]">
                            <Sparkles className="w-5 h-5 text-violet-400" />
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-white">Enter Details</h2>
                            <p className="text-sm text-white/30">Fill in to generate your QR code</p>
                          </div>
                        </div>
                        <UPIForm onGenerate={handleGenerate} />
                      </div>
                    </div>

                    {/* QR Side */}
                    <div className={`bg-white/[0.02] p-6 sm:p-8 flex items-center justify-center min-h-[500px] border-l border-white/[0.06] ${!showQR ? 'hidden md:flex' : ''}`}>
                      {showQR ? (
                        <div className="w-full max-w-sm animate-scale-in">
                          <QRDisplay upiLink={upiLink} upiId={upiId} onBack={handleBack} />
                        </div>
                      ) : (
                        <div className="text-center animate-fade-in">
                          <div className="relative mx-auto mb-6 w-24 h-24">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-blue-500/20 rounded-2xl blur-lg animate-glow-pulse" />
                            <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-white/[0.08] backdrop-blur-sm">
                              <QrCode className="w-10 h-10 text-white/20" />
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-white/60 mb-2">QR Preview</h3>
                          <p className="text-sm text-white/30 max-w-xs mx-auto mb-6">
                            Your QR code will appear here once you submit the form
                          </p>
                          <div className="flex items-center justify-center gap-2 text-xs text-white/20">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
                            </span>
                            Waiting for input
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-white/[0.08] mb-4 group-hover:scale-110 group-hover:from-violet-500/20 group-hover:to-blue-500/20 transition-all duration-500">
                      <feature.icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <h3 className="font-semibold text-white/80 mb-1 text-sm">{feature.label}</h3>
                    <p className="text-sm text-white/30 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20">
              Built with Next.js · Following NPCI UPI Linking Spec
            </p>
            <p className="text-xs text-white/20">
              No data stored — everything runs in your browser
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
