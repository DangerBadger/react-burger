/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  selectIngredient,
  addIngredient,
} from '../../services/actions/ingredients';

import stylesBurgerIngredientsItem from './BurgerIngredientsItem.module.css';

function BurgerIngredientsItem({ ingredientData, openIngredientDetails }) {
  const dispatch = useDispatch();

  const addedIngredients = useSelector(
    (store) => store.ingredientsData.addedIngredients
  );

  const [counter, setCounter] = useState(0);

  const { type, _id, image, name, price } = ingredientData;

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const ingredientOpenHandler = () => {
    dispatch(selectIngredient(ingredientData));
    openIngredientDetails();
  };

  const ingredientAddHandler = () => {
    const addedBun = addedIngredients.find(
      (ingredient) => ingredient.type === 'bun'
    );
    const addedBunIndex = addedIngredients.indexOf(addedBun);

    // Замена булки на новую
    if (type === 'bun' && addedBun) {
      const addedIngredientsDuplicate = addedIngredients.slice();
      addedIngredientsDuplicate.splice(addedBunIndex, 1, ingredientData);
      dispatch(addIngredient(addedIngredientsDuplicate));
    } else {
      dispatch(addIngredient([...addedIngredients, ingredientData]));
    }
  };

  useEffect(() => {
    const counterArr = addedIngredients.filter(
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
      data-id={_id}
      ref={dragRef}
      className={
        isDrag
          ? stylesBurgerIngredientsItem.ingredientDragging
          : stylesBurgerIngredientsItem.ingredient
      }
      onDoubleClick={ingredientOpenHandler}
      onClick={ingredientAddHandler}
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
    </li>
  );
}

export default BurgerIngredientsItem;

BurgerIngredientsItem.propTypes = {
  openIngredientDetails: PropTypes.func,
  ingredientData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
