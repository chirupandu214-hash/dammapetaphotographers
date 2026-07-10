import {
  Settings,
  Save
} from "lucide-react";

export default function SettingsPage() {

  return (

    <div className="p-6 space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500">
          Organization Settings
        </p>

      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <div>

          <label className="font-semibold">
            Association Name
          </label>

          <input
            className="w-full border rounded-lg p-3 mt-2"
            defaultValue="Dammapeta Photographers Association"
          />

        </div>

        <div>

          <label className="font-semibold">
            Address
          </label>

          <textarea
            className="w-full border rounded-lg p-3 mt-2"
            rows={3}
          />

        </div>

        <div>

          <label className="font-semibold">
            Contact Number
          </label>

          <input
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2">

          <Save size={18} />

          Save Settings

        </button>

      </div>

      <div className="bg-white rounded-xl shadow p-6 text-gray-500">

        <Settings
          size={40}
          className="mb-3"
        />

        More settings like User Roles, Supabase Configuration,
        Payment Gateway, QR Configuration and Backup can be added here.

      </div>

    </div>

  );

}
