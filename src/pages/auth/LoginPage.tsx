import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Dammapeta Photographers Portal</h1>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: 20,
          padding: "12px 30px",
        }}
      >
        Login
      </button>
    </div>
  );
}
