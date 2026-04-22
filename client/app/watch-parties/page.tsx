import Sidebar from "../components/ui/Sidebar";
import UsersIcon from "../components/icons/UsersIcon";
import AddIcon from "../components/icons/AddIcon";
import UpcomingCard from "./components/UpcomingCard";
import PartyCard from "./components/PartyCard";

export default async function WatchPartiesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden">
      {/* Side Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="pl-20 md:pl-64 flex-1 flex flex-col h-screen">
        {/* Top Navbar */}
        <header className="h-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 px-8 flex items-center justify-between z-40 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <UsersIcon />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-none">
                Watch Parties
              </h1>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">
                Host or join a live viewing session
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center gap-2">
              <AddIcon />
              <span>New Party</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-12 scrollbar-hide">
          {/* Hero Section - Host Promo */}
          <section className="relative rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:scale-105 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574267432553-4b20266629c7?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

            <div className="relative h-full py-16 px-12 z-20 space-y-6 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/50 text-indigo-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Community
                </span>
                <span className="text-slate-400 text-xs font-medium">
                  Synced Playback • Voice Chat • HD
                </span>
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight leading-tight">
                Watch Together, <br />{" "}
                <span className="text-indigo-500">
                  No Matter Where You Are.
                </span>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed line-clamp-2">
                Create a room, invite your friends, and enjoy your favorite
                movies and shows with perfectly synchronized playback and
                high-quality voice chat.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <button className="px-8 py-3.5 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                  Host a Party
                </button>
                <button className="px-8 py-3.5 bg-slate-800/50 backdrop-blur-md text-white font-bold rounded-xl border border-slate-700 hover:bg-slate-700 transition-all active:scale-95">
                  Learn More
                </button>
              </div>
            </div>
          </section>

          {/* Active Parties Grid */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                Parties Live Now
              </h3>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <PartyCard
                title="Marvel Marathon"
                host="Alice"
                media="Avengers: Endgame"
                participants={12}
                genre="Action"
                image="bg-red-500/10"
              />
              <PartyCard
                title="Anime Night"
                host="Bob"
                media="Jujutsu Kaisen"
                participants={45}
                genre="Anime"
                image="bg-purple-500/10"
              />
              <PartyCard
                title="Horror Sunday"
                host="Charlie"
                media="Talk To Me"
                participants={8}
                genre="Horror"
                image="bg-orange-500/10"
              />
              <PartyCard
                title="Sci-Fi Classics"
                host="Diana"
                media="Blade Runner 2049"
                participants={4}
                genre="Sci-Fi"
                image="bg-blue-500/10"
              />
            </div>
          </section>

          {/* Recently Ended / Public Rooms */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold text-white">Upcoming Parties</h3>
              <button className="text-sm font-semibold text-slate-500 hover:text-white transition-colors">
                View Schedule
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UpcomingCard
                title="Dune: Part Two"
                time="Today at 9:00 PM"
                host="System Admin"
                reminders={124}
              />
              <UpcomingCard
                title="Spider-Man: Across the Spider-Verse"
                time="Tomorrow at 8:00 PM"
                host="MovieClub"
                reminders={56}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
