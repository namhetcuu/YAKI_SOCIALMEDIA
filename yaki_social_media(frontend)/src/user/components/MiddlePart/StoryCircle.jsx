import React, { useState } from 'react';
import { Avatar, Dialog, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

export const mockStories = [
  {
    id: 1,
    name: 'Sarah M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    media: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
    time: '2h ago',
  },
  {
    id: 2,
    name: 'Davide',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    media: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    time: '4h ago',
  },
  {
    id: 3,
    name: 'DesignDaily',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    media: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    time: '6h ago',
  },
  {
    id: 4,
    name: 'Jasmine',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    media: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
    time: '8h ago',
  },
  {
    id: 5,
    name: 'Alex',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    media: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&auto=format&fit=crop&q=80',
    time: '12h ago',
  },
];

const StoryCircle = () => {
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const [activeStory, setActiveStory] = useState(null);

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-100 mb-6">
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none select-none">
        
        {/* + Add Story item */}
        <div
          onClick={() => setActiveStory(mockStories[0])}
          className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0"
        >
          <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-indigo-300 group-hover:border-indigo-600 flex items-center justify-center transition-all bg-indigo-50/40 group-hover:bg-indigo-50">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition">
              <AddIcon sx={{ fontSize: 20 }} />
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-600 transition truncate max-w-[64px]">
            Add Story
          </span>
        </div>

        {/* Stories list with gradient ring */}
        {mockStories.map((story) => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0"
          >
            {/* Instagram style gradient border ring */}
            <div className="p-[2.5px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-indigo-600 group-hover:scale-105 transition-transform duration-200">
              <div className="p-[2px] bg-white rounded-full">
                <Avatar
                  src={story.avatar}
                  alt={story.name}
                  sx={{ width: 56, height: 56 }}
                />
              </div>
            </div>
            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition truncate max-w-[64px]">
              {story.name}
            </span>
          </div>
        ))}
      </div>

      {/* Story Lightbox / Modal */}
      {activeStory && (
        <Dialog
          open={Boolean(activeStory)}
          onClose={() => setActiveStory(null)}
          maxWidth="sm"
          fullWidth
          slotProps={{
            paper: {
              sx: {
                borderRadius: '1.5rem',
                overflow: 'hidden',
                backgroundColor: '#0F172A',
                position: 'relative',
              },
            },
          }}
        >
          <div className="relative w-full h-[600px] flex items-center justify-center bg-black">
            {/* Story Progress Bar */}
            <div className="absolute top-3 left-4 right-4 z-20 flex gap-1">
              <div className="h-1 flex-1 bg-white/40 rounded-full overflow-hidden">
                <div className="h-full bg-white animate-[pulse_3s_ease-in-out_infinite] w-full"></div>
              </div>
            </div>

            {/* Header info */}
            <div className="absolute top-6 left-4 right-4 z-20 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <Avatar src={activeStory.avatar} sx={{ width: 36, height: 36 }} />
                <div>
                  <p className="font-bold text-sm leading-tight">{activeStory.name}</p>
                  <p className="text-[11px] text-white/70">{activeStory.time}</p>
                </div>
              </div>
              <IconButton
                onClick={() => setActiveStory(null)}
                className="text-white hover:bg-white/20"
                size="small"
              >
                <CloseIcon />
              </IconButton>
            </div>

            {/* Story Image */}
            <img
              src={activeStory.media}
              alt={activeStory.name}
              className="w-full h-full object-cover"
            />
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default StoryCircle;
