import { Avatar, CircularProgress, IconButton, Tooltip } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SearchUser from "../../components/SearchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createMessage,
  getAllChats,
  getMessages,
} from "../../../redux/Message/message.action";
import { uploadToCloudinary } from "../../../shared/utils/uploadToCloudiary";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

if (typeof global === "undefined") {
  window.global = window;
}

const mockConversations = [
  {
    id: 101,
    chatName: 'Sarah Jenkins',
    chatImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    lastMessage: { content: 'That sounds great! Send it over.' },
    time: '2m',
    userIds: ['mock-1'],
  },
  {
    id: 102,
    chatName: 'Dev Team',
    chatImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    lastMessage: { content: 'Meeting at 3 PM confirmed?' },
    time: '1h',
    userIds: ['mock-2'],
  },
  {
    id: 103,
    chatName: 'Alex M.',
    chatImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    lastMessage: { content: 'Can you send the file?' },
    time: 'Yesterday',
    userIds: ['mock-3'],
  },
  {
    id: 104,
    chatName: 'Jessica W.',
    chatImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    lastMessage: { content: 'Thanks for the update!' },
    time: '2d ago',
    userIds: ['mock-4'],
  },
];

const Message = () => {
  const navigate = useNavigate();
  const [stompClient, setStompClient] = useState(null);
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => ({
    message: store.message,
    auth: store.auth,
  }));

  const userId = auth?.user?.id;
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  // WebSocket setup
  useEffect(() => {
    let client = null;
    try {
      const socket = new SockJS("http://localhost:8080/yaki/ws");
      client = Stomp.over(socket);
      client.connect(
        {},
        () => {
          setStompClient(client);
        },
        () => {
          // Fallback if WS server isn't running locally
        }
      );
    } catch (e) {
      // safe fallback
    }

    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!stompClient || !currentChat) return;
    try {
      const subscription = stompClient.subscribe("/topic/messages", (msg) => {
        const newMessage = JSON.parse(msg.body);
        if (newMessage.chatId === currentChat.id) {
          setMessages((prev) => {
            if (!prev.some((m) => m.id === newMessage.id)) {
              return [...prev, newMessage];
            }
            return prev;
          });
        }
      });
      return () => subscription.unsubscribe();
    } catch (e) {}
  }, [stompClient, currentChat]);

  // Fetch chats on mount
  useEffect(() => {
    if (userId) {
      dispatch(getAllChats());
    }
  }, [userId, dispatch]);

  const chatsList =
    message.chats && message.chats.length > 0
      ? message.chats
      : mockConversations;

  // Auto-select first chat on large screens if none selected
  useEffect(() => {
    if (!currentChat && chatsList.length > 0) {
      setCurrentChat(chatsList[0]);
    }
  }, [chatsList, currentChat]);

  // Load messages when currentChat changes
  useEffect(() => {
    if (!currentChat) return;
    setLoadingMessages(true);

    if (currentChat.id >= 100 && currentChat.id <= 104) {
      // Mock conversation seed matching Image 2
      setMessages([
        {
          id: 1,
          userId: 'other-user',
          content: 'Hey! 👋 Are you free to chat about the new project guidelines?',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: 2,
          userId: userId,
          content: 'Hi Sarah! Yes, absolutely. I was just reviewing the docs you sent over.',
          createdAt: new Date(Date.now() - 3000000).toISOString(),
        },
        {
          id: 3,
          userId: 'other-user',
          content: 'Great! There are a few changes in the color palette section. I think we need to make the primary blue a bit more vibrant to match the new marketing material.\n\nAlso, check out this reference image I found.',
          image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
          createdAt: new Date(Date.now() - 1800000).toISOString(),
        },
        {
          id: 4,
          userId: userId,
          content: "That sounds great! I agree, the vibrancy will really help pop on mobile screens. I'll update the style guide.",
          createdAt: new Date().toISOString(),
        },
      ]);
      setLoadingMessages(false);
    } else {
      dispatch(getMessages(currentChat.id)).then((res) => {
        if (res && res.payload) {
          setMessages(res.payload);
        }
        setLoadingMessages(false);
      });
    }
  }, [currentChat, dispatch, userId]);

  const handleSelectImage = async (e) => {
    if (!e.target.files[0]) return;
    setLoading(true);
    try {
      const imgUrl = await uploadToCloudinary(e.target.files[0], "image");
      setSelectedImage(imgUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedImage) return;
    if (!currentChat) return;

    const newMsg = {
      id: Date.now(),
      chatId: currentChat.id,
      content: inputValue.trim(),
      image: selectedImage,
      userId: userId || 'current-user',
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    setSelectedImage(null);

    try {
      await dispatch(createMessage(newMsg));
    } catch (e) {}
  };

  const getChatTitle = (chat) => {
    if (!chat) return "Unknown";
    return chat.chatName || "Chat Conversation";
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC]">
      
      {/* 1. Messenger Top Bar (Exact Match with Image 2) */}
      <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 z-30">
        
        {/* Brand Logo */}
        <div
          onClick={() => navigate('/home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xs">
            <span className="text-sm font-black">⚡</span>
          </div>
          <span className="font-extrabold text-lg tracking-tight text-slate-900">
            YAKI<span className="text-indigo-600">Social</span>
          </span>
        </div>

        {/* Search bar in center */}
        <div className="hidden sm:flex flex-1 max-w-md mx-6">
          <div className="w-full flex items-center gap-2.5 px-4 py-2 bg-slate-100/80 rounded-full border border-slate-100 text-slate-400">
            <SearchIcon fontSize="small" className="text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Search YAKI Social...</span>
          </div>
        </div>

        {/* Top right navigation shortcuts */}
        <div className="flex items-center gap-2">
          <IconButton onClick={() => navigate('/home')} size="small" className="text-slate-600 hover:text-indigo-600">
            <HomeRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => navigate('/home/reels')} size="small" className="text-slate-600 hover:text-indigo-600">
            <ExploreOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => navigate('/home/notifications')} size="small" className="text-slate-600 hover:text-indigo-600">
            <NotificationsNoneRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" className="text-indigo-600 bg-indigo-50">
            <ChatBubbleRoundedIcon fontSize="small" />
          </IconButton>
          <Avatar
            src={auth.user?.profilePicture || ""}
            sx={{ width: 32, height: 32 }}
            className="ring-2 ring-indigo-500/20 cursor-pointer ml-1"
            onClick={() => navigate(`/home/profile/${userId}`)}
          />
        </div>
      </header>

      {/* 2. Main Messenger Two-Column Body */}
      <div className="flex-1 flex overflow-hidden max-w-7xl w-full mx-auto p-3 sm:p-4 gap-4">
        
        {/* Left Column: Messages List (Mockup 2 Left) */}
        <div
          className={`${
            currentChat ? 'hidden md:flex' : 'flex'
          } w-full md:w-80 lg:w-96 bg-white rounded-3xl border border-slate-100 shadow-xs flex-col overflow-hidden`}
        >
          {/* Header */}
          <div className="p-5 pb-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-4">
              Messages
            </h1>

            {/* Search Input */}
            <div className="relative flex items-center">
              <SearchIcon className="absolute left-3.5 text-slate-400" fontSize="small" />
              <input
                type="text"
                placeholder="Search messages"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100/70 focus:bg-white text-xs text-slate-800 rounded-full border border-transparent focus:border-indigo-500 outline-none transition"
              />
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto px-3 space-y-1 pb-4">
            {chatsList
              .filter((c) =>
                getChatTitle(c).toLowerCase().includes(searchFilter.toLowerCase())
              )
              .map((chat) => (
                <div key={chat.id} onClick={() => setCurrentChat(chat)}>
                  <UserChatCard
                    chat={chat}
                    chatName={getChatTitle(chat)}
                    isActive={currentChat?.id === chat.id}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Right Column: Active Chat Stream (Mockup 2 Right) */}
        {currentChat ? (
          <div className="flex-1 flex flex-col bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
            
            {/* Active Chat Header */}
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <IconButton
                  onClick={() => setCurrentChat(null)}
                  className="md:hidden text-slate-500"
                  size="small"
                >
                  <ArrowBackRoundedIcon fontSize="small" />
                </IconButton>

                <div className="relative">
                  <Avatar
                    src={currentChat.chatImage || ""}
                    sx={{ width: 42, height: 42 }}
                  >
                    {getChatTitle(currentChat).charAt(0)}
                  </Avatar>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {getChatTitle(currentChat)}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                    Active now
                  </p>
                </div>
              </div>

              {/* Call & Info Action Icons */}
              <div className="flex items-center gap-1 text-slate-500">
                <IconButton size="small" className="hover:text-indigo-600 hover:bg-indigo-50">
                  <CallIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" className="hover:text-indigo-600 hover:bg-indigo-50">
                  <VideocamIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" className="hover:text-indigo-600 hover:bg-indigo-50">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </div>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50">
              {loadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <CircularProgress size={28} sx={{ color: '#6366F1' }} />
                </div>
              ) : (
                <ChatMessage messages={messages} currentUserId={userId} />
              )}
            </div>

            {/* Image attachment preview if selected */}
            {selectedImage && (
              <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-14 h-14 object-cover rounded-xl"
                  />
                  <IconButton
                    size="small"
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-2 -right-2 bg-slate-800 text-white hover:bg-black p-0.5"
                  >
                    <CloseIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </div>
              </div>
            )}

            {/* Bottom Input Dock (Matching Mockup 2) */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center gap-2">
              <input
                type="file"
                id="chat-image"
                accept="image/*"
                className="hidden"
                onChange={handleSelectImage}
              />
              <label htmlFor="chat-image">
                <IconButton component="span" size="small" className="text-slate-400 hover:text-indigo-600">
                  <InsertPhotoOutlinedIcon fontSize="small" />
                </IconButton>
              </label>

              <IconButton size="small" className="text-slate-400 hover:text-indigo-600">
                <MicNoneOutlinedIcon fontSize="small" />
              </IconButton>

              {/* Text Input */}
              <div className="flex-1 flex items-center bg-slate-100/80 focus-within:bg-white rounded-full border border-transparent focus-within:border-indigo-500 px-4 py-2 transition">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                  className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder-slate-400"
                />

                <button className="text-slate-400 hover:text-slate-600 ml-1">
                  <SentimentSatisfiedAltOutlinedIcon fontSize="small" />
                </button>
              </div>

              {/* AI Sticker Button (Image 2) */}
              <button
                type="button"
                onClick={() => setInputValue((prev) => prev + " ✨ Great idea! Let's do it!")}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-semibold border border-indigo-100 transition cursor-pointer"
              >
                <AutoAwesomeOutlinedIcon sx={{ fontSize: 14 }} />
                <span>AI Sticker</span>
              </button>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() && !selectedImage}
                className="w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md shadow-indigo-600/25 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer flex-shrink-0"
              >
                <SendRoundedIcon sx={{ fontSize: 16 }} className="-rotate-45 mb-0.5 ml-0.5" />
              </button>
            </div>

          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-white rounded-3xl border border-slate-100 shadow-xs">
            <p className="text-sm font-semibold text-slate-400">
              Select a conversation to start messaging
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Message;
