import React from 'react';
import Header from '../components/header';

const HomeLayout = ({ children }) => {
  return (
    <div className='fullHeight'>
      <Header />
      {children}
    </div>
  );
};

export default HomeLayout;
