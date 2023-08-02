import { NavLink, useLocation } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import appHeader from './AppHeader.module.css';

function AppHeader() {
  const { pathname } = useLocation();

  const linkActivator = (navStatus) =>
    navStatus.isActive ? appHeader.navLinkActive : appHeader.navLink;

  return (
    <header className={appHeader.header}>
      <div className={appHeader.content}>
        <nav className={appHeader.navigation}>
          <ul className={appHeader.navList}>
            <li className={appHeader.navItem}>
              <NavLink to="/" className={linkActivator}>
                <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
                <p
                  className={`text text_type_main-default ${appHeader.navText}`}
                >
                  Конструктор
                </p>
              </NavLink>
            </li>
            <li className={appHeader.navItem}>
              <NavLink to="*" className={linkActivator}>
                <ListIcon type={pathname !== '/' ? 'primary' : 'secondary'} />
                <p
                  className={`text text_type_main-default ${appHeader.navText}`}
                >
                  Лента заказов
                </p>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={appHeader.logoContainer}>
          <Logo />
        </div>
        <NavLink to="*" className={linkActivator}>
          <ProfileIcon type={pathname !== '/' ? 'primary' : 'secondary'} />
          <p className={`text text_type_main-default ${appHeader.navText}`}>
            Личный кабинет
          </p>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
