import { Users, CreditCard, IndianRupee, QrCode, UserPlus, Bell } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Members",
      value: "0",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Active Members",
      value: "0",
      icon: UserPlus,
      color: "bg-green-500",
    },
    {
      title: "Total Collection",
      value: "₹0",
      icon: IndianRupee,
      color: "bg-yellow-500",
    },
    {
      title: "QR Verified Today",
      value: "0",
      icon: QrCode,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Dammapeta Photographers Portal
        </h1>
        <p className="text-gray-500">
          Dashboard Overview
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl bg-white shadow p-6 flex justify-between items-center"
            >
              <div>
                <p className="text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>

              <div className={`${item.color} p-4 rounded-xl text-white`}>
                <Icon size={32} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Payments
          </h2>

          <div className="text-gray-500">
            No payment records found.
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Members
          </h2>

          <div className="text-gray-500">
            No members registered.
          </div>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          <button className="bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700">
            Add Member
          </button>

          <button className="bg-green-600 text-white rounded-lg py-3 hover:bg-green-700">
            Record Payment
          </button>

          <button className="bg-purple-600 text-white rounded-lg py-3 hover:bg-purple-700">
            Generate QR
          </button>

        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Bell size={20} />
          Notifications
        </h2>

        <ul className="space-y-2 text-gray-600">
          <li>No new notifications.</li>
        </ul>
      </div>
    </div>
  );
}
