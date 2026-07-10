import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");

  const login = () => {
    // Demo Login
    if (
      role === "admin" &&
      username === "admin" &&
      password === "admin123"
    ) {
      navigate("/admin/dashboard");
      return;
    }

    if (
      role === "member" &&
      username === "member" &&
      password === "123456"
    ) {
      navigate("/member/dashboard");
      return;
    }

    alert("Invalid Username or Password");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: 380,
          background: "#fff",
          padding: 30,
          borderRadius: 10,
          boxShadow: "0 0 10px #ccc",
        }}
      >
        <h2 align="center">📸 Dammapeta Photographers Portal</h2>

        <input
          placeholder="Username"
          style={{ width: "100%", padding: 10, marginTop: 20 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", padding: 10, marginTop: 10 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          style={{ width: "100%", padding: 10, marginTop: 10 }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 20,
            background: "#2563eb",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: 6,
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
