import api from '../../utils/Api';

export const GET_ORDER_DATA = 'SEND_ORDER_DATA';
export const GET_ORDER_DATA_SUCCESS = 'SEND_ORDER_DATA_SUCCESS';
export const GET_ORDER_DATA_FAILED = 'SEND_ORDER_DATA_FAILED';
export const CLEAR_ORDER_DATA = 'CLEAR_ORDER_DATA'; // Нужен ли?

export function getOrderData(orderIdArray) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_DATA,
    });
    api
      .sendOrder(orderIdArray)
      .then((res) => {
        if (res && res.success) {
          setTimeout(
            () =>
              dispatch({
                type: GET_ORDER_DATA_SUCCESS,
                payload: res,
              }),
            '1000'
          );
        } else {
          dispatch({
            type: GET_ORDER_DATA_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_DATA_FAILED,
        });
      });
  };
}

export const clearOrderData = () => ({
  type: CLEAR_ORDER_DATA,
});
