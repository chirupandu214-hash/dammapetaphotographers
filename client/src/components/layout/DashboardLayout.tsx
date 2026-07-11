import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { HiOutlineViewGrid, HiOutlineUsers, HiOutlineCurrencyRupee, HiOutlineCreditCard, HiOutlineCog, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext'; // మీ Auth Context

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role } = useAuth(); // User role check

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HiOutlineViewGrid, adminOnly: false },
    { name: 'Photographers', path: '/members', icon: HiOutlineUsers, adminOnly: true },
    { name: 'Funds & Receipts', path: '/funds', icon: HiOutlineCurrencyRupee, adminOnly: false },
    { name: 'Loans', path: '/loans', icon: HiOutlineCreditCard, adminOnly: false },
    { name: 'Settings', path: '/settings', icon: HiOutlineCog, adminOnly: true },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200`}>
        <div className="p-6 font-bold text-amber-500 uppercase tracking-widest">DPA PORTAL</div>
        <nav className="px-4 space-y-2">
          {menuItems.map((item) => {
            if (item.adminOnly && role !== 'super_admin') return null;
            return (
              <NavLink key={item.path} to={item.path} className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-amber-400">
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 border-b border-slate-800 bg-slate-900">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden"><HiOutlineMenu /></button>
          <div className="text-sm font-medium">DAMMAPETA PHOTOGRAPHERS ASSOCIATION</div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet /> {/* ఇక్కడ మీ పేజీలు లోడ్ అవుతాయి */}
        </main>
      </div>
    </div>
  );
};
