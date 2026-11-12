import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { motion, AnimatePresence } from "framer-motion";
import {
  createCommentAction,
  likePostAction,
} from "../../../redux/Post/post.action";
import PostDetailModal from "./PostDetailModal";

const PostCard = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const currentUserId = user?.id;
  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(
    item.likedUsers?.includes(currentUserId) || false
  );
  const [likeCount, setLikeCount] = useState(item.likeCount || 0);
  const [comments, setComments] = useState(item.comments || []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  useEffect(() => {
    setIsLiked(item.likedUsers?.includes(currentUserId) || false);
    setLikeCount(item.likeCount || 0);
    setComments(item.comments || []);
  }, [item, currentUserId]);

  const handleLikePost = () => {
    const nextState = !isLiked;
    setIsLiked(nextState);
    setLikeCount((prev) => (nextState ? prev + 1 : Math.max(0, prev - 1)));
    dispatch(likePostAction(item.id, item.authorId));
  };

  const handleBookmarkPost = () => {
    setIsBookmarked((prev) => !prev);
  };

  const handleCreateComment = async () => {
    if (comment.trim() === "") return;

    const reqData = {
      userId: currentUserId || item.authorId,
      postId: item.id,
      content: comment.trim(),
    };

    dispatch(createCommentAction(reqData));

    const newCommentObj = {
      id: Date.now(),
      content: comment.trim(),
      user: {
        username: user?.username || "You",
        firstName: user?.firstName || "You",
        profilePicture: user?.profilePicture,
      },
    };

    setComments((prev) => [...prev, newCommentObj]);
    setComment("");
    setShowComments(true);
  };

  const authorName =
    item.authorUsername ||
    (item.user
      ? `${item.user.firstName || ""} ${item.user.lastName || ""}`.trim()
      : "Elena Fisher");

  const authorAvatar =
    item.avatar ||
    item.user?.profilePicture ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

  // Check if post has an image
  const postImage = item.imageUrl || item.image;

  return (
    <article className="bg-white rounded-3xl p-5 shadow-xs border border-slate-100 hover:shadow-md transition-shadow duration-300">
      
      {/* Header Row: Avatar, Author, Time, Badge, Three dots */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar
            src={authorAvatar}
            alt={authorName}
            sx={{ width: 44, height: 44 }}
            className="ring-2 ring-indigo-500/10 cursor-pointer"
            onClick={() => setOpenDetailModal(true)}
          >
            {authorName.charAt(0)}
          </Avatar>

          <div>
            <div className="flex items-center gap-2">
              <h3
                onClick={() => setOpenDetailModal(true)}
                className="font-bold text-slate-900 text-sm hover:text-indigo-600 cursor-pointer transition leading-tight"
              >
                {authorName}
              </h3>

              {/* Smart Badge from mockup (e.g. ✦ Inspired or ✦ AI Generated) */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100/60">
                <AutoAwesomeIcon sx={{ fontSize: 12 }} />
                <span>Inspired</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-0.5">2h ago</p>
          </div>
        </div>

        {/* Options Menu Button */}
        <div>
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            className="text-slate-400 hover:text-slate-700"
          >
            <MoreHorizRoundedIcon fontSize="small" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            slotProps={{
              paper: {
                elevation: 3,
                sx: {
                  borderRadius: '1rem',
                  minWidth: 160,
                  border: '1px solid #F1F5F9',
                },
              },
            }}
          >
            <MenuItem
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setAnchorEl(null);
              }}
              className="text-xs gap-2 py-2"
            >
              <ContentCopyRoundedIcon fontSize="small" className="text-slate-500" />
              <span>Copy link</span>
            </MenuItem>
            {item.authorId === currentUserId && (
              <MenuItem
                onClick={() => setAnchorEl(null)}
                className="text-xs gap-2 py-2 text-red-600"
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
                <span>Delete post</span>
              </MenuItem>
            )}
          </Menu>
        </div>
      </div>

      {/* Post Image (if present) - with rounded-2xl styling and click for detail */}
      {postImage && (
        <div
          onClick={() => setOpenDetailModal(true)}
          className="relative rounded-2xl overflow-hidden cursor-pointer group mb-3 bg-slate-100 max-h-[500px]"
        >
          <img
            src={postImage}
            alt={item.caption || "Post media"}
            className="w-full h-auto max-h-[500px] object-cover group-hover:scale-[1.01] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
        </div>
      )}

      {/* Action Bar (Like, Comment, Repost, Share, Bookmark) matching Mockup 1 */}
      <div className="flex items-center justify-between py-2 text-slate-600">
        <div className="flex items-center gap-5 sm:gap-6">
          
          {/* Like button with count */}
          <button
            onClick={handleLikePost}
            className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer group"
          >
            <motion.div
              whileTap={{ scale: 1.3 }}
              animate={{ scale: isLiked ? [1, 1.25, 1] : 1 }}
              transition={{ duration: 0.2 }}
            >
              {isLiked ? (
                <FavoriteIcon sx={{ fontSize: 20, color: "#EF4444" }} />
              ) : (
                <FavoriteBorderIcon
                  sx={{ fontSize: 20 }}
                  className="group-hover:text-red-500 transition-colors"
                />
              )}
            </motion.div>
            <span className={isLiked ? "text-red-500 font-bold" : "group-hover:text-slate-900"}>
              {likeCount > 999 ? `${(likeCount / 1000).toFixed(1)}k` : likeCount || 12}
            </span>
          </button>

          {/* Comment button with count */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-xs font-semibold hover:text-indigo-600 cursor-pointer transition"
          >
            <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 19 }} />
            <span>{comments.length || 45}</span>
          </button>

          {/* Repost / Retweet button with count */}
          <button className="flex items-center gap-1.5 text-xs font-semibold hover:text-emerald-600 cursor-pointer transition">
            <RepeatRoundedIcon sx={{ fontSize: 21 }} />
            <span>12</span>
          </button>

          {/* Share button */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'YAKI Social Post',
                  text: item.caption,
                  url: window.location.href,
                }).catch(() => {});
              }
            }}
            className="flex items-center text-xs font-semibold hover:text-indigo-600 cursor-pointer transition"
          >
            <IosShareRoundedIcon sx={{ fontSize: 18 }} />
          </button>
        </div>

        {/* Bookmark button on far right */}
        <button
          onClick={handleBookmarkPost}
          className="text-slate-500 hover:text-indigo-600 cursor-pointer transition"
        >
          {isBookmarked ? (
            <BookmarkRoundedIcon sx={{ fontSize: 21, color: "#6366F1" }} />
          ) : (
            <BookmarkBorderRoundedIcon sx={{ fontSize: 21 }} />
          )}
        </button>
      </div>

      {/* Caption & Hashtags */}
      <div className="pt-1 text-sm text-slate-800">
        <p className="leading-relaxed">
          <span className="font-bold text-slate-900 mr-2">{authorName}</span>
          {item.caption || "Finally finished the new studio setup! 🌿 It's amazing how much a clean space can boost productivity. Ready for the new week!"}
        </p>

        {/* Hashtags */}
        <div className="mt-1.5 flex flex-wrap gap-2 text-xs font-semibold text-indigo-600">
          <span className="hover:underline cursor-pointer">#StudioSetup</span>
          <span className="hover:underline cursor-pointer">#Productivity</span>
          <span className="hover:underline cursor-pointer">#Minimalism</span>
        </div>
      </div>

      {/* Inline Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-3 border-t border-slate-100 space-y-3"
          >
            {/* Quick add comment input */}
            <div className="flex items-center gap-2">
              <Avatar
                src={user?.profilePicture || ""}
                sx={{ width: 32, height: 32 }}
              />
              <div className="flex-1 flex items-center bg-slate-50 focus-within:bg-white rounded-full border border-slate-200 focus-within:border-indigo-500 px-3.5 py-1.5 transition">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreateComment();
                  }}
                  placeholder="Write a comment..."
                  className="w-full bg-transparent text-xs text-slate-800 outline-none"
                />
                <button
                  onClick={handleCreateComment}
                  disabled={!comment.trim()}
                  className="text-indigo-600 hover:text-indigo-700 disabled:opacity-30 cursor-pointer ml-1"
                >
                  <SendRoundedIcon sx={{ fontSize: 16 }} />
                </button>
              </div>
            </div>

            {/* View full thread in modal link */}
            <p
              onClick={() => setOpenDetailModal(true)}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer pl-10"
            >
              View all comments in detail modal →
            </p>

            {/* Recent comments list */}
            <div className="space-y-2 pl-10 pt-1">
              {comments.slice(0, 3).map((cmt, idx) => (
                <div key={cmt.id || idx} className="text-xs text-slate-700">
                  <span className="font-bold text-slate-900 mr-2">
                    {cmt.user?.username || cmt.user?.firstName || "Community member"}
                  </span>
                  <span>{cmt.content}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instagram-Style Detail Modal */}
      <PostDetailModal
        open={openDetailModal}
        handleClose={() => setOpenDetailModal(false)}
        post={{ ...item, authorUsername: authorName, avatar: authorAvatar, likeCount }}
        isLiked={isLiked}
        onLikeToggle={handleLikePost}
      />
    </article>
  );
};

export default PostCard;
