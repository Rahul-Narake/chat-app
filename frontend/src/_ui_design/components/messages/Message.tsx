import { useSelector } from 'react-redux';
import { useAuthContext } from '../../../context/AuthContextProvider';
import { RootState } from '../../../store';
import { MessageType } from '../../../features/conversation/conversationSlice';
import extractTime from '../../../utils/extractTime';

const Message = ({ message }: { message?: MessageType }) => {
  const { currentUser } = useAuthContext();
  const fromMe = message?.senderId === currentUser?.id;
  const chatClass = fromMe ? 'chat-end' : 'chat-start';
  const selectedConvesation = useSelector(
    (state: RootState) => state.conversation.selectedConversation
  );
  const img = fromMe ? currentUser?.profile : selectedConvesation?.profile;

  const bubbleBg = fromMe ? 'bg-blue-500' : '';
  return (
    <div className={`chat ${chatClass}`}>
      <div className="hidden md:block chat-image avatar">
        <div className="w-6 md:w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={img} />
        </div>
      </div>
      <p className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}>
        {message?.body}
      </p>
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {extractTime(String(message?.createdAt))}
      </span>
    </div>
  );
};
export default Message;
