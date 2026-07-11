import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/dashboard/Dashboard';
import { MembersPage } from './pages/MembersPage';

// ప్రొటెక్టెడ్ రౌట్ - లాగిన్ అవ్వని యూజర్లను '/login' కి పంపిస్తుంది
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { session, loading } = useAuth();
  
  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-slate-950 text-white">Loading...</div>;
  }
  
  return session ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* పబ్లిక్ రౌట్స్ */}
          <Route path="/login" element={<LoginPage />} />

          {/* ప్రొటెక్టెడ్ రౌట్స్ (డ్యాష్‌బోర్డ్ లేఅవుట్ తో) */}
          <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<MembersPage />} />
            {/* భవిష్యత్తులో ఇక్కడ మరిన్ని పేజీలు యాడ్ చేయవచ్చు (funds, loans, etc.) */}
          </Route>

          {/* అడ్రస్ తప్పుగా ఇస్తే డ్యాష్‌బోర్డ్ కి రీడైరెక్ట్ చేయండి */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
