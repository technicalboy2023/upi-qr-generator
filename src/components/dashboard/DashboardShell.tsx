'use client';

import Sidebar from './Sidebar';
import Header from './Header';
import StatsCards from './StatsCards';
import ChartArea from './ChartArea';
import TransactionsTable from './TransactionsTable';

export default function DashboardShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950" />
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[60%] bg-gradient-to-br from-purple-600/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative flex">
        <Sidebar />
        <main className="flex-1 lg:ml-0 min-h-screen flex flex-col">
          <Header />
          <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
            <StatsCards />
            <ChartArea />
            <TransactionsTable />
          </div>
        </main>
      </div>
    </div>
  );
}
