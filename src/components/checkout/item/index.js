import React from 'react';
import useCartStore from '../../../zustand/cartStore';

const Item = (product) => {
  const { name, thumbnail, price, quantity } = product;
  const { removeCartItem, reduceCartItem, addToCart } = useCartStore();

  const handleRemoveCartItem = (product) => {
    removeCartItem(product);
  };

  const handleReduceCartItem = (product) => {
    reduceCartItem(product);
  };

  const handleAddCartItem = (product) => {
    addToCart(product);
  };

  return (
    <tr className='cartItem'>
      <td>
        <img className='productImage' src={thumbnail} alt={name} />
      </td>
      <td>{name}</td>
      <td>
        <span
          className='cartBtn'
          onClick={() => {
            handleReduceCartItem(product);
          }}
        >{`<`}</span>
        <span>{quantity}</span>
        <span
          className='cartBtn'
          onClick={() => {
            handleAddCartItem(product);
          }}
        >{`>`}</span>
      </td>
      <td>{price}</td>
      <td align='center'>
        <span className='cartBtn' onClick={() => handleRemoveCartItem(product)}>
          X
        </span>
      </td>
    </tr>
  );
};

export default Item;
