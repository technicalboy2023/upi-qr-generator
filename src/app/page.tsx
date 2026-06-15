import type { Metadata } from 'next';
import { BASE_URL } from '@/lib/constants';
import UPIGenerator from '@/components/UPIGenerator';

export const metadata: Metadata = {
  title: 'UPI QR Code Generator - Free, Instant, Works on All UPI Apps',
  description:
    'Generate UPI QR codes instantly from any UPI ID. Add amount and note. Works on GPay, PhonePe, Paytm, BHIM, and all UPI apps. 100% client-side, no data stored.',
  keywords: [
    'UPI QR code',
    'UPI payment QR',
    'QR code generator India',
    'GPay QR code',
    'PhonePe QR code',
    'Paytm QR code',
    'BHIM QR code',
    'NPCI UPI',
    'India payments',
    'UPI ID QR',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'UPI QR Code Generator',
    title: 'UPI QR Code Generator - Free, Instant, Works on All UPI Apps',
    description:
      'Generate UPI QR codes instantly from any UPI ID. Add amount and note. Works on GPay, PhonePe, Paytm, BHIM, and all UPI apps.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'UPI QR Code Generator - Create QR codes for any UPI ID instantly',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UPI QR Code Generator - Free, Instant, Works on All UPI Apps',
    description:
      'Generate UPI QR codes instantly from any UPI ID. 100% client-side, private, and free.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  category: 'finance',
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'UPI QR Code Generator',
    description:
      'Generate UPI QR codes instantly from any UPI ID. Add amount and note. Works on GPay, PhonePe, Paytm, BHIM, and all UPI apps.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    featureList: [
      'No data stored - 100% client-side',
      'Instant QR code generation',
      'Works on GPay, PhonePe, Paytm, BHIM',
      'Add amount and note to QR code',
      'Download PNG and SVG',
    ],
    url: BASE_URL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <UPIGenerator />
    </>
  );
}
