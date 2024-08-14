import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const MainLayout = ({ children }) => {
  return (
    <div className='fullHeight'>
      <Header />
      <div className='mainContent'>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
