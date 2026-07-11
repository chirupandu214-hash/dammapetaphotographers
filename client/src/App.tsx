import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/dashboard/Dashboard';
import { MembersPage } from './pages/MembersPage';

// లాగిన్ అయ్యి ఉన్నారో లేదో చెక్ చేసే ప్రొటెక్టెడ్ రౌట్
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { session, loading } = useAuth();
  
  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-slate-950 text-white">Loading...</div>;
  }
  
  return session ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* రూట్ పాత్ లోకి రాగానే లాగిన్ పేజీకి పంపడం */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />

          {/* డ్యాష్‌బోర్డ్ లేఅవుట్ తో ఉన్న ప్రొటెక్టెడ్ రౌట్స్ */}
          <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<MembersPage />} />
          </Route>

          {/* ఏవైనా తప్పు URLలు వస్తే తిరిగి లాగిన్ లేదా డ్యాష్‌బోర్డ్ కి పంపడం */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
