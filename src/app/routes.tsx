import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";

import MembersPage from "@/pages/members/MembersPage";
import AddMemberPage from "@/pages/members/AddMemberPage";
import EditMemberPage from "@/pages/members/EditMemberPage";
import MemberProfilePage from "@/pages/members/MemberProfilePage";

import ReportsPage from "@/pages/reports/ReportsPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import FundPage from "@/pages/fund/FundPage";
import BankTransactionsPage from "@/pages/bank/BankTransactionsPage";
import QRVerificationPage from "@/pages/qr/QRVerificationPage";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<LoginPage />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Members */}
      <Route
        path="/members"
        element={
          <ProtectedRoute>
            <MembersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/members/add"
        element={
          <ProtectedRoute>
            <AddMemberPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/members/edit/:id"
        element={
          <ProtectedRoute>
            <EditMemberPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/members/profile/:id"
        element={
          <ProtectedRoute>
            <MemberProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Fund */}
      <Route
        path="/fund"
        element={
          <ProtectedRoute>
            <FundPage />
          </ProtectedRoute>
        }
      />

      {/* Bank */}
      <Route
        path="/bank"
        element={
          <ProtectedRoute>
            <BankTransactionsPage />
          </ProtectedRoute>
        }
      />

      {/* Reports */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        }
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      {/* QR Verification */}
      <Route
        path="/verify/:memberId"
        element={<QRVerificationPage />}
      />

      {/* Default */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
