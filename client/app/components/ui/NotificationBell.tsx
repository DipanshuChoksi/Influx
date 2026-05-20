'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRequest } from '../../utils/api';
import { User } from '@/app/types';
import useAuthStore from '@/app/features/auth/stores/auth.store';

export default function NotificationBell() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [invites, setInvites] = useState<{ _id: string; watchParty: string; user: User }[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInvites = async () => {
    if (!user) return;
    setLoading(true);
    const response = await getRequest(`watch-parties/invites/${user._id}`);
    console.log(response);
    if (response?.data?.success) {
      setInvites(response.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchInvites();
    }
  }, [isOpen, user?._id]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {invites.length > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-slate-900 animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Party Invites</h3>
            <span className="text-xs text-slate-400">{invites.length} pending</span>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-sm text-slate-500">Loading...</div>
            ) : invites.length === 0 ? (
              <div className="p-4 text-center text-sm text-slate-500">No new invites</div>
            ) : (
              invites.map((invite) => (
                <div key={invite._id} className="p-4 border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-200">
                        <span className="font-semibold text-indigo-400">{invite?.user?.name}</span> invited you to a Watch Party
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Room ID: {invite.watchParty}</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        router.push(`/dashboard/watch-parties/${invite.watchParty}`);
                      }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors ml-3"
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
