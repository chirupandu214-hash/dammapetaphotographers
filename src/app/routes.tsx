import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import MembersPage from "@/pages/members/MembersPage";
import ReportsPage from "@/pages/reports/ReportsPage";
import SettingsPage from "@/pages/settings/SettingsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />

      <Route path="/members" element={<MembersPage />} />

      <Route path="/reports" element={<ReportsPage />} />

      <Route path="/settings" element={<SettingsPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
