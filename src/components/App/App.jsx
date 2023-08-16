import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from '../../utils/Api';
import IngredientsContext from '../../services/ingredientsContext';
import OrderContext from '../../services/orderContext';
import AddedIngredientsContext from '../../services/addedIngredients';

import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function App() {
  const [ingredientsData, setIngredientsData] = useState([]);
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [orderData, setOrderData] = useState({});
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIngredientDetailsOpened] =
    useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({});

  // Открытие модалки заказа
  const orderOpen = () => {
    setIsOrderDetailsOpened(true);
  };

  // Открытие модалки ингредиента
  const ingredientOpen = () => {
    setIngredientDetailsOpened(true);
  };

  useEffect(() => {
    api
      .getIngredients()
      .then((ingredients) => {
        setIngredientsData(ingredients.data);
      })
      .catch((err) => console.warn(err));
  }, []);

  const sendOrderHandler = (ingredientsId) => {
    api
      .sendOrder(ingredientsId)
      .then((res) => {
        setOrderData(res);
        orderOpen();
      })
      .catch((err) => console.warn(err));
  };

  return (
    <IngredientsContext.Provider value={ingredientsData}>
      <AddedIngredientsContext.Provider value={addedIngredients}>
        <OrderContext.Provider value={orderData}>
          <div className={styles.app}>
            <AppHeader />
            <Main
              setCurrentIngredient={setCurrentIngredient}
              ingredientOpen={ingredientOpen}
              setAddedIngredients={setAddedIngredients}
              sendOrderHandler={sendOrderHandler}
            />
          </div>
          {isOrderDetailsOpened && (
            <Modal setOpen={setIsOrderDetailsOpened}>
              <OrderDetails />
            </Modal>
          )}
          {isIngredientDetailsOpened && (
            <Modal
              title="Детали ингредиента"
              setOpen={setIngredientDetailsOpened}
            >
              <IngredientDetails currentIngredient={currentIngredient} />
            </Modal>
          )}
        </OrderContext.Provider>
      </AddedIngredientsContext.Provider>
    </IngredientsContext.Provider>
  );
}

export default App;
