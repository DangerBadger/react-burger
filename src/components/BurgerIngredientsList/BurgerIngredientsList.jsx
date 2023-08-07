import PropTypes from 'prop-types';

import stylesBurgerIngredientsList from './BurgerIngredientsList.module.css';

import BurgerIngredientsItem from '../BurgerIngredientItem/BurgerIngredientsItem';

function BurgerIngredientsList({
  tabName,
  ingredientsData,
  setCurrentIngredient,
  type,
  ingredientOpen,
}) {
  return (
    <>
      <h2 className="text text_type_main-medium mb-6">{tabName}</h2>
      <ul
        className={`${stylesBurgerIngredientsList.ingredientsList} pl-4 pr-4`}
      >
        {ingredientsData.map(
          (ingredient) =>
            ingredient.type === type && (
              <BurgerIngredientsItem
                key={ingredient._id}
                ingredientData={ingredient}
                setCurrentIngredient={setCurrentIngredient}
                ingredientOpen={ingredientOpen}
              />
            )
        )}
      </ul>
    </>
  );
}

export default BurgerIngredientsList;

BurgerIngredientsList.propTypes = {
  type: PropTypes.string.isRequired,
  tabName: PropTypes.string.isRequired,
  ingredientOpen: PropTypes.func.isRequired,
  setCurrentIngredient: PropTypes.func.isRequired,
  ingredientsData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ).isRequired,
};
