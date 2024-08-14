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
      <h1>Checkout</h1>

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
                  <th>Product</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, pos) => (
                  <Item key={pos} {...item} />
                ))}
                <tr className='totalRow'>
                  <td colSpan='4' />
                  <td>
                    <h3>Total: {formatPrice(cartTotalPrice)}원</h3>
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
                Continue Shopping
              </Button>
              <Button
                onClick={() => {
                  navigate('/payment');
                }}
              >
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <p>You have no items in your cart.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
