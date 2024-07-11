import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/header';
import VerticalNav from '../components/verticalNav';
import Footer from '../components/footer';

const AdminLayout = ({ children }) => {
  return (
    <div className='adminLayout'>
      <Header />
      <div className='controlPanel'>
        <div className='sidebar'>
          <VerticalNav>
            <ul>
              <li>
                <Link to='/admin'>Home</Link>
              </li>
              <li>
                <span className='signOut'>Sign Out</span>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className='content'>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
