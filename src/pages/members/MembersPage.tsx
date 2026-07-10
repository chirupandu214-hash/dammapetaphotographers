import { useEffect, useState } from "react";
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
    } catch (error) {
      console.error("Failed to load members:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <AppLayout>
      <h1>Members</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <MemberTable members={members} />
      )}
    </AppLayout>
  );
}
