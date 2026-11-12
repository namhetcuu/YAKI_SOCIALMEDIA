import {
  Avatar,
  CircularProgress,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PostCard from "../Post/PostCard";
import StoryCircle from "./StoryCircle";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../../../redux/Post/post.action";
import { motion, AnimatePresence } from "framer-motion";

const MiddlePart = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { jwt: token, user } = useSelector((state) => state.auth);
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);
  const handleOpenCreatePostModal = () => setOpenCreatePostModal(true);

  const fetchPosts = useCallback(() => {
    if (token) {
      dispatch(getAllPostAction());
    }
  }, [dispatch, token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const firstName = user?.firstName || "there";

  return (
    <div className="w-full max-w-2xl py-4 sm:py-6 space-y-6">
      
      {/* 1. Stories Row (Matching Mockup 1) */}
      <StoryCircle />

      {/* 2. What's on your mind? Post Creator Box (Matching Mockup 1) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-100 hover:shadow-sm transition">
        <div className="flex items-center gap-3">
          <Avatar
            src={user?.profilePicture || ""}
            sx={{ width: 44, height: 44 }}
            className="ring-2 ring-indigo-500/10"
          >
            {user?.firstName?.charAt(0) || "U"}
          </Avatar>

          <div
            onClick={handleOpenCreatePostModal}
            className="flex-1 flex items-center justify-between px-5 py-3 bg-slate-100/70 hover:bg-slate-100 rounded-full cursor-pointer transition text-slate-500 group"
          >
            <span className="text-sm font-medium">
              What's on your mind, {firstName}?
            </span>
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition">
              <SendRoundedIcon sx={{ fontSize: 16 }} className="-rotate-45 mb-0.5 ml-0.5" />
            </div>
          </div>
        </div>

        {/* Media shortcuts row */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 px-2">
          <button
            onClick={handleOpenCreatePostModal}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-600 cursor-pointer p-1.5 rounded-xl hover:bg-emerald-50 transition"
          >
            <ImageOutlinedIcon sx={{ fontSize: 19, color: "#10B981" }} />
            <span className="hidden sm:inline">Photo / Video</span>
          </button>

          <button
            onClick={handleOpenCreatePostModal}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-rose-600 cursor-pointer p-1.5 rounded-xl hover:bg-rose-50 transition"
          >
            <VideocamOutlinedIcon sx={{ fontSize: 20, color: "#F43F5E" }} />
            <span className="hidden sm:inline">Live Video</span>
          </button>

          <button
            onClick={handleOpenCreatePostModal}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-amber-600 cursor-pointer p-1.5 rounded-xl hover:bg-amber-50 transition"
          >
            <MoodOutlinedIcon sx={{ fontSize: 19, color: "#F59E0B" }} />
            <span className="hidden sm:inline">Feeling</span>
          </button>

          <button
            onClick={handleOpenCreatePostModal}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer p-1.5 rounded-xl bg-indigo-50/70 hover:bg-indigo-100 transition"
          >
            <AutoAwesomeOutlinedIcon sx={{ fontSize: 16 }} />
            <span>AI Assist</span>
          </button>
        </div>
      </div>

      {/* 3. Posts Stream */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <CircularProgress sx={{ color: "#6366F1" }} size={32} />
            <p className="text-xs font-medium text-slate-400">Loading your feed...</p>
          </div>
        ) : error ? (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-center text-xs text-red-600 font-semibold">
            {error}
          </div>
        ) : posts?.length > 0 ? (
          <AnimatePresence>
            {posts.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <PostCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <AutoAwesomeOutlinedIcon />
            </div>
            <h3 className="font-bold text-slate-800 text-base">No posts yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Be the first to share what is on your mind or follow other users to see their updates.
            </p>
            <button
              onClick={handleOpenCreatePostModal}
              className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition cursor-pointer shadow-sm shadow-indigo-600/20"
            >
              Create your first post
            </button>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        handleClose={handleCloseCreatePostModal}
        open={openCreatePostModal}
      />
    </div>
  );
};

export default MiddlePart;
