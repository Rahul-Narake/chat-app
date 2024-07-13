import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ConversationType {
  id: string;
  fullName: string;
  profile: string;
}
export interface MessageType {
  id: string;
  body: string;
  senderId: string;
  fromMe: boolean;
  createdAt: Date;
}

export interface ConversationState {
  selectedConversation: ConversationType | null;
  messages: MessageType[];
}

const initialState: ConversationState = {
  selectedConversation: null,
  messages: [],
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setSelectedConversation: (
      state,
      action: PayloadAction<ConversationType | null>
    ) => {
      state.selectedConversation = action.payload;
    },

    setMessages: (state, action: PayloadAction<MessageType[]>) => {
      if (action.payload) {
        state.messages = action.payload;
      }
    },
  },
});

export const { setMessages, setSelectedConversation } =
  conversationSlice.actions;

export default conversationSlice.reducer;
