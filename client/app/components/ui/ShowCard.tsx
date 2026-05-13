function ShowCard({ title, seasons, rating }: { title: string; seasons: number; rating: string }) {
  return (
    <div className="aspect-[2/3] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden group cursor-pointer hover:ring-2 hover:ring-indigo-500/50 transition-all relative">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col justify-end p-4">
        <h5 className="text-white text-xs font-bold leading-tight">{title}</h5>
        <div className="flex items-center justify-between mt-2">
          <span className="text-slate-400 text-[9px] font-bold uppercase tracking-tighter">
            {seasons} {seasons > 1 ? 'Seasons' : 'Season'}
          </span>
          <div className="flex items-center gap-1">
            <svg className="w-2.5 h-2.5 text-amber-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-white text-[9px] font-bold">{rating}</span>
          </div>
        </div>
      </div>
      <div className="h-full w-full bg-slate-800/50 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-slate-700 opacity-20 group-hover:opacity-40 transition-opacity"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>
  );
}

export default ShowCard;
