import React from 'react';
import './styles.scss';
import userIMG from './../../assets/user.png';

const UserProfile = ({ currentUser }) => {
  const { displayName } = currentUser.currentUser;

  return (
    <div className='userProfile'>
      <ul>
        <li>
          <div className='img'>
            <img src={userIMG} alt='userImg' />
          </div>
        </li>
        <li>
          <span className='displayName'>{displayName && displayName}</span>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
