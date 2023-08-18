import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from '../../utils/Api';
import IngredientsContext from '../../services/ingredientsContext';
import OrderContext from '../../services/orderContext';
import AddedIngredientsContext from '../../services/addedIngredients';
import IsLoadingContext from '../../services/isLoadigContext';

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
  const [foundBun, setFoundBun] = useState({});
  const [isIngredientLoading, setIsIngredientIsLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

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
        setIsIngredientIsLoading(true);
        setIngredientsData(ingredients.data);
      })
      .catch((err) => console.warn(err))
      .finally(() => {
        setTimeout(() => {
          setIsIngredientIsLoading(false);
        }, '1000');
      });
  }, []);

  const sendOrderHandler = (ingredientsId) => {
    api
      .sendOrder(ingredientsId)
      .then((res) => {
        setIsOrderLoading(true);
        setOrderData(res);
        orderOpen();
        setAddedIngredients([]);
        setFoundBun({});
      })
      .catch((err) => console.warn(err))
      .finally(() =>
        setTimeout(() => {
          setIsOrderLoading(false);
        }, '1000')
      );
  };

  return (
    <IngredientsContext.Provider value={ingredientsData}>
      <AddedIngredientsContext.Provider value={addedIngredients}>
        <OrderContext.Provider value={orderData}>
          <IsLoadingContext.Provider value={isIngredientLoading}>
            <div className={styles.app}>
              <AppHeader />
              <Main
                setCurrentIngredient={setCurrentIngredient}
                ingredientOpen={ingredientOpen}
                setAddedIngredients={setAddedIngredients}
                sendOrderHandler={sendOrderHandler}
                foundBun={foundBun}
                setFoundBun={setFoundBun}
              />
            </div>
            {isOrderDetailsOpened && (
              <Modal setOpen={setIsOrderDetailsOpened}>
                <OrderDetails isOrderLoading={isOrderLoading} />
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
          </IsLoadingContext.Provider>
        </OrderContext.Provider>
      </AddedIngredientsContext.Provider>
    </IngredientsContext.Provider>
  );
}

export default App;
