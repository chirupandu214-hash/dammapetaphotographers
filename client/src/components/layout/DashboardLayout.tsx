import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  HiOutlineViewGrid, HiOutlineUsers, HiOutlineCurrencyRupee, 
  HiOutlineCreditCard, HiOutlineDocumentReport, HiOutlineCog, 
  HiOutlineLogout, HiOutlineMenu, HiOutlineX 
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const DashboardLayout: React.FC = () => {
  const { user, role, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: HiOutlineViewGrid, roles: ['super_admin', 'member'] },
    { label: 'Photographers', path: '/members', icon: HiOutlineUsers, roles: ['super_admin'] },
    { label: 'Funds & Receipts', path: '/funds', icon: HiOutlineCurrencyRupee, roles: ['super_admin', 'member'] },
    { label: 'Loans', path: '/loans', icon: HiOutlineCreditCard, roles: ['super_admin', 'member'] },
    { label: 'Reports', path: '/reports', icon: HiOutlineDocumentReport, roles: ['super_admin'] },
    { label: 'Settings', path: '/settings', icon: HiOutlineCog, roles: ['super_admin'] },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 transition-transform lg:static lg:translate-x-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
          <span className="text-sm font-bold uppercase bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">DPA PORTAL</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400"><HiOutlineX className="w-6 h-6" /></button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.filter(item => item.roles.includes(role || 'member')).map((item) => (
            <NavLink
              key={item.path} to={item.path}
              className={({ isActive }) => `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                isActive ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <div className="mb-4 px-2 truncate">
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            <span className="text-[10px] font-semibold uppercase text-amber-400">{role?.replace('_', ' ')}</span>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/20 transition-colors">
            <HiOutlineLogout className="w-4 h-4 mr-2" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white"><HiOutlineMenu className="w-6 h-6" /></button>
          <div className="ml-auto w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-bold text-slate-950">
            {user?.email?.[0].toUpperCase() || 'U'}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
