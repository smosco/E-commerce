import React from 'react';
import './styles.scss';
import Logo from './../../assets/logo.png';

const Header = () => {
  return (
    <header className='header'>
      <div className='wrap'>
        <div className='logo'>
          <img src={Logo} alt='SMOSCO LOGO' />
        </div>
      </div>
    </header>
  );
};

export default Header;
