import UsersIcon from '@/app/components/icons/UsersIcon';
import React from 'react';

function NoUserFound({ searchQuery }: { searchQuery: string }) {
  return (
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
  );
}

export default NoUserFound;
