import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Home as HomeIcon,
  Article as ArticleIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin', icon: <DashboardIcon fontSize="small" />, text: 'Dashboard' },
    { path: '/admin/users', icon: <PeopleIcon fontSize="small" />, text: 'User Management' },
    { path: '/home', icon: <HomeIcon fontSize="small" />, text: 'Back to Feed' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-100 flex flex-col justify-between p-5 select-none">
      <div className="space-y-6">
        {/* Brand */}
        <div
          onClick={() => navigate('/home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <span className="text-base font-black">⚡</span>
          </div>
          <div>
            <span className="font-black text-lg text-slate-900 tracking-tight">
              YAKI<span className="text-indigo-600">Admin</span>
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Control Center
          </p>

          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.text}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition ${
                  isActive && item.path !== '/home'
                    ? 'bg-indigo-50 text-indigo-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <span className="text-slate-400">{item.icon}</span>
              <span>{item.text}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
        YAKI Social Enterprise v2.0
      </div>
    </aside>
  );
};

export default Sidebar;
