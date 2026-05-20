'use client';

import { socket } from '@/app/utils/socket';
import { useEffect } from 'react';

function SocketProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return children;
}

export default SocketProvider;
