/* eslint-disable import/no-cycle */
import { useEffect, FC } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../utils/hooks/useRedux';

import { useModal } from '../../utils/hooks/useModal';

import { getIngredients } from '../../services/reducers/ingredients';

import { clearOrderData } from '../../services/reducers/order';
import { getUserData } from '../../services/reducers/user';
import { getCookie } from '../../utils/cookie';
import { Paths } from '../../utils/constants';

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
import Feed from '../../pages/feed/feed';
import FeedItemDetails from '../FeedItemDetails/FeedItemDetails';
import NotFound from '../../pages/not-found/not-found';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const App: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const background = location.state && location.state.background;
  const accessToken: string = `Bearer ${getCookie('accessToken')}`;
  const [isOrderDetailsOpened, openOrderDetails, closeOrderDetails] =
    useModal();

  // Получение ингредиентов и данных пользовтеля
  useEffect(() => {
    dispatch(getIngredients());
    if (getCookie('accessToken')) {
      dispatch(getUserData(accessToken));
    }
  }, []);

  const closeModal = () => {
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
            path={Paths.mainPage}
            element={<Main openOrderDetails={openOrderDetails} />}
          />
          <Route path={Paths.feed} element={<Feed />} />
          <Route
            path={Paths.registerPage}
            element={<ProtectedRoute component={Register} onlyUnAuth />}
          />
          <Route
            path={Paths.loginPage}
            element={<ProtectedRoute component={Login} onlyUnAuth />}
          />
          <Route
            path={Paths.forgotPasswordPage}
            element={<ProtectedRoute component={ForgotPassword} onlyUnAuth />}
          />
          <Route
            path={Paths.resetPasswordPage}
            element={<ProtectedRoute component={ResetPassword} onlyUnAuth />}
          />
          {/* Защищённый от неавторизованных пользователей рут */}
          <Route
            path={Paths.profilePage}
            element={<ProtectedRoute component={Profile} onlyUnAuth={false} />}
          />
          <Route
            path={Paths.ingredientsIdPage}
            element={<IngredientDetails title="Детали ингредиента" />}
          />
          <Route
            path={Paths.feedDetails}
            element={<FeedItemDetails marginTop />}
          />
          <Route path={Paths.notFoundPage} element={<NotFound />} />
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
            path={Paths.feedDetails}
            element={
              <Modal onClose={closeModal}>
                <FeedItemDetails />
              </Modal>
            }
          />
          <Route
            path={Paths.ingredientsIdPage}
            element={
              <Modal onClose={closeModal} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
