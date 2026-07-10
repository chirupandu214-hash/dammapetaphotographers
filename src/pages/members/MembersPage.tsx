import { useEffect, useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import MemberTable from "@/components/members/MemberTable";
import MemberForm from "@/components/members/MemberForm";

import {
  getMembers,
  deleteMember,
} from "@/services/memberService";

import { exportExcel } from "@/services/exportService";

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadMembers() {
    try {
      setLoading(true);
      const data = await getMembers();
      setMembers(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this member?")) {
      return;
    }

    try {
      await deleteMember(id);
      await loadMembers();
    } catch (error) {
      console.error(error);
      alert("Unable to delete member.");
    }
  }

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          Members
        </h1>

        <div className="mb-4">
          <button
            onClick={() =>
              exportExcel(members, "Members_List")
            }
          >
            Export Excel
          </button>
        </div>

        <MemberForm onSaved={loadMembers} />

        <div className="mt-8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <MemberTable
              members={members}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
