import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const HomeLayout = ({ children, currentUser }) => {
  return (
    <div className='fullHeight'>
      <Header currentUser={currentUser} />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
