import {
  BarChart3,
  Download
} from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Reports
          </h1>

          <p className="text-gray-500">
            Generate and download reports.
          </p>

        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">

          <Download size={18} />

          Export Report

        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">Members Report</h2>
          <p className="text-gray-500 mt-2">
            Active, Pending, Total Members
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">Collection Report</h2>
          <p className="text-gray-500 mt-2">
            Monthly Collections
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">QR Verification</h2>
          <p className="text-gray-500 mt-2">
            QR Scan History
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-12 text-center">

        <BarChart3
          size={50}
          className="mx-auto mb-3"
        />

        Charts will appear here.

      </div>

    </div>
  );
}
