import { useContext, useState } from "react";
import { assets } from "../../../assets/assets.js";
import { Context } from "../../pages/ChatWithAI/Context.jsx";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

const ChatWithAI = () => {
  const navigate = useNavigate();
  const [showUserDetail, setShowUserDetail] = useState(false);
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      
      {/* Top Header */}
      <header className="h-16 px-6 bg-white border-b border-slate-100 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition cursor-pointer"
          >
            <ArrowBackRoundedIcon fontSize="small" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
              <AutoAwesomeIcon sx={{ fontSize: 16 }} />
            </div>
            <span className="font-extrabold text-base text-slate-900">
              YAKI <span className="text-indigo-600">AI Assistant</span>
            </span>
          </div>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
          Powered by Gemini
        </span>
      </header>

      {/* Main Conversation Canvas */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-10 space-y-8"
            >
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-500/20">
                  <AutoAwesomeIcon sx={{ fontSize: 28 }} />
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  How can I help you today?
                </h1>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Ask questions, generate post captions, brainstorm community topics, or get code assistance.
                </p>
              </div>

              {/* Suggestion prompt cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {[
                  {
                    title: "Write a viral social post",
                    desc: "Draft a post about minimal workspaces & productivity",
                  },
                  {
                    title: "Brainstorm community events",
                    desc: "Ideas for engaging tech & design creators",
                  },
                  {
                    title: "Analyze photography trends",
                    desc: "What aesthetics are gaining traction in 2026?",
                  },
                  {
                    title: "Code review & assistance",
                    desc: "Help optimize React & Tailwind components",
                  },
                ].map((card, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSent(card.title + ': ' + card.desc)}
                    className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs hover:shadow-md hover:border-indigo-200 cursor-pointer transition-all duration-200 group"
                  >
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{card.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 pb-28"
            >
              {/* User Prompt */}
              <div className="flex justify-end">
                <div className="max-w-xl p-4 rounded-3xl rounded-tr-xs bg-indigo-600 text-white text-sm shadow-xs">
                  {recentPrompt}
                </div>
              </div>

              {/* AI Response */}
              <div className="flex items-start gap-3 max-w-2xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center flex-shrink-0">
                  <AutoAwesomeIcon sx={{ fontSize: 16 }} />
                </div>

                <div className="flex-1 p-5 rounded-3xl rounded-tl-xs bg-white border border-slate-100 text-slate-800 text-sm leading-relaxed shadow-xs">
                  {loading ? (
                    <div className="space-y-2 py-2">
                      <div className="h-3 bg-slate-200 rounded-full animate-pulse w-3/4"></div>
                      <div className="h-3 bg-slate-200 rounded-full animate-pulse w-5/6"></div>
                      <div className="h-3 bg-slate-200 rounded-full animate-pulse w-2/3"></div>
                    </div>
                  ) : (
                    <div
                      className="prose prose-sm max-w-none text-slate-800"
                      dangerouslySetInnerHTML={{ __html: resultData }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Bottom Input Dock */}
      <div className="sticky bottom-0 w-full bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent p-4 sm:p-6 z-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 p-2 pl-4 rounded-full bg-white border border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 shadow-md shadow-slate-200/50 transition">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSent()}
              placeholder="Ask YAKI AI anything..."
              className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder-slate-400"
            />

            <button
              onClick={() => onSent()}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-sm disabled:opacity-40 transition cursor-pointer flex-shrink-0"
            >
              <SendRoundedIcon sx={{ fontSize: 16 }} className="-rotate-45 mb-0.5 ml-0.5" />
            </button>
          </div>
          <p className="text-center text-[11px] text-slate-400 mt-2">
            YAKI AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>

    </div>
  );
};

export default ChatWithAI;
