import { useState } from 'react';
import { useAuthContext } from '../context/AuthContextProvider';
import toast from 'react-hot-toast';

interface LoginInputs {
  username: string;
  password: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuthContext();
  const login = async (inputs: LoginInputs) => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message);
      setCurrentUser(data?.user);
      toast(data?.message);
    } catch (error: any) {
      console.log(error?.message);
      toast(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;
