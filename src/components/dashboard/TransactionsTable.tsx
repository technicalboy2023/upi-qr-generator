'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, XCircle, Inbox, Plus } from 'lucide-react';

type TransactionStatus = 'completed' | 'pending' | 'failed';

interface Transaction {
  id: string;
  user: string;
  amount: string;
  status: TransactionStatus;
  type: 'incoming' | 'outgoing';
  time: string;
}

const transactions: Transaction[] = [
  { id: 'TXN-001', user: 'Rahul Sharma', amount: '₹2,500', status: 'completed', type: 'incoming', time: '2 min ago' },
  { id: 'TXN-002', user: 'Priya Patel', amount: '₹850', status: 'completed', type: 'incoming', time: '15 min ago' },
  { id: 'TXN-003', user: 'Amit Kumar', amount: '₹12,000', status: 'pending', type: 'incoming', time: '32 min ago' },
  { id: 'TXN-004', user: 'Sneha Gupta', amount: '₹450', status: 'failed', type: 'outgoing', time: '1 hr ago' },
  { id: 'TXN-005', user: 'Vikram Singh', amount: '₹5,200', status: 'completed', type: 'incoming', time: '2 hr ago' },
  { id: 'TXN-006', user: 'Neha Reddy', amount: '₹3,100', status: 'completed', type: 'incoming', time: '3 hr ago' },
];

const statusConfig = {
  completed: { icon: CheckCircle2, label: 'Completed', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  pending: { icon: Clock, label: 'Pending', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  failed: { icon: XCircle, label: 'Failed', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
};

export default function TransactionsTable() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const data: Transaction[] = loading ? [] : transactions;

  return (
    <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
          <p className="text-sm text-white/50">Latest payment activity</p>
        </div>
        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium">
          View All
        </button>
      </div>

      {loading && (
        <div className="space-y-3 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="h-4 w-24 rounded bg-white/5" />
              <div className="h-4 w-32 rounded bg-white/5" />
              <div className="h-4 w-20 rounded bg-white/5" />
              <div className="h-4 w-24 rounded bg-white/5" />
              <div className="h-4 w-16 rounded bg-white/5" />
            </div>
          ))}
        </div>
      )}

      {!loading && data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <Inbox className="w-7 h-7 text-white/40" />
          </div>
          <h4 className="text-base font-semibold text-white mb-1">No transactions yet</h4>
          <p className="text-sm text-white/50 max-w-xs mb-4">
            When you start receiving payments, they will appear here.
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            Create New
          </button>
        </div>
      )}

      {!loading && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-medium text-white/40 uppercase tracking-wider py-3 px-2">ID</th>
                <th className="text-left text-xs font-medium text-white/40 uppercase tracking-wider py-3 px-2">User</th>
                <th className="text-left text-xs font-medium text-white/40 uppercase tracking-wider py-3 px-2">Amount</th>
                <th className="text-left text-xs font-medium text-white/40 uppercase tracking-wider py-3 px-2">Status</th>
                <th className="text-left text-xs font-medium text-white/40 uppercase tracking-wider py-3 px-2">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.map((txn) => {
                const status = statusConfig[txn.status];
                const StatusIcon = status.icon;
                return (
                  <tr key={txn.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-2 text-sm text-white/70 font-mono">{txn.id}</td>
                    <td className="py-3 px-2 text-sm text-white font-medium">{txn.user}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1.5">
                        {txn.type === 'incoming' ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-400" />
                        )}
                        <span className={`text-sm font-semibold ${txn.type === 'incoming' ? 'text-emerald-400' : 'text-red-400'}`}>
                          {txn.amount}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.bg} ${status.text} ${status.border}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm text-white/50">{txn.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
