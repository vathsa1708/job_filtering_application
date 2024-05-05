// src/configStore.js
import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './reducers/JobReducer';



const store = configureStore({
  reducer: jobReducer,
});

export default store;
