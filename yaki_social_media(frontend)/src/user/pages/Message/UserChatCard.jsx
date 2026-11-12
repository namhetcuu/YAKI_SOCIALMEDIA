import React from 'react';
import { Avatar } from '@mui/material';

const UserChatCard = ({ chat, chatName, isActive }) => {
  return (
    <div
      className={`flex items-center gap-3.5 p-3 rounded-2xl cursor-pointer transition-all duration-200 select-none ${
        isActive
          ? 'bg-indigo-50/90 border-l-4 border-indigo-600 shadow-2xs'
          : 'hover:bg-slate-100/70 border-l-4 border-transparent'
      }`}
    >
      {/* Avatar with active green dot */}
      <div className="relative flex-shrink-0">
        <Avatar
          sx={{
            width: 46,
            height: 46,
            bgcolor: '#6366F1',
            fontWeight: 700,
          }}
          src={chat.chatImage || ''}
        >
          {chatName?.charAt(0) || 'U'}
        </Avatar>
        <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between mb-0.5">
          <p className="font-bold text-sm text-slate-900 truncate">
            {chatName || 'Sarah Jenkins'}
          </p>
          <span className="text-[11px] font-medium text-slate-400 flex-shrink-0">
            2m
          </span>
        </div>
        <p className="text-xs text-slate-500 truncate">
          {chat.lastMessage?.content || 'That sounds great! Send it over.'}
        </p>
      </div>
    </div>
  );
};

export default UserChatCard;
