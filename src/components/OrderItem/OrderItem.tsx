/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../utils/hooks/useRedux';
import { IIngredient } from '../../utils/types';

import orderItemStyles from './OrderItem.module.css';

import { Paths } from '../../utils/constants';

const OrderItem: FC = () => {
  const location = useLocation();
  const id: string = '034533';

  const ingredientsData: Array<IIngredient> = useAppSelector(
    (store) => store.ingredientsData.ingredients
  );
  const exampleIngredientsData: Array<IIngredient> = ingredientsData.slice(
    4,
    12
  );

  const today = new Date();

  return (
    <li>
      <Link
        to={`${Paths.feed}${id}`}
        state={{ background: location }}
        className={orderItemStyles.link}
      >
        <div className={`${orderItemStyles.orderHeaderContainer} mb-6`}>
          <p className="text text_type_digits-default">#034533</p>
          <FormattedDate
            className={`${orderItemStyles.date} text text_type_main-small`}
            date={
              new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                today.getHours(),
                today.getMinutes(),
                0
              )
            }
          />
        </div>
        <h2
          className={`${orderItemStyles.orderName} text text_type_main-medium mb-6`}
        >
          Black Hole Singularity острый бургер
        </h2>
        <div className={orderItemStyles.footerContainer}>
          <ul className={orderItemStyles.iconsList}>
            {exampleIngredientsData.map((ingredient, index) => {
              const offset = -17;
              if (index > 5) {
                return null;
              } else if (index === 5) {
                return (
                  <li
                    key={ingredient._id}
                    className={orderItemStyles.ingredientItemlast}
                    style={{
                      transform: `translateX(${offset * index}px)`,
                      zIndex: 6 - index,
                    }}
                  >
                    <img
                      src={ingredient.image_mobile}
                      alt={ingredient.name}
                      className={orderItemStyles.ingredientIcon}
                    />
                    <p
                      className={`text text_type_main-small ${orderItemStyles.ingredientCount}`}
                    >
                      {`+${exampleIngredientsData.length - 5}`}
                    </p>
                  </li>
                );
              } else {
                return (
                  <li
                    key={ingredient._id}
                    className={orderItemStyles.ingredientItem}
                    style={{
                      transform: `translateX(${offset * index}px)`,
                      zIndex: 6 - index,
                    }}
                  >
                    <img
                      src={ingredient.image_mobile}
                      alt={ingredient.name}
                      className={orderItemStyles.ingredientIcon}
                    />
                  </li>
                );
              }
            })}
          </ul>
          <div className={orderItemStyles.currencyContainer}>
            <p className="text text_type_digits-default mr-4">510</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default OrderItem;
