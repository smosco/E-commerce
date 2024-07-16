import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/utils';
import useUserStore from '../../zustand/userStore';

import Logo from './../../assets/logo.png';
import useCartStore from '../../zustand/cartStore';

const Header = () => {
  const { currentUser } = useUserStore();
  const cartItemsCount = useCartStore((state) => state.cartItemsCount(state));

  return (
    <header className='header'>
      <div className='wrap'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='SMOSCO LOGO' />
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/search'>Search</Link>
            </li>
          </ul>
        </nav>

        <div className='callToActions'>
          <ul>
            <li>
              <Link to='/cart'>Your Cart ({cartItemsCount})</Link>
            </li>

            {currentUser && [
              <li>
                <Link to='/dashboard'>My Account</Link>
              </li>,
              <li>
                <span
                  onClick={() => {
                    auth.signOut();
                  }}
                >
                  Logout
                </span>
              </li>,
            ]}

            {!currentUser && [
              <li>
                <Link to='/registration'>Register</Link>
              </li>,
              <li>
                <Link to='/login'>Login</Link>
              </li>,
            ]}
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
