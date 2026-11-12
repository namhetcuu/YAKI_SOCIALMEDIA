import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { followUser, getUserWithFollowStatus, unfollowUser } from '../../../redux/Users/user.action';

const PopularUserCard = ({ user }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const followed = user.followed;

  const handleFollowToggle = () => {
    if (!currentUser?.id || !user?.id) return;
    followed
      ? dispatch(unfollowUser(currentUser.id, user.id))
      : dispatch(followUser(currentUser.id, user.id));

    setTimeout(() => dispatch(getUserWithFollowStatus(currentUser.id)), 300);
  };

  const displayName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'User';
  const roleTitle = user?.role === 'ADMIN' ? 'Admin' : 'Creator & Member';

  return (
    <div className="flex items-center justify-between gap-3 group">
      
      {/* Left: Avatar + Names */}
      <div className="flex items-center gap-3 min-w-0">
        <Avatar
          src={user?.profilePicture || user?.avatar || ''}
          alt={displayName}
          sx={{ width: 44, height: 44 }}
          className="ring-2 ring-indigo-500/10 cursor-pointer"
        >
          {displayName.charAt(0)}
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="font-bold text-sm text-slate-900 truncate hover:text-indigo-600 cursor-pointer transition leading-tight">
            {displayName}
          </p>
          <p className="text-xs text-slate-400 truncate mt-0.5">
            {roleTitle}
          </p>
        </div>
      </div>

      {/* Right: Follow Button matching Image 1 */}
      <button
        onClick={handleFollowToggle}
        className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex-shrink-0 ${
          followed
            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm'
        }`}
      >
        {followed ? 'Followed' : 'Follow'}
      </button>
    </div>
  );
};

export default PopularUserCard;
