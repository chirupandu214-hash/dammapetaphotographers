import { useEffect, useState } from "react";

import {
  addMember,
  updateMember,
  getNextMemberId,
} from "@/services/memberService";

interface Props {
  onSaved?: () => void;

  editMode?: boolean;

  initialData?: MemberFormData;
}

interface MemberFormData {
  member_id: string;
  full_name: string;
  father_name: string;
  mobile: string;
  aadhaar: string;
  email: string;
  gender: string;
  dob: string;
  blood_group: string;
  studio_name: string;
  address: string;
  join_date: string;
  photo: string;
  role: string;
  status: string;
}

export default function MemberForm({ onSaved }: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<MemberFormData>({
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

  function updateField(
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
}

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (form.full_name.trim() === "") {
      alert("Full Name is required.");
      return;
    }

    if (form.mobile.trim().length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (
      form.aadhaar.trim() !== "" &&
      form.aadhaar.trim().length !== 12
    ) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    try {
      setLoading(true);

      await addMember(form);

      alert("Member saved successfully.");

      const nextMemberId = await getNextMemberId();

      setForm({
        member_id: nextMemberId,
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
    } catch (error) {
      console.error(error);
      alert("Failed to save member.");
    } finally {
      setLoading(false);
    }
  }

    return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: "16px",
      }}
    >
      <div>
        <label>Member ID</label>
        <br />
        <input
          type="text"
          name="member_id"
          value={form.member_id}
          readOnly
          style={{
            width: "100%",
            padding: "10px",
            background: "#f3f3f3",
          }}
        />
      </div>

      <div>
        <label>Full Name *</label>
        <br />
        <input
          type="text"
          name="full_name"
          value={form.full_name}
          onChange={updateField}
          placeholder="Enter Full Name"
          required
          style={{
            width: "100%",
            padding: "10px",
          }}
        />
      </div>

      <div>
        <label>Father / Husband Name</label>
        <br />
        <input
          type="text"
          name="father_name"
          value={form.father_name}
          onChange={updateField}
          placeholder="Enter Father Name"
          style={{
            width: "100%",
            padding: "10px",
          }}
        />
      </div>

      <div>
        <label>Mobile Number *</label>
        <br />
        <input
          type="tel"
          name="mobile"
          value={form.mobile}
          onChange={updateField}
          maxLength={10}
          placeholder="9876543210"
          style={{
            width: "100%",
            padding: "10px",
          }}
        />
      </div>

      <div>
        <label>Aadhaar Number</label>
        <br />
        <input
          type="text"
          name="aadhaar"
          value={form.aadhaar}
          onChange={updateField}
          maxLength={12}
          placeholder="123412341234"
          style={{
            width: "100%",
            padding: "10px",
          }}
        />
      </div>

      <div>
        <label>Email</label>
        <br />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={updateField}
          placeholder="example@gmail.com"
          style={{
            width: "100%",
            padding: "10px",
          }}
        />
      </div>

      <div>
        <label>Gender</label>
        <br />
        <select
          name="gender"
          value={form.gender}
          onChange={updateField}
          style={{
            width: "100%",
            padding: "10px",
          }}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>      <div>
        <label>Date of Birth</label>
        <br />
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={updateField}
          style={{
            width: "100%",
            padding: "10px",
          }}
        />
      </div>

      <div>
        <label>Blood Group</label>
        <br />
        <input
          type="text"
          name="blood_group"
          value={form.blood_group}
          onChange={updateField}
          placeholder="O+"
          style={{
            width: "100%",
            padding: "10px",
          }}
        />
      </div>

      <div>
        <label>Studio Name</label>
        <br />
        <input
          type="text"
          name="studio_name"
          value={form.studio_name}
          onChange={updateField}
          placeholder="Studio Name"
          style={{
            width: "100%",
            padding: "10px",
          }}
        />
      </div>

      <div>
        <label>Address</label>
        <br />
        <textarea
          name="address"
          value={form.address}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }
          rows={3}
          style={{
            width: "100%",
            padding: "10px",
            resize: "vertical",
          }}
        />
      </div>

      <div>
        <label>Join Date</label>
        <br />
        <input
          type="date"
          name="join_date"
          value={form.join_date}
          onChange={updateField}
          style={{
            width: "100%",
            padding: "10px",
          }}
        />
      </div>

      <div>
        <label>Role</label>
        <br />
        <select
          name="role"
          value={form.role}
          onChange={updateField}
          style={{
            width: "100%",
            padding: "10px",
          }}
        >
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div>
        <label>Status</label>
        <br />
        <select
          name="status"
          value={form.status}
          onChange={updateField}
          style={{
            width: "100%",
            padding: "10px",
          }}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "12px",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
        }}
      >
        {loading ? "Saving..." : "Save Member"}
      </button>
    </form>
  );
}
