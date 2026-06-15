'use client';

import { TrendingUp, TrendingDown, DollarSign, Users, QrCode, CreditCard } from 'lucide-react';

const stats = [
  {
    label: 'Total Payments',
    value: '₹1,24,580',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    gradient: 'from-blue-500/20 to-blue-600/10',
    iconColor: 'text-blue-400',
  },
  {
    label: 'QR Scans',
    value: '3,842',
    change: '+8.2%',
    trend: 'up',
    icon: QrCode,
    gradient: 'from-purple-500/20 to-purple-600/10',
    iconColor: 'text-purple-400',
  },
  {
    label: 'Active Users',
    value: '1,205',
    change: '-2.1%',
    trend: 'down',
    icon: Users,
    gradient: 'from-emerald-500/20 to-emerald-600/10',
    iconColor: 'text-emerald-400',
  },
  {
    label: 'Transactions',
    value: '892',
    change: '+5.7%',
    trend: 'up',
    icon: CreditCard,
    gradient: 'from-amber-500/20 to-amber-600/10',
    iconColor: 'text-amber-400',
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`relative group p-5 rounded-2xl bg-gradient-to-br ${stat.gradient} backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-xl bg-white/10 ${stat.iconColor}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                stat.trend === 'up'
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-red-500/10 text-red-400'
              }`}
            >
              {stat.trend === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {stat.change}
            </div>
          </div>
          <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
          <p className="text-sm text-white/50 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
