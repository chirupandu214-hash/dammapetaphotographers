import {
  getMembers,
  deleteMember,
} from "@/services/memberService";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import <MemberTable
  members={filteredMembers}
  onDelete={handleDelete}
/>
import { getMembers } from "@/services/memberService";

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadMembers() {
    try {
      const data = await getMembers();
      setMembers(data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load members");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);
  async function handleDelete(id: number) {
  try {
    await deleteMember(id);

    await loadMembers();

    alert("Member deleted successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to delete member.");
  }
}

  const filteredMembers = useMemo(() => {
    const keyword = search.toLowerCase();

    return members.filter((member) => {
      return (
        member.member_id?.toLowerCase().includes(keyword) ||
        member.full_name?.toLowerCase().includes(keyword) ||
        member.mobile?.includes(keyword) ||
        member.studio_name?.toLowerCase().includes(keyword)
      );
    });
  }, [members, search]);

  return (
    <AppLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h1>Members</h1>

        <Link to="/members/add">
          <button>+ Add Member</button>
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search by Member ID, Name, Mobile, Studio..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 20,
        }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <MemberTable members={filteredMembers} />
      )}
    </AppLayout>
  );
}
