import React, { useEffect, useState } from 'react';
import PopularUserCard from './PopularUserCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUserWithFollowStatus } from '../../../redux/Users/user.action';
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

const trendingTopics = [
  {
    category: 'Design • Trending',
    tag: '#Minimalism',
    posts: '24.5k Posts',
    trending: false,
  },
  {
    category: 'Platform',
    tag: '#YAKIUpdate',
    posts: '12.1k Posts',
    trending: true,
  },
  {
    category: 'Lifestyle',
    tag: '#SummerVibes',
    posts: '89k Posts',
    trending: false,
  },
  {
    category: 'Technology',
    tag: '#ArtificialIntelligence',
    posts: '154k Posts',
    trending: true,
  },
];

const mockSuggestedUsers = [
  {
    id: 'mock-1',
    username: 'alexdoe',
    firstName: 'Alex',
    lastName: 'Doe',
    profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    roleTitle: 'Photographer',
    followed: false,
  },
  {
    id: 'mock-2',
    username: 'creativebloq',
    firstName: 'Creative',
    lastName: 'Bloq',
    profilePicture: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    roleTitle: 'Design News',
    followed: true,
  },
  {
    id: 'mock-3',
    username: 'mias',
    firstName: 'Mia',
    lastName: 'S.',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    roleTitle: 'Illustrator',
    followed: false,
  },
];

const HomeRight = () => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);

  const userWithFollow = useSelector((state) => state.users.userWithFollow) || [];
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getUserWithFollowStatus(currentUser.id));
    }
  }, [dispatch, currentUser]);

  // Combine real users from backend or fallback to mock users so UI looks vibrant right away
  const displayedUsers =
    userWithFollow.length > 0
      ? userWithFollow.filter((u) => u.id !== currentUser?.id)
      : mockSuggestedUsers;

  return (
    <div className="space-y-6 py-4 sm:py-6 pl-2">
      
      {/* 1. Trending Card (Matching Image 1) */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-extrabold text-slate-900 text-base">Trending</h2>
          <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer transition">
            View all
          </button>
        </div>

        <div className="space-y-4">
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="flex items-start justify-between group cursor-pointer"
            >
              <div>
                <p className="text-[11px] font-medium text-slate-400">
                  {topic.category}
                </p>
                <p className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition">
                  {topic.tag}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {topic.posts}
                </p>
              </div>

              <div className="pt-1">
                {topic.trending ? (
                  <span className="text-emerald-500 flex items-center">
                    <NorthEastRoundedIcon sx={{ fontSize: 16 }} />
                  </span>
                ) : (
                  <MoreHorizRoundedIcon
                    sx={{ fontSize: 16 }}
                    className="text-slate-300 group-hover:text-slate-500"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Suggested for you Card (Matching Image 1) */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-extrabold text-slate-900 text-base">Suggested for you</h2>
          {displayedUsers.length > 4 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer transition"
            >
              {showAll ? 'Less' : 'See all'}
            </button>
          )}
        </div>

        <div className="space-y-4">
          {(showAll ? displayedUsers : displayedUsers.slice(0, 4)).map((user) => (
            <PopularUserCard key={user.id} user={user} />
          ))}
        </div>
      </div>

      {/* 3. Footer Links (Matching Image 1) */}
      <div className="px-3 text-[11px] text-slate-400 leading-relaxed space-y-1">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <a href="#" className="hover:text-slate-600 transition">About</a>
          <span>·</span>
          <a href="#" className="hover:text-slate-600 transition">Help</a>
          <span>·</span>
          <a href="#" className="hover:text-slate-600 transition">Press</a>
          <span>·</span>
          <a href="#" className="hover:text-slate-600 transition">API</a>
          <span>·</span>
          <a href="#" className="hover:text-slate-600 transition">Jobs</a>
          <span>·</span>
          <a href="#" className="hover:text-slate-600 transition">Privacy</a>
          <span>·</span>
          <a href="#" className="hover:text-slate-600 transition">Terms</a>
        </div>
        <p className="pt-1">© 2026 YAKI Social, Inc.</p>
      </div>

    </div>
  );
};

export default HomeRight;
