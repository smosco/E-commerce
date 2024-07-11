import { useEffect, useState } from 'react';
import useUserStore from '../zustand/userStore';
import { checkUserIsAdmin } from '../utils';

const useAdminAuth = () => {
  const { currentUser } = useUserStore();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (checkUserIsAdmin(currentUser)) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  return isAdmin;
};

export default useAdminAuth;
