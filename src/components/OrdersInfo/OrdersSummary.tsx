/* eslint-disable arrow-body-style */
import { FC } from 'react';

import ordersSummaryStyles from './OrdersSummary.module.css';

const OrdersSummary: FC = () => {
  return (
    <section className={`${ordersSummaryStyles.numdersSection} mt-25`}>
      <div className={ordersSummaryStyles.numbersListsContainer}>
        <div className="mb-15">
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <ul
            className={`${ordersSummaryStyles.numbersListReady} text text_type_digits-default`}
          >
            <li>034532</li>
            <li>034532</li>
            <li>034532</li>
            <li>034532</li>
            <li>034532</li>
            <li>034532</li>
          </ul>
        </div>
        <div>
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          <ul
            className={`${ordersSummaryStyles.numbersList} text text_type_digits-default`}
          >
            <li>034532</li>
            <li>034532</li>
            <li>034532</li>
          </ul>
        </div>
      </div>
      <div className="mb-15">
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <p
          className={`text text_type_digits-large ${ordersSummaryStyles.largeDigits}`}
        >
          28 752
        </p>
      </div>
      <div className="mb-15">
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <p
          className={`text text_type_digits-large ${ordersSummaryStyles.largeDigits}`}
        >
          138
        </p>
      </div>
    </section>
  );
};

export default OrdersSummary;
