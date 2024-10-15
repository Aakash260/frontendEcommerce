import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { productApi } from "./api/productApi";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderApi";
import { dashBoardApi } from "./api/dashboardApi";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [cartReducer.reducerPath]: cartReducer.reducer,
    [dashBoardApi.reducerPath]: dashBoardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userAPI.middleware)
      .concat(productApi.middleware)
      .concat(orderApi.middleware)
      .concat(dashBoardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
