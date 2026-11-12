import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SearchUser from '../SearchUser/SearchUser';

const Header = ({ onToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const user = auth.user;

  const [anchorEl, setAnchorEl] = useState(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    handleCloseMenu();
    localStorage.removeItem('jwt');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Hamburger (mobile) + Brand Logo */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <IconButton
              onClick={onToggleSidebar}
              className="lg:hidden text-slate-700 hover:bg-slate-100"
              size="small"
            >
              <MenuIcon />
            </IconButton>
          )}

          <div
            onClick={() => navigate('/home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            {/* Glowing Brand Icon matching design mockup */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <span className="text-lg font-black tracking-tighter">⚡</span>
            </div>
            <div className="flex items-center font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              YAKI<span className="text-indigo-600 ml-0.5">Social</span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden sm:flex flex-1 max-w-md mx-4">
          <div
            onClick={() => setShowSearchModal(true)}
            className="w-full flex items-center gap-2.5 px-4 py-2 bg-slate-100/80 hover:bg-slate-100 rounded-full border border-transparent hover:border-slate-200 cursor-pointer transition text-slate-400 group"
          >
            <SearchIcon className="text-slate-400 group-hover:text-indigo-600 transition-colors" fontSize="small" />
            <span className="text-sm font-medium text-slate-500">Explore YAKI...</span>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-white text-slate-400 border border-slate-200 font-mono shadow-2xs">⌘K</span>
          </div>
        </div>

        {/* Right: Weather widget + Notifications + Messages + Profile Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Weather Widget (Matches Mockup 1: ☀ 72°F) */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold border border-sky-100/60 select-none">
            <WbSunnyOutlinedIcon className="text-sky-500" sx={{ fontSize: 16 }} />
            <span>72°F</span>
          </div>

          {/* AI Shortcut Button */}
          <Tooltip title="YAKI AI Assistant">
            <button
              onClick={() => navigate('/chatwithai')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-semibold border border-indigo-100 transition"
            >
              <AutoAwesomeIcon sx={{ fontSize: 15 }} />
              <span>AI</span>
            </button>
          </Tooltip>

          {/* Notifications Bell */}
          <Tooltip title="Notifications">
            <IconButton
              onClick={() => navigate('/home/notifications')}
              className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
              size="small"
            >
              <Badge badgeContent={3} color="primary" sx={{ '& .MuiBadge-badge': { bgcolor: '#6366F1' } }}>
                <NotificationsOutlinedIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Messenger Icon */}
          <Tooltip title="Messenger">
            <IconButton
              onClick={() => navigate('/message')}
              className={`hover:bg-indigo-50 transition ${
                location.pathname === '/message'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
              size="small"
            >
              <Badge badgeContent={2} color="secondary" sx={{ '& .MuiBadge-badge': { bgcolor: '#EC4899' } }}>
                <MailOutlineIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* User Profile Avatar with dropdown */}
          <div className="relative pl-1">
            <button
              onClick={handleOpenMenu}
              className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-indigo-500/30 transition cursor-pointer"
            >
              <Avatar
                src={user?.profilePicture || ''}
                alt={user?.firstName || 'User'}
                sx={{ width: 36, height: 36 }}
                className="ring-2 ring-indigo-500/20"
              >
                {user?.firstName?.charAt(0) || 'U'}
              </Avatar>
            </button>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              slotProps={{
                paper: {
                  elevation: 4,
                  sx: {
                    borderRadius: '1rem',
                    minWidth: 200,
                    mt: 1.5,
                    border: '1px solid #F1F5F9',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
                  },
                },
              }}
            >
              <div className="px-4 py-3">
                <p className="font-semibold text-sm text-slate-900 truncate">
                  {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username : 'Guest User'}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  @{user?.username || 'guest'}
                </p>
              </div>
              <Divider sx={{ my: 0.5 }} />

              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  navigate(`/home/profile/${user?.id}`);
                }}
                className="gap-2.5 text-sm py-2"
              >
                <PersonOutlineIcon fontSize="small" className="text-slate-500" />
                <span>My Profile</span>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  navigate('/home/settings');
                }}
                className="gap-2.5 text-sm py-2"
              >
                <SettingsOutlinedIcon fontSize="small" className="text-slate-500" />
                <span>Settings</span>
              </MenuItem>

              {user?.role === 'ADMIN' && (
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    navigate('/admin');
                  }}
                  className="gap-2.5 text-sm py-2 text-indigo-600 font-medium"
                >
                  <AdminPanelSettingsIcon fontSize="small" />
                  <span>Admin Dashboard</span>
                </MenuItem>
              )}

              <Divider sx={{ my: 0.5 }} />

              <MenuItem
                onClick={handleLogout}
                className="gap-2.5 text-sm py-2 text-red-600 font-medium hover:bg-red-50"
              >
                <LogoutIcon fontSize="small" />
                <span>Log Out</span>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      {/* Global Search Dialog Modal when clicked */}
      {showSearchModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-20 px-4"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-5 border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 text-sm">Search Users & Topics</h3>
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold px-2 py-1 rounded-md hover:bg-slate-100"
              >
                ESC
              </button>
            </div>
            <SearchUser onSelect={() => setShowSearchModal(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
