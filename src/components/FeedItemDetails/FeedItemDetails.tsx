/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */
import { useParams, useLocation } from 'react-router-dom';
import { FC, useMemo, useCallback, useEffect } from 'react';
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector, useAppDispatch } from '../../utils/hooks/useRedux';
import { IIngredient, IFeedOrder } from '../../utils/types';
import { getOrderByNumber } from '../../services/reducers/order';

import feedItemDetailsStyles from './FeedItemDetails.module.css';

interface IFeedItemDetails {
  marginTop?: boolean;
}

const FeedItemDetails: FC<IFeedItemDetails> = ({ marginTop = false }) => {
  const { id } = useParams();
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!background && id) {
      if (
        location.pathname.startsWith('/profile') ||
        location.pathname.startsWith('/feed')
      ) {
        dispatch(getOrderByNumber(id));
      }
    }
  }, [location.pathname]);

  const orders: Array<IFeedOrder> | undefined = useAppSelector(
    (store) => store.orderData?.orders?.orders
  );
  const ingredientsData: Array<IIngredient> = useAppSelector(
    (store) => store.ingredientsData.ingredients
  );

  const openedOrder: IFeedOrder | undefined = orders?.find(
    (order: IFeedOrder) => order.number.toString() === id
  );

  const totalPrice: number | undefined = useMemo(() => {
    const arrOfOrderedIngredientsWithPrice:
      | Array<number | undefined>
      | undefined = openedOrder?.ingredients.map((ingredientId) => {
      return ingredientsData.find(
        (ingredient) => ingredient._id === ingredientId
      )?.price;
    });

    return arrOfOrderedIngredientsWithPrice?.reduce(
      (acc: number, item: number | undefined) => {
        if (item) acc += item;
        return acc;
      },
      0
    );
  }, [openedOrder?.ingredients]);

  const arrOfIngredients: Array<IIngredient | undefined> = useMemo(() => {
    const arrOfUniqueIngredients: Array<string> = Array.from(
      new Set(openedOrder?.ingredients)
    );

    return arrOfUniqueIngredients.map((ingredient) => {
      return ingredientsData.find((item) => item._id === ingredient);
    });
  }, [openedOrder?.ingredients]);

  const ingredientCounter = useCallback(
    (_id: string | undefined) => {
      let counter = 0;
      openedOrder?.ingredients.forEach((ingredientId) => {
        if (ingredientId === _id) counter++;
      });
      return counter;
    },
    [openedOrder?.ingredients]
  );

  const status: string =
    openedOrder?.status === 'done' ? 'Выполнен' : 'Готовится';

  if (openedOrder) {
    return (
      <section
        className={
          marginTop
            ? feedItemDetailsStyles.sectionWithMarginTop
            : feedItemDetailsStyles.section
        }
      >
        <p className="text text_type_digits-default mb-10">{`#${id}`}</p>
        <h2
          className={`${feedItemDetailsStyles.header} text text_type_main-medium mb-3`}
        >
          {openedOrder?.name}
        </h2>
        <p
          className={`${feedItemDetailsStyles.status} text text_type_main-small mb-15`}
        >
          {status}
        </p>
        <h2
          className={`${feedItemDetailsStyles.header} text text_type_main-medium mb-6`}
        >
          Состав:
        </h2>
        <ul className={feedItemDetailsStyles.list}>
          {arrOfIngredients.map((ingredient) => {
            return (
              <li
                key={ingredient?._id}
                className={feedItemDetailsStyles.listItem}
              >
                <div className={feedItemDetailsStyles.listItemInfoContainer}>
                  <div
                    className={`${feedItemDetailsStyles.ingredientIconContainer} mr-4`}
                  >
                    <img
                      src={ingredient?.image_mobile}
                      alt={ingredient?.name}
                      className={feedItemDetailsStyles.ingredientIcon}
                    />
                  </div>
                  <p className="text text_type_main-small">
                    {ingredient?.name}
                  </p>
                </div>
                <div className={feedItemDetailsStyles.listItemPriceContainer}>
                  <p className="text text_type_digits-default mr-2">{`${ingredientCounter(
                    ingredient?._id
                  )} x ${ingredient?.price}`}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
        <div
          className={`${feedItemDetailsStyles.orderInfoContainer} mt-10 mb-10`}
        >
          <FormattedDate
            className={`${feedItemDetailsStyles.date} text text_type_main-small`}
            date={new Date(openedOrder.createdAt)}
          />
          <div className={feedItemDetailsStyles.sumContainer}>
            <p className="text text_type_digits-default mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </section>
    );
  }
  return (
    <h2
      className={`${feedItemDetailsStyles.header} text text_type_main-medium mb-3 ml-5`}
    >
      Загрузка ингредиентов...
    </h2>
  );
};

export default FeedItemDetails;
