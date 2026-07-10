import { useNavigate } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import MemberForm from "@/components/members/MemberForm";

export default function AddMemberPage() {
  const navigate = useNavigate();

  function handleSaved() {
  navigate("/members", { replace: true });
}

  return (
    <AppLayout>
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,.1)",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
          }}
        >
          Add New Member
        </h1>

        <MemberForm onSaved={handleSaved} />
      </div>
    </AppLayout>
  );
}
