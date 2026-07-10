const menu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "My Profile", path: "/profile" },

  ...(user.role === "admin"
    ? [
        { name: "Members", path: "/members" },
        { name: "Payments", path: "/payments" },
        { name: "Reports", path: "/reports" },
        { name: "Settings", path: "/settings" },
      ]
    : []),
];
