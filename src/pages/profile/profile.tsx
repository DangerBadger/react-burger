/* eslint-disable no-nested-ternary */
import { FC, useEffect } from 'react';
import {
  NavLink,
  useLocation,
  Routes,
  Route,
  Link,
  Outlet,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useRedux';
import { Paths, BASE_WSS } from '../../utils/constants';
import { logout } from '../../services/reducers/user';
import { getCookie } from '../../utils/cookie';
import {
  wsConnectionStart,
  wsConnectionOffline,
} from '../../services/reducers/order';
import { IFeedOrders } from '../../utils/types';

import profileStyles from './profile.module.css';

import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import OrdersFeed from '../../components/OrdersFeed/OrdersFeed';

const Profile: FC = () => {
  const profileDescription: string =
    'В\u00A0этом разделе вы\u00A0можете изменить свои персональные данные';
  const ordersFeedDescription: string =
    'В этом разделе вы можете просмотреть свою историю заказов';

  const location = useLocation();
  const dispatch = useAppDispatch();
  const accessToken = getCookie('accessToken');

  const myOrders: IFeedOrders | null = useAppSelector(
    (store) => store.orderData?.orders
  );

  useEffect(() => {
    dispatch(wsConnectionStart(`${BASE_WSS}/orders?token=${accessToken}`));

    return () => {
      dispatch(wsConnectionOffline());
    };
  }, []);

  const linkActivator = ({ isActive }: { isActive: boolean }): string =>
    isActive ? profileStyles.navLinkActive : profileStyles.navLink;

  const logoutHandler = () => {
    const refreshToken: string | undefined = getCookie('refreshToken');
    if (refreshToken) {
      dispatch(logout(refreshToken));
    }
  };

  return (
    <main className={profileStyles.main}>
      <div className={profileStyles.menuContainer}>
        <nav>
          <ul className={profileStyles.menuList}>
            <li
              className={`text text_type_main-medium ${profileStyles.menuItem}`}
            >
              <NavLink end to={Paths.profilePage} className={linkActivator}>
                Профиль
              </NavLink>
            </li>
            <li
              className={`text text_type_main-medium ${profileStyles.menuItem}`}
            >
              <NavLink to={Paths.orders} className={linkActivator}>
                История заказов
              </NavLink>
            </li>
            <li
              className={`text text_type_main-medium ${profileStyles.menuItem}`}
            >
              <button
                type="button"
                onClick={logoutHandler}
                className={`text text_type_main-medium ${profileStyles.exitButton}`}
              >
                Выход
              </button>
            </li>
          </ul>
          <p className="mt-20 text text_type_main-default text_color_inactive">
            {location.pathname === Paths.profilePage
              ? profileDescription
              : ordersFeedDescription}
          </p>
        </nav>
      </div>
      {!location.pathname.endsWith('orders/') ? (
        <Outlet />
      ) : !myOrders ? (
        <p className="text text_type_main-medium mt-3">Загрузка...</p>
      ) : myOrders.orders.length ? (
        <Outlet />
      ) : (
        <Link
          to={Paths.mainPage}
          className={`${profileStyles.link} text text_type_main-medium mt-3`}
        >
          Сделайте свой первый заказ
        </Link>
      )}
    </main>
  );
};

export default Profile;
