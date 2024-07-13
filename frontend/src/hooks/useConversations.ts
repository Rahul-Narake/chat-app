import React, { useEffect, useState } from 'react';
import { ConversationType } from '../features/conversation/conversationSlice';
import toast from 'react-hot-toast';

const useConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/conversations/');
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message);
        setConversations(data?.conversations);
      } catch (error: any) {
        toast(error?.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useConversations;
