import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  HiOutlineViewGrid, 
  HiOutlineUsers, 
  HiOutlineCurrencyRupee, 
  HiOutlineCreditCard, 
  HiOutlineCog, 
  HiOutlineMenu, 
  HiOutlineX,
  HiOutlineLogout
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HiOutlineViewGrid, adminOnly: false },
    { name: 'Photographers', path: '/members', icon: HiOutlineUsers, adminOnly: true },
    { name: 'Funds & Receipts', path: '/funds', icon: HiOutlineCurrencyRupee, adminOnly: false },
    { name: 'Loans', path: '/loans', icon: HiOutlineCreditCard, adminOnly: false },
    { name: 'Settings', path: '/settings', icon: HiOutlineCog, adminOnly: true },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 flex justify-between items-center">
          <h1 className="font-bold text-amber-500 uppercase tracking-widest text-lg">DPA PORTAL</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}><HiOutlineX size={24} /></button>
        </div>

        <nav className="px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            if (item.adminOnly && role !== 'super_admin') return null;
            return (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-amber-400'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 w-full px-4">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-red-950 rounded-lg transition-colors"
          >
            <HiOutlineLogout className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 border-b border-slate-800 bg-slate-900 shadow-md">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-white"><HiOutlineMenu size={24} /></button>
          <div className="text-sm font-semibold tracking-wide">DAMMAPETA PHOTOGRAPHERS ASSOCIATION</div>
          <div className="text-xs text-slate-400 capitalize">{role?.replace('_', ' ')}</div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
