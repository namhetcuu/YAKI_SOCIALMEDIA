import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const initialCommunities = [
  {
    id: 1,
    name: 'UI/UX Designers Hub',
    description: 'A global community discussing product design, Figma workflows, and design systems.',
    members: '124k members',
    avatar: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=150&auto=format&fit=crop&q=80',
    joined: false,
  },
  {
    id: 2,
    name: 'Frontend Developers',
    description: 'Discussion and knowledge sharing on React, Next.js, Tailwind, and modern web tech.',
    members: '86k members',
    avatar: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&auto=format&fit=crop&q=80',
    joined: true,
  },
  {
    id: 3,
    name: 'AI Creators & Prompt Crafters',
    description: 'Exploring generative art, LLMs, AI creative direction, and practical automation.',
    members: '210k members',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    joined: false,
  },
  {
    id: 4,
    name: 'Photography & Visual Arts',
    description: 'Share your captures, critique compositions, and exchange camera settings.',
    members: '45k members',
    avatar: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=150&auto=format&fit=crop&q=80',
    joined: true,
  },
];

const Communities = () => {
  const [communities, setCommunities] = useState(initialCommunities);

  const handleJoinClick = (id) => {
    setCommunities((prev) =>
      prev.map((c) => (c.id === id ? { ...c, joined: !c.joined } : c))
    );
  };

  return (
    <div className="w-full max-w-2xl py-4 sm:py-6 space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Communities</h1>
          <p className="text-xs text-slate-500 mt-0.5">Explore vibrant groups and share your passions.</p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <PeopleAltOutlinedIcon />
        </div>
      </div>

      {/* Grid of communities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {communities.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 shadow-xs border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Avatar
                  src={item.avatar}
                  sx={{ width: 48, height: 48 }}
                  className="ring-2 ring-indigo-500/10"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm text-slate-900 truncate group-hover:text-indigo-600 transition">
                    {item.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {item.members}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            <button
              onClick={() => handleJoinClick(item.id)}
              className={`w-full py-2 rounded-full text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                item.joined
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
              }`}
            >
              {item.joined ? (
                <>
                  <CheckRoundedIcon sx={{ fontSize: 15 }} />
                  <span>Joined</span>
                </>
              ) : (
                'Join Community'
              )}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Communities;
