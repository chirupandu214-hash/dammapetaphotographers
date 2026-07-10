import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login() {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/dashboard", { replace: true });
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "80px auto",
        padding: 24,
        border: "1px solid #ddd",
        borderRadius: 10,
      }}
    >
      <h2>Dammapeta Photographers Portal</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginTop: 15,
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginTop: 10,
        }}
      />

      <button
        onClick={login}
        disabled={loading}
        style={{
          width: "100%",
          padding: 10,
          marginTop: 15,
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 15 }}>
          {error}
        </p>
      )}
    </div>
  );
}
