import MemberProfilePage from "@/pages/members/MemberProfilePage";
import QRVerificationPagefrom "@/pages/qr/QRVerificationPage";
import EditMemberPage from "@/pages/members/EditMemberPage";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import MembersPage from "@/pages/members/MembersPage";
import AddMemberPage from "@/pages/members/AddMemberPage";
import ReportsPage from "@/pages/reports/ReportsPage";
import SettingsPage from "@/pages/settings/SettingsPage";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
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
/><Route
path="/members/profile/:id"
element={
<ProtectedRoute>
<MemberProfilePage/>
</ProtectedRoute>
}
/>


<Route
path="/verify/:memberId"
element={
<QRVerificationPage/>
}
/>
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
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
