import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const user = auth.user;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("jwt");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs w-72">
        <SearchIcon fontSize="small" className="text-slate-400" />
        <input
          type="text"
          placeholder="Search admin dashboard..."
          className="bg-transparent outline-none text-slate-800 w-full"
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/home')}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3.5 py-1.5 rounded-full transition"
        >
          View Live Feed
        </button>

        <button
          onClick={handleClick}
          className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-50 transition cursor-pointer"
        >
          <Avatar
            src={user?.profilePicture}
            sx={{ width: 34, height: 34 }}
            className="ring-2 ring-indigo-500/20"
          >
            {user?.firstName?.charAt(0) || 'A'}
          </Avatar>
          <span className="text-xs font-bold text-slate-800 hidden sm:inline">
            {user?.firstName || 'Admin'}
          </span>
        </button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              sx: {
                borderRadius: '1rem',
                minWidth: 160,
                border: '1px solid #F1F5F9',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
              },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(`/home/profile/${user?.id}`);
            }}
            className="text-xs gap-2 py-2"
          >
            <Person fontSize="small" className="text-slate-400" />
            <span>Profile</span>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              navigate('/home/settings');
            }}
            className="text-xs gap-2 py-2"
          >
            <Settings fontSize="small" className="text-slate-400" />
            <span>Settings</span>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleLogout} className="text-xs gap-2 py-2 text-red-600">
            <Logout fontSize="small" />
            <span>Logout</span>
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Navbar;
