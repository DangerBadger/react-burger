/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-curly-brace-presence */
import { FC } from 'react';
import { NavLink, useLocation, Routes, Route } from 'react-router-dom';

import { useAppDispatch } from '../../utils/hooks/useRedux';
import { Paths } from '../../utils/constants';

import { logout } from '../../services/reducers/user';
import { getCookie } from '../../utils/cookie';

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
        <nav className="mt-0">
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
      <Routes>
        <Route path={Paths.mainPage} element={<ProfileInfo />} />
        <Route path={Paths.orders} element={<OrdersFeed />} />
      </Routes>
    </main>
  );
};

export default Profile;
