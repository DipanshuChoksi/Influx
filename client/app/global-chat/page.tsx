"use client";
import { redirect } from "next/navigation";
import Sidebar from "../components/ui/Sidebar";
import Member from "../components/ui/Member";
import Message from "../components/ui/Message";
import ChatIcon from "../components/icons/ChatIcon";
import useUser from "../contexts/user.context";

export default function GlobalChatPage() {
  const user = useUser((state) => state.user);

  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden">
      <Sidebar />

      {/* Main Chat Area */}
      <main className="pl-20 md:pl-64 flex-1 flex flex-col h-screen">
        {/* Chat Header */}
        <header className="h-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 px-8 flex items-center justify-between z-40 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ChatIcon />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-none">
                Global Chat
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-slate-950 bg-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                +12
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          <Message
            user="Alice"
            time="10:24 AM"
            content="Hey everyone! Anyone up for a watch party tonight? 🍿"
            color="text-pink-400"
            bg="bg-pink-400/10"
          />
        </div>

        {/* Chat Input */}
        <div className="p-8 shrink-0">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute inset-x-0 -top-8 flex justify-center opacity-0 group-focus-within:opacity-100 transition-opacity">
              <span className="text-[10px] font-medium text-slate-500 italic">
                Alice, Bob, and 2 others are typing...
              </span>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-2 flex items-center gap-2 shadow-2xl shadow-indigo-500/5 group-focus-within:border-indigo-500/50 group-focus-within:ring-4 group-focus-within:ring-indigo-500/10 transition-all">
              <button className="p-3 text-slate-500 hover:text-indigo-400 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Type a message to the server..."
                className="flex-1 bg-transparent border-none py-4 px-2 text-sm text-white focus:outline-none placeholder:text-slate-600"
              />
              <div className="flex items-center gap-1 pr-2">
                <button className="p-2.5 text-slate-500 hover:text-amber-400 transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-600/20">
                  <svg
                    className="w-5 h-5 rotate-90"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
