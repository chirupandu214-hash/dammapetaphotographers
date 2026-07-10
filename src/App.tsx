import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import MyProfilePage from "@/pages/members/MyProfilePage";
import QRVerificationPage from "@/pages/qr/QRVerificationPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<MyProfilePage />} />
        <Route path="/qr" element={<QRVerificationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
