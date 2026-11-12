import { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, IconButton, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersByIds } from '../../../redux/Users/user.action';

const ChatMessage = ({ messages, currentUserId }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const dispatch = useDispatch();

  const userIds = useMemo(() => {
    return messages?.map((message) => message.userId) || [];
  }, [messages]);

  const { allUsers } = useSelector((store) => store.users) || {};

  useEffect(() => {
    if (userIds.length > 0) {
      dispatch(getUsersByIds(userIds));
    }
  }, [userIds.length, dispatch]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="space-y-4 px-2 sm:px-4 py-3">
      
      {/* Date Divider matching Image 2 */}
      <div className="flex items-center justify-center my-4">
        <span className="text-[11px] font-semibold text-slate-400 bg-white/80 px-3 py-1 rounded-full border border-slate-100 shadow-2xs">
          Today, 10:23 AM
        </span>
      </div>

      {messages?.map((message) => {
        const isMe = message.userId === currentUserId;
        const user = allUsers ? allUsers[message.userId] : null;

        return (
          <div
            key={message.id || Math.random()}
            className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
          >
            {/* Other user's avatar */}
            {!isMe && (
              <Avatar
                src={user?.profilePicture || ''}
                sx={{ width: 32, height: 32 }}
                className="mb-1 flex-shrink-0"
              >
                {user?.firstName?.charAt(0) || 'U'}
              </Avatar>
            )}

            <div
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[78%] sm:max-w-md`}
            >
              <div
                className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                  isMe
                    ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                    : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                }`}
              >
                {/* Image if attached */}
                {message.image && (
                  <div className="mb-2 rounded-xl overflow-hidden cursor-pointer">
                    <img
                      src={message.image}
                      alt="Shared media"
                      className="max-h-60 w-auto rounded-xl object-cover hover:opacity-95 transition"
                      onClick={() => handleImageClick(message.image)}
                    />
                  </div>
                )}

                {/* Message text */}
                {message.content && <p className="whitespace-pre-wrap">{message.content}</p>}
              </div>

              {/* Timestamp */}
              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {message.createdAt
                  ? new Date(message.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Just now'}
              </span>
            </div>
          </div>
        );
      })}

      {/* Lightbox Preview */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent className="relative p-0 bg-black flex items-center justify-center min-h-[400px]">
          <IconButton
            onClick={handleClose}
            className="absolute right-3 top-3 z-10 bg-black/50 text-white hover:bg-black/80"
          >
            <CloseIcon />
          </IconButton>
          <img
            src={selectedImage}
            alt="Preview"
            className="w-full h-full object-contain max-h-[80vh]"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatMessage;
