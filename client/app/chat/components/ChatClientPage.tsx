import ChatIcon from "@/app/components/icons/ChatIcon";
import PlusIcon from "@/app/components/icons/PlusIcon";
import SendIcon from "@/app/components/icons/SendIcon";
import SmileIcon from "@/app/components/icons/SmileIcon";
import ThreeDotIcon from "@/app/components/icons/ThreeDotIcon";
import Message from "@/app/components/ui/Message";
import Sidebar from "@/app/components/ui/Sidebar";
import { socket } from "@/app/utils/socket";
import { useEffect, useState } from "react";
import { getRequest } from "@/app/utils/api";
import useUser from "@/app/contexts/user.context";
import { fetchMessages } from "./fetchMessages";

function ChatClientPage() {
  const [message, setMessage] = useState("");
  const user = useUser((state) => state.user);
  const [messages, setMessages] = useState<
    Array<{
      user: string;
      time: string;
      content: string;
    }>
  >([]);
  const receiver = {
    _id:
      user?._id == "69e659869698fa0fce8af560"
        ? "69e8b97443ce383ee443987e"
        : "69e659869698fa0fce8af560",
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", "12345");

    if (user) {
      fetchMessages({ userId: user._id, receiverId: receiver._id }).then(
        (data) => {
          setMessages(data);
        },
      );
    }

    const handleMessage = (msg: any) => {
      setMessages((prev) => [
        ...prev,
        {
          user: msg.sender === user?._id ? "You" : "Alice",
          time: new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          content: msg.message,
        },
      ]);
    };

    socket.on("receivedMsg", handleMessage);

    return () => {
      socket.off("receivedMsg", handleMessage);
    };
  }, [user]);

  const handleSendMsg = () => {
    if (!message.trim() || !user) return;

    socket.emit("sendMsg", {
      message,
      receiverId: receiver._id,
      senderId: user._id,
      roomId: "12345",
    });

    setMessage("");
  };

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
                Chat
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
              <ThreeDotIcon />
            </button>
          </div>
        </header>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          {/* <Message
            user="Alice"
            time="10:24 AM"
            content="Hey everyone! Anyone up for a watch party tonight? 🍿"
            color="text-pink-400"
            bg="bg-pink-400/10"
          /> */}
          {messages.map((m, i) => (
            <Message
              key={i}
              user={m.user}
              time={m.time}
              content={m.content}
              color="text-pink-400"
              bg="bg-pink-400/10"
            />
          ))}
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
                <PlusIcon />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message to the server..."
                className="flex-1 bg-transparent border-none py-4 px-2 text-sm text-white focus:outline-none placeholder:text-slate-600"
              />
              <div className="flex items-center gap-1 pr-2">
                <button className="p-2.5 text-slate-500 hover:text-amber-400 transition-colors">
                  <SmileIcon />
                </button>
                <button
                  className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-600/20"
                  onClick={handleSendMsg}
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ChatClientPage;
