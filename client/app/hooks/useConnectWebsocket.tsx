import { useEffect } from 'react';
import { socket } from '../utils/socket';
import useUser from '../contexts/user.context';

function useConnectWebsocket() {
  const user = useUser((state) => state.user);

  useEffect(() => {
    if (!user) return;
    socket.emit('join', user.name);

    return () => {
      socket.disconnect();
    };
  }, [user]);
}

export default useConnectWebsocket;
