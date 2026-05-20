import NavItem from './NavItem';
import HomeIcon from '../icons/HomeIcon';
import MovieIcon from '../icons/MovieIcon';
import TvIcon from '../icons/TvIcon';
import UsersIcon from '../icons/UsersIcon';
import ChatIcon from '../icons/ChatIcon';
import UserIcon from '../icons/UserIcon';
import { signout } from '@/app/features/auth/actions/auth';
import LogoutIcon from '../icons/LogoutIcon';

function Sidebar() {
  const sidebarConsts = [
    {
      path: '/dashboard/home',
      icon: <HomeIcon />,
      label: 'Home',
    },
    {
      path: '/dashboard/movies',
      icon: <MovieIcon />,
      label: 'Movies',
    },
    {
      path: '/dashboard/tv-shows',
      icon: <TvIcon />,
      label: 'TV Shows',
    },
    {
      path: '/dashboard/watch-parties',
      icon: <UsersIcon />,
      label: 'Watch Parties',
    },
    {
      path: '/dashboard/chat',
      icon: <ChatIcon />,
      label: 'Chat',
    },
    {
      path: '/dashboard/profile',
      icon: <UserIcon />,
      label: 'Profile',
    },
  ];
  return (
    <aside className="fixed left-0 top-0 h-full w-20 md:w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 flex flex-col z-50">
      <div className="p-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white hidden md:block">Influx</h2>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {sidebarConsts.map((item, idx) => {
          return <NavItem key={idx} href={item.path} icon={item.icon} label={item.label} />;
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800/50">
        <form action={signout}>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200 group">
            <LogoutIcon />
            <span className="hidden md:block">Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}

export default Sidebar;
