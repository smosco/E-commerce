import React, { useEffect } from 'react';
import './styles.scss';
import { useParams } from 'react-router-dom';
import useProductStore from '../../zustand/productStore';
import Button from '../forms/button';

const ProductCard = () => {
  const { productID } = useParams();
  const { product, fetchProduct, clearProduct } = useProductStore();

  useEffect(() => {
    fetchProduct(productID);

    return () => {
      clearProduct();
    };
  }, [fetchProduct, productID, clearProduct]);

  const configAddToCardBtn = {
    type: 'button',
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  const { name, thumbnail, price } = product;

  return (
    <div className='productCard'>
      <div className='hero'>
        <img src={thumbnail} alt={name} />
      </div>
      <div className='productDetails'>
        <ul>
          <li>
            <h1>{name}</h1>
          </li>
          <li>
            <span>{price}</span>
          </li>
          <li>
            <div className='addToCart'>
              <Button {...configAddToCardBtn}>Add to cart</Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
