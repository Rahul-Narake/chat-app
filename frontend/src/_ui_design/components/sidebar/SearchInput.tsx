import { Search } from 'lucide-react';
import { useState } from 'react';
import useConversations from '../../../hooks/useConversations';
import toast from 'react-hot-toast';
import { ConversationType } from '../../../features/conversation/conversationSlice';
import { setSelectedConversation } from '../../../features/conversation/conversationSlice';
import { useDispatch } from 'react-redux';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { conversations } = useConversations();
  const dispatch = useDispatch();
  const searchHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error('Search term must be atleast 3 charecters long');
    }
    const conversation = conversations.find((c: ConversationType) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      dispatch(setSelectedConversation(conversation));
      setSearch('');
    } else {
      toast.error('No user found!!!');
    }
  };
  return (
    <form className="flex items-center gap-2" onSubmit={searchHandler}>
      <input
        type="text"
        placeholder="Search…"
        className="input-sm md:input input-bordered rounded-full sm:rounded-full w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn md:btn-md btn-sm btn-circle bg-sky-500 text-white"
      >
        <Search className="w-4 h-4 md:w-6 md:h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
