import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const HomeLayout = ({ children }) => {
  return (
    <div className='fullHeight'>
      <Header />
      <main className='mainContent'>{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
