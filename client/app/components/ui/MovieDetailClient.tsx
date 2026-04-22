"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import BackButton from "./BackButton";
import VideoPlayer from "./VideoPlayer";
import MovieCard from "./MovieCard";
import Link from "next/link";

interface Props {
  movieTitle: string;
}

export default function MovieDetailClient({ movieTitle }: Props) {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden">
      <Sidebar />

      <main className="pl-20 md:pl-64 flex-1 flex flex-col h-screen">
        {/* Top Navbar */}
        <header className="h-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 px-8 flex items-center justify-between z-40 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <BackButton />
            <div className="flex-1">
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
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Hero Backdrop Section - Hidden when playing */}
          {!showPlayer ? (
            <section className="relative h-[70vh] w-full shrink-0 animate-in fade-in duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent z-10"></div>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=2000')`,
                }}
              ></div>

              <div className="relative h-full flex flex-col justify-end px-12 pb-20 z-20 max-w-5xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md">
                    Action & Adventure
                  </span>
                  <span className="text-amber-400 text-xs font-bold tracking-widest uppercase flex items-center gap-1">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    8.9 Rating
                  </span>
                  <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">
                    2h 45m
                  </span>
                  <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">
                    2024
                  </span>
                </div>

                <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase mb-6">
                  {movieTitle}
                </h1>

                <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl font-medium mb-10">
                  In a world where light is a rare commodity, a group of
                  outcasts must embark on a dangerous journey to find the fabled
                  Sun Pillar. As they navigate through treacherous shadows and
                  face their inner demons, they discover that the greatest
                  darkness might be within themselves.
                </p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowPlayer(true)}
                    className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all flex items-center gap-3 active:scale-95 shadow-lg shadow-indigo-600/20 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    Watch Now
                  </button>
                  <button className="px-8 py-4 rounded-xl bg-white/5 backdrop-blur-xl text-white font-bold border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 active:scale-95">
                    Add to Watchlist
                  </button>
                </div>
              </div>
            </section>
          ) : (
            /* Player View - Full Width at top */
            <section className="w-full bg-black animate-in zoom-in-95 fade-in duration-500 relative z-30">
              <div className="max-w-[1600px] mx-auto">
                <div className="aspect-video relative group">
                  <VideoPlayer
                    title={movieTitle}
                    videoUrl="/media/video.webm"
                    autoPlay={true}
                  />
                  {/* Close Player Button */}
                  <button
                    onClick={() => setShowPlayer(false)}
                    className="absolute top-6 right-6 z-50 p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full transition-all opacity-0 group-hover:opacity-100 border border-white/10"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Movie Details & Recommended Section */}
          <div
            className={`px-12 py-16 space-y-20 bg-slate-950 relative z-20 ${showPlayer ? "mt-0" : "-mt-20"}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-12">
                <section className="space-y-6">
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    Storyline
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    The year is 2142. Earth has been plunged into eternal night
                    after the Great Collapse. The remaining survivors live in
                    massive, neon-lit citadels powered by the memories of the
                    deceased. Elias, a memory scavenger, finds a shard of pure
                    sunlight hidden within the mind of a legendary explorer.
                    This discovery sets off a chain of events that could either
                    restore the world or bring about its final destruction.
                  </p>
                </section>

                <section className="space-y-6">
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    Top Cast
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {[
                      {
                        name: "Julian Vance",
                        role: "Elias",
                        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
                      },
                      {
                        name: "Elena Rossi",
                        role: "Sarah",
                        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
                      },
                      {
                        name: "Marcus Thorne",
                        role: "Commander",
                        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
                      },
                      {
                        name: "Sophia Lin",
                        role: "The Oracle",
                        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
                      },
                    ].map((actor) => (
                      <div
                        key={actor.name}
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-16 h-16 rounded-full bg-slate-800 overflow-hidden border border-slate-700 group-hover:border-indigo-500 transition-colors">
                          <img
                            src={actor.img}
                            alt={actor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white leading-tight">
                            {actor.name}
                          </p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                            {actor.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-12">
                <section className="space-y-6">
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-slate-800/50 pb-4">
                      <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">
                        Director
                      </span>
                      <span className="text-slate-200 text-sm font-bold">
                        Christopher Nolan
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/50 pb-4">
                      <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">
                        Release Date
                      </span>
                      <span className="text-slate-200 text-sm font-bold">
                        July 15, 2024
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/50 pb-4">
                      <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">
                        Language
                      </span>
                      <span className="text-slate-200 text-sm font-bold">
                        English, Japanese
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/50 pb-4">
                      <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">
                        Budget
                      </span>
                      <span className="text-slate-200 text-sm font-bold">
                        $200 Million
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Recommended Movies Section */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-black text-white tracking-tight">
                  Recommended For You
                </h3>
                <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors">
                  Explore More
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <MovieCard
                    key={i}
                    title={`Related Movie ${i}`}
                    year="2024"
                    rating={(Math.random() * (9.5 - 6.5) + 6.5).toFixed(1)}
                    quality={i % 2 === 0 ? "4K" : "HD"}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
