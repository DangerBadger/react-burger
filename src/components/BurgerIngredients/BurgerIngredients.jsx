import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerData } from '../../utils/data';
import tabs from '../../utils/constants';

import stylesBurgerIngredients from './BurgerIngredients.module.css';

import BurgerIngredientsItem from '../BurgerIngredientItem/BurgerIngredientsItem';

function BurgerIngredients() {
  const [current, setCurrent] = useState('bun');

  return (
    <div className={stylesBurgerIngredients.contentContainer}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={`${stylesBurgerIngredients.tabContainer} mt-5`}>
        <Tab
          value={tabs.BUN}
          active={current === tabs.BUN}
          onClick={setCurrent}
        >
          Булки
        </Tab>
        <Tab
          value={tabs.SAUCE}
          active={current === tabs.SAUCE}
          onClick={setCurrent}
        >
          Соусы
        </Tab>
        <Tab
          value={tabs.MAIN}
          active={current === tabs.MAIN}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${stylesBurgerIngredients.constructorContainer} mt-10`}>
        <h2 className="text text_type_main-medium mb-6">Булки</h2>
        <ul className={`${stylesBurgerIngredients.ingredientsList} pl-4 pr-4`}>
          {burgerData.map(
            (ingredient) =>
              ingredient.type === 'bun' && (
                <BurgerIngredientsItem
                  key={ingredient._id}
                  ingredientData={ingredient}
                />
              )
          )}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={`${stylesBurgerIngredients.ingredientsList} pl-4 pr-4`}>
          {burgerData.map(
            (ingredient) =>
              ingredient.type === 'sauce' && (
                <BurgerIngredientsItem
                  key={ingredient._id}
                  ingredientData={ingredient}
                />
              )
          )}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={`${stylesBurgerIngredients.ingredientsList} pl-4 pr-4`}>
          {burgerData.map(
            (ingredient) =>
              ingredient.type === 'main' && (
                <BurgerIngredientsItem
                  key={ingredient._id}
                  ingredientData={ingredient}
                />
              )
          )}
        </ul>
      </div>
    </div>
  );
}

export default BurgerIngredients;
