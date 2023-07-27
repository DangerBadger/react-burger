import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import appHeader from './AppHeader.module.css';

import accountImage from '../../images/account.png';

function AppHeader({ isOpened, openBurger, onClose }) {
  const linkActivator = (navStatus) =>
    navStatus.isActive ? 'burger__link burger__link_active' : 'burger__link';

  return (
    <header className={appHeader.header}>
      <div className={isOpened ? 'burger burger_opened' : 'burger'}>
        <button
          className="burger__button"
          type="button"
          onClick={isOpened ? onClose : openBurger}
        >
          <span className="burger__button-line" />
          <span className="burger__button-line" />
          <span className="burger__button-line" />
        </button>
        <div
          className="burger__nav-overlay"
          onMouseDown={(evt) => {
            if (evt.currentTarget === evt.target) {
              onClose();
            }
          }}
        />
        <nav className="burger__menu-login">
          <ul className="burger__lines">
            <li className="burger__line burger__line_mainpage">
              <NavLink to="/" onClick={onClose} className={linkActivator}>
                Главная
              </NavLink>
            </li>
            <li className="burger__line">
              <NavLink to="movies" onClick={onClose} className={linkActivator}>
                Фильмы
              </NavLink>
            </li>
            <li className="burger__line">
              <NavLink
                to="saved-movies"
                onClick={onClose}
                className={linkActivator}
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <Link to="/profile" className="burger__account-btn" onClick={onClose}>
            <img
              className="burger__account-img"
              alt="Иконка кнопки профиль"
              src={accountImage}
            />
            <p className="burger__account-btn-text">Аккаунт</p>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;

AppHeader.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  openBurger: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
