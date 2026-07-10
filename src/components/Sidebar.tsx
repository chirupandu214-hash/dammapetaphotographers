import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        background: "#222",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h3>Menu</h3>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/members">Members</Link>

        <Link to="/reports">Reports</Link>

        <Link to="/settings">Settings</Link>
      </nav>
    </aside>
  );
}
