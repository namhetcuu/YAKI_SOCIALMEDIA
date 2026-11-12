import React from 'react';
import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const user = auth.user;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const userId = user?.id || 'default-id';

  const navigation = [
    { title: 'Home', icon: <HomeRoundedIcon fontSize="medium" />, path: '/home' },
    { title: 'Explore', icon: <ExploreOutlinedIcon fontSize="medium" />, path: '/home/reels' },
    { title: 'Messenger', icon: <ChatBubbleOutlineRoundedIcon fontSize="medium" />, path: '/message', badge: 2 },
    { title: 'Chat with AI', icon: <AutoAwesomeOutlinedIcon fontSize="medium" />, path: '/chatwithai', isAi: true },
    { title: 'Communities', icon: <PeopleOutlineRoundedIcon fontSize="medium" />, path: '/home/communities' },
    { title: 'Notifications', icon: <NotificationsNoneRoundedIcon fontSize="medium" />, path: '/home/notifications', badge: 3 },
    { title: 'Profile', icon: <PersonOutlineRoundedIcon fontSize="medium" />, path: `/home/profile/${userId}` },
  ];

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    handleCloseMenu();
    localStorage.removeItem('jwt');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/home') return location.pathname === '/home';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="h-full flex flex-col justify-between py-6 px-4 bg-white/70 backdrop-blur-md rounded-3xl border border-slate-100 shadow-xs">
      
      {/* Top Section: Logo & Nav items */}
      <div className="space-y-6">
        
        {/* Brand logo in sidebar (visible on desktop or drawer) */}
        <div
          onClick={() => navigate('/home')}
          className="flex items-center gap-3 px-3 py-1 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition">
            <span className="text-xl font-black">⚡</span>
          </div>
          <div>
            <h1 className="font-extrabold text-2xl tracking-tight text-slate-900 leading-none">
              YAKI
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
              Social Network
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1.5 pt-2">
          {navigation.map((item, index) => {
            const active = isActive(item.path);
            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className={`group flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 select-none ${
                  active
                    ? 'bg-indigo-50/90 text-indigo-600 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 font-medium'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`transition-colors ${
                      active
                        ? 'text-indigo-600'
                        : item.isAi
                        ? 'text-purple-500 group-hover:text-purple-600'
                        : 'text-slate-500 group-hover:text-slate-800'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[15px]">{item.title}</span>
                </div>

                {/* Right pill tags/badges */}
                {item.badge && (
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    active ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {item.isAi && !item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white tracking-wider">
                    PRO
                  </span>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: User Profile & Options */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 transition cursor-pointer">
          <div
            onClick={() => navigate(`/home/profile/${userId}`)}
            className="flex items-center gap-3 min-w-0 flex-1"
          >
            <div className="relative">
              <Avatar
                src={user?.profilePicture || ''}
                alt={user?.firstName || 'User'}
                sx={{ width: 42, height: 42 }}
                className="ring-2 ring-indigo-500/20"
              >
                {user?.firstName?.charAt(0) || 'U'}
              </Avatar>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm text-slate-900 truncate">
                {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username : 'Guest User'}
              </p>
              <p className="text-xs text-slate-400 truncate">
                @{user?.username || 'guest'}
              </p>
            </div>
          </div>

          <IconButton
            onClick={handleOpenMenu}
            size="small"
            className="text-slate-400 hover:text-slate-700"
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          slotProps={{
            paper: {
              elevation: 4,
              sx: {
                borderRadius: '1rem',
                minWidth: 180,
                mb: 1,
                border: '1px solid #F1F5F9',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
              },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleCloseMenu();
              navigate(`/home/profile/${userId}`);
            }}
            className="text-sm gap-2 py-2"
          >
            <PersonOutlineRoundedIcon fontSize="small" className="text-slate-500" />
            <span>Profile</span>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCloseMenu();
              navigate('/home/settings');
            }}
            className="text-sm gap-2 py-2"
          >
            <SettingsOutlinedIcon fontSize="small" className="text-slate-500" />
            <span>Settings</span>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem
            onClick={handleLogout}
            className="text-sm gap-2 py-2 text-red-600 font-medium hover:bg-red-50"
          >
            <LogoutRoundedIcon fontSize="small" />
            <span>Log out</span>
          </MenuItem>
        </Menu>
      </div>

    </aside>
  );
};

export default Sidebar;
