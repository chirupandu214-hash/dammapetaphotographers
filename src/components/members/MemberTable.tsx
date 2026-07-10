import { useNavigate } from "react-router-dom";

interface Props {
  members: any[];
  onDelete: (id: number) => void;
}

export default function MemberTable({
  members,
  onDelete,
}: Props) {

  const navigate = useNavigate();

  if (members.length === 0) {
    return (
      <h3 style={{ textAlign: "center" }}>
        No members found
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
          <th>Status</th>
          <th>Actions</th>

        </tr>

      </thead>


      <tbody>

        {members.map((member)=> (

          <tr key={member.id}>

            <td>{member.id}</td>

            <td>{member.member_id}</td>

            <td>{member.full_name}</td>

            <td>{member.mobile}</td>

            <td>{member.studio_name}</td>

            <td>{member.status}</td>


            <td>

              <button
                onClick={() =>
                  navigate(
                    `/members/edit/${member.id}`
                  )
                }
                style={{
                  marginRight:"8px",
                  background:"#1976d2",
                  color:"#fff",
                  border:"none",
                  padding:"6px 12px",
                  borderRadius:"5px",
                }}
              >
                Edit
              </button>


              <button
                onClick={()=>{
                  if(
                    window.confirm(
                      "Delete this member?"
                    )
                  ){
                    onDelete(member.id);
                  }
                }}
                style={{
                  background:"#d32f2f",
                  color:"#fff",
                  border:"none",
                  padding:"6px 12px",
                  borderRadius:"5px",
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
