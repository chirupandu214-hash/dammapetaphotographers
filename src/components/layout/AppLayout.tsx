import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">
          Dammapeta Photographers Association
        </h1>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
