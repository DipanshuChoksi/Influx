function SearchInput({ setSearchQuery, searchQuery }: { setSearchQuery: (query: string) => void; searchQuery: string }) {
  return (
    <div className="relative group max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
  );
}

export default SearchInput;
