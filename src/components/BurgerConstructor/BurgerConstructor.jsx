/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { useContext, useState, useEffect, useMemo } from 'react';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import stylesBurgerConstructor from './BurgerConstructor.module.css';

import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';
import IngredientsContext from '../../services/ingredientsContext';
import AddedIngredientsContext from '../../services/addedIngredients';

function BurgerConstructor({ setAddedIngredients, sendOrderHandler }) {
  const ingredientsData = useContext(IngredientsContext);
  const addedIngredients = useContext(AddedIngredientsContext);

  const [foundBun, setFoundBun] = useState([]);

  const total = useMemo(
    () =>
      addedIngredients.reduce(
        (accumulator, currentValue) =>
          currentValue.type === 'bun'
            ? accumulator + currentValue.price * 2
            : accumulator + currentValue.price,
        0
      ),
    [addedIngredients]
  );

  const deleteIngredientHandler = (item) => {
    const addedIngredientIndex = addedIngredients.indexOf(item);
    const addedIngredientsDuplicate = addedIngredients.slice();
    addedIngredientsDuplicate.splice(addedIngredientIndex, 1);
    setAddedIngredients(addedIngredientsDuplicate);
  };

  useEffect(() => {
    if (
      addedIngredients.length &&
      addedIngredients.find((ingredient) => ingredient.type === 'bun')
    ) {
      setFoundBun(
        addedIngredients.find((ingredient) => ingredient.type === 'bun')
      );
    }
  }, [addedIngredients, foundBun]);

  const orderClickHandler = () => {
    const orderIdArray = addedIngredients.map((ingredient) => ingredient._id);
    sendOrderHandler(orderIdArray);
  };

  return (
    <div className={`${stylesBurgerConstructor.constructorContainer} mt-25`}>
      <div className={`${stylesBurgerConstructor.bunContainer} mb-4 pl-4 pr-4`}>
        <ConstructorElement
          type="top"
          isLocked
          text={`${foundBun.name ?? 'Выберите булку'} (верх)`}
          price={foundBun.price ?? '0'}
          thumbnail={
            foundBun.image ??
            (ingredientsData.length && ingredientsData[0].image)
          }
        />
      </div>
      <ul className={stylesBurgerConstructor.mainList}>
        {addedIngredients.map(
          (ingredient, index) =>
            ingredient.type !== 'bun' && (
              <BurgerConstructorItem
                key={index}
                ingredientInfo={ingredient}
                onDelete={deleteIngredientHandler}
              />
            )
        )}
      </ul>
      <div className={`${stylesBurgerConstructor.bunContainer} mt-4 pl-4 pr-4`}>
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${foundBun.name ?? 'Выберите булку'} (низ)`}
          price={foundBun.price ?? '0'}
          thumbnail={
            foundBun.image ??
            (ingredientsData.length && ingredientsData[0].image)
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
          onClick={orderClickHandler}
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
  setAddedIngredients: PropTypes.func.isRequired,
  sendOrderHandler: PropTypes.func.isRequired,
};
