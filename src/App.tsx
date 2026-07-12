import { Routes, Route, Navigate } from "react-router-dom";

function Login() {
  return <h1>Login Page</h1>;
}

function AdminDashboard() {
  return <h1>Admin Dashboard</h1>;
}

function MemberDashboard() {
  return <h1>Member Dashboard</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/member" element={<MemberDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
