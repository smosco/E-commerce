import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../zustand/userStore';
import { checkUserIsAdmin } from '../utils';

const useAdminAuth = () => {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }

    if (currentUser && !checkUserIsAdmin(currentUser.currentUser)) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  return currentUser;
};

export default useAdminAuth;
