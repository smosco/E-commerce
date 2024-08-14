import { create } from 'zustand';
import { auth } from '../firebase/utils';
import {
  handleFetchProducts,
  handleAddProduct,
  handleDeleteProduct,
  handleFetchProduct,
} from '../firebase/productUtils';
import { toast } from 'react-toastify';

const useProductStore = create((set) => ({
  products: {
    data: [],
    queryDoc: null,
    isLastPage: false,
  },

  isLoading: false,
  isAddingProduct: false,
  isDeletingProduct: false,
  errorMessage: null,

  product: null,

  fetchProducts: async ({
    filterType,
    startAfterDoc = null,
    persistProducts = [],
  }) => {
    set({ isLoading: true, errorMessage: null });
    try {
      const productsData = await handleFetchProducts({
        filterType,
        startAfterDoc,
        persistProducts,
      });
      set({
        products: productsData || {
          data: [],
          queryDoc: null,
          isLastPage: false,
        },
        isLoading: false,
      });
    } catch (err) {
      console.error('상품 목록을 가져오지 못했어요:', err);
      set({
        products: {
          data: [],
          queryDoc: null,
          isLastPage: false,
        },
        isLoading: false,
        errorMessage: '상품 목록을 가져오지 못했어요',
      });
      toast.error('상품 목록을 가져오지 못했어요');
    }
  },

  addProduct: async (product) => {
    set({ isAddingProduct: true, errorMessage: null });
    const timestamp = new Date();
    try {
      await handleAddProduct({
        ...product,
        productAdminUserUID: auth.currentUser.uid,
        createDate: timestamp,
      });
      set((state) => ({
        products: {
          ...state.products,
          data: [...state.products.data, product],
        },
        isAddingProduct: false,
      }));
      toast.success('상품을 등록했어요');
    } catch (err) {
      console.error('상품 등록에 실패했어요:', err);
      set({ isAddingProduct: false, errorMessage: '상품 등록에 실패했어요' });
      toast.error('상품 등록에 실패했어요.');
    }
  },

  deleteProduct: async (productId) => {
    set({ isDeletingProduct: true, errorMessage: null });
    try {
      await handleDeleteProduct(productId);
      set((state) => ({
        products: {
          ...state.products,
          data: state.products.data.filter(
            (product) => product.documentID !== productId
          ),
        },
        isDeletingProduct: false,
      }));
      toast.success('상품을 삭제했어요');
    } catch (err) {
      console.error('상품 삭제를 실패했어요:', err);
      set({
        isDeletingProduct: false,
        errorMessage: '상품 삭제를 실패했어요',
      });
      toast.error('상품 삭제를 실패했어요.');
    }
  },

  fetchProduct: async (productID) => {
    set({ isLoading: true, errorMessage: null });
    try {
      const product = await handleFetchProduct(productID);
      set({ product, isLoading: false });
    } catch (err) {
      console.error('상품 정보를 가져오지 못했어요:', err);
      set({
        product: null,
        isLoading: false,
        errorMessage: '상품 정보를 가져오지 못했어요',
      });
      toast.error('상품 정보를 가져오지 못했어요.');
    }
  },

  clearProduct: () => {
    set({ product: null });
  },
}));

export default useProductStore;
