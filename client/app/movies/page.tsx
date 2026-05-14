import Sidebar from '../components/ui/Sidebar';
import MovieCard from '../components/ui/MovieCard';

export default async function MoviesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden">
      {/* Side Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="pl-20 md:pl-64 flex-1 flex flex-col h-screen">
        {/* Top Navbar */}
        <header className="h-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 px-8 flex items-center justify-between z-40 shrink-0">
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
                placeholder="Search movies, actors, directors..."
                className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
              />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-12 scrollbar-hide">
          {/* Hero Featured Movie Section */}
          <section className="relative h-[480px] rounded-3xl overflow-hidden group shadow-2xl shadow-indigo-500/10">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"></div>

            <div className="relative h-full flex flex-col justify-center px-12 z-20 space-y-6 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-md">
                  4K Ultra HD
                </span>
                <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase">IMDb 8.9</span>
              </div>
              <h2 className="text-7xl font-black text-white tracking-tight leading-none uppercase">
                Neon <br /> <span className="text-indigo-500 italic">Eclipse</span>
              </h2>
              <p className="text-slate-200 text-lg leading-relaxed line-clamp-3 font-medium">
                In a dystopian future where memories are a currency, one man discovers a forgotten truth that could crash the
                entire system.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <button className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all flex items-center gap-3 shadow-xl shadow-indigo-600/20 active:scale-95">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Play Movie
                </button>
                <button className="px-10 py-4 bg-white/5 backdrop-blur-xl text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all active:scale-95">
                  Watch Trailer
                </button>
              </div>
            </div>
          </section>

          {/* Recently Added */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-black text-white tracking-tight">Recently Added</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[7, 8, 9, 10, 11, 12].map((i) => (
                <MovieCard
                  key={i}
                  title={`New Release ${i}`}
                  year="2024"
                  rating={(8.0 + ((i * 0.1) % 1.5)).toFixed(1)}
                  quality="4K"
                />
              ))}
            </div>
          </section>

          {/* Categories Grid */}
          <section className="space-y-6">
            <h3 className="text-2xl font-black text-white tracking-tight px-2">Explore Genres</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {['Action', 'Sci-Fi', 'Thriller', 'Drama', 'Horror', 'Comedy', 'Documentary', 'Anime'].map((genre) => (
                <button
                  key={genre}
                  className="h-24 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-indigo-600 hover:border-indigo-500 group transition-all"
                >
                  <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">{genre}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
