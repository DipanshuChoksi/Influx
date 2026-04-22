import { signout } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import ShowCard from "../components/ui/ShowCard";
import ContinueCard from "../components/ui/ContinueCard";
import Sidebar from "../components/ui/Sidebar";

export default async function TvShowsPage() {
  const user =  {
    name: "Dipanshu choksi",
    email: "dipanshu@example.com",
  };

  if (!user ) {
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
                placeholder="Search TV shows, episodes..."
                className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 ml-8">
            <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white leading-none">
                  {user.name}
                </p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-bold">
                  Premium
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-12 scrollbar-hide">
          {/* Hero Featured Section */}
          <section className="relative h-[450px] rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"></div>

            <div className="relative h-full flex flex-col justify-center px-12 z-20 space-y-6 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/50 text-indigo-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Featured Series
                </span>
                <span className="text-slate-300 text-xs font-medium">
                  9.2 Rating • 2 Seasons • Drama
                </span>
              </div>
              <h2 className="text-6xl font-black text-white tracking-tight leading-none">
                The Last <br />{" "}
                <span className="text-indigo-500">Chronicles</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed line-clamp-3">
                In a world reclaimed by nature, survival is just the beginning.
                Follow the journey of survivors as they navigate the remnants of
                civilization and face the ultimate choice.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <button className="px-8 py-3.5 bg-white text-slate-950 font-bold rounded-xl hover:bg-indigo-400 hover:text-white transition-all flex items-center gap-2 shadow-lg shadow-white/5 active:scale-95">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch S1:E1
                </button>
                <button className="px-8 py-3.5 bg-slate-800/50 backdrop-blur-md text-white font-bold rounded-xl border border-slate-700 hover:bg-slate-700 transition-all active:scale-95">
                  View Seasons
                </button>
              </div>
            </div>
          </section>

          {/* Continue Watching */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold text-white">
                Continue Watching
              </h3>
              <button className="text-sm font-semibold text-slate-500 hover:text-white transition-colors">
                See all
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ContinueCard
                title="Better Call Saul"
                episode="S5 : E3"
                progress={65}
                image="bg-amber-500/10"
              />
              <ContinueCard
                title="The Bear"
                episode="S2 : E1"
                progress={20}
                image="bg-blue-500/10"
              />
              <ContinueCard
                title="Succession"
                episode="S4 : E10"
                progress={90}
                image="bg-slate-500/10"
              />
              <ContinueCard
                title="Beef"
                episode="S1 : E5"
                progress={45}
                image="bg-red-500/10"
              />
            </div>
          </section>

          {/* New Releases Grid */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold text-white">New Releases</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ShowCard
                  key={i}
                  title={`Show Title ${i}`}
                  seasons={Math.floor(Math.random() * 5) + 1}
                  rating={(Math.random() * (9.9 - 7.0) + 7.0).toFixed(1)}
                />
              ))}
            </div>
          </section>

          {/* Genres */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold text-white px-2">
              Popular Genres
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {[
                "Action",
                "Sci-Fi",
                "Documentary",
                "Anime",
                "Horror",
                "Comedy",
                "Mystery",
                "Fantasy",
              ].map((genre) => (
                <button
                  key={genre}
                  className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm font-bold text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 transition-all whitespace-nowrap"
                >
                  {genre}
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
