import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { HiOutlineUsers, HiOutlineCurrencyRupee, HiOutlineCreditCard, HiOutlineShieldCheck } from 'react-icons/hi';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export const Dashboard: React.FC = () => {
  // తాత్కాలిక డమ్మీ డేటా (బ్యాక్ఎండ్ కనెక్ట్ అయ్యే వరకు)
  const stats = {
    totalMembers: 124,
    totalFund: '8,50,000',
    activeLoansAmount: '3,20,000',
    welfareMembers: 98
  };

  const kpiCards = [
    { title: 'Total Members', value: stats.totalMembers, icon: HiOutlineUsers, color: 'from-blue-500 to-cyan-500' },
    { title: 'Yearly Fund', value: `₹${stats.totalFund}`, icon: HiOutlineCurrencyRupee, color: 'from-emerald-500 to-teal-500' },
    { title: 'Active Loans', value: `₹${stats.activeLoansAmount}`, icon: HiOutlineCreditCard, color: 'from-amber-500 to-orange-500' },
    { title: 'Kutumbha Bharosha', value: stats.welfareMembers, icon: HiOutlineShieldCheck, color: 'from-purple-500 to-indigo-500' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-sm text-slate-400 mt-1">Welcome to Dammapeta Photographers Association Portal.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card, index) => (
          <div key={index} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex justify-between items-center">
            <div>
              <p className="text-xs font-medium uppercase text-slate-400">{card.title}</p>
              <p className="text-2xl font-extrabold text-white mt-2">{card.value}</p>
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-tr ${card.color} text-white shadow-lg`}>
              <card.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-950 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-base font-semibold text-white mb-4">Collection Overview</h3>
          <div className="h-64 flex items-center justify-center text-slate-500">
            {/* Chart will go here once backend is ready */}
            [Bar Chart Placeholder]
          </div>
        </div>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-base font-semibold text-white mb-4">Loan Status</h3>
          <div className="h-64 flex items-center justify-center text-slate-500">
            {/* Chart will go here once backend is ready */}
            [Doughnut Chart Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
};
