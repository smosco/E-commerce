import React from 'react';
import { Link } from 'react-router-dom';
import useUserStore from '../../zustand/userStore';
import { checkUserIsAdmin } from '../../utils';
import './styles.scss';

const AdminToolbar = () => {
  const { currentUser } = useUserStore();

  const isAdmin = currentUser && checkUserIsAdmin(currentUser.currentUser);
  if (!isAdmin) return null;

  return (
    <div className='adminToolbar'>
      <ul>
        <li>
          <Link to='/admin'>관리자</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminToolbar;
