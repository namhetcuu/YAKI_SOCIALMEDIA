import { useState, useRef, useEffect } from 'react';
import { IconButton, Avatar, CircularProgress } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useSelector, useDispatch } from 'react-redux';
import { getReelsAction } from '../../../redux/Users/user.action';
import { useNavigate } from 'react-router-dom';

const mockReelsSeed = [
  {
    id: 1,
    videoUrl: 'https://videos.pexels.com/video-files/30854811/13194482_360_640_60fps.mp4',
    title: 'Morning workspace aesthetic ☕🌿 #productivity #minimalism',
    username: 'Elena Fisher',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    likes: 1240,
    comments: 86,
    isLiked: false,
    isMuted: true,
  },
  {
    id: 2,
    videoUrl: 'https://videos.pexels.com/video-files/3116584/3116584-hd_1080_1920_30fps.mp4',
    title: 'Sunset vibes over the Pacific horizon 🌅✨',
    username: 'TravelDaily',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    likes: 8520,
    comments: 320,
    isLiked: true,
    isMuted: true,
  },
];

const Reels = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reels, loading } = useSelector((store) => store.users || {});
  const { user } = useSelector((store) => store.auth || {});
  const userId = user?.id;

  const [localReels, setLocalReels] = useState(mockReelsSeed);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (userId) {
      dispatch(getReelsAction(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (reels && reels.length > 0 && user) {
      const mappedReels = reels.map((story) => ({
        id: story.id,
        videoUrl: story.video,
        title: story.title || 'Amazing reel moment ✨',
        username: user.username || 'Creator',
        avatar: user.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        likes: 45,
        comments: 12,
        isLiked: false,
        isMuted: true,
      }));
      setLocalReels(mappedReels);
    }
  }, [reels, user]);

  const handleLike = (id) => {
    setLocalReels((prev) =>
      prev.map((reel) =>
        reel.id === id
          ? {
              ...reel,
              likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1,
              isLiked: !reel.isLiked,
            }
          : reel
      )
    );
  };

  const toggleMute = (id) => {
    setLocalReels((prev) =>
      prev.map((reel) =>
        reel.id === id ? { ...reel, isMuted: !reel.isMuted } : reel
      )
    );
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  const activeReel = localReels[currentReelIndex] || mockReelsSeed[0];

  return (
    <div className="w-full max-w-md mx-auto py-4">
      {/* Container */}
      <div className="relative h-[80vh] max-h-[720px] bg-black rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
        
        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition"
          >
            <ArrowBackRoundedIcon fontSize="small" />
          </button>

          <span className="font-extrabold text-sm tracking-wide">Reels</span>

          <button
            onClick={() => navigate('/home/create-reels')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 font-bold text-xs shadow-sm transition"
          >
            <AddRoundedIcon fontSize="small" />
            <span>Create</span>
          </button>
        </div>

        {/* Video Player */}
        <video
          ref={videoRef}
          src={activeReel.videoUrl}
          className="h-full w-full object-cover cursor-pointer"
          loop
          autoPlay
          playsInline
          muted={activeReel.isMuted}
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.paused
                ? videoRef.current.play()
                : videoRef.current.pause();
            }
          }}
        />

        {/* Bottom Author Info & Caption */}
        <div className="absolute bottom-4 left-4 right-20 z-20 text-white space-y-2">
          <div className="flex items-center gap-2.5">
            <Avatar
              src={activeReel.avatar}
              sx={{ width: 38, height: 38 }}
              className="ring-2 ring-white/60"
            />
            <span className="font-bold text-sm leading-tight drop-shadow-md">
              {activeReel.username}
            </span>
            <button className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition">
              Follow
            </button>
          </div>
          <p className="text-xs text-white/90 leading-relaxed drop-shadow-md line-clamp-2">
            {activeReel.title}
          </p>
        </div>

        {/* Right Floating Actions Column */}
        <div className="absolute right-3.5 bottom-6 z-20 flex flex-col items-center gap-4 text-white">
          {/* Like */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => handleLike(activeReel.id)}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:scale-110 active:scale-95 transition cursor-pointer"
            >
              {activeReel.isLiked ? (
                <FavoriteIcon sx={{ color: '#EF4444', fontSize: 22 }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 22 }} />
              )}
            </button>
            <span className="text-[11px] font-bold">
              {formatNumber(activeReel.likes)}
            </span>
          </div>

          {/* Comments */}
          <div className="flex flex-col items-center gap-1">
            <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:scale-110 transition cursor-pointer">
              <ChatBubbleOutlineIcon sx={{ fontSize: 21 }} />
            </button>
            <span className="text-[11px] font-bold">
              {formatNumber(activeReel.comments)}
            </span>
          </div>

          {/* Share */}
          <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:scale-110 transition cursor-pointer">
            <SendIcon sx={{ fontSize: 20 }} className="-rotate-45 mb-0.5 ml-0.5" />
          </button>

          {/* Mute */}
          <button
            onClick={() => toggleMute(activeReel.id)}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:scale-110 transition cursor-pointer"
          >
            {activeReel.isMuted ? (
              <VolumeOffIcon sx={{ fontSize: 20 }} />
            ) : (
              <VolumeUpIcon sx={{ fontSize: 20 }} />
            )}
          </button>

          {/* More */}
          <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:scale-110 transition cursor-pointer">
            <MoreHorizIcon sx={{ fontSize: 20 }} />
          </button>
        </div>

      </div>

      {/* Switch reel pagination buttons */}
      {localReels.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {localReels.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentReelIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentReelIndex === idx ? 'w-6 bg-indigo-600' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reels;
