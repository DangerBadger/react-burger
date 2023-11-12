/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import type { Middleware, MiddlewareAPI } from 'redux';
import type { TRootState, TAppDispatch } from '../types';
import type { TWSStoreActions } from '../types/wsActionTypes';

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;
    let url: string = '';
    let isConnected: boolean = false;
    let connectionTimer: number = 0;

    return (next) => (action) => {
      const { type, payload } = action;
      const { dispatch } = store;
      const {
        wsConnection,
        wsOpen,
        wsClose,
        wsGetOrders,
        wsSetOffline,
        wsError,
      } = wsActions;

      if (type === wsConnection) {
        url = payload;
        socket = new WebSocket(url);
        isConnected = true;
      }

      if (type === wsSetOffline && socket) {
        socket.close(1000, 'Websocket closed');
        socket = null;
        isConnected = false;
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: wsOpen });
        };
        socket.onerror = (event: Event) => {
          dispatch({ type: wsError });
        };
        socket.onmessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data);

          dispatch({ type: wsGetOrders, payload: data });
        };
        socket.onclose = (event: CloseEvent) => {
          if (event.code !== 1000) {
            dispatch({
              type: wsClose,
              payload: `Соединение закрыто с кодом -  ${event.code}`,
            });
          }
          dispatch({
            type: wsClose,
            payload: `Соединение закрыто корректно ${event.code}`,
          });

          if (isConnected) {
            connectionTimer = window.setTimeout(() => {
              dispatch({ type: wsConnection, payload: url });
            }, 3000);
          }
        };
      }

      next(action);
    };
  }) as Middleware;
};
