import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";

import MemberProfilePage from "@/pages/members/MemberProfilePage";
import BankTransactionsPage from "@/pages/bank/BankTransactionsPage";
import QRVerificationPage from "@/pages/qr/QRVerificationPage";


function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<LoginPage />}
        />


        {/* Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />


        {/* Members */}
        <Route
          path="/members/profile"
          element={
            <ProtectedRoute>
              <MemberProfilePage />
            </ProtectedRoute>
          }
        />


        {/* Bank */}
        <Route
          path="/bank/transactions"
          element={
            <ProtectedRoute>
              <BankTransactionsPage />
            </ProtectedRoute>
          }
        />


        {/* QR Verification */}
        <Route
          path="/qr-verification"
          element={
            <ProtectedRoute>
              <QRVerificationPage />
            </ProtectedRoute>
          }
        />


        {/* Wrong URL */}
        <Route
          path="*"
          element={
            <Navigate to="/" replace />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}
