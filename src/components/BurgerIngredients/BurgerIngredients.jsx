/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { tabs } from '../../utils/constants';

import stylesBurgerIngredients from './BurgerIngredients.module.css';

import BurgerIngredientsList from '../BurgerIngredientsList/BurgerIngredientsList';
import IngredientsContext from '../../services/ingredientsContext';

function BurgerIngredients({
  ingredientOpen,
  setCurrentIngredient,
  setAddedIngredients,
}) {
  const ingredientsData = useContext(IngredientsContext);

  const [current, setCurrent] = useState('bun');

  const tabClickHandler = (value) => {
    setCurrent(value);
    document
      .querySelector(`#${value}`)
      .scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  const ingredientFilter = (type) => {
    return ingredientsData.filter((ingredient) => ingredient.type === type);
  };

  return (
    <div>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={`${stylesBurgerIngredients.tabContainer} mt-5`}>
        <Tab
          value={tabs.BUN}
          active={current === tabs.BUN}
          onClick={tabClickHandler}
        >
          Булки
        </Tab>
        <Tab
          value={tabs.SAUCE}
          active={current === tabs.SAUCE}
          onClick={tabClickHandler}
        >
          Соусы
        </Tab>
        <Tab
          value={tabs.MAIN}
          active={current === tabs.MAIN}
          onClick={tabClickHandler}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${stylesBurgerIngredients.constructorContainer} mt-10`}>
        <BurgerIngredientsList
          tabName="Булки"
          id={tabs.BUN}
          ingredientsDataType={ingredientFilter(tabs.BUN)}
          setCurrentIngredient={setCurrentIngredient}
          ingredientOpen={ingredientOpen}
          setAddedIngredients={setAddedIngredients}
        />
        <BurgerIngredientsList
          tabName="Соусы"
          id={tabs.SAUCE}
          ingredientsDataType={ingredientFilter(tabs.SAUCE)}
          setCurrentIngredient={setCurrentIngredient}
          ingredientOpen={ingredientOpen}
          setAddedIngredients={setAddedIngredients}
        />
        <BurgerIngredientsList
          tabName="Начинки"
          id={tabs.MAIN}
          ingredientsDataType={ingredientFilter(tabs.MAIN)}
          setCurrentIngredient={setCurrentIngredient}
          ingredientOpen={ingredientOpen}
          setAddedIngredients={setAddedIngredients}
        />
      </div>
    </div>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  setAddedIngredients: PropTypes.func.isRequired,
  ingredientOpen: PropTypes.func.isRequired,
  setCurrentIngredient: PropTypes.func.isRequired,
};
