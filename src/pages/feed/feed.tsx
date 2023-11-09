/* eslint-disable arrow-body-style */
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const dispatch = useAppDispatch();
  const orders: IFeedOrders | null = useAppSelector(
    (store) => store.orderData?.orders
  );

  useEffect(() => {
    dispatch(wsConnectionStart(`${BASE_WSS}/orders/all`));

    return () => {
      dispatch(wsConnectionOffline());
    };
  }, [location.pathname, dispatch]);

  return (
    <main className={feedStyles.main}>
      <section className={feedStyles.section}>
        {orders ? (
          <>
            <OrdersFeed />
            <OrdersSummary orders={orders} />
          </>
        ) : (
          <h2 className="text text_type_main-large mt-10 mb-5">
            Загрузка ленты заказов...
          </h2>
        )}
      </section>
    </main>
  );
};

export default Feed;
