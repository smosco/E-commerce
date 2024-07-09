import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const MainLayout = ({ children, currentUser }) => {
  return (
    <div className='fullHeight'>
      <Header currentUser={currentUser} />
      <div className='main'>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
