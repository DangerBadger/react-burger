/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-nested-ternary */
import { useState, useRef, useEffect, useMemo, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../utils/hooks/useRedux';
import { Tabs } from '../../utils/constants';
import { IIngredient } from '../../utils/types';

import stylesBurgerIngredients from './BurgerIngredients.module.css';

import BurgerIngredientsList from '../BurgerIngredientsList/BurgerIngredientsList';

interface IOptions {
  root: HTMLDivElement | null;
  rootMargin: string;
}

const BurgerIngredients: FC = () => {
  const ingredientsData: Array<IIngredient> = useAppSelector(
    (store) => store.ingredientsData.ingredients
  );
  const isLoading: boolean = useAppSelector(
    (store) => store.ingredientsData.ingredientsRequest
  );

  const [current, setCurrent] = useState<string>('bun');

  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tabClickHandler = (value: string) => {
    value === 'bun'
      ? bunRef.current?.scrollIntoView({ behavior: 'smooth' })
      : value === 'sauce'
      ? sauceRef.current?.scrollIntoView({ behavior: 'smooth' })
      : mainRef.current?.scrollIntoView({ behavior: 'smooth' });
    setCurrent(value);
  };

  useEffect(() => {
    const targets: Array<HTMLHeadingElement | null> = [
      bunRef.current,
      sauceRef.current,
      mainRef.current,
    ];
    const options: IOptions = {
      root: scrollRef.current,
      rootMargin: '0px 0px -90% 0px',
    };

    const callback = function (entries: Array<IntersectionObserverEntry>) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === bunRef.current) {
            setCurrent(Tabs.BUN);
          }
          if (entry.target === sauceRef.current) {
            setCurrent(Tabs.SAUCE);
          }
          if (entry.target === mainRef.current) {
            setCurrent(Tabs.MAIN);
          }
        }
      });
    };

    const observer: IntersectionObserver = new IntersectionObserver(
      callback,
      options
    );
    targets.forEach((target) => {
      if (target) {
        observer.observe(target);
      }
    });
  }, [ingredientsData]);

  const bunFilter = useMemo(
    () => ingredientsData?.filter((item) => item.type === 'bun'),
    [ingredientsData]
  );

  const sauceFilter = useMemo(
    () => ingredientsData.filter((item) => item.type === 'sauce'),
    [ingredientsData]
  );

  const mainFilter = useMemo(
    () => ingredientsData.filter((item) => item.type === 'main'),
    [ingredientsData]
  );

  return (
    <div id="container">
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={`${stylesBurgerIngredients.tabContainer} mt-5`}>
        <Tab
          value={Tabs.BUN}
          active={current === Tabs.BUN}
          onClick={tabClickHandler}
        >
          Булки
        </Tab>
        <Tab
          value={Tabs.SAUCE}
          active={current === Tabs.SAUCE}
          onClick={tabClickHandler}
        >
          Соусы
        </Tab>
        <Tab
          value={Tabs.MAIN}
          active={current === Tabs.MAIN}
          onClick={tabClickHandler}
        >
          Начинки
        </Tab>
      </div>
      <div
        ref={scrollRef}
        className={`${stylesBurgerIngredients.constructorContainer} mt-10`}
      >
        {isLoading ? (
          <h2 className="text text_type_main-large mt-10">
            Загрузка ингридиентов...
          </h2>
        ) : (
          <>
            <BurgerIngredientsList
              tabName="Булки"
              id={Tabs.BUN}
              ingredientsDataType={bunFilter}
              ref={bunRef}
            />
            <BurgerIngredientsList
              tabName="Соусы"
              id={Tabs.SAUCE}
              ingredientsDataType={sauceFilter}
              ref={sauceRef}
            />
            <BurgerIngredientsList
              tabName="Начинки"
              id={Tabs.MAIN}
              ingredientsDataType={mainFilter}
              ref={mainRef}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BurgerIngredients;
