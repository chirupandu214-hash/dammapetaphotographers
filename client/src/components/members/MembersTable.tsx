import { useMembers } from '../../api/membersApi'; // ముందు మనం రాసిన హుక్

export const MembersTable = () => {
  const { data: members, isLoading, error } = useMembers();

  if (isLoading) return <div className="text-white">Loading members...</div>;
  if (error) return <div className="text-red-400">Error loading members.</div>;

  return (
    <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-xl mt-6">
      <table className="w-full text-left text-white">
        <thead className="bg-slate-800 border-b border-slate-700">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Mobile</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members?.map((member: any) => (
            <tr key={member.id} className="border-b border-slate-800 hover:bg-slate-800/50">
              <td className="p-4">{member.full_name}</td>
              <td className="p-4">{member.email}</td>
              <td className="p-4">{member.mobile}</td>
              <td className="p-4">
                <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded-full">Active</span>
              </td>
              <td className="p-4 flex gap-2">
                <button className="text-amber-400 hover:text-amber-300 text-sm">Edit</button>
                <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
