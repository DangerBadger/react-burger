/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { tabs } from '../../utils/constants';
import { ingredientPropTypes } from '../../utils/propShapes';

import stylesBurgerIngredients from './BurgerIngredients.module.css';

import BurgerIngredientsList from '../BurgerIngredientsList/BurgerIngredientsList';

function BurgerIngredients({
  ingredientsData,
  ingredientOpen,
  setCurrentIngredient,
}) {
  const [current, setCurrent] = useState('bun');

  const ingredientFilter = (type) => {
    return ingredientsData.filter((ingredient) => ingredient.type === type);
  };

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
        <BurgerIngredientsList
          tabName="Булки"
          ingredientsDataType={ingredientFilter('bun')}
          setCurrentIngredient={setCurrentIngredient}
          ingredientOpen={ingredientOpen}
        />
        <BurgerIngredientsList
          tabName="Соусы"
          ingredientsDataType={ingredientFilter('sauce')}
          setCurrentIngredient={setCurrentIngredient}
          ingredientOpen={ingredientOpen}
        />
        <BurgerIngredientsList
          tabName="Начинки"
          ingredientsDataType={ingredientFilter('main')}
          setCurrentIngredient={setCurrentIngredient}
          ingredientOpen={ingredientOpen}
        />
      </div>
    </div>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  ingredientOpen: PropTypes.func.isRequired,
  setCurrentIngredient: PropTypes.func.isRequired,
  ingredientsData: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};
