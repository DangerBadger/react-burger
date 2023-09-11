/* eslint-disable prefer-template */
import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useModal } from '../../utils/hooks/useModal';

import { getIngredients } from '../../services/reducers/ingredients';

import { clearOrderData } from '../../services/reducers/order';
import { getUserData } from '../../services/reducers/user';
import { getCookie } from '../../utils/cookie';
import { paths } from '../../utils/constants';

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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  const accessToken = 'Bearer ' + getCookie('accessToken');
  const [isOrderDetailsOpened, openOrderDetails, closeOrderDetails] =
    useModal();

  // Получение ингредиентов и данных пользовтеля
  useEffect(() => {
    dispatch(getIngredients());
    if (getCookie('accessToken')) {
      dispatch(getUserData(accessToken));
    }
  }, []);

  const closeIngredientsModal = () => {
    navigate(-1);
  };

  const closeOrderMoadal = () => {
    closeOrderDetails();
    dispatch(clearOrderData());
  };

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route
            path={paths.mainPage}
            element={<Main openOrderDetails={openOrderDetails} />}
          />
          <Route
            path={paths.registerPage}
            element={<ProtectedRoute component={Register} onlyUnAuth />}
          />
          <Route
            path={paths.loginPage}
            element={<ProtectedRoute component={Login} onlyUnAuth />}
          />
          <Route
            path={paths.forgotPasswordPage}
            element={<ProtectedRoute component={ForgotPassword} onlyUnAuth />}
          />
          <Route
            path={paths.resetPasswordPage}
            element={<ProtectedRoute component={ResetPassword} onlyUnAuth />}
          />
          {/* Защищённый от неавторизованных пользователей рут */}
          <Route
            path={paths.profilePage}
            element={<ProtectedRoute component={Profile} onlyUnAuth={false} />}
          />
          <Route
            path={paths.ingredientsIdPage}
            element={<IngredientDetails title="Детали ингредиента" />}
          />
          <Route path={paths.notFoundPage} element={<NotFound />} />
        </Routes>
      </div>
      {isOrderDetailsOpened && (
        <Modal onClose={closeOrderMoadal}>
          <OrderDetails />
        </Modal>
      )}

      {background && (
        <Routes>
          <Route
            path={paths.ingredientsIdPage}
            element={
              <Modal onClose={closeIngredientsModal} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
