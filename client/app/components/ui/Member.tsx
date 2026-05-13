function Member({
  name,
  status,
  online = false,
  isMe = false,
}: {
  name: string;
  status?: string;
  online?: boolean;
  isMe?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
      <div className="relative">
        <div
          className={`w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500 group-hover:text-white transition-colors`}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        {online && (
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-bold truncate ${isMe ? 'text-indigo-400' : 'text-slate-300'}`}>{name}</p>
        {status && <p className="text-[9px] text-slate-600 truncate italic leading-none mt-1">{status}</p>}
      </div>
    </div>
  );
}

export default Member;
