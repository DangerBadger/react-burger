/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IOrder, IFeedOrders } from '../../utils/types';
import api from '../../utils/Api';
import { isError } from '../../utils/utils';

type TOrderState = {
  orders: IFeedOrders | null;
  orderDetails: IOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
  error: string | null;
  wsOpen: boolean;
  wsUrl: string;
  wsConnected: boolean;
  wsError: string | null;
  wsCloseCode: string;
};

export const getOrderData = createAsyncThunk<
  IOrder,
  Array<string>,
  { rejectValue: string }
>('order/get', async (orderIdArray, { rejectWithValue }) => {
  const response = await api.sendOrder(orderIdArray);

  if (!response.success) {
    return rejectWithValue(response.message);
  }
  return response;
});

export const getOrderByNumber = createAsyncThunk<
  IFeedOrders,
  string,
  { rejectValue: string }
>('order/getBynumber', async (orderNumber, { rejectWithValue }) => {
  const response = await api.getOrder(orderNumber);

  if (!response.success) {
    return rejectWithValue(response.message);
  }
  return response;
});

const initialState: TOrderState = {
  orders: null,
  orderDetails: null,
  orderRequest: false,
  orderFailed: false,
  error: null,
  wsOpen: false,
  wsUrl: '',
  wsConnected: true,
  wsError: null,
  wsCloseCode: '',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.orderDetails = null;
    },
    wsConnectionSuccess: (state, action: PayloadAction<boolean>) => {
      state.wsOpen = action.payload;
      state.wsError = null;
    },
    wsConnectionClosed: (state, action: PayloadAction<boolean>) => {
      state.wsOpen = false;
      state.wsUrl = '';
      state.wsError = null;
      state.orders = null;
    },
    wsConnectionStart: (state, action: PayloadAction<string>) => {
      state.wsConnected = true;
      state.wsUrl = action.payload;
    },
    wsConnectionOffline: (state) => {
      state.wsConnected = false;
    },
    wsConnectionError: (state, action: PayloadAction<null | string>) => {
      state.wsError = action.payload;
    },
    wsConnectionGetOrders: (state, action: PayloadAction<IFeedOrders>) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderData.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
        state.orderFailed = false;
      })
      .addCase(getOrderData.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
        state.orderRequest = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.orderRequest = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.orderRequest = false;
        console.error(action.payload);
      });
  },
});

export const {
  clearOrderData,
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionGetOrders,
  wsConnectionOffline,
  wsConnectionStart,
  wsConnectionSuccess,
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
