import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, CircularProgress } from '@mui/material';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';

const Setting = () => {
  const auth = useSelector((state) => state.auth);
  const user = auth.user || {
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    profilePicture: '',
    location: 'San Francisco, CA',
  };

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 700);
  };

  return (
    <div className="w-full max-w-2xl py-4 sm:py-6 space-y-6">
      
      {/* Title */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Account Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage your profile information and account security.</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm shadow-indigo-600/20 transition cursor-pointer"
        >
          {saving ? <CircularProgress size={16} color="inherit" /> : <SaveRoundedIcon fontSize="small" />}
          <span>Save Changes</span>
        </button>
      </div>

      {success && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-2xl text-center">
          Settings updated successfully!
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 space-y-6">
        <div className="flex items-center gap-4">
          <Avatar
            src={user.profilePicture}
            alt={user.firstName}
            sx={{ width: 64, height: 64 }}
            className="ring-2 ring-indigo-500/20"
          >
            {user.firstName?.charAt(0) || 'U'}
          </Avatar>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-xs text-slate-400">@{user.username || 'user'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">First Name</label>
            <input
              defaultValue={user.firstName}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Last Name</label>
            <input
              defaultValue={user.lastName}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Email</label>
            <input
              type="email"
              defaultValue={user.email}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Location</label>
            <input
              defaultValue={user.location || 'San Francisco, CA'}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* Security Card */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <SecurityRoundedIcon fontSize="small" className="text-indigo-600" />
          <h2 className="text-sm font-bold">Password & Security</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Setting;
