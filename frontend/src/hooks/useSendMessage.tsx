import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setMessages } from '../features/conversation/conversationSlice';
import toast from 'react-hot-toast';

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, selectedConversation } = useSelector(
    (state: RootState) => state.conversation
  );
  const dispatch = useDispatch();
  const sendMessage = async (message: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/conversations/send/${selectedConversation?.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message);
      dispatch(setMessages([...messages, data?.newMessage]));
    } catch (error: any) {
      toast(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
}

export default useSendMessage;
