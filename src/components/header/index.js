import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/utils';
import useUserStore from '../../zustand/userStore';

import Logo from './../../assets/logo.png';

const Header = () => {
  const { currentUser } = useUserStore();

  return (
    <header className='header'>
      <div className='wrap'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='SMOSCO LOGO' />
          </Link>
        </div>

        <div className='callToActions'>
          {currentUser && (
            <ul>
              <li>
                <Link to='/dashboard'>My Account</Link>
              </li>
              <li>
                <span
                  onClick={() => {
                    auth.signOut();
                  }}
                >
                  Logout
                </span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to='/registration'>Register</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
