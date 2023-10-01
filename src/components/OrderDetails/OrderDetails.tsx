/* eslint-disable no-nested-ternary */
import { FC } from 'react';
import { IOrder } from '../../utils/types';
import { useAppSelector } from '../../utils/hooks/useRedux';

import stylesOrderDetails from './OrderDetails.module.css';

import done from '../../images/done.gif';
import { PreparationStageTexts } from '../../utils/constants';

const OrderDetails: FC = () => {
  const orderDetails: IOrder | null = useAppSelector(
    (store) => store.orderData.orderDetails
  );
  const orderError: boolean = useAppSelector(
    (store) => store.orderData.orderFailed
  );
  const isOrderLoading: boolean = useAppSelector(
    (store) => store.orderData.orderRequest
  );

  return (
    <div className={stylesOrderDetails.container}>
      {isOrderLoading ? (
        <h3 className="text text_type_main-large mt-4">
          Загрузка номера заказа...
        </h3>
      ) : orderDetails ? (
        <h3 className="text text_type_digits-large mt-4">
          {orderDetails.order.number}
        </h3>
      ) : (
        <h3 className="text text_type_main-large mt-4">Ошибка запроса...</h3>
      )}
      <p className="text text_type_main-medium mt-8">Идентификатор заказа</p>
      {!orderDetails && orderError ? (
        <h3 className="text text_type_main-large mt-4">:(</h3>
      ) : (
        <img src={done} alt="Готовится" className="mt-15" />
      )}
      <p className="text text_type_main-default mt-15">
        {!orderDetails && orderError
          ? PreparationStageTexts.error
          : PreparationStageTexts.cooking}
      </p>
      {!orderDetails && orderError ? (
        <p className="text text_type_main-default text_color_inactive mt-2 mb-30">
          Попробуйте повторить попытку позже
        </p>
      ) : (
        <p className="text text_type_main-default text_color_inactive mt-2 mb-30">
          Дождитесь готовности на орбитальной станции
        </p>
      )}
    </div>
  );
};

export default OrderDetails;
