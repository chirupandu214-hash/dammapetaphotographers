import { useState } from "react";
import { Search, Plus, User } from "lucide-react";

interface Member {
  id: string;
  memberId: string;
  fullName: string;
  mobile: string;
  studioName: string;
  status: "Active" | "Pending";
}

export default function MembersPage() {
  const [search, setSearch] = useState("");

  const [members] = useState<Member[]>([]);

  const filteredMembers = members.filter(
    (member) =>
      member.fullName.toLowerCase().includes(search.toLowerCase()) ||
      member.memberId.toLowerCase().includes(search.toLowerCase()) ||
      member.mobile.includes(search)
  );

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Member Management
          </h1>

          <p className="text-gray-500">
            Manage all association members.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={18} />
          Add Member
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search by Name / Member ID / Mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg pl-10 pr-4 py-3"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">Member ID</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Mobile</th>
              <th className="text-left p-4">Studio</th>
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredMembers.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  <User className="mx-auto mb-3" size={40} />
                  No members found.
                </td>

              </tr>

            ) : (

              filteredMembers.map((member) => (

                <tr
                  key={member.id}
                  className="border-t"
                >

                  <td className="p-4">{member.memberId}</td>

                  <td className="p-4">{member.fullName}</td>

                  <td className="p-4">{member.mobile}</td>

                  <td className="p-4">{member.studioName}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        member.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  <td className="p-4 text-center">

                    <button className="text-blue-600 hover:underline mr-3">
                      View
                    </button>

                    <button className="text-green-600 hover:underline mr-3">
                      Edit
                    </button>

                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
