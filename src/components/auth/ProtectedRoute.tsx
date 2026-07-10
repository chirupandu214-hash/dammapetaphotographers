import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {

  const { user, profile } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }


  if (adminOnly && profile?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }


  return <>{children}</>;
}
