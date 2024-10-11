import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }

      state.totalQuantity += action.payload.quantity;
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    removeItemFromCart(state, action) {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === itemId);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      }
    },
    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem && quantity > 0) {
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalPrice +=
          (quantity - existingItem.quantity) * existingItem.price;
        existingItem.quantity = quantity;
      }
    },
    setCartFromLocalStorage(state, action) {
      const { cartItems, totalQuantity, totalPrice } = action.payload;
      state.cartItems = cartItems;
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  setCartFromLocalStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
