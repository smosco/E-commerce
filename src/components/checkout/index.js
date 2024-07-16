import React from 'react';
import useCartStore from '../../zustand/cartStore';
import Button from '../forms/button';
import Item from './item';
import './styles.scss';

const Checkout = () => {
  const { cartItems } = useCartStore();
  console.log(cartItems);

  return (
    <div className='checkout'>
      <h1>Checkout</h1>

      <div className='cart'>
        {cartItems.length > 0 ? (
          <table border='0' cellPadding='0' cellSpacing='0'>
            <tbody>
              <tr>
                <table
                  className='checkoutHeader'
                  border='0'
                  cellPadding='0'
                  cellSpacing='0'
                >
                  <tbody>
                    <tr>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Remove</th>
                    </tr>
                  </tbody>
                </table>
              </tr>

              <tr>
                <table border='0' cellPadding='0' cellSpacing='0'>
                  <tbody>
                    {cartItems.map((item, pos) => {
                      return <Item {...item} />;
                    })}
                  </tbody>
                </table>
              </tr>

              <tr>
                <table align='right' border='0' cellPadding='0' cellSpacing='0'>
                  <tr align='right'>
                    <td>
                      <h3>Total:</h3>
                    </td>
                  </tr>
                  <tr>
                    <table border='0' cellPadding='10' cellSpacing='0'>
                      <tbody>
                        <tr>
                          <td>
                            <Button>Continue Shopping</Button>
                          </td>
                          <td>
                            <Button>Checkout</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </tr>
                </table>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>You hanve no items in your cart </p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
