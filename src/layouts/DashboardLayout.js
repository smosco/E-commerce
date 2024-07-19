import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/header';
import VerticalNav from '../components/verticalNav';
import Footer from '../components/footer';

const DashboardLayout = ({ children }) => {
  return (
    <div className='dashboardLayout'>
      <Header />
      <div className='controlPanel'>
        <div className='sidebar'>
          <VerticalNav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <span className='signOut' onClick={() => {}}>
                  Sign Out
                </span>
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

export default DashboardLayout;
