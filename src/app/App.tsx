import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";

import MemberProfilePage from "@/pages/members/MemberProfilePage";
import BankTransactionsPage from "@/pages/bank/BankTransactionsPage";
import QRVerificationPage from "@/pages/qr/QRVerificationPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route 
          path="/" 
          element={<LoginPage />} 
        />

        <Route 
          path="/dashboard" 
          element={<DashboardPage />} 
        />

        <Route 
          path="/members/profile" 
          element={<MemberProfilePage />} 
        />

        <Route 
          path="/bank/transactions" 
          element={<BankTransactionsPage />} 
        />

        <Route 
          path="/qr-verification" 
          element={<QRVerificationPage />} 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
