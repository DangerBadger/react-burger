import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useModal } from '../../utils/hooks/useModal';
import {
  getIngredients,
  unselectIngredient,
} from '../../services/actions/ingredients';
import { clearOrderData } from '../../services/actions/order';

import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function App() {
  const dispatch = useDispatch();

  const [isOrderDetailsOpened, openOrderDetails, closeOrderDetails] =
    useModal();
  const [
    isIngredientDetailsOpened,
    openIngredientDetails,
    closeIngredientDetails,
  ] = useModal();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const closeIngredientsModal = () => {
    closeIngredientDetails();
    dispatch(unselectIngredient());
  };

  const closeOrderMoadal = () => {
    closeOrderDetails();
    dispatch(clearOrderData());
  };

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Main
          openIngredientDetails={openIngredientDetails}
          openOrderDetails={openOrderDetails}
        />
      </div>
      {isOrderDetailsOpened && (
        <Modal onClose={closeOrderMoadal}>
          <OrderDetails />
        </Modal>
      )}
      {isIngredientDetailsOpened && (
        <Modal title="Детали ингредиента" onClose={closeIngredientsModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
