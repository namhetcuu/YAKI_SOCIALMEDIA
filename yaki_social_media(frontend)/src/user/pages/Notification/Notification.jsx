import React, { useState } from 'react';
import {
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';

const initialNotifications = [
  {
    id: 1,
    title: 'New message received',
    message: 'Sarah Jenkins sent you a message: "Hey! Are you free to chat about the new project guidelines?"',
    time: '10 minutes ago',
    read: false,
    type: 'message',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'New follower',
    message: 'Alex Doe started following you.',
    time: '2 hours ago',
    read: false,
    type: 'follow',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Post liked',
    message: 'Elena Fisher and 12 others liked your latest post.',
    time: '5 hours ago',
    read: true,
    type: 'like',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'System update',
    message: 'Welcome to YAKI Social 2.0! Enjoy our new design and upgraded features.',
    time: '1 day ago',
    read: true,
    type: 'system',
    avatar: '',
  },
];

const Notification = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      setNotifications(
        notifications.map((n) =>
          n.id === notification.id ? { ...n, read: true } : n
        )
      );
    }
    setSelectedNotification(notification);
    setOpenDialog(true);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'message':
        return <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 16, color: '#6366F1' }} />;
      case 'follow':
        return <PersonAddAltRoundedIcon sx={{ fontSize: 16, color: '#10B981' }} />;
      case 'like':
        return <FavoriteBorderRoundedIcon sx={{ fontSize: 16, color: '#EF4444' }} />;
      default:
        return <NotificationsNoneRoundedIcon sx={{ fontSize: 16, color: '#F59E0B' }} />;
    }
  };

  return (
    <div className="w-full max-w-2xl py-4 sm:py-6 space-y-4">
      {/* Notifications Header Card */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-100 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            Notifications
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            You have <span className="font-bold text-indigo-600">{unreadCount}</span> unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full transition"
            >
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="text-xs font-bold text-slate-400 hover:text-red-600 px-3 py-1.5 rounded-full transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl p-3 shadow-xs border border-slate-100 divide-y divide-slate-100">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              className={`p-4 rounded-2xl flex items-start gap-3.5 cursor-pointer transition ${
                n.read ? 'hover:bg-slate-50' : 'bg-indigo-50/40 hover:bg-indigo-50/70'
              }`}
            >
              {/* Avatar + Badge */}
              <div className="relative flex-shrink-0">
                <Avatar src={n.avatar} sx={{ width: 42, height: 42 }}>
                  {n.title.charAt(0)}
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center">
                  {getIcon(n.type)}
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-sm leading-tight truncate ${n.read ? 'font-semibold text-slate-800' : 'font-extrabold text-slate-900'}`}>
                    {n.title}
                  </h3>
                  <span className="text-[11px] text-slate-400 flex-shrink-0">
                    {n.time}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {n.message}
                </p>
              </div>

              {/* Unread indicator dot */}
              {!n.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 flex-shrink-0 mt-1.5"></span>
              )}
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <NotificationsNoneRoundedIcon sx={{ fontSize: 40 }} />
            <p className="text-sm font-semibold">No notifications right now</p>
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      {selectedNotification && (
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="xs"
          fullWidth
          slotProps={{
            paper: {
              sx: {
                borderRadius: '1.5rem',
                p: 2,
              },
            },
          }}
        >
          <div className="p-2 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900">
                {selectedNotification.title}
              </span>
              <IconButton size="small" onClick={() => setOpenDialog(false)}>
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedNotification.message}
            </p>

            <span className="text-[11px] text-slate-400 block">
              {selectedNotification.time}
            </span>

            <button
              onClick={() => setOpenDialog(false)}
              className="w-full py-2.5 rounded-full bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Notification;
