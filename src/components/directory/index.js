import React from 'react';
import ShopMen from '../../assets/shopMens.jpg';
import ShopWomen from '../../assets/shopWomens.jpg';
import './styles.scss';

const Directory = () => {
  return (
    <div className='directory'>
      <div className='wrap'>
        <div
          className='item'
          style={{
            backgroundImage: `url(${ShopWomen})`,
          }}
        >
          <a href='shop link for women'>Shop Womens</a>
        </div>
        <div
          className='item'
          style={{
            backgroundImage: `url(${ShopMen})`,
          }}
        >
          <a href='shop link for men'>Shop Mens</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
