import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/dashboard/Dashboard';
import { MemberRegistration } from './pages/members/MemberRegistration';
import { Login } from './pages/auth/Login'; // కొత్త లాగిన్ పేజీ లింక్ చేశాం!

// యూజర్ లాగిన్ అయి ఉంటేనే డాష్‌బోర్డ్ చూపించడానికి సెక్యూరిటీ గార్డ్
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="h-screen bg-slate-900 flex items-center justify-center text-white">
        Loading DPA Portal...
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* పబ్లిక్ రూట్: ఎవరైనా చూడగలిగే లాగిన్ పేజీ */}
        <Route path="/login" element={<Login />} />
        
        {/* ప్రొటెక్టెడ్ రూట్స్: లాగిన్ అయిన తర్వాత మాత్రమే వెళ్లగలిగే పేజీలు */}
        <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<MemberRegistration />} />
        </Route>
        
        {/* తప్పు లింక్ కొడితే లాగిన్ పేజీకి పంపించే రూట్ */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
