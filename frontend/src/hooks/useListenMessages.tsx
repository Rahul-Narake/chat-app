import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setMessages } from '../features/conversation/conversationSlice';
import notificationSound from '../assets/sounds/notification.mp3';
function useListenMessages() {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const messages = useSelector(
    (state: RootState) => state.conversation.messages
  );
  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();
      dispatch(setMessages([...messages, newMessage]));
    });

    return () => {
      socket?.off('newMessage');
    };
  }, [messages, socket, setMessages]);
}

export default useListenMessages;
