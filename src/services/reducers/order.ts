/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '../../utils/types';
import api from '../../utils/Api';
import { isError } from '../../utils/utils';

type TOrderState = {
  orderDetails: IOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
  error: string | null;
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

const initialState: TOrderState = {
  orderDetails: null,
  orderRequest: false,
  orderFailed: false,
  error: null,
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
        state.error = null;
        state.orderFailed = false;
      })
      .addCase(getOrderData.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
        state.orderRequest = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.orderRequest = false;
        console.error(action.payload);
      });
  },
});

export const { clearOrderData } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
