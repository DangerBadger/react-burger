import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import stylesBurgerConstructorItem from './BurgerConstructorItem.module.css';

function BurgerConstructorItem({ ingredientInfo }) {
  return (
    <li className={`${stylesBurgerConstructorItem.mainItem} mt-4 pr-2`}>
      <DragIcon />
      <ConstructorElement
        text={ingredientInfo.name}
        price={ingredientInfo.price}
        thumbnail={ingredientInfo.image}
      />
    </li>
  );
}

export default BurgerConstructorItem;

BurgerConstructorItem.propTypes = {
  ingredientInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
