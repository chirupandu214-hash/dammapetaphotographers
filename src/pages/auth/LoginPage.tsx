import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (login(username, password)) {
      navigate("/dashboard");
    } else {
      alert("Invalid Username or Password");
    }
  }

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: 320,
          padding: 30,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,.15)",
        }}
      >
        <h2>Admin Login</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", marginTop: 15 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginTop: 15 }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            marginTop: 20,
            padding: 12,
          }}
        >
          Login
        </button>

        <p style={{ marginTop: 20 }}>
          Default Login:<br />
          <strong>admin</strong><br />
          <strong>admin123</strong>
        </p>
      </div>
    </div>
  );
}
