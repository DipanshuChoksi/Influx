import UserIcon from '@/app/components/icons/UserIcon';
import { User } from '@/app/types';
import Link from 'next/link';

function ChatListItem({ friend }: { friend: User }) {
  const lastMessage = 'Hey! Are you coming to the watch party tonight? 🍿';
  const time = '2m ago';
  const isOnline = friend.name.length % 2 === 0;

  return (
    <Link
      href={`/dashboard/chat/${friend._id}`}
      className="group relative flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 hover:bg-indigo-500/10 border border-slate-800/50 hover:border-indigo-500/30 transition-all duration-300 shadow-sm hover:shadow-indigo-500/10"
    >
      <div className="relative shrink-0">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform duration-300">
          <UserIcon />
        </div>
        {isOnline && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-bold truncate group-hover:text-indigo-400 transition-colors">{friend.name}</h4>
          <span className="text-[10px] font-medium text-slate-500 group-hover:text-slate-400 whitespace-nowrap">{time}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="text-slate-500 text-xs truncate font-medium">{lastMessage}</p>
          <div className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-[8px] font-bold text-white shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            2
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
    </Link>
  );
}

export default ChatListItem;
