/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import { useContext, useState, useEffect } from 'react';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import stylesBurgerIngredientsItem from './BurgerIngredientsItem.module.css';
import AddedIngredientsContext from '../../services/addedIngredients';

function BurgerIngredientsItem({
  ingredientData,
  openIngredientDetails,
  setCurrentIngredient,
  setAddedIngredients,
}) {
  const addedIngredients = useContext(AddedIngredientsContext);

  const [counter, setCounter] = useState(0);

  const ingredientOpenHandler = () => {
    setCurrentIngredient(ingredientData);
    openIngredientDetails();
  };

  const ingredientAddHandler = () => {
    const addedBun = addedIngredients.find(
      (ingredient) => ingredient.type === 'bun'
    );
    const addedBunIndex = addedIngredients.indexOf(addedBun);

    // Замена булки на новую
    if (ingredientData.type === 'bun' && addedBun) {
      const addedIngredientsDuplicate = addedIngredients.slice();
      addedIngredientsDuplicate.splice(addedBunIndex, 1, ingredientData);
      setAddedIngredients(addedIngredientsDuplicate);
    } else {
      setAddedIngredients([...addedIngredients, ingredientData]);
    }
  };

  useEffect(() => {
    const counterArr = addedIngredients.filter(
      (ingredient) => ingredient.name === ingredientData.name
    );
    if (counterArr.find((ingredient) => ingredient.type === 'bun')) {
      setCounter(2);
    } else {
      setCounter(counterArr.length);
    }
  }, [addedIngredients]);

  return (
    <li
      data-id={ingredientData._id}
      className={stylesBurgerIngredientsItem.ingredient}
      onDoubleClick={ingredientOpenHandler}
      onClick={ingredientAddHandler}
    >
      <img
        src={ingredientData.image}
        className={stylesBurgerIngredientsItem.image}
        alt={ingredientData.name}
      />
      <span className={`${stylesBurgerIngredientsItem.price} mt-2 mb-2`}>
        <p
          className={`${stylesBurgerIngredientsItem.priceText} text text_type_digits-default`}
        >
          {ingredientData.price}
        </p>
        <CurrencyIcon type="primary" />
      </span>
      <h3
        className={`${stylesBurgerIngredientsItem.name} text text_type_main-default`}
      >
        {ingredientData.name}
      </h3>
      <Counter count={counter} size="default" />
    </li>
  );
}

export default BurgerIngredientsItem;

BurgerIngredientsItem.propTypes = {
  setAddedIngredients: PropTypes.func.isRequired,
  openIngredientDetails: PropTypes.func,
  setCurrentIngredient: PropTypes.func.isRequired,
  ingredientData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};