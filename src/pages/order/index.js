import React, { useEffect } from 'react';
import useOrderStore from '../../zustand/orderStore';
import { useParams } from 'react-router-dom';
import OrderDetails from '../../components/orderDetails';

const Order = () => {
  const { orderID } = useParams();
  const { orderDetails, fetchOrderDetails } = useOrderStore();
  const { orderTotal } = orderDetails;

  useEffect(() => {
    fetchOrderDetails(orderID);
  }, [fetchOrderDetails, orderID]);

  return (
    <div>
      <h1>Order ID:{orderID}</h1>
      <h3>Total:{orderTotal}</h3>
      <OrderDetails order={orderDetails} />
    </div>
  );
};

export default Order;
