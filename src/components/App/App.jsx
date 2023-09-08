/* eslint-disable prefer-template */
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useModal } from '../../utils/hooks/useModal';

import {
  getIngredients,
  unselectIngredient,
} from '../../services/reducers/ingredients';

import { clearOrderData } from '../../services/reducers/order';
import { getUserData } from '../../services/reducers/user';
import { getCookie } from '../../utils/cookie';

import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Register from '../../pages/register/register';
import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import NotFound from '../../pages/not-found/not-found';

function App() {
  const dispatch = useDispatch();
  const accessToken = 'Bearer ' + getCookie('accessToken');
  const [isOrderDetailsOpened, openOrderDetails, closeOrderDetails] =
    useModal();
  const [
    isIngredientDetailsOpened,
    openIngredientDetails,
    closeIngredientDetails,
  ] = useModal();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserData(accessToken));
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
        <Routes>
          <Route
            path="/"
            element={
              <Main
                openIngredientDetails={openIngredientDetails}
                openOrderDetails={openOrderDetails}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
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
