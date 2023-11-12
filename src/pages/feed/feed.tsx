/* eslint-disable arrow-body-style */
import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/hooks/useRedux';
import {
  wsConnectionStart,
  wsConnectionOffline,
} from '../../services/reducers/order';
import { IFeedOrders } from '../../utils/types';
import { BASE_WSS } from '../../utils/constants';

import feedStyles from './feed.module.css';

import OrdersFeed from '../../components/OrdersFeed/OrdersFeed';
import OrdersSummary from '../../components/OrdersInfo/OrdersSummary';

const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders: IFeedOrders | null = useAppSelector(
    (store) => store.orderData?.orders
  );

  useEffect(() => {
    dispatch(wsConnectionStart(`${BASE_WSS}/orders/all`));

    return () => {
      dispatch(wsConnectionOffline());
    };
  }, []);

  return (
    <main className={feedStyles.main}>
      <section className={feedStyles.section}>
        {orders ? (
          <>
            <OrdersFeed reverse={false} />
            <OrdersSummary orders={orders} />
          </>
        ) : (
          <h1 className="text text_type_main-large mt-10 mb-5">
            Загрузка ленты заказов...
          </h1>
        )}
      </section>
    </main>
  );
};

export default Feed;
