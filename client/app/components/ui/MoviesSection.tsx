function MediaSection({ title }: { title: string }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <button className="text-sm font-semibold text-slate-500 hover:text-white transition-colors">See all</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-[2/3] bg-slate-900 rounded-xl border border-slate-800 overflow-hidden group cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col justify-end p-4">
              <h5 className="text-white text-xs font-bold leading-tight">Project Influx Movie {i}</h5>
              <p className="text-slate-400 text-[10px] mt-1 italic">Action, Sci-Fi</p>
            </div>
            <div className="h-full w-full bg-slate-800 flex items-center justify-center">
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
        ))}
      </div>
    </section>
  );
}

export default MediaSection;
