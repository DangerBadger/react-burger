/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { addIngredient } from '../../services/reducers/ingredients';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import mainStyle from './Main.module.css';

function Main({ openIngredientDetails, openOrderDetails }) {
  const dispatch = useDispatch();

  const ingredientsData = useSelector(
    (store) => store.ingredientsData.ingredients
  );
  const addedIngredients = useSelector(
    (store) => store.ingredientsData.addedIngredients
  );

  const dropHandler = (ingredientId) => {
    const draggedIngredient = ingredientsData.find(
      (ingredient) => ingredient._id === ingredientId._id
    );
    const addedBun = addedIngredients.find(
      (ingredient) => ingredient.type === 'bun'
    );
    const addedBunIndex = addedIngredients.indexOf(addedBun);

    if (draggedIngredient.type === 'bun' && addedBun) {
      const addedientsDataDuplicate = addedIngredients.slice();
      addedientsDataDuplicate.splice(addedBunIndex, 1, draggedIngredient);
      dispatch(addIngredient(addedientsDataDuplicate));
    } else {
      dispatch(addIngredient([draggedIngredient, ...addedIngredients]));
    }
  };

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
