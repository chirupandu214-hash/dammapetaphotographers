<th>Actions</th>
interface Props {
  members: any[];
  onDelete: (id: number) => void;

}

export default function MemberTable({
  members,
  onDelete,
}: Props) {
  if (members.length === 0) {
    return (
      <h3
        style={{
          textAlign: "center",
          color: "#666",
        }}
      >
        No members found.
      </h3>
    );
  }

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
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
            <td>{member.member_id}</td>
            <td>{member.full_name}</td>
            <td>{member.mobile}</td>
            <td>{member.studio_name}</td>
            <td>{member.role}</td>
            <td>{member.status}</td>
            <td>
  <button
    onClick={() => {
      if (window.confirm("Delete this member?")) {
        onDelete(member.id);
      }
    }}
    style={{
      background: "#d32f2f",
      color: "#fff",
      border: "none",
      padding: "6px 10px",
      borderRadius: "4px",
      cursor: "pointer",
    }}
  >
    Delete
  </button>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
