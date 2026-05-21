function RoomCard({ title, media, participants, image }: { title: string; media: string; participants: number; image: string }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 hover:bg-slate-900/60 transition-all group cursor-pointer">
      <div className={`w-full h-32 ${image} rounded-xl mb-4 flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <svg
          className="w-8 h-8 text-slate-600 group-hover:scale-110 group-hover:text-indigo-500 transition-all duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h4 className="text-white font-bold text-sm truncate">{title}</h4>
      <p className="text-slate-500 text-xs mt-1 truncate">
        Hosting: <span className="text-slate-300">{media}</span>
      </p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex -space-x-2">
          {[...Array(Math.min(participants, 3))].map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[8px] font-bold text-slate-300 uppercase"
            >
              {String.fromCharCode(65 + i)}
            </div>
          ))}
          {participants > 3 && (
            <div className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] font-bold text-indigo-400">
              +{participants - 3}
            </div>
          )}
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{participants} active</span>
      </div>
    </div>
  );
}

export default RoomCard;
