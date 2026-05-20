'use client';

import { useRouter } from 'next/navigation';
import AddIcon from '@/app/components/icons/AddIcon';
import { API_BASE_URL } from '@/app/consts/global';

export default function CreatePartyButton() {
  const router = useRouter();

  const handleCreateParty = async () => {
    const response = await fetch(`${API_BASE_URL}watch-parties`, {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      router.push(`/dashboard/watch-parties/${data.data.roomId}`);
    }
  };

  return (
    <button
      onClick={handleCreateParty}
      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center gap-2"
    >
      <AddIcon />
      <span>New Party</span>
    </button>
  );
}
