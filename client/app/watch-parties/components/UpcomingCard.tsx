export default function UpcomingCard({
  title,
  time,
  host,
  reminders,
}: {
  title: string;
  time: string;
  host: string;
  reminders: number;
}) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex items-center gap-6 hover:border-slate-700 transition-all group">
      <div className="w-20 h-24 bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 shrink-0 border border-slate-700 group-hover:border-indigo-500/30 transition-colors">
        <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <div className="flex-1">
        <h4 className="text-white font-bold text-lg">{title}</h4>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-xs text-indigo-400 font-bold">{time}</span>
          <span className="text-[10px] text-slate-500 font-medium tracking-wide">• Hosting by {host}</span>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <button className="px-5 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-[10px] font-bold rounded-lg transition-all">
            Remind Me
          </button>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{reminders} reminders set</span>
        </div>
      </div>
    </div>
  );
}
