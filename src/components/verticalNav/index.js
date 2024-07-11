import React from 'react';
import useUserStore from '../../zustand/userStore';
import UserProfile from '../userProfile';
import './styles.scss';

const VerticalNav = ({ children }) => {
  const { currentUser } = useUserStore();

  const configUserProfile = {
    currentUser,
  };

  return (
    <div className='verticalNav'>
      <UserProfile {...configUserProfile} />

      <div className='menu'>{children}</div>
    </div>
  );
};

export default VerticalNav;
