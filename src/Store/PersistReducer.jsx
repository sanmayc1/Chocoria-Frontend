import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import socketReducer from './Slice/socketSlice.jsx';
import authReducer from './Slice/authSlice.jsx';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
};

const combinedReducers = combineReducers({
  auth: authReducer,
  socket: socketReducer,
});

const persistedReducer = persistReducer(persistConfig,combinedReducers);

export default persistedReducer;