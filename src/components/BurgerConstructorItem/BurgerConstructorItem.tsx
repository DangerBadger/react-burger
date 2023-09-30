/* eslint-disable no-param-reassign */
import { useRef, FC } from 'react';
import { useDrag, useDrop, DropTargetMonitor, XYCoord } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../utils/types';

import stylesBurgerConstructorItem from './BurgerConstructorItem.module.css';

interface IBurgerConstructorItem {
  ingredientItem: IIngredient;
  index: number;
  moveIngredient: (draggedIndex: number, hoveredIndex: number) => void;
  id: string;
  onDelete: (item: IIngredient) => void;
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
    hover(item: any, monitor: DropTargetMonitor) {
      if (!ingredientItemRef.current) {
        return;
      }
      const draggedIndex: number = item.index;
      const hoveredIndex: number = index;
      if (draggedIndex === hoveredIndex) {
        return;
      }

      const boundingHoverRect: DOMRect =
        ingredientItemRef.current?.getBoundingClientRect();
      const hoverHalfY: number =
        (boundingHoverRect.bottom - boundingHoverRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientOffsetY: number =
        (clientOffset as XYCoord).y - boundingHoverRect.top;
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
