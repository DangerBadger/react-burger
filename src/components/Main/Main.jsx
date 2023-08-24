/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { addIngredient } from '../../services/actions/ingredients';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import mainStyle from './Main.module.css';

function Main({ openIngredientDetails, openOrderDetails }) {
  const dispatch = useDispatch();

  const ingredientsData = useSelector(
    (store) => store.ingredientsData.ingredients
  );
  const addedientsData = useSelector(
    (store) => store.ingredientsData.addedIngredients
  );

  const dropHandler = (ingredientItem) => {
    const draggedIngredient = ingredientsData.find(
      (ingredient) => ingredient._id === ingredientItem._id
    );
    const addedBun = addedientsData.find(
      (ingredient) => ingredient.type === 'bun'
    );
    const addedBunIndex = addedientsData.indexOf(addedBun);

    if (draggedIngredient.type === 'bun' && addedBun) {
      const addedientsDataDuplicate = addedientsData.slice();
      addedientsDataDuplicate.splice(addedBunIndex, 1, draggedIngredient);
      dispatch(addIngredient(addedientsDataDuplicate));
    } else {
      dispatch(addIngredient([...addedientsData, draggedIngredient]));
    }
  };

  // const handleDrop = (ingredientId) => {
  //   const targetIngredient = initialIngredients.find(ingredient => ingredient._id === ingredientId._id)
  //   const selectedBun = chosenIngredients.find(ingredient => ingredient.type === 'bun')
  //   const selectedBunIndex = chosenIngredients.indexOf(selectedBun)

  //   if (targetIngredient.type === 'bun' && selectedBun) {
  //     const chosenIngredientsClone = chosenIngredients.slice();
  //     chosenIngredientsClone.splice(selectedBunIndex, 1, targetIngredient);
  //     dispatch(addIngredient(chosenIngredientsClone));
  //   } else {
  //     dispatch(addIngredient([...chosenIngredients, targetIngredient]));
  //   }
  // };

  return (
    <main className={mainStyle.main}>
      <section className={mainStyle.section}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients openIngredientDetails={openIngredientDetails} />
          <BurgerConstructor
            openOrderDetails={openOrderDetails}
            onDropHandler={dropHandler}
          />
        </DndProvider>
      </section>
    </main>
  );
}

export default Main;

Main.propTypes = {
  openOrderDetails: PropTypes.func.isRequired,
  openIngredientDetails: PropTypes.func.isRequired,
};
