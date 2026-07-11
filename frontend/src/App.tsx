import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { RegisterMember } from './pages/RegisterMember';

const DashboardMock: React.FC = () => (
  <div className="p-6 bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
    <h1 className="text-2xl font-bold tracking-tight">Operational Command Dashboard</h1>
    <p className="text-slate-500 text-sm mt-1">Dhammapeta Photographers Association System Infrastructure Metrics.</p>
  </div>
);

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardLayout><DashboardMock /></DashboardLayout>} />
          <Route path="/members" element={<DashboardLayout><RegisterMember /></DashboardLayout>} />
          <Route path="*" element={<div className="p-8 text-center font-bold">404: Route Context Out of Scope</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
