import MediaSection from '../../components/ui/MoviesSection';
import RoomCard from '../../components/ui/RoomCard';
import NotificationBell from '../../components/ui/NotificationBell';

export default async function HomePage() {
  return (
    <main className="pl-20 md:pl-64 min-h-screen">
      {/* Top Navbar */}
      <header className="sticky top-0 h-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 px-8 flex items-center justify-between z-40">
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search movies, shows, or rooms..."
              className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NotificationBell />
        </div>
      </header>

      {/* Content Body */}
      <div className="p-8 space-y-12">
        {/* Hero Featured Section */}
        <section className="relative h-[400px] rounded-3xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent z-10"></div>
          {/* Using a high-quality CSS gradient as a fallback for the hero backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 group-hover:scale-105 transition-transform duration-700"></div>

          <div className="relative h-full flex flex-col justify-center px-12 z-20 space-y-6 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/50 text-indigo-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Featured Movie
              </span>
              <span className="text-slate-400 text-xs font-medium">4K • HDR • 2h 24m</span>
            </div>
            <h2 className="text-5xl font-black text-white tracking-tight leading-none">
              Interstellar <br /> <span className="text-indigo-500">Voyage</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed line-clamp-3">
              Experience the ultimate journey across space and time. A team of explorers travel through a wormhole in space in an
              attempt to ensure humanity's survival.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <button className="px-8 py-3.5 bg-white text-slate-950 font-bold rounded-xl hover:bg-indigo-400 transition-all flex items-center gap-2 shadow-lg shadow-white/5 active:scale-95">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </button>
              <button className="px-8 py-3.5 bg-slate-800/50 backdrop-blur-md text-white font-bold rounded-xl border border-slate-700 hover:bg-slate-700 transition-all active:scale-95">
                View Details
              </button>
            </div>
          </div>
        </section>

        {/* Social Section: Active Watch Parties */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Active Watch Parties
            </h3>
            <button className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">Create Room</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoomCard title="Weekend Movie Night" host="Alice" media="Inception" participants={4} image="bg-indigo-500/10" />
            <RoomCard title="Anime Stream" host="Bob" media="Attack on Titan" participants={12} image="bg-purple-500/10" />
            <RoomCard title="Friends Reunion" host="Charlie" media="Friends S01E01" participants={6} image="bg-pink-500/10" />
            <RoomCard title="Late Night Horror" host="Diana" media="The Conjuring" participants={2} image="bg-red-500/10" />
          </div>
        </section>

        {/* Media Sections */}
        <MediaSection title="Recently Added" />
        <MediaSection title="Continue Watching" />
      </div>
    </main>
  );
}
