import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth', 
  initialState: { auth:false,role:null }, 
  reducers: {
    authFalse: (state) => {
      state.auth = false;
      state.role = null 
    },
    SET_AUTH: (state,action) => {
      state.auth = action.payload.auth //;
      state.role = action.payload.role//
    },
  },
});

// Export actions and reducer
export const {authFalse,SET_AUTH} = authSlice.actions;
export default authSlice.reducer;
