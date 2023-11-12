/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
import { Link, useLocation } from 'react-router-dom';
import { FC, useMemo } from 'react';
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../utils/hooks/useRedux';
import { IIngredient, IFeedOrder } from '../../utils/types';

import orderItemStyles from './OrderItem.module.css';

import { Paths } from '../../utils/constants';

interface IOrderItem {
  order: IFeedOrder;
}

const OrderItem: FC<IOrderItem> = ({ order }) => {
  const location = useLocation();
  const ingredientsData: Array<IIngredient> = useAppSelector(
    (store) => store.ingredientsData.ingredients
  );

  const orderPrice = useMemo(() => {
    const arrOfPrices = order.ingredients.map((orderIngredient) => {
      if (orderIngredient !== null) {
        return ingredientsData.find(
          (ingredient) => ingredient._id === orderIngredient
        )?.price;
      }
      return 0;
    });

    return arrOfPrices.reduce((accum: number, price: number | undefined) => {
      if (typeof price !== 'undefined') {
        return accum + price;
      }
      return accum;
    }, 0);
  }, [order.ingredients]);

  const arrOfIngredients = useMemo(() => {
    const arrOfUniqueIngredients = Array.from(new Set(order.ingredients));
    return arrOfUniqueIngredients.map((ingredient) => {
      return ingredientsData.find((item) => item._id === ingredient);
    });
  }, [order.ingredients]);

  const status = order.status === 'done' ? 'Выполнен' : 'Готовится';

  const feedOrOrders = (orders: string, feed: string): string =>
    location.pathname.startsWith(Paths.feed) ? feed : orders;

  return (
    <li>
      <Link
        to={feedOrOrders(
          `${Paths.profilePage}/${Paths.orders}${order.number}`,
          `${Paths.feed}${order.number}`
        )}
        state={{ background: location }}
        className={feedOrOrders(
          `${orderItemStyles.linkOrder} text text_type_main-medium mb-2`,
          `${orderItemStyles.link} text text_type_main-medium`
        )}
      >
        <div className={`${orderItemStyles.orderHeaderContainer} mb-6`}>
          <p className="text text_type_digits-default">{`#${order.number}`}</p>
          <FormattedDate
            className={`${orderItemStyles.date} text text_type_main-small`}
            date={new Date(order.createdAt)}
          />
        </div>
        <h2
          className={feedOrOrders(
            `${orderItemStyles.orderName} text text_type_main-medium mb-2`,
            `${orderItemStyles.orderName} text text_type_main-medium mb-6`
          )}
        >
          {order.name}
        </h2>
        {!location.pathname.startsWith(Paths.feed) && (
          <p className="text text_type_main-small mb-6">{status}</p>
        )}
        <div className={orderItemStyles.footerContainer}>
          <ul className={orderItemStyles.iconsList}>
            {arrOfIngredients.map((ingredient, index) => {
              const offset = -17;
              if (index > 5) {
                return null;
              } else if (index === 5) {
                return (
                  <li
                    key={ingredient?._id}
                    className={orderItemStyles.ingredientItem}
                    style={{
                      transform: `translateX(${offset * index}px)`,
                      zIndex: 6 - index,
                    }}
                  >
                    <img
                      src={ingredient?.image_mobile}
                      alt={ingredient?.name}
                      className={orderItemStyles.ingredientIconLast}
                    />
                    <p
                      className={`text text_type_main-small ${orderItemStyles.ingredientCount}`}
                    >
                      {`+${arrOfIngredients.length - 5}`}
                    </p>
                  </li>
                );
              } else {
                return (
                  <li
                    key={ingredient?._id}
                    className={orderItemStyles.ingredientItem}
                    style={{
                      transform: `translateX(${offset * index}px)`,
                      zIndex: 6 - index,
                    }}
                  >
                    <img
                      src={ingredient?.image_mobile}
                      alt={ingredient?.name}
                      className={orderItemStyles.ingredientIcon}
                    />
                  </li>
                );
              }
            })}
          </ul>
          <div className={orderItemStyles.currencyContainer}>
            <p className="text text_type_digits-default mr-4">{orderPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default OrderItem;
