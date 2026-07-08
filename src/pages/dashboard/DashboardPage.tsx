import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  UserX,
  HeartHandshake,
  IndianRupee,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Cake,
  Calendar,
  Bell,
} from "lucide-react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/Card";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

const statCards = [
  ["Total Members", "total_members", Users],
  ["Active Members", "active_members", UserCheck],
  ["Inactive Members", "inactive_members", UserX],
  ["Kutumbha Bharosa", "kutumbha_bharosa_members", HeartHandshake],
  ["Fund Collection", "fund_collection", IndianRupee],
  ["Outstanding Loans", "outstanding_loans", CreditCard],
  ["Income", "income", TrendingUp],
  ["Expenses", "expenses", TrendingDown],
  ["Upcoming Birthdays", "upcoming_birthdays", Cake],
  ["Upcoming Events", "upcoming_events", Calendar],
  ["Notifications", "notifications", Bell],
] as const;

export function DashboardPage() {
  const stats = useQuery({
    queryKey: ["dashboard_stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dashboard_stats")
        .select("*")
        .single();

      if (error) throw error;

      return data;
    },
  });

  const data = stats.data ?? {};

  const financeData = {
    labels: ["Funds", "Income", "Expenses", "Outstanding Loans"],
    datasets: [
      {
        label: "Amount",
        data: [
          Number(data.fund_collection ?? 0),
          Number(data.income ?? 0),
          Number(data.expenses ?? 0),
          Number(data.outstanding_loans ?? 0),
        ],
        backgroundColor: ["#2563eb", "#16a34a", "#dc2626", "#f59e0b"],
      },
    ],
  };

  const memberData = {
    labels: ["Active", "Inactive", "Kutumbha Bharosa"],
    datasets: [
      {
        data: [
          Number(data.active_members ?? 0),
          Number(data.inactive_members ?? 0),
          Number(data.kutumbha_bharosa_members ?? 0),
        ],
        backgroundColor: ["#22c55e", "#ef4444", "#3b82f6"],
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Complete association overview and financial summary.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(([label, key, Icon], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Card className="relative overflow-hidden p-5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <h2 className="mt-2 text-3xl font-bold">
                    {String(data[key] ?? 0)}
                  </h2>
                </div>

                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="mb-4 text-lg font-semibold">Financial Overview</h2>
          <Bar data={financeData} />
        </Card>

        <Card className="p-5">
          <h2 className="mb-4 text-lg font-semibold">Member Overview</h2>
          <Doughnut data={memberData} />
        </Card>
      </div>
    </div>
  );
}
