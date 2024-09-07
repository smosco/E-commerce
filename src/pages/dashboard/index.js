import React, { useEffect } from 'react';
import useOrderStore from '../../zustand/orderStore';
import useUserStore from '../../zustand/userStore';
import OrderHistory from '../../components/orderHistory';
import './styles.scss';

const Dashboard = () => {
  const { currentUser } = useUserStore();
  const { orderHistory, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders(currentUser.currentUser.id);
  }, [fetchOrders, currentUser.currentUser.id]);

  return (
    <div className='dashboard'>
      <h1>주문 목록</h1>
      <OrderHistory orders={orderHistory} />
    </div>
  );
};

export default Dashboard;
