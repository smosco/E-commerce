import React from 'react';
import { Link } from 'react-router-dom';
import ShopMen from '../../assets/shopMens.jpeg';
import ShopWomen from '../../assets/shopWomens.jpeg';
import './styles.scss';

const Directory = () => {
  return (
    <div className='directory'>
      <div className='item left'>
        <img src={ShopWomen} alt='Shop Womens' className='background-image' />
        <Link to='/search/womens' className='link'>
          Shop Womens
        </Link>
      </div>
      <div className='item right'>
        <img src={ShopMen} alt='Shop Mens' className='background-image' />
        <Link to='/search/mens' className='link'>
          Shop Mens
        </Link>
      </div>
    </div>
  );
};

export default Directory;
