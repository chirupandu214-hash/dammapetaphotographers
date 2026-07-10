import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import MemberForm from "@/components/members/MemberForm";

import { getMemberById } from "@/services/memberService";

export default function EditMemberPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMember() {
      try {
        if (!id) return;

        const data = await getMemberById(Number(id));
        setMember(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load member.");
      } finally {
        setLoading(false);
      }
    }

    loadMember();
  }, [id]);

  function handleSaved() {
    navigate("/members");
  }

  return (
    <AppLayout>
      <h1>Edit Member</h1>

      {loading ? (
        <p>Loading...</p>
      ) : member ? (
        <MemberForm
          initialData={member}
          editMode
          onSaved={handleSaved}
        />
      ) : (
        <p>Member not found.</p>
      )}
    </AppLayout>
  );
}
