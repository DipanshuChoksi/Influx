'use client';

import Link from 'next/link';
import MovieCard from '@/app/components/ui/MovieCard';
import useAuthStore from '@/app/features/auth/stores/auth.store';

function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <main className="pl-20 md:pl-64 flex-1 flex flex-col h-screen">
      {/* Top Navbar */}
      <header className="h-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 px-8 flex items-center justify-between z-40 shrink-0">
        <h1 className="text-xl font-black text-white uppercase tracking-wider">User Profile</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/profile/manage"
            className="px-4 py-2 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-lg shadow-indigo-500/5"
          >
            Edit Profile
          </Link>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 space-y-12 scrollbar-hide">
        {/* Profile Hero */}
        <section className="relative p-10 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[100px] -z-10 group-hover:bg-indigo-600/20 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[80px] -z-10 group-hover:bg-purple-600/20 transition-all duration-700"></div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-indigo-500/20">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            <div className="text-center md:text-left space-y-2">
              <h2 className="text-4xl font-black text-white tracking-tight">{user?.name}</h2>
              <p className="text-slate-400 font-medium">{user?.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  Pro Member
                </span>
                <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  Joined{' '}
                  {user?.createdAt
                    ? new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    : 'Recently'}
                </span>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-3 gap-4 w-full">
              <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 text-center">
                <p className="text-2xl font-black text-white">124</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Movies</p>
              </div>
              <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 text-center">
                <p className="text-2xl font-black text-white">42</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Shows</p>
              </div>
              <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 text-center">
                <p className="text-2xl font-black text-white">12</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Parties</p>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Content Tabs */}
        <div className="space-y-8">
          <div className="flex items-center gap-8 border-b border-slate-800/50 px-2 overflow-x-auto scrollbar-hide">
            <button className="pb-4 text-sm font-bold text-indigo-400 border-b-2 border-indigo-400 whitespace-nowrap">
              Overview
            </button>
            <button className="pb-4 text-sm font-bold text-slate-500 hover:text-slate-300 transition-colors whitespace-nowrap">
              Watchlist
            </button>
            <button className="pb-4 text-sm font-bold text-slate-500 hover:text-slate-300 transition-colors whitespace-nowrap">
              Recently Watched
            </button>
            <button className="pb-4 text-sm font-bold text-slate-500 hover:text-slate-300 transition-colors whitespace-nowrap">
              Settings
            </button>
          </div>

          {/* Watchlist Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-black text-white tracking-tight">Your Watchlist</h3>
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors">
                View all
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <MovieCard
                  key={i}
                  id={i.toString()}
                  title={`Watchlist Movie ${i}`}
                  year="2024"
                  rating={(8.5 + ((i * 0.1) % 1)).toFixed(1)}
                  quality="4K"
                />
              ))}
            </div>
          </section>

          {/* Account Settings Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6 bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
              <h3 className="text-xl font-black text-white tracking-tight">Account Settings</h3>
              <div className="space-y-4">
                <Link
                  href="/dashboard/profile/manage"
                  className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50 hover:bg-indigo-600/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Personal Information</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Update your name and email</p>
                    </div>
                  </div>
                  <div className="text-slate-600 group-hover:text-indigo-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
                <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Password & Security</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Change password, 2FA</p>
                    </div>
                  </div>
                  <button className="text-indigo-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
              <h3 className="text-xl font-black text-white tracking-tight">App Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Notifications</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Email and push alerts</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-indigo-600 rounded-full p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Playback Settings</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Video quality, subtitles</p>
                    </div>
                  </div>
                  <button className="text-indigo-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
