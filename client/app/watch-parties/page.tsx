import { signout } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Sidebar from "../components/ui/Sidebar";
import UsersIcon from "../components/icons/UsersIcon";
import AddIcon from "../components/icons/AddIcon";

export default async function WatchPartiesPage() {
  const user = {
    name: "Dipanshu choksi",
    email: "dipanshu@example.com",
  };

  if (!user) {
    redirect("/signin");
  }

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
            <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white leading-none">
                  {user.name}
                </p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-bold">
                  Admin
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-bold shadow-inner">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
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

// Sub-components

function PartyCard({
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

function UpcomingCard({
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
        <svg
          className="w-8 h-8 opacity-20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
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
          <span className="text-[10px] text-slate-500 font-medium tracking-wide">
            • Hosting by {host}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <button className="px-5 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-[10px] font-bold rounded-lg transition-all">
            Remind Me
          </button>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
            {reminders} reminders set
          </span>
        </div>
      </div>
    </div>
  );
}
