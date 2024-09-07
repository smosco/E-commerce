import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../forms/button';
import useCartStore from '../../../zustand/cartStore';
import { formatPrice } from '../../../utils';

const Product = (product) => {
  const navigate = useNavigate();
  const { documentID, thumbnail, name, price, discountPrice, onSale } = product;
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

  // 할인율 계산
  const discountPercent =
    onSale && discountPrice
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;

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
            {/* 가격 표시: 세일 중일 경우 원가와 할인가를 표시 */}
            {onSale && discountPrice ? (
              <div className='priceContainer'>
                <span className='discountPercent'>{discountPercent}%</span>
                <span className='discountPrice'>
                  {formatPrice(discountPrice)}원
                </span>
              </div>
            ) : (
              <span className='price'>{formatPrice(price)}원</span>
            )}
          </li>
          <li>
            <div className='addToCartBtnContainer'>
              <Button
                {...configAddToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                장바구니에 추가
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
