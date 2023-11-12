/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
import { FC, useMemo, useCallback } from 'react';
import { IFeedOrders } from '../../utils/types';

import ordersSummaryStyles from './OrdersSummary.module.css';

interface IOrdersSummary {
  orders: IFeedOrders | null;
}

const OrdersSummary: FC<IOrdersSummary> = ({ orders }) => {
  const total = orders?.total;
  const totalToday = orders?.totalToday;

  const completeOrders = useMemo(() => {
    return orders?.orders
      ?.filter((order) => {
        return order.status === 'done';
      })
      .map((order) => order.number);
  }, [orders?.orders]);

  const incompleteOrders = useMemo(() => {
    return orders?.orders
      ?.filter((order) => {
        return order.status !== 'done';
      })
      .map((order) => order.number);
  }, [orders?.orders]);

  return (
    <section className={`${ordersSummaryStyles.numdersSection} mt-25`}>
      <div className={ordersSummaryStyles.numbersListsContainer}>
        <div className="mb-15">
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <ul
            className={`${ordersSummaryStyles.numbersListReady} text text_type_digits-default`}
          >
            {completeOrders?.map((order, index) => {
              if (index < 10) return <li key={order}>{order}</li>;
            })}
          </ul>
        </div>
        <div>
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          <ul
            className={`${ordersSummaryStyles.numbersList} text text_type_digits-default`}
          >
            {incompleteOrders?.map((order, index) => {
              if (index < 10) return <li key={order}>{order}</li>;
            })}
          </ul>
        </div>
      </div>
      <div className="mb-15">
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <p
          className={`text text_type_digits-large ${ordersSummaryStyles.largeDigits}`}
        >
          {total}
        </p>
      </div>
      <div className="mb-15">
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <p
          className={`text text_type_digits-large ${ordersSummaryStyles.largeDigits}`}
        >
          {totalToday}
        </p>
      </div>
    </section>
  );
};

export default OrdersSummary;
