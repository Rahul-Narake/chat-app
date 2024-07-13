import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

type CurrentUserType = {
  id: string;
  fullName: string;
  username: string;
  profile: string;
};

interface AuthContextInterface {
  currentUser: CurrentUserType | null;
  setCurrentUser: Dispatch<SetStateAction<CurrentUserType | null>>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export const useAuthContext = () => {
  const state = useContext(AuthContext);
  if (!state) throw new Error('Context state not found');

  return state;
};

export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCureentUser = async () => {
      try {
        const res = await fetch('/api/auth/currentUser');
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.message);
        }
        setCurrentUser(data?.user);
      } catch (error: any) {
        console.log(error?.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCureentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
