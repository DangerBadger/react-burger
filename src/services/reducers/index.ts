/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  ingredientsData: ingredientsReducer,
  orderData: orderReducer,
  userData: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
