'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import BackButton from './BackButton';
import VideoPlayer from './VideoPlayer';
import MovieCard from './MovieCard';
import { API_BASE_URL } from '../../consts/global';
import axios from 'axios';

interface Props {
  movieId: string;
}

export default function MovieDetailClient({ movieId }: Props) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [movieData, setMovieData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}media/movies/${movieId}`);
        setMovieData(res.data.data);
      } catch (err) {
        console.error('Failed to fetch movie details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
        <BackButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden">
      <Sidebar />

      <main className="pl-20 md:pl-64 flex-1 flex flex-col h-screen">
        {/* Top Navbar */}
        <header
          className={`h-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 px-8 flex items-center justify-between z-40 shrink-0 transition-all duration-700 ${showPlayer ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'}`}
        >
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

        <div className="flex-1 overflow-y-auto scrollbar-hide relative">
          {/* Main Content Wrap */}
          <div className="relative min-h-full flex flex-col">
            {/* Immersive Hero / Player Section */}
            <section className="relative w-full shrink-0 min-h-[60vh] lg:min-h-[75vh] flex flex-col">
              {/* Global Backdrop - Stays for both modes but blurs for player */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-110 ${showPlayer ? 'blur-2xl opacity-40' : 'blur-0 opacity-100'}`}
                  style={{
                    backgroundImage: `url(${movieData.posterUrl || 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=2000'})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent z-10" />
              </div>

              {!showPlayer ? (
                /* Hero Content Mode */
                <div className="relative flex-1 flex flex-col justify-center gap-4 px-8 md:px-16 pb-24 z-20 max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-600/20">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span className="text-white text-[10px] font-black uppercase tracking-widest">Premium Content</span>
                    </div>
                    <span className="px-3 py-1 bg-slate-800/80 backdrop-blur-md text-slate-300 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-white/5">
                      Action & Adventure
                    </span>
                    <div className="flex items-center gap-2 text-amber-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="text-sm font-black uppercase tracking-widest">{movieData.rating || '8.9'} Rating</span>
                    </div>
                    <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">
                      2h 45m • {movieData.year || '2024'} • {movieData.quality || '4K'}
                    </span>
                  </div>

                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] uppercase mb-8 drop-shadow-2xl">
                    {movieData.title.length > 20 ? movieData.title.slice(0, 20) + '...' : movieData.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6">
                    <button
                      onClick={() => setShowPlayer(true)}
                      className="group px-10 py-5 rounded-2xl bg-white text-slate-950 font-black uppercase tracking-tighter text-lg hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center gap-4 active:scale-95 shadow-2xl shadow-white/5 hover:shadow-indigo-500/40"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:bg-white group-hover:text-slate-950 transition-colors">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      Watch Now
                    </button>
                    <button className="px-10 py-5 rounded-2xl bg-slate-800/40 backdrop-blur-2xl text-white font-black uppercase tracking-tighter text-lg border border-white/10 hover:bg-white/10 transition-all active:scale-95">
                      Add to Watchlist
                    </button>
                  </div>
                </div>
              ) : (
                /* Cinema Player Mode */
                <div className="relative flex-1 z-30 animate-in fade-in zoom-in-95 duration-700 flex items-center justify-center p-4 md:p-8">
                  <div className="w-full max-w-7xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(79,70,229,0.2)] border border-white/5 relative group">
                    <VideoPlayer
                      title={movieData.title}
                      videoUrl={`http://localhost:5000${movieData.videoUrl}`}
                      autoPlay={true}
                    />

                    {/* Floating Player Controls Overlay */}
                    <div className="absolute top-0 inset-x-0 p-8 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex items-center gap-4">
                        <div className="px-4 py-2 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10">
                          <h3 className="text-white font-bold text-sm tracking-tight">Now Playing: {movieData.title}</h3>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowPlayer(false)}
                        className="pointer-events-auto p-4 bg-white/10 hover:bg-red-500/20 backdrop-blur-xl text-white rounded-2xl transition-all border border-white/10 hover:border-red-500/50 group/close"
                      >
                        <svg
                          className="w-6 h-6 group-hover/close:rotate-90 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Movie Details & Recommended Section */}
            <div className={`px-12 py-16 space-y-20 bg-slate-950 relative z-20 ${showPlayer ? 'mt-0' : '-mt-20'}`}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-12">
                  <section className="space-y-6">
                    <h3 className="text-2xl font-black text-white tracking-tight">Storyline</h3>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      The year is 2142. Earth has been plunged into eternal night after the Great Collapse. The remaining
                      survivors live in massive, neon-lit citadels powered by the memories of the deceased. Elias, a memory
                      scavenger, finds a shard of pure sunlight hidden within the mind of a legendary explorer. This discovery
                      sets off a chain of events that could either restore the world or bring about its final destruction.
                    </p>
                  </section>

                  <section className="space-y-6">
                    <h3 className="text-2xl font-black text-white tracking-tight">Top Cast</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      {[
                        {
                          name: 'Julian Vance',
                          role: 'Elias',
                          img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
                        },
                        {
                          name: 'Elena Rossi',
                          role: 'Sarah',
                          img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
                        },
                        {
                          name: 'Marcus Thorne',
                          role: 'Commander',
                          img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
                        },
                        {
                          name: 'Sophia Lin',
                          role: 'The Oracle',
                          img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
                        },
                      ].map((actor) => (
                        <div key={actor.name} className="flex items-center gap-4 group">
                          <div className="w-16 h-16 rounded-full bg-slate-800 overflow-hidden border border-slate-700 group-hover:border-indigo-500 transition-colors">
                            <img src={actor.img} alt={actor.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white leading-tight">{actor.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{actor.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="space-y-12">
                  <section className="space-y-6">
                    <h3 className="text-2xl font-black text-white tracking-tight">Information</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-slate-800/50 pb-4">
                        <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Director</span>
                        <span className="text-slate-200 text-sm font-bold">Christopher Nolan</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/50 pb-4">
                        <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Release Date</span>
                        <span className="text-slate-200 text-sm font-bold">July 15, 2024</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/50 pb-4">
                        <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Language</span>
                        <span className="text-slate-200 text-sm font-bold">English, Japanese</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/50 pb-4">
                        <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Budget</span>
                        <span className="text-slate-200 text-sm font-bold">$200 Million</span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* Recommended Movies Section */}
              <section className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-black text-white tracking-tight">Recommended For You</h3>
                  <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors">
                    Explore More
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <MovieCard
                      key={i}
                      id={i.toString()}
                      title={`Related Movie ${i}`}
                      year="2024"
                      rating={(8.5 + ((i * 0.1) % 1)).toFixed(1)}
                      quality={i % 2 === 0 ? '4K' : 'HD'}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
