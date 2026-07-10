import { useEffect, useState } from "react";

import AppLayout from "@/layouts/AppLayout";

import StatCard from "@/components/dashboard/StatCard";
import MemberChart from "@/components/charts/MemberChart";
import FundChart from "@/components/charts/FundChart";
import FinanceChart from "@/components/charts/FinanceChart";

import { getDashboardStats } from "@/services/dashboardService";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }

    load();
  }, []);

  // Temporary chart data
  const memberData = [
    { month: "Jan", count: 8 },
    { month: "Feb", count: 12 },
    { month: "Mar", count: 18 },
    { month: "Apr", count: 25 },
    { month: "May", count: 30 },
    { month: "Jun", count: 35 },
  ];

  const fundData = [
    { year: "2024", amount: 25000 },
    { year: "2025", amount: 50000 },
    { year: "2026", amount: 75000 },
  ];

  const income = 70000;
  const expense = 25000;

  return (
    <AppLayout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            <StatCard
              title="Total Members"
              value={stats.totalMembers}
            />

            <StatCard
              title="Active Members"
              value={stats.activeMembers}
            />

            <StatCard
              title="Inactive Members"
              value={stats.inactiveMembers}
            />

            <StatCard
              title="Admins"
              value={stats.admins}
            />

          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-lg font-semibold mb-4">
              Member Growth
            </h2>

            <MemberChart
              data={memberData}
            />

          </div>

          <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-lg font-semibold mb-4">
              Fund Collection
            </h2>

            <FundChart
              data={fundData}
            />

          </div>

          <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-lg font-semibold mb-4">
              Income vs Expense
            </h2>

            <FinanceChart
              income={income}
              expense={expense}
            />

          </div>

        </div>

      </div>
    </AppLayout>
  );
}
