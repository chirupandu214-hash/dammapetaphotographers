// src/config/resources.ts

import {
  LayoutDashboard,
  Users,
  CreditCard,
  Building2,
  QrCode,
  IdCard,
  BarChart3,
  CalendarDays,
  Bell,
  Settings,
  ShieldCheck,
  FileText,
} from "lucide-react";

export interface ResourceConfig {
  name: string;
  label: string;
  path: string;
  icon: any;
  adminOnly?: boolean;
}

export const adminResources: ResourceConfig[] = [
  {
    name: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "members",
    label: "Members",
    path: "/members",
    icon: Users,
  },
  {
    name: "payments",
    label: "Payments",
    path: "/payments",
    icon: CreditCard,
  },
  {
    name: "bank",
    label: "Bank Transactions",
    path: "/bank",
    icon: Building2,
  },
  {
    name: "qr",
    label: "QR Verification",
    path: "/qr",
    icon: QrCode,
  },
  {
    name: "idcards",
    label: "ID Cards",
    path: "/idcards",
    icon: IdCard,
  },
  {
    name: "reports",
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    name: "events",
    label: "Events",
    path: "/events",
    icon: CalendarDays,
  },
  {
    name: "notifications",
    label: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    name: "documents",
    label: "Documents",
    path: "/documents",
    icon: FileText,
  },
  {
    name: "users",
    label: "User Management",
    path: "/users",
    icon: ShieldCheck,
    adminOnly: true,
  },
  {
    name: "settings",
    label: "Settings",
    path: "/settings",
    icon: Settings,
    adminOnly: true,
  },
];
