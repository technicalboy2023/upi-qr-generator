import type { Metadata } from 'next';
import DashboardShell from '@/components/dashboard/DashboardShell';

export const metadata: Metadata = {
  title: 'Dashboard — Analytics & Overview',
  description: 'View analytics, recent transactions, and performance metrics for your UPI QR codes.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return <DashboardShell />;
}
