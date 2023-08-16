/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/propShapes';

import stylesBurgerIngredientsList from './BurgerIngredientsList.module.css';

import BurgerIngredientsItem from '../BurgerIngredientItem/BurgerIngredientsItem';

function BurgerIngredientsList({
  tabName,
  id,
  ingredientsDataType,
  setCurrentIngredient,
  ingredientOpen,
  setAddedIngredients,
}) {
  return (
    <>
      <h2 className="text text_type_main-medium mb-6" id={id}>
        {tabName}
      </h2>
      <ul
        className={`${stylesBurgerIngredientsList.ingredientsList} pl-4 pr-4`}
      >
        {ingredientsDataType.map((ingredient) => {
          return (
            <BurgerIngredientsItem
              key={ingredient._id}
              ingredientData={ingredient}
              setCurrentIngredient={setCurrentIngredient}
              ingredientOpen={ingredientOpen}
              setAddedIngredients={setAddedIngredients}
            />
          );
        })}
      </ul>
    </>
  );
}

export default BurgerIngredientsList;

BurgerIngredientsList.propTypes = {
  setAddedIngredients: PropTypes.func.isRequired,
  tabName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ingredientOpen: PropTypes.func.isRequired,
  setCurrentIngredient: PropTypes.func.isRequired,
  ingredientsDataType: PropTypes.arrayOf(ingredientPropTypes.isRequired)
    .isRequired,
};
