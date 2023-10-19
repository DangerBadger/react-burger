/* eslint-disable arrow-body-style */
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Paths } from '../../utils/constants';

import ordersFeedStyles from './OrdersFeed.module.css';

import OrderItem from '../OrderItem/OrderItem';

const OrdersFeed: FC = () => {
  const location = useLocation();

  return (
    <section>
      {location.pathname === Paths.feed && (
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      )}
      <ul className={ordersFeedStyles.orderList}>
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </ul>
    </section>
  );
};

export default OrdersFeed;
