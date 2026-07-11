import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { 
  LayoutDashboard, Users, HeartHandshake, ShieldAlert, 
  Coins, FileText, Settings as LogOutIcon, Menu, X, Sun, Moon 
} from 'lucide-react';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['Admin', 'Member'] },
    { name: 'Members Directory', path: '/members', icon: Users, roles: ['Admin'] },
    { name: 'Kutumbha Bharosha', path: '/kb', icon: HeartHandshake, roles: ['Admin'] },
    { name: 'Yearly Funds', path: '/funds', icon: Coins, roles: ['Admin', 'Member'] },
    { name: 'Audit Infrastructure', path: '/audit', icon: ShieldAlert, roles: ['Admin'] }
  ];

  const filteredNavigation = navigationItems.filter(item => item.roles.includes(role || ''));

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Sidebar Element */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-0'} transition-transform duration-300 ease-in-out bg-slate-950 text-white border-r border-slate-800`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <span className="font-bold tracking-tight text-sm text-amber-500">DPAM PORTAL</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-950/30 transition-colors mt-8"
          >
            <LogOutIcon size={18} />
            <span>Terminate Session</span>
          </button>
        </nav>
      </aside>

      {/* Main Structural Containment Viewport */}
      <div className={`flex-1 flex flex-col min-w-0 ${sidebarOpen ? 'lg:pl-64' : ''} transition-all duration-300`}>
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white shadow-sm dark:bg-slate-950 dark:border-slate-800">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-500 hover:text-slate-700 dark:text-slate-400">
            <Menu size={22} />
          </button>
          <div className="flex items-center space-x-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
              {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
            </button>
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">{role}</p>
            </div>
          </div>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
