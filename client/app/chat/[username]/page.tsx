'use client';

import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useUser from '../../contexts/user.context';
import ChatClientPage from './components/ChatClientPage';
import { fetchUserByName } from '@/app/http/user.client.http';
import { User } from '@/app/types';
import Loading from '@/app/components/ui/Loading';

export default function ChatPage() {
  const user = useUser((state) => state.user);
  const params = useParams();
  const username = params.username as string;
  const [receiver, setReceiver] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      redirect('/');
    }

    const getReceiver = async () => {
      try {
        const data = await fetchUserByName(username);
        setReceiver(data);
      } catch (error) {
        console.error('Error fetching receiver:', error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      getReceiver();
    }
  }, [user, username]);

  if (loading) {
    return <Loading />;
  }

  if (!receiver) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
        <button
          onClick={() => redirect('/chat')}
          className="px-6 py-2 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-colors"
        >
          Back to Chats
        </button>
      </div>
    );
  }

  return <ChatClientPage receiver={receiver} />;
}
