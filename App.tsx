<Route path="/members" element={
  <ProtectedRoute allowedRole="super_admin">
    <MembersPage />
  </ProtectedRoute>
} />
