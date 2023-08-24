/* eslint-disable import/prefer-default-export */
import {
  GET_ORDER_DATA,
  GET_ORDER_DATA_SUCCESS,
  GET_ORDER_DATA_FAILED,
  CLEAR_ORDER_DATA,
} from '../actions/order';

const inititalState = {
  orderDetails: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_ORDER_DATA: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case GET_ORDER_DATA_SUCCESS: {
      return {
        ...state,
        orderDetails: action.payload,
        orderRequest: false,
      };
    }
    case GET_ORDER_DATA_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    case CLEAR_ORDER_DATA: {
      return {
        ...state,
        orderDetails: null,
      };
    }
    default: {
      return state;
    }
  }
};
