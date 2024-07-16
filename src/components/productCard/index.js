import React, { useEffect } from 'react';
import './styles.scss';
import { useParams, useNavigate } from 'react-router-dom';
import useProductStore from '../../zustand/productStore';
import useCartStore from '../../zustand/cartStore';
import Button from '../forms/button';

const ProductCard = () => {
  const navigate = useNavigate();
  const { productID } = useParams();
  const { product, fetchProduct, clearProduct } = useProductStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchProduct(productID);

    return () => {
      clearProduct();
    };
  }, [fetchProduct, productID, clearProduct]);

  const configAddToCardBtn = {
    type: 'button',
  };

  const handleAddToCart = (product) => {
    if (!product) return;
    addToCart(product);
    navigate('/cart');
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  const { name, thumbnail, price, desc } = product;

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
            <span dangerouslySetInnerHTML={{ __html: desc }} />
          </li>

          <li>
            <div className='addToCart'>
              <Button
                {...configAddToCardBtn}
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

export default ProductCard;
