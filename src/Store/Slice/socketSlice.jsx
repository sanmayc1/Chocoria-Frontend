import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'socket', 
  initialState: { socket:null }, 
  reducers: {
    SET_SOCKET: (state,action) => {
      state.socket = action.payload;
    },
    REMOVE_SOCKET: (state) => {
      state.socket = null
      
    },
  },
});

// Export actions and reducer

export const {SET_SOCKET,REMOVE_SOCKET}= socketSlice.actions;
export default socketSlice.reducer;

