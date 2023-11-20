/* eslint-disable no-undef */
import {
  orderReducer,
  clearOrderData,
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionGetOrders,
  wsConnectionOffline,
  wsConnectionStart,
  wsConnectionSuccess,
  getOrderData,
  getOrderByNumber,
  initialState,
} from './order';
import {
  mockOrder,
  stateWithMockOrder,
  mockOrders,
  mockIngredientsArray,
} from '../../utils/mock-data';
import { BASE_WSS } from '../../utils/constants';

describe('order reducer', () => {
  // Синхронные экшены
  it('it should RETURN initial state', () => {
    const result = orderReducer(undefined, { type: ' ' });

    expect(result).toEqual(initialState);
  });

  it('should CLEAR order data', () => {
    const action = { type: clearOrderData.type };
    const result = orderReducer(stateWithMockOrder, action);

    expect(result.orderDetails).toBe(null);
  });

  it('should RETURN connection status "true"', () => {
    const result = orderReducer(initialState, wsConnectionSuccess(true));

    expect(result.wsOpen).toBe(true);
    expect(result.wsError).toBe(null);
  });

  it('should CLOSE wss connection', () => {
    const result = orderReducer(stateWithMockOrder, wsConnectionClosed());

    expect(result.wsOpen).toBe(false);
    expect(result.wsUrl).toBe('');
    expect(result.wsError).toEqual(null);
    expect(result.orders).toEqual(null);
  });

  it('should START wss connection', () => {
    const result = orderReducer(
      initialState,
      wsConnectionStart(`${BASE_WSS}/orders/all`)
    );

    expect(result.wsConnected).toBe(true);
    expect(result.wsUrl).toBe(`${BASE_WSS}/orders/all`);
  });

  it('should RETURN connection status "false"', () => {
    const result = orderReducer(stateWithMockOrder, wsConnectionOffline());

    expect(result.wsConnected).toBe(false);
  });

  it('should SET wss connection error', () => {
    const result = orderReducer(initialState, wsConnectionError('Error'));

    expect(result.wsError).toBe('Error');
  });

  it('should GET orders', () => {
    const result = orderReducer(
      initialState,
      wsConnectionGetOrders(mockOrders)
    );

    expect(result.orders).toEqual(mockOrders);
  });

  // Асинхронные thunk'и и их экшены
  global.fetch = jest.fn();

  it('should GET order data', async () => {
    const dispatch = jest.fn();
    const thunk = getOrderData(mockIngredientsArray);

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve(mockOrder),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('order/get/pending');
    expect(end[0].type).toBe('order/get/fulfilled');
    expect(end[0].payload).toEqual(mockOrder);
  });

  it('should REJECT GET order data', async () => {
    const dispatch = jest.fn();
    const thunk = getOrderData();

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: false,
        }),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('order/get/pending');
    expect(end[0].type).toBe('order/get/rejected');
    expect(end[0].payload).toBe('Ошибка получения данных заказа');
  });

  it('should CHANGE status with getOrderData.pending action', () => {
    const result = orderReducer(stateWithMockOrder, getOrderData.pending());

    expect(result.orderRequest).toBe(true);
    expect(result.error).toEqual(null);
    expect(result.orderFailed).toBe(false);
  });

  it('should GET order data with getOrderData.fulfilled action', () => {
    const result = orderReducer(initialState, getOrderData.fulfilled(mockOrder));

    expect(result.orderDetails).toEqual(mockOrder);
    expect(result.orderRequest).toBe(false);
  });

  it('should REJECT ingredients fetch with getOrderData.rejected action', () => {
    const result = orderReducer(initialState, getOrderData.rejected('Ошибка получения данных заказа'));

    expect(result.error).toBe('Ошибка получения данных заказа');
    expect(result.orderRequest).toBe(false);
  });

  it('should GET order by number', async () => {
    const dispatch = jest.fn();
    const thunk = getOrderByNumber(25789);

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve(mockOrders),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('order/getBynumber/pending');
    expect(end[0].type).toBe('order/getBynumber/fulfilled');
    expect(end[0].payload).toEqual(mockOrders);
  });

  it('should REJECT GET order by number', async () => {
    const dispatch = jest.fn();
    const thunk = getOrderByNumber();

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: false,
        }),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('order/getBynumber/pending');
    expect(end[0].type).toBe('order/getBynumber/rejected');
    expect(end[0].payload).toBe('Ошибка загрузки заказа');
  });

  it('should CHANGE status with getOrderByNumber.pending action', () => {
    const result = orderReducer(stateWithMockOrder, getOrderByNumber.pending());

    expect(result.orderRequest).toBe(true);
    expect(result.error).toEqual(null);
  });

  it('should GET order by number with getOrderByNumber.fulfilled action', () => {

    const result = orderReducer(initialState, getOrderByNumber.fulfilled(mockOrders));

    expect(result.orders).toEqual(mockOrders);
    expect(result.orderRequest).toBe(false);
  });

  it('should REJECT order by number fetch with getOrderByNumber.rejected action', () => {
    const result = orderReducer(initialState, getOrderByNumber.rejected('Ошибка загрузки заказа'));

    expect(result.error).toBe('Ошибка загрузки заказа');
    expect(result.orderRequest).toBe(false);
  });
});
