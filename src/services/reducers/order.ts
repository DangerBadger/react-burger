/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/Api';

type TOrder = {
  name: string;
  order: {
    number: number;
  };
};

type TOrderState = {
  orderDetails: TOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

export const getOrderData = createAsyncThunk(
  'order/get',
  async (orderIdArray: Array<string>, { rejectWithValue }) => {
    try {
      const response = await api.sendOrder(orderIdArray);

      if (!response.success) {
        throw new Error('Ошибка получения данных заказа');
      }

      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState: TOrderState = {
  orderDetails: null,
  orderRequest: false,
  orderFailed: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderData.pending, (state) => {
        state.orderRequest = true;
        state.orderFailed = false;
      })
      .addCase(getOrderData.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
        state.orderRequest = false;
      })
      .addCase(getOrderData.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderFailed = true;
        console.error(action.payload);
      });
  },
});

export const { clearOrderData } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
