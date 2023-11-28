/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../utils/types';
import { useAppSelector } from '../../utils/hooks/useRedux';
import { Paths } from '../../utils/constants';

import stylesBurgerIngredientsItem from './BurgerIngredientsItem.module.css';

interface IBurgerIngredientsItem {
  ingredientData: IIngredient;
}

const BurgerIngredientsItem: FC<IBurgerIngredientsItem> = ({
  ingredientData,
}) => {
  const location = useLocation();

  const addedIngredients: Array<IIngredient> = useAppSelector(
    (store) => store.ingredientsData.addedIngredients
  );

  const [counter, setCounter] = useState<number>(0);

  const { _id, image, name, price } = ingredientData;

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    const counterArr: Array<IIngredient> = addedIngredients.filter(
      (ingredient) => ingredient.name === name
    );
    if (counterArr.find((ingredient) => ingredient.type === 'bun')) {
      setCounter(2);
    } else {
      setCounter(counterArr.length);
    }
  }, [addedIngredients]);

  return (
    <li
      id="ingredient"
      data-id={_id}
      ref={dragRef}
      className={
        isDrag
          ? stylesBurgerIngredientsItem.ingredientDragging
          : stylesBurgerIngredientsItem.ingredient
      }
    >
      <Link
        to={`${Paths.ingredientsPage}${_id}`}
        state={{ background: location }}
        className={stylesBurgerIngredientsItem.link}
      >
        <img
          src={image}
          className={stylesBurgerIngredientsItem.image}
          alt={name}
        />
        <span className={`${stylesBurgerIngredientsItem.price} mt-2 mb-2`}>
          <p
            className={`${stylesBurgerIngredientsItem.priceText} text text_type_digits-default`}
          >
            {price}
          </p>
          <CurrencyIcon type="primary" />
        </span>
        <h3
          className={`${stylesBurgerIngredientsItem.name} text text_type_main-default`}
        >
          {name}
        </h3>
        <Counter count={counter} size="default" />
      </Link>
    </li>
  );
};

export default BurgerIngredientsItem;
