function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-96 gap-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl border-4 border-slate-800 border-t-indigo-500 animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 rounded-2xl border-4 border-indigo-500/20 blur-sm animate-pulse"></div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-black text-white tracking-[0.2em] uppercase animate-pulse">Loading</p>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
