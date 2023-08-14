/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import stylesBurgerIngredientsItem from './BurgerIngredientsItem.module.css';

function BurgerIngredientsItem({
  ingredientData,
  ingredientOpen,
  setCurrentIngredient,
}) {
  const selectIngredient = () => {
    setCurrentIngredient(ingredientData);
    ingredientOpen();
  };

  return (
    <li
      data-id={ingredientData._id}
      className={stylesBurgerIngredientsItem.ingredient}
      onClick={selectIngredient}
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
      <Counter count={1} size="default" />
    </li>
  );
}

export default BurgerIngredientsItem;

BurgerIngredientsItem.propTypes = {
  ingredientOpen: PropTypes.func.isRequired,
  setCurrentIngredient: PropTypes.func.isRequired,
  ingredientData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
