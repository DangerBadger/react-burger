/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { socketMiddleware } from './middleware/socketMiddleware';
import { ingredientsReducer } from './reducers/ingredients';
import { orderReducer } from './reducers/order';
import { userReducer } from './reducers/user';

const wsActions = {
  wsConnection: 'order/wsConnectionStart',
  wsOpen: 'order/wsConnectionSuccess',
  wsClose: 'order/wsConnectionClosed',
  wsGetOrders: 'order/wsConnectionGetOrders',
  wsSetOffline: 'order/wsConnectionOffline',
  wsError: 'order/wsConnectionError',
};

export const rootReducer = combineReducers({
  ingredientsData: ingredientsReducer,
  orderData: orderReducer,
  userData: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});

export default store;
