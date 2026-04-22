function Message({
  user,
  time,
  content,
  isMe = false,
  color,
  bg,
}: {
  user: string;
  time: string;
  content: string;
  isMe?: boolean;
  color: string;
  bg: string;
}) {
  return (
    <div className={`flex gap-4 ${isMe ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0 border border-white/5`}
      >
        <span className={`font-bold text-xs ${color}`}>
          {user.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className={`space-y-1 max-w-xl ${isMe ? "text-right" : ""}`}>
        <div
          className={`flex items-center gap-2 ${isMe ? "flex-row-reverse" : ""}`}
        >
          <span className="text-xs font-bold text-white">{user}</span>
          <span className="text-[10px] text-slate-600 font-medium">{time}</span>
        </div>
        <div
          className={`p-4 rounded-2xl text-sm leading-relaxed ${
            isMe
              ? "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/10"
              : "bg-slate-900/80 text-slate-300 border border-slate-800 rounded-tl-none"
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

export default Message;
