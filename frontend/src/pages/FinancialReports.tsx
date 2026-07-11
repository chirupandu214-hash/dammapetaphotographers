import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import api from '../services/api';

export const FinancialReports: React.FC = () => {
  const [reportType, setReportType] = useState<'FUNDS' | 'LOANS'>('FUNDS');

  const { data: reportData, isLoading } = useQuery({
    queryKey: ['financialReportRegistry', reportType],
    queryFn: async () => {
      const res = await api.get(`/reports/financial?type=${reportType}`);
      return res.data.data;
    }
  });

  const triggerDocumentDownload = (format: 'PDF' | 'EXCEL') => {
    // Structural target pointer execution sequence for streaming document buffers
    window.open(`${import.meta.env.VITE_API_BASE_URL}/reports/export?type=${reportType}&format=${format}&token=${localStorage.getItem('token')}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Association Financial Reports Engine</h1>
          <p className="text-sm text-slate-500">Generate, evaluate, and audit certified programmatic ledgers.</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => triggerDocumentDownload('PDF')}
            className="flex items-center space-x-2 px-3 py-2 text-xs font-semibold bg-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 rounded-lg shadow-sm"
          >
            <FileText size={14} className="text-rose-500" />
            <span>Export Certified PDF</span>
          </button>
          <button 
            onClick={() => triggerDocumentDownload('EXCEL')}
            className="flex items-center space-x-2 px-3 py-2 text-xs font-semibold bg-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 rounded-lg shadow-sm"
          >
            <FileSpreadsheet size={14} className="text-emerald-500" />
            <span>Export Excel Sheet</span>
          </button>
        </div>
      </div>

      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => setReportType('FUNDS')}
          className={`px-4 py-2.5 font-medium text-sm border-b-2 transition-colors ${reportType === 'FUNDS' ? 'border-amber-500 text-amber-500' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Yearly Fund Collections Ledger
        </button>
        <button 
          onClick={() => setReportType('LOANS')}
          className={`px-4 py-2.5 font-medium text-sm border-b-2 transition-colors ${reportType === 'LOANS' ? 'border-amber-500 text-amber-500' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Distributed Credit & Loan Matrices
        </button>
      </div>

      {isLoading ? (
        <div className="p-12 text-center animate-pulse text-slate-400">Compiling tabular data aggregates...</div>
      ) : (
        <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <th className="p-4">Reference Code</th>
                  <th className="p-4">Identity Matrix</th>
                  <th className="p-4">Execution Date</th>
                  <th className="p-4">Quantum Aggregate</th>
                  <th className="p-4">Transactional Engine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                {reportData?.map((row: any) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="p-4 font-mono text-xs font-bold text-amber-500">{row.receipt_code || row.loan_code}</td>
                    <td className="p-4 font-medium">{row.member_name || `Member ID Reference: ${row.member_id}`}</td>
                    <td className="p-4 text-slate-500">{new Date(row.collection_date || row.loan_date).toLocaleDateString()}</td>
                    <td className="p-4 font-semibold">₹{(row.amount_paid || row.loan_amount).toLocaleString()}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300">
                        {row.payment_mode || row.loan_status}
                      </span>
                    </td>
                  </tr>
                ))}
                {(!reportData || reportData.length === 0) && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">No synchronized data rows exist for the active criteria context.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
