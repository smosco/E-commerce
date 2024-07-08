import React from 'react';
import Header from '../components/header';

const MainLayout = ({ children }) => {
  return (
    <div className='fullHeight'>
      <Header />
      <div className='main'>{children}</div>
    </div>
  );
};

export default MainLayout;
