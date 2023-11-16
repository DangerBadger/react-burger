/* eslint-disable react/no-array-index-key */
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState, useCallback, FC } from 'react';
import { useDrop } from 'react-dnd';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useRedux';
import {
  deleteIngredient,
  clearIngredients,
  sortIngredients,
} from '../../services/reducers/ingredients';
import { IIngredient, IIngredientId } from '../../utils/types';
import { getOrderData } from '../../services/reducers/order';
import { Paths } from '../../utils/constants';

import stylesBurgerConstructor from './BurgerConstructor.module.css';

import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';

interface IBurgerConstructor {
  openOrderDetails: () => void;
  onDropHandler: (ingredientId: IIngredientId) => void;
}

const BurgerConstructor: FC<IBurgerConstructor> = ({
  openOrderDetails,
  onDropHandler,
}) => {
  const [foundBun, setFoundBun] = useState<IIngredient | Record<string, never>>(
    {}
  );
  const ingredientsData: Array<IIngredient> = useAppSelector(
    (store) => store.ingredientsData.ingredients
  );
  const addedIngredients: Array<IIngredient> = useAppSelector(
    (store) => store.ingredientsData.addedIngredients
  );
  const userInfo = useAppSelector((store) => store.userData.userInfo);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId: { _id: string }) {
      onDropHandler(itemId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

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

  const deleteIngredientHandler = (item: IIngredient) => {
    const addedIngredientIndex: number = addedIngredients.indexOf(item);
    const addedIngredientsDuplicate: Array<
      IIngredient | Record<string, never>
    > = addedIngredients.slice();
    addedIngredientsDuplicate.splice(addedIngredientIndex, 1);
    dispatch(deleteIngredient(addedIngredientsDuplicate));
  };

  // Добавляем булку в отдельный стейт
  useEffect(() => {
    if (
      addedIngredients.length &&
      addedIngredients.find((ingredient) => ingredient.type === 'bun')
    ) {
      const found: IIngredient | undefined = addedIngredients.find(
        (ingredient) => ingredient.type === 'bun'
      );
      if (typeof found !== 'undefined') {
        setFoundBun(found);
      }
    }
  }, [addedIngredients, foundBun]);

  const orderClickHandler = () => {
    if (userInfo) {
      const orderIdArray = addedIngredients.map((ingredient) => ingredient._id);
      if (foundBun._id) {
        orderIdArray.push(foundBun._id);
      }
      dispatch(getOrderData(orderIdArray));
      dispatch(clearIngredients());
      setFoundBun({});
      openOrderDetails();
    } else {
      navigate(Paths.loginPage);
    }
  };

  // Замена ингридиентов местами
  const moveIngredient = useCallback(
    (draggedIndex: number, hoveredIndex: number) => {
      const draggedFilling: IIngredient = addedIngredients[draggedIndex];
      const fillingsOnlyArrDuplicate: Array<IIngredient> = [
        ...addedIngredients,
      ];
      fillingsOnlyArrDuplicate.splice(draggedIndex, 1);
      fillingsOnlyArrDuplicate.splice(hoveredIndex, 0, draggedFilling);
      dispatch(sortIngredients(fillingsOnlyArrDuplicate));
    },
    [addedIngredients, dispatch]
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
          text={`${foundBun?.name ?? 'Выберите булку'} (верх)`}
          price={foundBun?.price ?? 0}
          thumbnail={
            foundBun?.image ??
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
          <CurrencyIcon type="primary" />
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
};

export default BurgerConstructor;
