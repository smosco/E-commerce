import { create } from 'zustand';

const useCartStore = create((set) => ({
  cartItems: [],

  addToCart: (nextCartItem) =>
    set((state) => {
      const cartItemExists = state.cartItems.find(
        (cartItem) => cartItem.documentID === nextCartItem.documentID
      );

      if (cartItemExists) {
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.documentID === nextCartItem.documentID
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, { ...nextCartItem, quantity: 1 }],
        };
      }
    }),

  reduceCartItem: (cartItemToReduce) =>
    set((state) => {
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.documentID === cartItemToReduce.documentID
      );

      if (existingCartItem.quantity === 1) {
        return {
          cartItems: state.cartItems.filter(
            (cartItem) => cartItem.documentID !== existingCartItem.documentID
          ),
        };
      } else {
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.documentID === existingCartItem.documentID
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          ),
        };
      }
    }),

  removeCartItem: (cartItemToRemove) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => item.documentID !== cartItemToRemove.documentID
      ),
    })),

  clearCart: () => set({ cartItems: [] }),

  cartItemsCount: (state) =>
    state.cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    ),
}));

export default useCartStore;
