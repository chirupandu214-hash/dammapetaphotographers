import React from 'react';
import { HiOutlineUsers, HiOutlineCurrencyRupee, HiOutlineCreditCard, HiOutlineDocumentReport } from 'react-icons/hi';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Chart.js సెటప్
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Dashboard = () => {
  // స్టాటిస్టిక్స్ డేటా (దీనిని మీరు సుపాబేస్ నుండి ఫెచ్ చేయాలి)
  const stats = [
    { title: 'Total Members', value: '150', icon: HiOutlineUsers, color: 'text-blue-400' },
    { title: 'Monthly Collection', value: '₹ 45,000', icon: HiOutlineCurrencyRupee, color: 'text-green-400' },
    { title: 'Active Loans', value: '12', icon: HiOutlineCreditCard, color: 'text-amber-400' },
    { title: 'Pending Funds', value: '₹ 12,500', icon: HiOutlineDocumentReport, color: 'text-red-400' },
  ];

  // చార్ట్ డేటా
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Collections (₹)',
      data: [12000, 19000, 3000, 5000, 20000, 30000],
      backgroundColor: 'rgba(245, 158, 11, 0.5)', // Amber color
    }]
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1 text-white">{stat.value}</h3>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Collection Trends</h3>
          <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' as const } } }} />
        </div>
        
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Loan Distribution</h3>
          {/* ఇక్కడ మీరు మరొక చార్ట్ (Pie/Doughnut) యాడ్ చేయవచ్చు */}
          <div className="h-64 flex items-center justify-center text-slate-500">
             Loan distribution chart coming soon
          </div>
        </div>
      </div>
    </div>
  );
};
