/* eslint-disable arrow-body-style */
import { FC } from 'react';

import feedStyles from './feed.module.css';

import OrdersFeed from '../../components/OrdersFeed/OrdersFeed';
import OrdersSummary from '../../components/OrdersInfo/OrdersSummary';

const Feed: FC = () => {
  return (
    <main className={feedStyles.main}>
      <section className={feedStyles.section}>
        <OrdersFeed />
        <OrdersSummary />
      </section>
    </main>
  );
};

export default Feed;
