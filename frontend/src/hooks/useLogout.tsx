import { useState } from 'react';
import { useAuthContext } from '../context/AuthContextProvider';
import toast from 'react-hot-toast';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuthContext();
  const logout = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/logout');
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message);
      setCurrentUser(null);
      toast(data?.message);
    } catch (error: any) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return { logout, loading };
};

export default useLogout;
