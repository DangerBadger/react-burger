import { useState } from 'react';
import {
  ConstructorElement,
  CurrencyIcon,
  LockIcon,
  DragIcon,
  DeleteIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { exampleData } from '../../utils/data';

import burgerConstructor from './BurgerConstructor.module.css';

function BurgerConstructor() {
  function mainItem({ name, price, image }, index) {
    return (
      <li key={index} className={`${burgerConstructor.mainItem} mt-4 pr-2`}>
        <DragIcon />
        <ConstructorElement text={name} price={price} thumbnail={image} />
      </li>
    );
  }

  const total = exampleData.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );

  return (
    <div className={`${burgerConstructor.constructorContainer} mt-25`}>
      <div className={`${burgerConstructor.topContainer} mb-4 pl-4 pr-4`}>
        <ConstructorElement
          type="top"
          isLocked
          text={`${exampleData[0].name} (верх)`}
          price={exampleData[0].price}
          thumbnail={exampleData[0].image}
        />
      </div>
      <ul className={burgerConstructor.mainList}>
        {exampleData.map(
          (ingredient, index) =>
            index > 0 &&
            index < exampleData.length - 1 &&
            mainItem(ingredient, index)
        )}
      </ul>
      <div className={`${burgerConstructor.topContainer} mt-4 pl-4 pr-4`}>
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${exampleData[exampleData.length - 1].name} (низ)`}
          price={exampleData[exampleData.length - 1].price}
          thumbnail={exampleData[exampleData.length - 1].image}
        />
      </div>
      <div className={`${burgerConstructor.orderContainer} mt-10 pr-4`}>
        <span className="mr-10">
          <span
            className={`${burgerConstructor.totaNumbers} text text_type_digits-medium mr-2`}
          >
            {total}
          </span>
          <CurrencyIcon />
        </span>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
