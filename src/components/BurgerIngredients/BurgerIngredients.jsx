import { useState } from 'react';
import {
  Counter,
  CurrencyIcon,
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerData } from '../../utils/data';

import burgerIngredients from './BurgerIngredients.module.css';

function BurgerIngredients() {
  const [current, setCurrent] = useState('bun');

  function ingredientItem({ _id, name, price, image }) {
    return (
      <li key={_id} className={burgerIngredients.ingredient}>
        <img
          src={image}
          className={burgerIngredients.ingredientImage}
          alt={name}
        />
        <span className={`${burgerIngredients.ingredientPrice} mt-2 mb-2`}>
          <p
            className={`${burgerIngredients.ingredientPriceText} text text_type_digits-default`}
          >
            {price}
          </p>
          <CurrencyIcon type="primary" />
        </span>
        <h3 className={`${burgerIngredients.name} text text_type_main-default`}>
          {name}
        </h3>
        <Counter count={1} size="default" />
      </li>
    );
  }

  return (
    <div className={burgerIngredients.contentContainer}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={`${burgerIngredients.tabContainer} mt-5`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngredients.constructorContainer} mt-10`}>
        <h2 className="text text_type_main-medium mb-6">Булки</h2>
        <ul className={`${burgerIngredients.ingredientsList} pl-4 pr-4`}>
          {burgerData.map(
            (ingredient) =>
              ingredient.type === 'bun' && ingredientItem(ingredient)
          )}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={`${burgerIngredients.ingredientsList} pl-4 pr-4`}>
          {burgerData.map(
            (ingredient) =>
              ingredient.type === 'sauce' && ingredientItem(ingredient)
          )}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={`${burgerIngredients.ingredientsList} pl-4 pr-4`}>
          {burgerData.map(
            (ingredient) =>
              ingredient.type === 'main' && ingredientItem(ingredient)
          )}
        </ul>
      </div>
    </div>
  );
}

export default BurgerIngredients;
