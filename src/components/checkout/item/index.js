import React from 'react';

const Item = (product) => {
  const { name, thumbnail, price, desc, quantity, documentID } = product;

  return (
    <table className='cartItem' border='0' cellSpacing='0' cellPadding='0'>
      <tbody>
        <tr>
          <td>
            <img src={thumbnail} alt={name} />
          </td>
          <td>{name}</td>
          <td>
            <span>{quantity}</span>
          </td>
          <td>{price}</td>
          <td align='center'>
            <span className='cartBtn'>X</span>
          </td>
        </tr>
      </tbody>
      Item
    </table>
  );
};

export default Item;
