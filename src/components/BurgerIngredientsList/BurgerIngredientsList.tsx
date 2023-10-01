/* eslint-disable arrow-body-style */
/* eslint-disable react/require-default-props */
import { forwardRef } from 'react';
import { IIngredient } from '../../utils/types';

import stylesBurgerIngredientsList from './BurgerIngredientsList.module.css';

import BurgerIngredientsItem from '../BurgerIngredientItem/BurgerIngredientsItem';

interface IBurgerIngredientsList {
  tabName: string;
  id: string;
  ingredientsDataType: Array<IIngredient>;
}

const BurgerIngredientsList = forwardRef<
  HTMLHeadingElement,
  IBurgerIngredientsList
>(({ tabName, id, ingredientsDataType }, ref) => {
  return (
    <>
      <h2 className="text text_type_main-medium mb-6" id={id} ref={ref}>
        {tabName}
      </h2>
      <ul
        className={`${stylesBurgerIngredientsList.ingredientsList} pl-4 pr-4`}
      >
        {ingredientsDataType.map((ingredient) => (
          <BurgerIngredientsItem
            key={ingredient._id}
            ingredientData={ingredient}
          />
        ))}
      </ul>
    </>
  );
});

export default BurgerIngredientsList;
