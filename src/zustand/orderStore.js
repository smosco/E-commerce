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
import { toast } from 'react-toastify';

const useOrderStore = create((set) => ({
  orderHistory: [],
  orderDetails: {},
  isFetchingOrders: false,
  isSavingOrder: false,
  isFetchingOrderDetails: false,
  errorMessage: null,

  fetchOrders: async (userId) => {
    set({ isFetchingOrders: true, errorMessage: null });
    try {
      const ordersQuery = query(
        collection(firestore, 'orders'),
        orderBy('orderCreatedDate'),
        where('orderUserID', '==', userId)
      );

      const querySnapshot = await getDocs(ordersQuery);
      const orderHistory = querySnapshot.docs.map((doc) => ({
        documentID: doc.id,
        ...doc.data(),
      }));

      set({ orderHistory, isFetchingOrders: false });
    } catch (err) {
      console.error('주문 목록을 불러오지 못했어요:', err);
      set({
        isFetchingOrders: false,
        errorMessage: '주문 목록을 불러오지 못했어요',
      });
      toast.error('주문 목록을 불러오지 못했어요.');
    }
  },

  saveOrder: async (orderData, userId) => {
    set({ isSavingOrder: true, errorMessage: null });
    try {
      const timestamps = new Date();
      const order = {
        ...orderData,
        orderUserID: userId,
        orderCreatedDate: timestamps,
      };

      const orderRef = doc(collection(firestore, 'orders'));
      await setDoc(orderRef, order);
      set({ isSavingOrder: false });
      toast.success('주문이 완료되었어요');
    } catch (err) {
      console.error('주문을 하는 도중 문제가 생겼어요: ', err);
      set({
        isSavingOrder: false,
        errorMessage: '주문을 하는 도중 문제가 생겼어요',
      });
      toast.error('주문을 하는 도중 문제가 생겼어요.');
    }
  },

  fetchOrderDetails: async (orderId) => {
    set({ isFetchingOrderDetails: true, errorMessage: null });
    try {
      const orderRef = doc(firestore, 'orders', orderId);
      const orderDoc = await getDoc(orderRef);
      if (orderDoc.exists()) {
        set({
          orderDetails: { documentID: orderDoc.id, ...orderDoc.data() },
          isFetchingOrderDetails: false,
        });
      } else {
        set({ orderDetails: null, isFetchingOrderDetails: false });
        toast.error('해당 주문을 찾을 수 없어요');
      }
    } catch (err) {
      console.error('주문 세부 정보를 불러오는데 실패했어요:', err);
      set({
        orderDetails: null,
        isFetchingOrderDetails: false,
        errorMessage: '주문 세부 정보를 불러오는데 실패했어요',
      });
      toast.error('주문 세부 정보를 불러오는데 실패했어요.');
    }
  },

  clearOrderDetails: () => {
    set({ orderDetails: {} });
  },
}));

export default useOrderStore;
