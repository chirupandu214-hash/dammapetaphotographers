import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const { session, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        Loading secure session...
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (profile?.must_change_password) {
    return <Navigate to="/change-password" replace />;
  }

  if (adminOnly && profile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
