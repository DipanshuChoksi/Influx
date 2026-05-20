import { User } from '@/app/types';
import ChatListItem from './ChatListItem';

function ListUsers({ users, title }: { users: User[]; title: string }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.25em]">{title}</h2>
        <button className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors">View All</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <ChatListItem friend={user} key={user._id} />
        ))}
      </div>
    </section>
  );
}

export default ListUsers;
