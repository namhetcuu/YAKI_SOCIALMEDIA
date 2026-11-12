import React, { useState } from 'react';
import {
  Dialog,
  Avatar,
  IconButton,
  Divider,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction } from '../../../redux/Post/post.action';

const PostDetailModal = ({ open, handleClose, post, isLiked, onLikeToggle }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const [commentText, setCommentText] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentsList, setCommentsList] = useState(post?.comments || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  if (!post) return null;

  const authorName = post.authorUsername || `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`.trim() || 'TechInsider';
  const authorAvatar = post.avatar || currentUser?.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
  const postImage = post.imageUrl || post.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80';

  const handleSendComment = async (e) => {
    if (e) e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    const reqData = {
      userId: currentUser?.id,
      postId: post.id,
      content: commentText.trim(),
    };

    dispatch(createCommentAction(reqData));

    const newComment = {
      id: Date.now(),
      content: commentText.trim(),
      user: {
        username: currentUser?.username || 'you',
        firstName: currentUser?.firstName || 'Current',
        lastName: currentUser?.lastName || 'User',
        profilePicture: currentUser?.profilePicture,
      },
      createdAt: new Date().toISOString(),
      likeCount: 0,
    };

    setCommentsList((prev) => [newComment, ...prev]);
    setCommentText('');
    setIsSubmitting(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '1.75rem',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            maxHeight: '92vh',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          },
        },
      }}
    >
      <div className="flex flex-col md:flex-row h-[85vh] max-h-[750px]">
        
        {/* Left Column: Media display (Instagram style) */}
        <div className="md:w-3/5 bg-slate-950 relative flex items-center justify-center overflow-hidden">
          {/* Pagination badge like in Image 3 (e.g. 1/4) */}
          <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
            1 / 1
          </div>

          <img
            src={postImage}
            alt={post.caption || 'Post image'}
            className="w-full h-full object-contain"
          />

          {/* Carousel dots indicator at bottom */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
            <span className="w-2 h-2 rounded-full bg-white shadow-sm"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
          </div>
        </div>

        {/* Right Column: Post details & comments stream */}
        <div className="md:w-2/5 flex flex-col justify-between bg-white h-full border-l border-slate-100">
          
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar src={authorAvatar} sx={{ width: 40, height: 40 }}>
                {authorName.charAt(0)}
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900 truncate">
                    {authorName}
                  </span>
                  <VerifiedIcon sx={{ fontSize: 16, color: '#6366F1' }} />
                </div>
                <p className="text-[11px] text-slate-400">Original Audio</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`text-xs font-bold px-3 py-1 rounded-full transition ${
                  isFollowing
                    ? 'bg-slate-100 text-slate-700'
                    : 'text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <IconButton onClick={handleClose} size="small" className="text-slate-400 hover:text-slate-700">
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          </div>

          {/* Scrollable middle area: Post caption & comments */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Caption item */}
            <div className="flex gap-3 items-start">
              <Avatar src={authorAvatar} sx={{ width: 34, height: 34 }} />
              <div className="flex-1 text-sm">
                <p className="text-slate-800">
                  <span className="font-bold text-slate-900 mr-1.5">{authorName}</span>
                  {post.caption || 'Found this hidden gem while hiking through the northern trails. The sound of water crashing down is purely therapeutic. 🌲 Can anyone guess exactly where this is?'}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5 text-xs text-indigo-600 font-semibold">
                  <span>#NaturePhotography</span>
                  <span>#Wanderlust</span>
                  <span>#HiddenGems</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">2h ago</p>
              </div>
            </div>

            <Divider sx={{ my: 1 }} />

            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Comments ({commentsList?.length || 0})
            </div>

            {/* Comments list */}
            <div className="space-y-3.5">
              {commentsList && commentsList.length > 0 ? (
                commentsList.map((cmt, idx) => (
                  <div key={cmt.id || idx} className="flex gap-3 items-start group">
                    <Avatar
                      src={cmt.user?.profilePicture || ''}
                      sx={{ width: 32, height: 32 }}
                    >
                      {cmt.user?.username?.charAt(0) || 'C'}
                    </Avatar>
                    <div className="flex-1 text-xs">
                      <p className="text-slate-800">
                        <span className="font-bold text-slate-900 mr-1.5">
                          {cmt.user?.username || 'Alex Morgan'}
                        </span>
                        {cmt.content}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                        <span>45m</span>
                        <button className="font-semibold text-slate-500 hover:text-slate-900 cursor-pointer">
                          Reply
                        </button>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-red-500 ml-auto">
                          <FavoriteBorderIcon sx={{ fontSize: 13 }} />
                          <span>12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-slate-400 py-6">
                  No comments yet. Start the conversation!
                </p>
              )}
            </div>
          </div>

          {/* Footer Area: Actions & Add Comment Input */}
          <div className="border-t border-slate-100 p-4 bg-white space-y-3">
            {/* Actions Bar (matching Image 3) */}
            <div className="flex items-center justify-between text-slate-700">
              <div className="flex items-center gap-4">
                <button
                  onClick={onLikeToggle}
                  className="hover:scale-110 active:scale-95 transition cursor-pointer"
                >
                  {isLiked ? (
                    <FavoriteIcon sx={{ color: '#EF4444' }} />
                  ) : (
                    <FavoriteBorderIcon className="hover:text-red-500 transition-colors" />
                  )}
                </button>
                <button className="hover:scale-110 transition cursor-pointer hover:text-indigo-600">
                  <ChatBubbleOutlineRoundedIcon />
                </button>
                <button className="hover:scale-110 transition cursor-pointer hover:text-indigo-600">
                  <RepeatRoundedIcon />
                </button>
                <button className="hover:scale-110 transition cursor-pointer hover:text-indigo-600">
                  <SendRoundedIcon className="-rotate-45 mb-1" />
                </button>
              </div>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="hover:scale-110 transition cursor-pointer"
              >
                {isBookmarked ? (
                  <BookmarkRoundedIcon className="text-indigo-600" />
                ) : (
                  <BookmarkBorderRoundedIcon className="hover:text-indigo-600 transition-colors" />
                )}
              </button>
            </div>

            {/* Likes count & date */}
            <div>
              <p className="font-bold text-xs text-slate-900">
                {(post.likeCount || 1234) + (isLiked ? 1 : 0)} likes
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                2 HOURS AGO
              </p>
            </div>

            {/* Comment Input */}
            <form onSubmit={handleSendComment} className="flex items-center gap-2 pt-1">
              <button
                type="button"
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <SentimentSatisfiedAltRoundedIcon fontSize="small" />
              </button>

              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-full px-3.5 py-2 outline-none transition"
              />

              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-700 p-1"
                title="AI Assist"
              >
                <AutoAwesomeRoundedIcon fontSize="small" />
              </button>

              <button
                type="submit"
                disabled={!commentText.trim() || isSubmitting}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 disabled:opacity-40 transition cursor-pointer px-2"
              >
                {isSubmitting ? <CircularProgress size={14} /> : 'Post'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </Dialog>
  );
};

export default PostDetailModal;

