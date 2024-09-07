import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../zustand/cartStore';
import Button from '../forms/button';
import Item from './item';
import { formatPrice } from '../../utils';
import './styles.scss';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCartStore();
  const cartTotalPrice = useCartStore((state) =>
    state.selectCartTotalPrice(state)
  );

  return (
    <div className='checkout'>
      <h1>장바구니</h1>

      <div className='cart'>
        {cartItems.length > 0 ? (
          <>
            <table border='0' cellPadding='0' cellSpacing='0'>
              <colgroup>
                <col style={{ width: '15%' }} /> {/* Product Image */}
                <col style={{ width: '35%' }} /> {/* Description */}
                <col style={{ width: '20%' }} /> {/* Quantity */}
                <col style={{ width: '15%' }} /> {/* Price */}
                <col style={{ width: '15%' }} /> {/* Remove */}
              </colgroup>
              <thead>
                <tr className='checkoutHeader'>
                  <th>이미지</th>
                  <th>상품명</th>
                  <th>수량</th>
                  <th>가격</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, pos) => (
                  <Item key={pos} {...item} />
                ))}
                <tr className='totalRow'>
                  <td colSpan='4' />
                  <td>
                    <p>총합계: {formatPrice(cartTotalPrice)}원</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='totalActions'>
              <Button
                onClick={() => {
                  navigate('/search');
                }}
              >
                계속 쇼핑하기
              </Button>
              <Button
                onClick={() => {
                  navigate('/payment');
                }}
              >
                구매
              </Button>
            </div>
          </>
        ) : (
          <p className='noItemMessage'>장바구니에 상품이 없어요!</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
