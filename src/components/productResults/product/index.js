import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../forms/button';

const Product = ({ documentID, thumbnail, name, price }) => {
  if (!documentID || !thumbnail || !name || typeof price === 'undefined')
    return null;

  const configAddToCartBtn = {
    type: 'button',
  };
  return (
    <div className='product'>
      <div className='thumb'>
        <Link to={`/product/${documentID}`}>
          <img src={thumbnail} alt={name} />
        </Link>
      </div>
      <div className='details'>
        <ul>
          <li>
            <span className='name'>
              <Link to={`/product/${documentID}`}>{name}</Link>
            </span>
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
