function ContinueCard({ title, episode, progress, image }: { title: string; episode: string; progress: number; image: string }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 hover:bg-slate-900/60 transition-all group cursor-pointer">
      <div className={`w-full aspect-video ${image} rounded-xl mb-4 flex items-center justify-center relative overflow-hidden`}>
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-500 transition-all duration-300">
          <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <div
          className="absolute bottom-0 left-0 h-1 bg-indigo-500 shadow-lg shadow-indigo-500/50"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <h4 className="text-white font-bold text-sm truncate">{title}</h4>
      <p className="text-slate-500 text-[10px] mt-1 font-bold uppercase tracking-wider">{episode}</p>
    </div>
  );
}

export default ContinueCard;
