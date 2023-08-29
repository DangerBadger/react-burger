/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  deleteIngredient,
  clearIngredients,
  sortIngredients,
} from '../../services/reducers/ingredients';
import { getOrderData } from '../../services/reducers/order';

import stylesBurgerConstructor from './BurgerConstructor.module.css';

import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';

function BurgerConstructor({ openOrderDetails, onDropHandler }) {
  const dispatch = useDispatch();

  const [foundBun, setFoundBun] = useState({});

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      onDropHandler(itemId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const ingredientsData = useSelector(
    (store) => store.ingredientsData.ingredients
  );
  const addedIngredients = useSelector(
    (store) => store.ingredientsData.addedIngredients
  );

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
    dispatch(deleteIngredient(addedIngredientsDuplicate));
  };

  // Добавляем булку в отдельный стейт
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
    dispatch(getOrderData(orderIdArray));
    dispatch(clearIngredients());
    setFoundBun({});
    openOrderDetails();
  };

  // Замена ингрилиентов местами
  const moveIngredient = useCallback(
    (draggedIndex, hoveredIndex) => {
      const draggedFilling = addedIngredients[draggedIndex];
      const fillingsOnlyArrDuplicate = [...addedIngredients];
      fillingsOnlyArrDuplicate.splice(draggedIndex, 1);
      fillingsOnlyArrDuplicate.splice(hoveredIndex, 0, draggedFilling);
      dispatch(sortIngredients(fillingsOnlyArrDuplicate));
    },
    [addedIngredients]
  );

  return (
    <div
      ref={dropTarget}
      className={`${
        isHover
          ? stylesBurgerConstructor.constructorContainerHover
          : stylesBurgerConstructor.constructorContainer
      } mt-25`}
    >
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
                key={ingredient.uniqueId}
                index={index}
                ingredientItem={ingredient}
                id={ingredient._id}
                moveIngredient={moveIngredient}
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
          disabled={!addedIngredients.length}
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
  onDropHandler: PropTypes.func.isRequired,
  openOrderDetails: PropTypes.func.isRequired,
};
