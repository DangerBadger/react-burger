import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import stylesBurgerIngredientsItem from './BurgerIngredientsItem.module.css';

function BurgerIngredientsItem({ ingredientData }) {
  return (
    <li className={stylesBurgerIngredientsItem.ingredient}>
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
  ingredientData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
