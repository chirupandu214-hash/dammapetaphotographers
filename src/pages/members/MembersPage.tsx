import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import MemberTable from "@/components/members/MemberTable";
import { getMembers } from "@/services/memberService";

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadMembers() {
    try {
      const data = await getMembers();
      setMembers(data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load members");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <AppLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1>Members</h1>

        <Link to="/members/add">
          <button
            style={{
              padding: "10px 18px",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
            }}
          >
            + Add Member
          </button>
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <MemberTable members={members} />
      )}
    </AppLayout>
  );
}
