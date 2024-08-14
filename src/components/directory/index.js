import React from 'react';
import { Link } from 'react-router-dom';
import ShopMen from '../../assets/shopMens.jpg';
import ShopWomen from '../../assets/shopWomens.jpg';
import './styles.scss';

const Directory = () => {
  return (
    <div className='directory'>
      <div
        className='item left'
        style={{
          backgroundImage: `url(${ShopWomen})`,
        }}
      >
        <Link to='/search/womens' className='link'>
          Shop Womens
        </Link>
      </div>
      <div
        className='item right'
        style={{
          backgroundImage: `url(${ShopMen})`,
        }}
      >
        <Link to='/search/mens' className='link'>
          Shop Mens
        </Link>
      </div>
    </div>
  );
};

export default Directory;
