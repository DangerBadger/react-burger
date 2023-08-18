/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { tabs } from '../../utils/constants';

import stylesBurgerIngredients from './BurgerIngredients.module.css';

import BurgerIngredientsList from '../BurgerIngredientsList/BurgerIngredientsList';

import AddedIngredientsContext from '../../services/addedIngredients';
import IngredientsContext from '../../services/ingredientsContext';
import IsLoadingContext from '../../services/isLoadigContext';

function BurgerIngredients({
  openIngredientDetails,
  setCurrentIngredient,
  setAddedIngredients,
}) {
  const ingredientsData = useContext(IngredientsContext);
  const isLoading = useContext(IsLoadingContext);

  const [current, setCurrent] = useState('bun');

  const tabClickHandler = (value) => {
    setCurrent(value);
    document
      .querySelector(`#${value}`)
      .scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  const ingredientFilter = (type) =>
    ingredientsData.filter((ingredient) => ingredient.type === type);

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
        {isLoading ? (
          <h2 className="text text_type_main-large mt-10">
            Загрузка ингридиентов...
          </h2>
        ) : (
          <>
            <BurgerIngredientsList
              tabName="Булки"
              id={tabs.BUN}
              ingredientsDataType={ingredientFilter(tabs.BUN)}
              setCurrentIngredient={setCurrentIngredient}
              openIngredientDetails={openIngredientDetails}
              setAddedIngredients={setAddedIngredients}
            />
            <BurgerIngredientsList
              tabName="Соусы"
              id={tabs.SAUCE}
              ingredientsDataType={ingredientFilter(tabs.SAUCE)}
              setCurrentIngredient={setCurrentIngredient}
              openIngredientDetails={openIngredientDetails}
              setAddedIngredients={setAddedIngredients}
            />
            <BurgerIngredientsList
              tabName="Начинки"
              id={tabs.MAIN}
              ingredientsDataType={ingredientFilter(tabs.MAIN)}
              setCurrentIngredient={setCurrentIngredient}
              openIngredientDetails={openIngredientDetails}
              setAddedIngredients={setAddedIngredients}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  setAddedIngredients: PropTypes.func.isRequired,
  openIngredientDetails: PropTypes.func,
  setCurrentIngredient: PropTypes.func.isRequired,
};