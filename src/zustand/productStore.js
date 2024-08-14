import { create } from 'zustand';
import { auth } from '../firebase/utils';
import {
  handleFetchProducts,
  handleAddProduct,
  handleDeleteProduct,
  handleFetchProduct,
} from '../firebase/productUtils';

const useProductStore = create((set) => ({
  products: {
    data: [],
    queryDoc: null,
    isLastPage: false,
  },

  isLoading: false, // 로딩 상태 추가

  product: null,

  fetchProducts: async ({
    filterType,
    startAfterDoc = null,
    persistProducts = [],
  }) => {
    set({ isLoading: true }); // 로딩 시작
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
        isLoading: false, // 로딩 종료
      });
    } catch (err) {
      console.error('Failed to fetch products:', err);
      set({
        products: {
          data: [],
          queryDoc: null,
          isLastPage: false,
        },
        isLoading: false, // 로딩 종료
      });
    }
  },

  addProduct: async (product) => {
    const timestamp = new Date();
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
    }));
  },

  deleteProduct: async (productId) => {
    await handleDeleteProduct(productId);
    set((state) => ({
      products: {
        ...state.products,
        data: state.products.data.filter(
          (product) => product.documentID !== productId
        ),
      },
    }));
  },

  fetchProduct: async (productID) => {
    try {
      const product = await handleFetchProduct(productID);
      set({ product });
    } catch (err) {
      console.error('Failed to fetch product:', err);
      set({ product: null });
    }
  },

  clearProduct: () => {
    set({ product: null });
  },
}));

export default useProductStore;
