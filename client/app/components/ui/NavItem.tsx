'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
        href == path
          ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
      }`}
    >
      <div className={`${href == path ? 'text-white' : 'group-hover:text-indigo-400'} transition-colors`}>{icon}</div>
      <span className="font-semibold text-sm hidden md:block">{label}</span>
    </Link>
  );
}

export default NavItem;
