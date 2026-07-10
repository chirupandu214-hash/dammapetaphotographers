import { IndianRupee, Plus, Search } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Payments
          </h1>
          <p className="text-gray-500">
            Manage member payments and collections.
          </p>
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18} />
          Collect Payment
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />

        <input
          className="w-full border rounded-lg py-3 pl-10"
          placeholder="Search Payment..."
        />
      </div>

      <div className="bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Receipt No</th>
              <th className="p-4 text-left">Member</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Method</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>

              <td
                colSpan={6}
                className="text-center py-12 text-gray-500"
              >
                <IndianRupee
                  size={40}
                  className="mx-auto mb-3"
                />

                No Payments Found

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}
