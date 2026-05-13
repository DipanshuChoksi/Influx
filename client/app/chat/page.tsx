'use client';

import { useEffect, useState, useMemo } from 'react';
import Sidebar from '@/app/components/ui/Sidebar';
import useUser from '@/app/contexts/user.context';
import { fetchAllUsers } from '@/app/http/user.client.http';
import { User } from '@/app/types';
import ChatIcon from '@/app/components/icons/ChatIcon';
import UsersIcon from '@/app/components/icons/UsersIcon';
import { useRouter } from 'next/navigation';
import ChatListItem from './components/chatListItem';
import Loading from '../components/ui/Loading';
import PlusIcon from '@/app/components/icons/PlusIcon';

export default function ChatListPage() {
  const user = useUser((state) => state.user);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/');
      return;
    }
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [user, router]);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  // Split into "Active" and "All" for a more professional feel
  const activeUsers = filteredUsers.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden">
      <Sidebar />

      {/* Main Content Area */}
      <main className="pl-20 md:pl-64 flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-24 bg-slate-950/40 backdrop-blur-2xl border-b border-slate-800/50 px-8 flex items-center justify-between sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
              <ChatIcon />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Messages</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{users.length} Friends Online</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
              <PlusIcon />
              New Chat
            </button>
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </header>

        {/* Dynamic List Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide bg-slate-950">
          <div className="max-w-6xl mx-auto p-8 space-y-10">
            {/* Search Section */}
            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search conversations or friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner"
              />
            </div>

            {loading ? (
              <Loading />
            ) : filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-slate-600 mb-8 border border-slate-800 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform">
                  <UsersIcon />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">No one found</h3>
                <p className="text-slate-500 max-w-sm font-medium leading-relaxed">
                  {searchQuery
                    ? `We couldn't find anyone matching "${searchQuery}". Maybe check the spelling?`
                    : 'Your contact list is looking a bit lonely. Invite some friends to start the party!'}
                </p>
                {!searchQuery && (
                  <button className="mt-8 px-8 py-3 bg-white text-slate-950 text-sm font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                    Find Friends
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-12 animate-in fade-in duration-500">
                {/* Active Section */}
                {!searchQuery && activeUsers.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-6 px-2">
                      <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.25em]">Active Now</h2>
                      <button className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                        View All
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {activeUsers.map((friend) => (
                        <ChatListItem friend={friend} key={friend._id} />
                      ))}
                    </div>
                  </section>
                )}

                {/* All Contacts Section */}
                <section>
                  <div className="flex items-center justify-between mb-6 px-2">
                    <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.25em]">
                      {searchQuery ? `Search Results (${filteredUsers.length})` : 'All Contacts'}
                    </h2>
                    {!searchQuery && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-600">Sort by:</span>
                        <select className="bg-transparent text-[10px] font-black text-slate-400 focus:outline-none cursor-pointer">
                          <option>Recent</option>
                          <option>Name</option>
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUsers.map((friend) => (
                      <ChatListItem friend={friend} key={friend._id} />
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// TODO:
// 1) Add pagination for more friends
// 2) Add feature to delete chats
// 3) Add feature to search users in database
// 4) Add feature to search messages in database
// 5) Add feature to clear chats
// 6) Add feature to block users
// 7) Add feature to report users
// 8) Add feature to view profile picture in full screen
// 9) Add feature to debounce search, send messages.
