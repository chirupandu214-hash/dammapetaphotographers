import { Member } from "@/types/member";

interface Props {
  members: Member[];
}

export default function MemberTable({ members }: Props) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr
          style={{
            background: "#1976d2",
            color: "#fff",
          }}
        >
          <th>ID</th>

          <th>Member ID</th>

          <th>Name</th>

          <th>Mobile</th>

          <th>Studio</th>

          <th>Role</th>

          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {members.map((member) => (
          <tr key={member.id}>
            <td>{member.id}</td>

            <td>{member.memberId}</td>

            <td>{member.fullName}</td>

            <td>{member.mobile}</td>

            <td>{member.studioName}</td>

            <td>{member.role}</td>

            <td>{member.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
