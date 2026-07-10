import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import { AppLayout } from "@/components/layout/AppLayout";


// Pages

import DashboardPage from "@/pages/dashboard/DashboardPage";

import MembersPage from "@/pages/members/MembersPage";

import MemberProfilePage from "@/pages/members/MemberProfilePage";

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



// Authentication Pages

import LoginPage from "@/pages/auth/LoginPage";

import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";

import ChangePasswordPage from "@/pages/auth/ChangePasswordPage";




export default function App(){


return (


<BrowserRouter>


<Routes>



{/* Public Routes */}


<Route

path="/login"

element={<LoginPage />}

/>



<Route

path="/forgot-password"

element={<ForgotPasswordPage />}

/>



<Route

path="/change-password"

element={<ChangePasswordPage />}

/>





{/* Protected Application */}


<Route

element={<AppLayout />}

>



<Route

path="/"

element={
<Navigate
to="/dashboard"
replace
/>
}

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

path="/members/:id"

element={<MemberProfilePage />}

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




{/* 404 */}

<Route

path="*"

element={
<Navigate
to="/dashboard"
replace
/>
}

/>



</Routes>


</BrowserRouter>


);

}
