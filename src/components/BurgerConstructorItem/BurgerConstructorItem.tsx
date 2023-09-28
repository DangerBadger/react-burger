/* eslint-disable no-param-reassign */
import { useRef, FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IAddedIngredient } from '../../utils/types';

import stylesBurgerConstructorItem from './BurgerConstructorItem.module.css';

interface IBurgerConstructorItem {
  ingredientItem: IAddedIngredient;
  index: number;
  moveIngredient: (draggedIndex: number, hoveredIndex: number) => void;
  id: string;
  onDelete: (item: IAddedIngredient) => void;
}

const BurgerConstructorItem: FC<IBurgerConstructorItem> = ({
  ingredientItem,
  index,
  moveIngredient,
  id,
  onDelete,
}) => {
  const ingredientItemRef = useRef<HTMLLIElement>(null);

  const [{ opacity }, dragRef] = useDrag({
    type: 'filling',
    item: () => ({ id, index }),
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  const [{ idHandler }, dropRef] = useDrop({
    accept: 'filling',
    collect: (monitor) => ({ idHandler: monitor.getHandlerId() }),
    hover(item: any, monitor) {
      if (!ingredientItemRef.current) {
        return;
      }
      const draggedIndex = item.index;
      const hoveredIndex = index;
      if (draggedIndex === hoveredIndex) {
        return;
      }

      const boundingHoverRect =
        ingredientItemRef.current?.getBoundingClientRect();
      const hoverHalfY = (boundingHoverRect.bottom - boundingHoverRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientOffsetY = clientOffset!.y - boundingHoverRect.top;
      if (draggedIndex > hoveredIndex && hoverClientOffsetY > hoverHalfY) {
        return;
      }
      moveIngredient(draggedIndex, hoveredIndex);
      item.index = hoveredIndex;
    },
  });

  // Вложенные рефы для сортировки внутри одного контейнера
  dragRef(dropRef(ingredientItemRef));

  return (
    <li
      ref={ingredientItemRef}
      data-handler-id={idHandler}
      style={{ opacity }}
      className={`${stylesBurgerConstructorItem.mainItem} mt-4 pr-2`}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredientItem.name}
        price={ingredientItem.price}
        thumbnail={ingredientItem.image}
        handleClose={() => onDelete(ingredientItem)}
      />
    </li>
  );
};

export default BurgerConstructorItem;
