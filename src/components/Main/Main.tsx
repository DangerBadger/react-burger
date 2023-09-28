/* eslint-disable react/require-default-props */
import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppSelector, useAppDispatch } from '../../utils/hooks/useRedux';
import { addIngredient } from '../../services/reducers/ingredients';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import {
  IIngredientId,
  IIngredient,
  IAddedIngredient,
} from '../../utils/types';

import mainStyle from './Main.module.css';

interface IMain {
  openOrderDetails: () => void;
}

const Main: FC<IMain> = ({ openOrderDetails }) => {
  const dispatch = useAppDispatch();

  const ingredientsData: Array<IIngredient> = useAppSelector(
    (store) => store.ingredientsData.ingredients
  );
  const addedIngredients: Array<IAddedIngredient> = useAppSelector(
    (store) => store.ingredientsData.addedIngredients
  );

  const dropHandler = (ingredientId: IIngredientId): void => {
    const draggedIngredient: IIngredient | undefined = ingredientsData.find(
      (ingredient) => ingredient._id === ingredientId._id
    );
    const addedBun: IAddedIngredient | undefined = addedIngredients.find(
      (ingredient) => ingredient.type === 'bun'
    );

    if (draggedIngredient?.type === 'bun' && addedBun) {
      const addedBunIndex: number = addedIngredients.indexOf(addedBun);
      const addedIngredientsDataDuplicate: Array<IAddedIngredient> =
        addedIngredients.slice();
      addedIngredientsDataDuplicate.splice(addedBunIndex, 1, draggedIngredient);
      dispatch(addIngredient(addedIngredientsDataDuplicate));
    } else {
      dispatch(addIngredient([draggedIngredient, ...addedIngredients]));
    }
  };

  return (
    <main className={mainStyle.main}>
      <section className={mainStyle.section}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor
            openOrderDetails={openOrderDetails}
            onDropHandler={dropHandler}
          />
        </DndProvider>
      </section>
    </main>
  );
};

export default Main;
