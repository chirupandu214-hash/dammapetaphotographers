interface Props {
  members: any[];
  onDelete: (id: number) => void;

}

export default function MemberTable({ members }: Props) {
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
