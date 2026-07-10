import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AppLayout } from "@/components/layout/AppLayout";

import DashboardPage from "@/pages/dashboard/DashboardPage";
import MembersPage from "@/pages/members/MembersPage";
import PaymentsPage from "@/pages/payments/PaymentsPage";
import BankTransactionsPage from "@/pages/bank/BankTransactionsPage";
import QRVerificationPage from "@/pages/qr/QRVerificationPage";
import IDCardsPage from "@/pages/idcards/IDCardsPage";
import ReportsPage from "@/pages/reports/ReportsPage";
import EventsPage from "@/pages/events/EventsPage";
import NotificationsPage from "@/pages/notifications/NotificationsPage";
import DocumentsPage from "@/pages/documents/DocumentsPage";
import UsersPage from "@/pages/users/UsersPage";
import SettingsPage from "@/pages/settings/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AppLayout />}>

          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/members"
            element={<MembersPage />}
          />

          <Route
            path="/payments"
            element={<PaymentsPage />}
          />

          <Route
            path="/bank"
            element={<BankTransactionsPage />}
          />

          <Route
            path="/qr"
            element={<QRVerificationPage />}
          />

          <Route
            path="/idcards"
            element={<IDCardsPage />}
          />

          <Route
            path="/reports"
            element={<ReportsPage />}
          />

          <Route
            path="/events"
            element={<EventsPage />}
          />

          <Route
            path="/notifications"
            element={<NotificationsPage />}
          />

          <Route
            path="/documents"
            element={<DocumentsPage />}
          />

          <Route
            path="/users"
            element={<UsersPage />}
          />

          <Route
            path="/settings"
            element={<SettingsPage />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
