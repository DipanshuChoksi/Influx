export default function PartyCard({
  title,
  host,
  media,
  participants,
  genre,
  image,
}: {
  title: string;
  host: string;
  media: string;
  participants: number;
  genre: string;
  image: string;
}) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all group cursor-pointer flex flex-col h-full shadow-lg hover:shadow-indigo-500/5">
      <div
        className={`w-full aspect-video ${image} rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden shrink-0`}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
          {genre}
        </div>
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-500 group-hover:border-indigo-400 transition-all duration-300 shadow-xl">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        <h4 className="text-white font-bold text-lg leading-tight line-clamp-1">
          {title}
        </h4>
        <p className="text-slate-500 text-xs font-medium">
          Hosting: <span className="text-slate-300">{media}</span>
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase">
            {host.charAt(0)}
          </div>
          <span className="text-xs text-slate-400 font-semibold">{host}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/50 rounded-lg border border-slate-700">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          <span className="text-[10px] font-bold text-slate-300">
            {participants} joined
          </span>
        </div>
      </div>
    </div>
  );
}
