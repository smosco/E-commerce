import { create } from 'zustand';
import { firestore } from '../firebase/utils';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
  where,
} from 'firebase/firestore';

const useOrderStore = create((set) => ({
  orderHistory: [],

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
}));

export default useOrderStore;
