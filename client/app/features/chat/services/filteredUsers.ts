import { User } from '@/app/types';

function filterChatUsers(users: User[], query: string) {
  const normalized = query.toLowerCase();

  return users.filter((u) => u.name.toLowerCase().includes(normalized) || u.email.toLowerCase().includes(normalized));
}

export default filterChatUsers;
