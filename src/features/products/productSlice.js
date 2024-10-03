import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    dataDetails: [],
    isLoading: false,
    errorMessage: null,
  },
  reducers: {
    fetchProductsSuccess(state, action) {
      state.isLoading = false;
      state.errorMessage = "";
      state.data = action.payload;
    },
    fetchProductSuccess(state, action) {
      state.isLoading = false;
      state.errorMessage = "";
      state.dataDetails = action.payload;
    },
    fetchProductsLoading(state, action) {
      state.isLoading = action.payload;
    },
    fetchProductsError(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchProductsSuccess,
  fetchProductsLoading,
  fetchProductsError,
  fetchProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;

export function fetchProducts() {
  return async (dispatch, getState) => {
    dispatch(fetchProductsLoading(true));
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      dispatch(fetchProductsSuccess(data));
    } catch (error) {
      dispatch(fetchProductsError(error.message));
    } finally {
      dispatch(fetchProductsLoading(false));
    }
  };
}

export function fetchProduct(id) {
  return async (dispatch, getState) => {
    dispatch(fetchProductsLoading(true));
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      dispatch(fetchProductSuccess(data));
    } catch (error) {
      dispatch(fetchProductsError(error.message));
    } finally {
      dispatch(fetchProductsLoading(false));
    }
  };
}
