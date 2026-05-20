import { useMemo, useState } from 'react';
import HeaderChat from '../components/header.chat';
import useChatList from '../hooks/useFetchAllUser';
import Loading from '@/app/components/ui/Loading';
import SearchInput from '../components/SearchInput';
import NoUserFound from '../components/NoSearchUserFound';
import ListUsers from '../components/ListUsers';
import filterChatUsers from '../services/filteredUsers';
import getActiveUsers from '../services/getActiveUsers';

function ChatListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { users, loading } = useChatList();

  const filteredUsers = useMemo(() => {
    return filterChatUsers(users, searchQuery);
  }, [users, searchQuery]);

  const activeUsers = getActiveUsers(filteredUsers);

  return (
    <main className="pl-20 md:pl-64 flex-1 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <HeaderChat />

      {/* Dynamic List Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-slate-950">
        <div className="max-w-6xl mx-auto p-8 space-y-10">
          {/* Search Section */}
          <SearchInput setSearchQuery={setSearchQuery} searchQuery={searchQuery} />

          {loading ? (
            <Loading />
          ) : filteredUsers.length === 0 ? (
            <NoUserFound searchQuery={searchQuery} />
          ) : (
            <div className="space-y-12 animate-in fade-in duration-500">
              {/* Active Section */}
              {!searchQuery && activeUsers.length > 0 && <ListUsers title="Active Now" users={activeUsers} />}

              {/* All Contacts Section */}
              <ListUsers
                title={searchQuery ? `Search Results (${filteredUsers.length})` : 'All Contacts'}
                users={filteredUsers}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default ChatListPage;
