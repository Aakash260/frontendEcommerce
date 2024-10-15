import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReducerInitail } from "../../types/reducer-types";
import { User } from "../../types/types";

const initialState: UserReducerInitail = {
  user: null,
  loading: true,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExist: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    userNotExist: (state) => {
      state.loading = false;
      state.user = null;
    },
  },
});

export const { userExist, userNotExist } = userReducer.actions;
