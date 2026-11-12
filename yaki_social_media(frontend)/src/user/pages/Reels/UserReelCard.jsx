import React from 'react';

const UserReelCard = ({ videoUrl, title }) => {
  return (
    <div className="w-56 h-80 rounded-2xl overflow-hidden relative bg-black shadow-xs border border-slate-100 group">
      <video
        className="w-full h-full object-cover"
        src={videoUrl || 'https://videos.pexels.com/video-files/30854811/13194482_360_640_60fps.mp4'}
        controls
      />
      {title && (
        <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs p-2 rounded-xl text-white text-xs truncate">
          {title}
        </div>
      )}
    </div>
  );
};

export default UserReelCard;
