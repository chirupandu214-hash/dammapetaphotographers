// src/services/dashboardService.ts

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  admins: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return {
    totalMembers: 0,
    activeMembers: 0,
    inactiveMembers: 0,
    admins: 1,
  };
}
