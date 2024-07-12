import React from 'react';

const Product = ({ thumbnail, name, price }) => {
  if (!thumbnail || !name || typeof price === 'undefined') return null;
  return (
    <div className='product'>
      <div className='thumb'>
        <img src={thumbnail} alt={name} />
      </div>
      <div className='details'>
        <ul>
          <li>
            <span className='name'>{name}</span>
          </li>
          <li>
            <span className='price'>{price}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
