interface IMessageProps {
  user: string;
  time: string;
  content: string;
}

function Message({ user, time, content }: IMessageProps) {
  const isMe = user === 'You';
  const color = isMe ? 'text-indigo-400' : 'text-purple-400';
  const bg = isMe ? 'bg-indigo-400/10' : 'bg-purple-400/10';
  return (
    <div className={`flex gap-4 ${isMe ? 'flex-row-reverse' : ''}`}>
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0 border border-white/5`}>
        <span className={`font-bold text-xs ${color}`}>{user.charAt(0).toUpperCase()}</span>
      </div>
      <div className={`space-y-1 max-w-xl ${isMe ? 'text-right' : ''}`}>
        <div className={`flex items-center gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
          <span className="text-xs font-bold text-white">{user}</span>
          <span className="text-[10px] text-slate-600 font-medium">{time}</span>
        </div>
        <div
          className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isMe
              ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-none shadow-indigo-500/20'
              : 'bg-slate-900/90 text-slate-200 border border-slate-800/50 rounded-tl-none shadow-black/20'
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

export default Message;
