/* eslint-disable no-debugger */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { tabs } from '../../utils/constants';

import stylesBurgerIngredients from './BurgerIngredients.module.css';

import BurgerIngredientsList from '../BurgerIngredientsList/BurgerIngredientsList';

function BurgerIngredients({ openIngredientDetails }) {
  const ingredientsData = useSelector(
    (store) => store.ingredientsData.ingredients
  );

  const isLoading = useSelector(
    (store) => store.ingredientsData.ingredientsRequest
  );

  const [current, setCurrent] = useState('bun');

  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();
  const scrollRef = useRef();

  const tabClickHandler = (value) => {
    value === 'bun'
      ? bunRef.current.scrollIntoView({ behavior: 'smooth' })
      : value === 'sauce'
      ? sauceRef.current.scrollIntoView({ behavior: 'smooth' })
      : mainRef.current.scrollIntoView({ behavior: 'smooth' });
    setCurrent(value);
  };

  useEffect(() => {
    const targets = [bunRef.current, sauceRef.current, mainRef.current];
    const options = {
      root: scrollRef.current,
      rootMargin: '0px 0px -90% 0px',
    };

    const callback = function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === bunRef.current) {
            setCurrent(tabs.BUN);
          }
          if (entry.target === sauceRef.current) {
            setCurrent(tabs.SAUCE);
          }
          if (entry.target === mainRef.current) {
            setCurrent(tabs.MAIN);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    targets.forEach((target) => observer.observe(target));
  }, [ingredientsData]);

  const bunFilter = useMemo(
    () => ingredientsData?.filter((item) => item.type === 'bun'),
    [ingredientsData]
  );

  const sauceFilter = useMemo(
    () => ingredientsData?.filter((item) => item.type === 'sauce'),
    [ingredientsData]
  );

  const mainFilter = useMemo(
    () => ingredientsData?.filter((item) => item.type === 'main'),
    [ingredientsData]
  );

  return (
    <div id="container">
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={`${stylesBurgerIngredients.tabContainer} mt-5`}>
        <Tab
          value={tabs.BUN}
          active={current === tabs.BUN}
          onClick={tabClickHandler}
        >
          Булки
        </Tab>
        <Tab
          value={tabs.SAUCE}
          active={current === tabs.SAUCE}
          onClick={tabClickHandler}
        >
          Соусы
        </Tab>
        <Tab
          value={tabs.MAIN}
          active={current === tabs.MAIN}
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
              id={tabs.BUN}
              ingredientsDataType={bunFilter}
              openIngredientDetails={openIngredientDetails}
              refName={bunRef}
            />
            <BurgerIngredientsList
              tabName="Соусы"
              id={tabs.SAUCE}
              ingredientsDataType={sauceFilter}
              openIngredientDetails={openIngredientDetails}
              refName={sauceRef}
            />
            <BurgerIngredientsList
              tabName="Начинки"
              id={tabs.MAIN}
              ingredientsDataType={mainFilter}
              openIngredientDetails={openIngredientDetails}
              refName={mainRef}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  openIngredientDetails: PropTypes.func.isRequired,
};
