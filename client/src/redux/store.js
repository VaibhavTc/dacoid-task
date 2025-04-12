// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import urlsReducer from './urlsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    urls: urlsReducer
  }
});
