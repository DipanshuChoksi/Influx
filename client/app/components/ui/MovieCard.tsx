import Link from 'next/link';

function MovieCard({ title, year, rating, quality }: { title: string; year: string; rating: string; quality: string }) {
  return (
    <Link href={`/movies/${encodeURIComponent(title)}`} className="block">
      <div className="aspect-[2/3] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden group cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col justify-end p-5">
          <h5 className="text-white text-sm font-black leading-tight mb-2">{title}</h5>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400">{year}</span>
              <span className="px-1.5 py-0.5 bg-slate-800 text-slate-300 text-[8px] font-bold rounded">{quality}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="text-white text-[10px] font-black">{rating}</span>
            </div>
          </div>
        </div>
        <div className="h-full w-full bg-slate-800/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
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
    </Link>
  );
}

export default MovieCard;
