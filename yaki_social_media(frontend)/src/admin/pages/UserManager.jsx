import React, { useState } from 'react';
import { Avatar, IconButton, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const mockUsers = [
  {
    id: 1,
    name: 'Elena Fisher',
    username: 'elena_fisher',
    email: 'elena@example.com',
    role: 'CREATOR',
    status: 'ACTIVE',
    posts: 48,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    joined: 'Jan 15, 2025',
  },
  {
    id: 2,
    name: 'Alex Doe',
    username: 'alexdoe',
    email: 'alex.doe@example.com',
    role: 'USER',
    status: 'ACTIVE',
    posts: 12,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    joined: 'Feb 03, 2025',
  },
  {
    id: 3,
    name: 'Sarah Jenkins',
    username: 'sarah_j',
    email: 'sarah@example.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    posts: 124,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    joined: 'Nov 12, 2024',
  },
  {
    id: 4,
    name: 'Davide Ross',
    username: 'davide_r',
    email: 'davide@example.com',
    role: 'USER',
    status: 'SUSPENDED',
    posts: 4,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    joined: 'Mar 22, 2025',
  },
];

const UserManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' }
          : u
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">User Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor, inspect, and manage community accounts and permissions.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fontSize="small" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 focus:bg-white text-xs text-slate-800 rounded-full border border-slate-200 focus:border-indigo-500 outline-none transition"
          />
        </div>
      </div>

      {/* Users Table Card */}
      <div className="bg-white rounded-3xl shadow-xs border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Posts</th>
                <th className="py-4 px-6">Joined Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <Avatar src={user.avatar} sx={{ width: 40, height: 40 }}>
                      {user.name.charAt(0)}
                    </Avatar>
                    <div>
                      <p className="font-bold text-slate-900">{user.name}</p>
                      <p className="text-slate-400 text-[11px]">@{user.username}</p>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        user.role === 'ADMIN'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : user.role === 'CREATOR'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        user.status === 'ACTIVE'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      ></span>
                      {user.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 font-semibold text-slate-800">
                    {user.posts}
                  </td>

                  <td className="py-4 px-6 text-slate-500">
                    {user.joined}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`text-[11px] font-bold px-3 py-1 rounded-full transition cursor-pointer ${
                        user.status === 'ACTIVE'
                          ? 'text-rose-600 hover:bg-rose-50'
                          : 'text-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      {user.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default UserManager;
