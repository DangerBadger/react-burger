import PropTypes from 'prop-types';
import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { tabs } from '../../utils/constants';

import stylesBurgerIngredients from './BurgerIngredients.module.css';

import BurgerIngredientsList from '../BurgerIngredientsList/BurgerIngredientsList';

function BurgerIngredients({ ingredientsData }) {
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
        <BurgerIngredientsList
          type="bun"
          tabName="Булки"
          ingredientsData={ingredientsData}
        />
        <BurgerIngredientsList
          type="sauce"
          tabName="Соусы"
          ingredientsData={ingredientsData}
        />
        <BurgerIngredientsList
          type="main"
          tabName="Начинки"
          ingredientsData={ingredientsData}
        />
      </div>
    </div>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
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
