import { useNavigate } from "react-router-dom";
import { logout } from "@/lib/auth";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header
      style={{
        height: 60,
        background: "#1976d2",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <h2>Dammapeta Photographers</h2>

      <button
        onClick={handleLogout}
        style={{
          padding: "8px 16px",
        }}
      >
        Logout
      </button>
    </header>
  );
}
