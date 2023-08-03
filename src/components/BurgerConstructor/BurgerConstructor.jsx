/* eslint-disable react/no-array-index-key */
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { exampleData } from '../../utils/data';

import stylesBurgerConstructor from './BurgerConstructor.module.css';

import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';

function BurgerConstructor() {
  const total = exampleData.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );

  return (
    <div className={`${stylesBurgerConstructor.constructorContainer} mt-25`}>
      <div className={`${stylesBurgerConstructor.topContainer} mb-4 pl-4 pr-4`}>
        <ConstructorElement
          type="top"
          isLocked
          text={`${exampleData[0].name} (верх)`}
          price={exampleData[0].price}
          thumbnail={exampleData[0].image}
        />
      </div>
      <ul className={stylesBurgerConstructor.mainList}>
        {exampleData.map(
          (ingredient, index) =>
            index > 0 &&
            index < exampleData.length - 1 && (
              <BurgerConstructorItem key={index} ingredientInfo={ingredient} />
            )
        )}
      </ul>
      <div className={`${stylesBurgerConstructor.topContainer} mt-4 pl-4 pr-4`}>
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${exampleData[exampleData.length - 1].name} (низ)`}
          price={exampleData[exampleData.length - 1].price}
          thumbnail={exampleData[exampleData.length - 1].image}
        />
      </div>
      <div className={`${stylesBurgerConstructor.orderContainer} mt-10 pr-4`}>
        <span className="mr-10">
          <span
            className={`${stylesBurgerConstructor.totaNumbers} text text_type_digits-medium mr-2`}
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
