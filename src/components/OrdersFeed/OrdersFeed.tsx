/* eslint-disable arrow-body-style */
import { FC } from 'react';

import ordersFeedStyles from './OrdersFeed.module.css';

import OrderItem from '../OrderItem/OrderItem';

const OrdersFeed: FC = () => {
  return (
    <section className="mt-10">
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
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
