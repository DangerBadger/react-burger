/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import { useParams } from 'react-router-dom';
import { FC, useMemo } from 'react';
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../utils/hooks/useRedux';
import { IIngredient } from '../../utils/types';

import feedItemDetailsStyles from './FeedItemDetails.module.css';

interface IFeedItemDetails {
  marginTop?: boolean;
}

const FeedItemDetails: FC<IFeedItemDetails> = ({ marginTop = false }) => {
  const { id } = useParams();
  const today = new Date();

  const ingredientsData: Array<IIngredient> = useAppSelector(
    (store) => store.ingredientsData.ingredients
  );
  const exampleIngredientsData: Array<IIngredient> = ingredientsData.slice(
    4,
    12
  );

  const totalPrice = useMemo(
    () =>
      exampleIngredientsData.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0
      ),
    [exampleIngredientsData]
  );

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
        Black Hole Singularity острый бургер
      </h2>
      <p
        className={`${feedItemDetailsStyles.status} text text_type_main-small mb-15`}
      >
        Выполнен
      </p>
      <h2
        className={`${feedItemDetailsStyles.header} text text_type_main-medium mb-6`}
      >
        Состав:
      </h2>
      <ul className={feedItemDetailsStyles.list}>
        {exampleIngredientsData.map((ingredient) => {
          return (
            <li key={ingredient._id} className={feedItemDetailsStyles.listItem}>
              <div className={feedItemDetailsStyles.listItemInfoContainer}>
                <div
                  className={`${feedItemDetailsStyles.ingredientIconContainer} mr-4`}
                >
                  <img
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                    className={feedItemDetailsStyles.ingredientIcon}
                  />
                </div>
                <p className="text text_type_main-small">{ingredient.name}</p>
              </div>
              <div className={feedItemDetailsStyles.listItemPriceContainer}>
                <p className="text text_type_digits-default mr-2">{`1 x ${ingredient.price}`}</p>
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
        <div className={feedItemDetailsStyles.sumContainer}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
};

export default FeedItemDetails;
