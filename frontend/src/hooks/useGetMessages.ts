import { useEffect, useState } from 'react';
import { setMessages } from '../features/conversation/conversationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import toast from 'react-hot-toast';

function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const selectedConversation = useSelector(
    (state: RootState) => state.conversation.selectedConversation
  );
  const messages = useSelector(
    (state: RootState) => state.conversation.messages
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/conversations/${selectedConversation?.id}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message);
        dispatch(setMessages(data.messages));
      } catch (error: any) {
        toast(error?.message);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [selectedConversation, setMessages]);

  return { loading, messages };
}

export default useGetMessages;
