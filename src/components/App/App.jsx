import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from '../../utils/Api';

import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function App() {
  const [ingredientsData, setIngredientsData] = useState([]);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIngredientDetailsOpened] =
    useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({});

  useEffect(() => {
    api
      .getIngredients()
      .then((ingredients) => {
        setIngredientsData(ingredients.data);
      })
      .catch((err) => console.warn(err));
  }, []);

  // Открытие модалки заказа
  const orderOpen = () => {
    setIsOrderDetailsOpened(true);
  };

  // Открытие модалки ингредиента
  const ingredientOpen = () => {
    setIngredientDetailsOpened(true);
  };

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Main
          ingredientsData={ingredientsData}
          setCurrentIngredient={setCurrentIngredient}
          orderOpen={orderOpen}
          ingredientOpen={ingredientOpen}
        />
      </div>
      {isOrderDetailsOpened && (
        <Modal setOpen={setIsOrderDetailsOpened}>
          <OrderDetails />
        </Modal>
      )}
      {isIngredientDetailsOpened && (
        <Modal title="Детали ингредиента" setOpen={setIngredientDetailsOpened}>
          <IngredientDetails currentIngredient={currentIngredient} />
        </Modal>
      )}
    </>
  );
}

export default App;
