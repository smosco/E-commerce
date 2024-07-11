import { create } from 'zustand';
import { auth } from '../firebase/utils';
import {
  handleFetchProducts,
  handleAddProduct,
  handleDeleteProduct,
} from '../firebase/productUtils';

const useProductStore = create((set) => ({
  products: {
    data: [],
    queryDoc: null,
    isLastPage: false,
  },

  fetchProducts: async (params) => {
    const productsData = await handleFetchProducts(params);
    set({ products: productsData });
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
}));

export default useProductStore;
