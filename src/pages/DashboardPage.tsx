children: [
  {
    index: true,
    element: <DashboardPage />,
  },

  {
    path: "dashboard",
    element: <DashboardPage />,
  },

  {
    path: "my-profile",
    element: <MyProfilePage />,
  },

  {
    path: "member-card",
    element: <MemberCardPage />,
  },

  {
    path: "reports",
    element: (
      <ProtectedRoute adminOnly>
        <ReportsPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "settings",
    element: (
      <ProtectedRoute adminOnly>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },

  ...adminResources.map((resource) => ({
    path: resource.path,
    element: (
      <ProtectedRoute adminOnly>
        <ResourcePage resource={resource} />
      </ProtectedRoute>
    ),
  })),
]
