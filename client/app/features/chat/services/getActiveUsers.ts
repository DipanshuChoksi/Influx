import { User } from '@/app/types';

function getActiveUsers(users: User[]) {
  return users.slice(0, 3);
}

export default getActiveUsers;
