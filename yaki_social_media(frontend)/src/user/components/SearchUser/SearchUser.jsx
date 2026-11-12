import { Avatar, Card, CardHeader, CircularProgress } from '@mui/material';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../../redux/Auth/auth.action';
import { createChat } from '../../../redux/Message/message.action';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const SearchUser = ({ onSelect }) => {
  const [username, setUsername] = useState('');
  const [searching, setSearching] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const typingTimeoutRef = useRef(null);

  const { auth } = useSelector((store) => store);
  const currentUser = auth.user;
  const searchResults = auth.searchUser || [];

  const handleSearchUser = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (value.trim()) {
      setSearching(true);
      typingTimeoutRef.current = setTimeout(async () => {
        await dispatch(searchUser(value.trim()));
        setSearching(false);
      }, 500);
    } else {
      setSearching(false);
    }
  };

  const handleUserClick = (receiver) => {
    if (onSelect) onSelect(receiver);

    if (!currentUser || !currentUser.id) return;

    const chatData = {
      chatName: `${receiver.firstName || ''} ${receiver.lastName || ''}`.trim() || receiver.username,
      chatImage: receiver.profilePicture || '',
      userIds: [currentUser.id, receiver.id],
    };

    dispatch(createChat(chatData));
    setUsername('');
    navigate('/message');
  };

  return (
    <div className="w-full relative">
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-3.5 text-slate-400" fontSize="small" />
        <input
          type="text"
          placeholder="Search friends or contacts..."
          className="w-full pl-10 pr-10 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 text-sm rounded-full border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
          onChange={handleSearchUser}
          value={username}
        />
        {searching && (
          <CircularProgress
            size={16}
            className="absolute right-3.5 text-indigo-500"
          />
        )}
      </div>

      {/* Search results dropdown */}
      {username.trim() && (
        <div className="absolute left-0 right-0 top-12 z-50 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 max-h-72 overflow-y-auto space-y-1">
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <div
                key={item.id}
                onClick={() => handleUserClick(item)}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50/60 cursor-pointer transition"
              >
                <Avatar
                  src={item.profilePicture || ''}
                  alt={item.firstName}
                  sx={{ width: 40, height: 40 }}
                >
                  {item.firstName?.charAt(0) || 'U'}
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-slate-900 truncate">
                    {item.firstName} {item.lastName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    @{item.username || `${item.firstName}.${item.lastName}`.toLowerCase()}
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition">
                  Message
                </span>
              </div>
            ))
          ) : !searching ? (
            <p className="text-center text-xs text-slate-400 py-4">No users found</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
