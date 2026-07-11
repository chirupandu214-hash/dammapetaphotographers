// client/src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRole }: { children: JSX.Element, allowedRole?: string }) => {
  const { session, role } = useAuth();

  if (!session) return <Navigate to="/login" />;
  
  // రోల్ చెక్
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/unauthorized" />; 
  }

  return children;
};
