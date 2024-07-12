import React from 'react';
import Button from '../../forms/button';

const Product = ({ thumbnail, name, price }) => {
  if (!thumbnail || !name || typeof price === 'undefined') return null;

  const configAddToCartBtn = {
    type: 'button',
  };
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
          <li>
            <div className='addToCart'>
              <Button {...configAddToCartBtn}>Add to cart</Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
