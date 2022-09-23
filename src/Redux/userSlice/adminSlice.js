import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: [],
  reducers: {
    loginAdmin: (state, action) => {
      return (state = [action.payload]);
    },
    logoutAdmin: (state) => {
      return (state = []);
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;

export default adminSlice.reducer;
