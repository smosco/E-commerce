import React, { useEffect } from 'react';
import useOrderStore from '../../zustand/orderStore';
import { useParams } from 'react-router-dom';
import OrderDetails from '../../components/orderDetails';
import { formatPrice } from '../../utils';
import './styles.scss';

const Order = () => {
  const { orderID } = useParams();
  const { orderDetails, fetchOrderDetails } = useOrderStore();
  const { orderTotal } = orderDetails;

  useEffect(() => {
    fetchOrderDetails(orderID);
  }, [fetchOrderDetails, orderID]);

  return (
    <div className='order'>
      <h1>주문번호 : {orderID}</h1>
      <p>총 합계 : {formatPrice(orderTotal)}원</p>
      <OrderDetails order={orderDetails} />
    </div>
  );
};

export default Order;
