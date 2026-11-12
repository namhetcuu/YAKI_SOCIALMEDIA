import { Avatar, IconButton, Modal, Fade, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../../components/Post/PostCard';
import ProfileModal from './ProfileModal';
import { getUsersPostAction } from '../../../redux/Post/post.action';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';

const tabs = [
  { value: 'post', name: 'Posts', icon: <GridViewRoundedIcon fontSize="small" /> },
  { value: 'reels', name: 'Reels', icon: <MovieOutlinedIcon fontSize="small" /> },
  { value: 'saved', name: 'Saved', icon: <BookmarkBorderRoundedIcon fontSize="small" /> },
];

const Profile = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('post');
  const [open, setOpen] = useState(false);
  const auth = useSelector((state) => state.auth);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = auth.user || { firstName: 'Guest', lastName: 'User', username: 'guest' };
  const userId = user.id;
  const userPosts = useSelector((state) => state.posts?.userPosts || []);

  useEffect(() => {
    if (userId) {
      dispatch(getUsersPostAction(userId));
    }
  }, [dispatch, userId]);

  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username;

  return (
    <div className="w-full max-w-2xl py-4 sm:py-6 space-y-6">
      
      {/* Profile Card Container */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-xs border border-slate-100">
        
        {/* Cover Photo */}
        <div className="h-44 sm:h-56 relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <img
            className="w-full h-full object-cover opacity-90"
            src="https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=1200&auto=format&fit=crop&q=80"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        {/* Profile Info Header */}
        <div className="px-6 pb-6 pt-0 relative">
          
          {/* Avatar & Edit Button Row */}
          <div className="flex justify-between items-end -mt-16 sm:-mt-20 mb-4">
            {/* Avatar with gradient ring */}
            <div className="p-1 rounded-full bg-white shadow-md">
              <div className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-indigo-600">
                <Avatar
                  sx={{ width: { xs: 88, sm: 110 }, height: { xs: 88, sm: 110 } }}
                  src={user.profilePicture || ''}
                  className="bg-white"
                >
                  {fullName.charAt(0)}
                </Avatar>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={handleOpen}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 text-slate-800 font-bold text-xs sm:text-sm bg-white shadow-2xs hover:shadow-xs transition cursor-pointer"
            >
              <EditOutlinedIcon fontSize="small" />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* User Names & Badges */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {fullName}
              </h1>
              <VerifiedIcon sx={{ fontSize: 18, color: '#6366F1' }} />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              @{user.username || `${user.firstName}.${user.lastName}`.toLowerCase()}
            </p>
          </div>

          {/* Bio */}
          <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed max-w-xl">
            {user.bio || 'Digital creator, design enthusiast, and tech explorer. Sharing inspirations daily on YAKI Social ✨'}
          </p>

          {/* Metadata badges */}
          <div className="flex items-center gap-4 text-xs text-slate-400 mt-3 font-medium">
            <span className="flex items-center gap-1">
              <CalendarMonthOutlinedIcon fontSize="inherit" />
              <span>Joined November 2024</span>
            </span>
          </div>

          {/* Counters row */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
            <div>
              <span className="font-extrabold text-slate-900 mr-1.5">
                {Array.isArray(userPosts) ? userPosts.length : 0}
              </span>
              <span className="text-slate-400">Posts</span>
            </div>
            <div>
              <span className="font-extrabold text-slate-900 mr-1.5">1,240</span>
              <span className="text-slate-400">Followers</span>
            </div>
            <div>
              <span className="font-extrabold text-slate-900 mr-1.5">380</span>
              <span className="text-slate-400">Following</span>
            </div>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex border-t border-slate-100 bg-slate-50/50">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setValue(tab.value)}
              className={`flex-1 py-3.5 flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer border-b-2 ${
                value === tab.value
                  ? 'border-indigo-600 text-indigo-600 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

      </div>

      {/* User Posts Stream */}
      <div className="space-y-6">
        {value === 'post' && (
          Array.isArray(userPosts) && userPosts.length > 0 ? (
            userPosts.map((post) => (
              <PostCard key={post.id} item={post} />
            ))
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 shadow-xs">
              <p className="text-sm font-semibold text-slate-400">
                You haven't posted anything yet.
              </p>
            </div>
          )
        )}

        {value === 'reels' && (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 shadow-xs">
            <p className="text-sm font-semibold text-slate-400">
              No Reels uploaded yet.
            </p>
          </div>
        )}

        {value === 'saved' && (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 shadow-xs">
            <p className="text-sm font-semibold text-slate-400">
              Your saved collection is empty.
            </p>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <ProfileModal open={open} handleClose={handleClose} user={user} />
    </div>
  );
};

export default Profile;
