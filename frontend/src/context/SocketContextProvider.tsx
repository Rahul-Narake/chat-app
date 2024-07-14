import { createContext, useContext, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuthContext } from './AuthContextProvider';

interface ISocketContext {
  socket: Socket | null;
  onlineUsers: string[];
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);
const socketURL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5001' : '/';

export const useSocketContext = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error('Context state not found');

  return state;
};

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { currentUser, isLoading } = useAuthContext();

  useEffect(() => {
    if (currentUser && !isLoading) {
      const socket = io(socketURL, {
        query: {
          userId: currentUser?.id,
        },
      });
      socketRef.current = socket;
      socket.on('getOnlineUsers', (users: string[]) => {
        setOnlineUsers(users);
      });
      return () => {
        socket.close();
        socketRef.current = null;
      };
    } else if (!currentUser && !isLoading) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [currentUser, isLoading]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
