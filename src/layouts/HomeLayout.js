import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const HomeLayout = ({ children }) => {
  return (
    <div className='fullHeight'>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
