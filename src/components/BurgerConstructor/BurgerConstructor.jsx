/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import exampleDataId from '../../utils/data';

import stylesBurgerConstructor from './BurgerConstructor.module.css';

import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';

function BurgerConstructor({ ingredientsData, orderOpen }) {
  const orderedBurger = useMemo(() => {
    const burgerSetup = [];
    exampleDataId.forEach((id) => {
      ingredientsData.forEach((ingredient) => {
        ingredient._id === id && burgerSetup.push(ingredient);
      });
    });
    return burgerSetup;
  }, [ingredientsData]);

  const total = orderedBurger.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );

  return (
    <div className={`${stylesBurgerConstructor.constructorContainer} mt-25`}>
      <div className={`${stylesBurgerConstructor.topContainer} mb-4 pl-4 pr-4`}>
        <ConstructorElement
          type="top"
          isLocked
          text={`${orderedBurger[0] && orderedBurger[0].name} (верх)`}
          price={orderedBurger[0] && orderedBurger[0].price}
          thumbnail={orderedBurger[0] && orderedBurger[0].image}
        />
      </div>
      <ul className={stylesBurgerConstructor.mainList}>
        {orderedBurger.map(
          (ingredient, index) =>
            index > 0 &&
            index < orderedBurger.length - 1 && (
              <BurgerConstructorItem key={index} ingredientInfo={ingredient} />
            )
        )}
      </ul>
      <div className={`${stylesBurgerConstructor.topContainer} mt-4 pl-4 pr-4`}>
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${
            orderedBurger[orderedBurger.length - 1] &&
            orderedBurger[orderedBurger.length - 1].name
          } (низ)`}
          price={
            orderedBurger[orderedBurger.length - 1] &&
            orderedBurger[orderedBurger.length - 1].price
          }
          thumbnail={
            orderedBurger[orderedBurger.length - 1] &&
            orderedBurger[orderedBurger.length - 1].image
          }
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
        <Button
          onClick={orderOpen}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  orderOpen: PropTypes.func.isRequired,
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
