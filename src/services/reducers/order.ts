/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder } from '../../utils/types';
import api from '../../utils/Api';

type TOrderState = {
  orderDetails: IOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

export const getOrderData = createAsyncThunk<
  IOrder,
  Array<string>,
  { rejectValue: string }
>('order/get', async (orderIdArray, { rejectWithValue }) => {
  try {
    const response = await api.sendOrder(orderIdArray);

    if (!response.success) {
      throw new Error('Ошибка получения данных заказа');
    }
    return response;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
  }
});

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
