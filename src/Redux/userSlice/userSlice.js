import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    login: (state, action) => {
      console.log(state, action.payload)
      state.push(action.payload);
    },
    logout: (state) => {
      state = [];
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
