'use client';

import { useEffect, useState } from 'react';
import { socket } from '@/app/utils/socket';
import { usePartyStore } from '@/app/store/partyStore';
import UsersIcon from '@/app/components/icons/UsersIcon';
import { useRouter } from 'next/navigation';
import { getRequest, postRequest } from '@/app/utils/api';
import { User } from '@/app/types';

interface PartyRoomProps {
  roomId: string;
}

export default function PartyRoom({ roomId }: PartyRoomProps) {
  const { participants, setRoomId, reset, addParticipant, removeParticipant } = usePartyStore();
  const router = useRouter();
  const [isInviteDropdownOpen, setIsInviteDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setRoomId(roomId);

    socket.connect();
    socket.emit('join', { roomId });

    socket.on('userJoined', (user) => {
      addParticipant({ id: user?.id || '', name: user.name || 'New User', isHost: false });
    });

    socket.on('userLeft', (userId) => {
      removeParticipant(userId);
    });

    socket.on('sendMessage', (message) => {
      console.log(message);
    });

    return () => {
      socket.off('userJoined');
      socket.off('userLeft');
      socket.disconnect();
      reset();
    };
  }, [roomId, setRoomId, reset, addParticipant, removeParticipant]);

  const fetchUsers = async () => {
    const response = await getRequest('users');
    if (response?.data?.users) {
      setUsers(response.data.users);
    }
  };

  function handleAddParticipant() {
    if (!isInviteDropdownOpen) {
      fetchUsers();
    }
    setIsInviteDropdownOpen(!isInviteDropdownOpen);
  }

  async function handleInviteToParty(user: User) {
    try {
      const response = await postRequest(`watch-parties/${roomId}/send-invite`, { users: [user._id], roomId });
      console.log(response);
      alert(`Invited ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  }
  // TODO: Add pagination or infiite scroll.
  const filteredUsers = users.filter((u) => u.name?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950/50 backdrop-blur-md rounded-2xl border border-slate-800/50 overflow-hidden shadow-2xl">
      {/* Room Header */}
      <div className="h-16 px-6 border-b border-slate-800/50 flex items-center justify-between bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <UsersIcon />
          </div>
          <div>
            <h2 className="text-white font-bold">Party Room: {roomId}</h2>
            <p className="text-xs text-slate-400">{participants.length} Participant(s)</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={handleAddParticipant}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Add a new participant
            </button>

            {isInviteDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="p-3 border-b border-slate-700">
                  <input
                    type="text"
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto p-2">
                  {filteredUsers.length === 0 ? (
                    <div className="p-3 text-center text-sm text-slate-500">No friends found</div>
                  ) : (
                    filteredUsers.map((u) => (
                      <div key={u._id} className="flex items-center justify-between p-2 hover:bg-slate-800 rounded-lg">
                        <span className="text-sm text-slate-200 truncate pr-2">{u.name}</span>
                        <button
                          onClick={() => handleInviteToParty(u)}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold rounded-lg transition-colors"
                        >
                          Invite
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors"
          >
            Leave Party
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 flex gap-6">
        {/* Video Player Placeholder */}
        <div className="flex-1 bg-black rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 mix-blend-overlay z-0"></div>
          <div className="z-10 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-800/80 flex items-center justify-center border border-slate-700 shadow-xl">
              <svg className="w-8 h-8 text-indigo-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4l12 6-12 6z" />
              </svg>
            </div>
            <p className="text-slate-400 font-medium">Waiting for host to select media...</p>
          </div>
        </div>

        {/* Chat / Participants Sidebar */}
        <div className="w-80 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800 font-bold text-sm text-slate-300">Session Chat</div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="text-center text-xs text-slate-500 my-4">You joined the room</div>
            {/* Messages go here */}
          </div>
          <div className="p-4 border-t border-slate-800">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
