import { useState, useEffect } from 'react';
import useUserStore from '../zustand/userStore';

const useAuth = () => {
  const { currentUser } = useUserStore();

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [currentUser]);

  return isAuthenticated;
};

export default useAuth;
