import { useState } from 'react';
import { useAuthContext } from '../context/AuthContextProvider';
import toast from 'react-hot-toast';

interface SignupInputs {
  fullName: string;
  username: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuthContext();
  const signup = async (input: SignupInputs) => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message);
      setCurrentUser(data?.user);
      toast(data?.message);
    } catch (error: any) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;
