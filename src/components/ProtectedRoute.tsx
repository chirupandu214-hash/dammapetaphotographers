import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "@/lib/auth";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  if (!isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
