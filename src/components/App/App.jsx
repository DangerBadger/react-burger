import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../utils/Api';
import OrderContext from '../../services/orderContext';
import AddedIngredientsContext from '../../services/addedIngredients';
import IsLoadingContext from '../../services/isLoadigContext';
import { useModal } from '../../utils/hooks/useModal';

import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { getIngredients } from '../../services/actions/ingredients';

function App() {
  const dispatch = useDispatch();

  const [addedIngredients, setAddedIngredients] = useState([]);
  const [orderData, setOrderData] = useState({});
  const [isOrderDetailsOpened, openOrderDetails, closeOrderDetails] =
    useModal();
  const [
    isIngredientDetailsOpened,
    openIngredientDetails,
    closeIngredientDetails,
  ] = useModal();
  const [isIngredientLoading, setIsIngredientIsLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const sendOrderHandler = (ingredientsId) => {
    api
      .sendOrder(ingredientsId)
      .then((res) => {
        setIsOrderLoading(true);
        setOrderData(res);
        openOrderDetails();
        setAddedIngredients([]);
      })
      .catch((err) => console.warn(err))
      .finally(() =>
        setTimeout(() => {
          setIsOrderLoading(false);
        }, '1000')
      );
  };

  return (
    <AddedIngredientsContext.Provider value={addedIngredients}>
      <OrderContext.Provider value={orderData}>
        <IsLoadingContext.Provider value={isIngredientLoading}>
          <div className={styles.app}>
            <AppHeader />
            <Main
              openIngredientDetails={openIngredientDetails}
              setAddedIngredients={setAddedIngredients}
              sendOrderHandler={sendOrderHandler}
            />
          </div>
          {isOrderDetailsOpened && (
            <Modal onClose={closeOrderDetails}>
              <OrderDetails isOrderLoading={isOrderLoading} />
            </Modal>
          )}
          {isIngredientDetailsOpened && (
            <Modal title="Детали ингредиента" onClose={closeIngredientDetails}>
              <IngredientDetails />
            </Modal>
          )}
        </IsLoadingContext.Provider>
      </OrderContext.Provider>
    </AddedIngredientsContext.Provider>
  );
}

export default App;
