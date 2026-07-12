import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { HiOutlineViewGrid, HiOutlineUsers, HiOutlineLogout } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

export const DashboardLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <aside className="w-64 bg-slate-900 p-6">
        <h1 className="text-amber-500 font-bold mb-8">DPA PORTAL</h1>
        <nav className="space-y-4">
          <NavLink to="/dashboard" className="flex items-center p-2 hover:bg-slate-800 rounded">
            <HiOutlineViewGrid className="mr-3" /> Dashboard
          </NavLink>
          <NavLink to="/members" className="flex items-center p-2 hover:bg-slate-800 rounded">
            <HiOutlineUsers className="mr-3" /> Photographers
          </NavLink>
        </nav>
        <button onClick={() => { logout(); navigate('/login'); }} className="mt-auto flex items-center text-red-400 absolute bottom-6">
          <HiOutlineLogout className="mr-3" /> Logout
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
