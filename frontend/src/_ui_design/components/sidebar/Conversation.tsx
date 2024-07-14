import { useDispatch, useSelector } from 'react-redux';
import {
  ConversationType,
  setSelectedConversation,
} from '../../../features/conversation/conversationSlice';
import { RootState } from '../../../store';
import { useSocketContext } from '../../../context/SocketContextProvider';

const Conversation = ({ conversation }: { conversation: ConversationType }) => {
  const dispatch = useDispatch();
  const { onlineUsers } = useSocketContext();
  const selectedConversation = useSelector(
    (state: RootState) => state.conversation.selectedConversation
  );
  const selected = selectedConversation?.id === conversation.id;
  const isOnline = onlineUsers.includes(conversation?.id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          selected ? 'bg-sky-500' : ''
        }`}
        onClick={() => {
          dispatch(setSelectedConversation(conversation));
        }}
      >
        <div className={`avatar ${isOnline ? 'online' : ''} `}>
          <div className="w-8 md:w-12 rounded-full">
            <img src={conversation.profile} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 text-sm md:text-md">
              {conversation.fullName}
            </p>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};
export default Conversation;
