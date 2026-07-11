import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/dashboard/Dashboard';
import { MembersPage } from './pages/MembersPage';

// ప్రొటెక్టెడ్ రౌట్: లాగిన్ అయిన వారికి మాత్రమే పేజీలను చూపిస్తుంది
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { session, loading } = useAuth();
  
  if (loading) {
    // యాప్ లోడ్ అవుతున్నప్పుడు కనిపించే UI
    return <div className="h-screen flex items-center justify-center bg-slate-950 text-white">Loading...</div>;
  }
  
  return session ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* పబ్లిక్ రౌట్స్ */}
          <Route path="/login" element={<LoginPage />} />

          {/* ప్రొటెక్టెడ్ రౌట్స్ (DashboardLayout తో కలిపి) */}
          <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<MembersPage />} />
          </Route>

          {/* తప్పు URL టైప్ చేస్తే లాగిన్ పేజీకి పంపడం */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
