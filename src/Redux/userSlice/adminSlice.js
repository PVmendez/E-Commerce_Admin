import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: [],
  reducers: {
    loginAdmin: (state, action) => {
      // state = action.payload;
      state.push(action.payload);
    },
    logoutAdmin: (state) => {
      state = [];
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;

export default adminSlice.reducer;
