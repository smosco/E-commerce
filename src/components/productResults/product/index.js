import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../forms/button';
import useCartStore from '../../../zustand/cartStore';

const Product = (product) => {
  const navigate = useNavigate();
  const { documentID, thumbnail, name, price } = product;
  const { addToCart } = useCartStore();

  if (!documentID || !thumbnail || !name || typeof price === 'undefined')
    return null;

  const configAddToCartBtn = {
    type: 'button',
  };

  const handleAddToCart = (product) => {
    if (!product) return;
    addToCart(product);
    navigate('/cart');
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
              <Button
                {...configAddToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
