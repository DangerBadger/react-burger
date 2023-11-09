/* eslint-disable arrow-body-style */
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Paths } from '../../utils/constants';
import { useAppSelector } from '../../utils/hooks/useRedux';
import { IFeedOrders } from '../../utils/types';

import ordersFeedStyles from './OrdersFeed.module.css';

import OrderItem from '../OrderItem/OrderItem';

const OrdersFeed: FC = () => {
  const location = useLocation();
  const orders: IFeedOrders | null = useAppSelector(
    (store) => store.orderData?.orders
  );

  return (
    <section>
      {location.pathname === Paths.feed && (
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      )}
      <ul className={ordersFeedStyles.orderList}>
        {orders?.orders?.map((order) => {
          return <OrderItem key={order.number} order={order} />;
        })}
      </ul>
    </section>
  );
};

export default OrdersFeed;
