import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/dashboard/Dashboard';
import { MembersPage } from './pages/MembersPage';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { session, loading } = useAuth();
  if (loading) return <div className="text-white">Loading...</div>;
  return session ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Routes>
  {/* రూట్ పాత్ లోకి రాగానే లాగిన్ కి పంపేలా */}
  <Route path="/" element={<Navigate to="/login" replace />} />
  <Route path="/login" element={<LoginPage />} />
  
  {/* మిగిలిన ప్రొటెక్టెడ్ రౌట్స్ */}
  <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/members" element={<MembersPage />} />
  </Route>
</Routes>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
