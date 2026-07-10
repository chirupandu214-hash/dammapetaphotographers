import { useEffect, useState } from "react";

import {
  addMember,
  getNextMemberId,
} from "@/services/memberService";

interface Props {
  onSaved?: () => void;
}

export default function MemberForm({ onSaved }: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    member_id: "",
    full_name: "",
    father_name: "",
    mobile: "",
    aadhaar: "",
    email: "",
    gender: "Male",
    dob: "",
    blood_group: "",
    studio_name: "",
    address: "",
    join_date: "",
    photo: "",
    role: "Member",
    status: "Active",
  });

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
useEffect(() => {
  async function loadMemberId() {
    try {
      const id = await getNextMemberId();

      setForm((prev) => ({
        ...prev,
        member_id: id,
      }));
    } catch (error) {
      console.error("Failed to load Member ID:", error);
    }
  }

  loadMemberId();
}, []);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await addMember(form);

      alert("Member Saved Successfully");

      setForm({
        member_id: "",
        full_name: "",
        father_name: "",
        mobile: "",
        aadhaar: "",
        email: "",
        gender: "Male",
        dob: "",
        blood_group: "",
        studio_name: "",
        address: "",
        join_date: "",
        photo: "",
        role: "Member",
        status: "Active",
      });

      onSaved?.();
    } catch (err) {
      console.error(err);
      alert("Failed to save member");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Member</h2>

      <input
        name="member_id"
        placeholder="Member ID"
        value={form.member_id}
        onChange={updateField}
        required
      />

      <br />
      <br />

      <input
        name="full_name"
        placeholder="Full Name"
        value={form.full_name}
        onChange={updateField}
        required
      />

      <br />
      <br />

      <input
        name="father_name"
        placeholder="Father Name"
        value={form.father_name}
        onChange={updateField}
      />

      <br />
      <br />

      <input
        name="mobile"
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={updateField}
      />

      <br />
      <br />

      <input
        name="aadhaar"
        placeholder="Aadhaar Number"
        value={form.aadhaar}
        onChange={updateField}
      />

      <br />
      <br />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={updateField}
      />

      <br />
      <br />

      <select
        name="gender"
        value={form.gender}
        onChange={updateField}
      >
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <br />
      <br />

      <input
        type="date"
        name="dob"
        value={form.dob}
        onChange={updateField}
      />

      <br />
      <br />

      <input
        name="blood_group"
        placeholder="Blood Group"
        value={form.blood_group}
        onChange={updateField}
      />

      <br />
      <br />

      <input
        name="studio_name"
        placeholder="Studio Name"
        value={form.studio_name}
        onChange={updateField}
      />

      <br />
      <br />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={updateField}
      />

      <br />
      <br />

      <input
        type="date"
        name="join_date"
        value={form.join_date}
        onChange={updateField}
      />

      <br />
      <br />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Member"}
      </button>
    </form>
  );
}
