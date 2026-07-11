import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Wallet, CreditCard } from 'lucide-react';
import api from '../services/api';

export const DashboardAnalytics: React.FC = () => {
  // Parallel asynchronous fetching across global microservice layers
  const { data: analyticsRes, isLoading } = useQuery({
    queryKey: ['dashboardMetrics'],
    queryFn: async () => {
      const res = await api.get('/dashboard/analytics');
      return res.data;
    }
  });

  const mockChartData = [
    { name: 'Apr', collections: 45000, loans: 20000 },
    { name: 'May', collections: 52000, loans: 35000 },
    { name: 'Jun', collections: 61000, loans: 15000 },
    { name: 'Jul', collections: 68000, loans: 50000 },
  ];

  if (isLoading) return <div className="p-8 text-center animate-pulse">Synchronizing performance charts...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Metrics Dashboard</h1>
        <p className="text-slate-500 text-sm">Real-time financial status tracking matrix for Dhammapeta Photographers Association.</p>
      </div>

      {/* KPI Structural Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Association Members</p>
            <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">742</h3>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500"><Users size={22} /></div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gross Year Collections</p>
            <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">₹2,84,500</h3>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500"><Wallet size={22} /></div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Loan Ledger Outlay</p>
            <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">₹1,50,000</h3>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500"><CreditCard size={22} /></div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kutumbha Bharosha Pool</p>
            <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">589</h3>
          </div>
          <div className="p-3 rounded-lg bg-rose-500/10 text-rose-500"><TrendingUp size={22} /></div>
        </div>
      </div>

      {/* Graphical Data Infrastructure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
          <h4 className="text-sm font-bold tracking-tight mb-4">Financial Year Cash Collections Flow</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" fontSize={11} tickLine={false} />
                <YAxis fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="collections" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
          <h4 className="text-sm font-bold tracking-tight mb-4">Loan Distribution Amortization Statistics</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" fontSize={11} tickLine={false} />
                <YAxis fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="loans" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
