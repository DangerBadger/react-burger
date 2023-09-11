import { NavLink, useLocation } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { paths } from '../../utils/constants';

import stylesHeader from './AppHeader.module.css';

function AppHeader() {
  const { pathname } = useLocation();

  const linkActivator = (navStatus) =>
    navStatus.isActive ? stylesHeader.navLinkActive : stylesHeader.navLink;

  return (
    <header className={stylesHeader.header}>
      <div className={`${stylesHeader.content} pt-4 pb-4`}>
        <nav className={stylesHeader.navigation}>
          <ul className={stylesHeader.navList}>
            <li className={`${stylesHeader.navItem} mr-2`}>
              <NavLink to={paths.mainPage} className={linkActivator}>
                <BurgerIcon
                  type={pathname === paths.mainPage ? 'primary' : 'secondary'}
                />
                <p className="text text_type_main-default ml-2">Конструктор</p>
              </NavLink>
            </li>
            <li className={stylesHeader.navItem}>
              <NavLink to="feed" className={linkActivator}>
                <ListIcon
                  type={pathname === '/feed' ? 'primary' : 'secondary'}
                />
                <p className="text text_type_main-default ml-2">
                  Лента заказов
                </p>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={stylesHeader.logoContainer}>
          <Logo />
        </div>
        <NavLink to={paths.profilePage} className={linkActivator}>
          <ProfileIcon
            type={pathname === paths.profilePage ? 'primary' : 'secondary'}
          />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
