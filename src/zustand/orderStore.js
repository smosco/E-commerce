import { create } from 'zustand';
import { firestore } from '../firebase/utils';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  where,
} from 'firebase/firestore';

const useOrderStore = create((set) => ({
  orderHistory: [],
  orderDetails: {},

  fetchOrders: async (userId) => {
    try {
      let ordersQuery = query(
        collection(firestore, 'orders'),
        orderBy('orderCreatedDate'),
        where('orderUserID', '==', userId)
      );

      const querySnapshot = await getDocs(ordersQuery);
      const orderHistory = querySnapshot.docs.map((doc) => ({
        documentID: doc.id,
        ...doc.data(),
      }));

      set({ orderHistory });
    } catch (err) {
      console.error('Failed to fetch order history:', err);
    }
  },

  saveOrder: async (orderData, userId) => {
    try {
      const timestamps = new Date();
      const order = {
        ...orderData,
        orderUserID: userId,
        orderCreatedDate: timestamps,
      };

      const orderRef = doc(collection(firestore, 'orders'));
      await setDoc(orderRef, order);
    } catch (err) {
      console.error('Error adding order: ', err);
    }
  },

  fetchOrderDetails: async (orderId) => {
    try {
      const orderRef = doc(firestore, 'orders', orderId);
      const orderDoc = await getDoc(orderRef);
      if (orderDoc.exists()) {
        set({
          orderDetails: { documentID: orderDoc.id, ...orderDoc.data() },
        });
      } else {
        set({ orderDetails: null });
      }
    } catch (err) {
      console.error('Failed to fetch order details:', err);
    }
  },

  clearOrderDetails: () => {
    set({ orderDetails: {} });
  },
}));

export default useOrderStore;
