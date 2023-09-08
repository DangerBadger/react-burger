/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-multi-assign */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-useless-return */
/* eslint-disable react/jsx-curly-brace-presence */
import { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { logout } from '../../services/reducers/user';
import { getCookie } from '../../utils/cookie';

import profileStyles from './profile.module.css';

function Profile() {
  const userInfo = useSelector((store) => store.userData.userInfo);
  const [nameValue, setNameValue] = useState('Default user');
  const [emailValue, setEmailValue] = useState('default@mail.space');
  const [passwordValue, setPasswordValue] = useState('');
  const [nameReadOnly, setNameReadOnly] = useState(true);
  const [loginReadOnly, setLoginReadOnly] = useState(true);
  const [isDataChanged, setIsDataChanged] = useState(false);

  const nameInputRef = useRef();
  const loginInputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    nameInputRef.current.focus();
  }, [nameReadOnly]);

  useEffect(() => {
    loginInputRef.current.focus();
  }, [loginReadOnly]);

  useEffect(() => {
    if (userInfo) {
      setNameValue(userInfo.name);
      setEmailValue(userInfo.email);
      setPasswordValue('');
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      setNameValue(userInfo.name);
      setEmailValue(userInfo.email);
      setPasswordValue('');
    }
  }, [userInfo]);

  const linkActivator = (navStatus) =>
    navStatus.isActive ? profileStyles.navLinkActive : profileStyles.navLink;

  const onIconClickHandler = (ref, stateSetter) => {
    ref.current.focus();
    stateSetter(false);
  };

  const onBlurHandler = (stateSetter) => {
    stateSetter(true);
  };

  const logoutHandler = () => {
    const refreshToken = getCookie('refreshToken');
    dispatch(logout(refreshToken));
  };

  const changeHandler = (stateSetter, propertyName) => (evt) => {
    const { value } = evt.target;

    stateSetter(value);
    value === userInfo[propertyName]
      ? setIsDataChanged(false)
      : setIsDataChanged(true);
  };

  return (
    <main className={profileStyles.main}>
      <div className={profileStyles.menuContainer}>
        <nav>
          <ul className={profileStyles.menuList}>
            <li
              className={`text text_type_main-medium ${profileStyles.menuItem}`}
            >
              <NavLink to="/profile" className={linkActivator}>
                Профиль
              </NavLink>
            </li>
            <li
              className={`text text_type_main-medium ${profileStyles.menuItem}`}
            >
              <NavLink to="orders" className={linkActivator}>
                История заказов
              </NavLink>
            </li>
            <li
              className={`text text_type_main-medium ${profileStyles.menuItem}`}
            >
              <NavLink
                to="/login"
                onClick={logoutHandler}
                className={linkActivator}
              >
                Выход
              </NavLink>
            </li>
          </ul>
          <p className="mt-20 text text_type_main-default text_color_inactive">
            В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
          </p>
        </nav>
      </div>
      <form className="ml-15">
        <Input
          type={'text'}
          placeholder={'Имя'}
          disabled={nameReadOnly}
          onIconClick={() => onIconClickHandler(nameInputRef, setNameReadOnly)}
          onBlur={() => onBlurHandler(setNameReadOnly)}
          icon={'EditIcon'}
          onChange={changeHandler(setNameValue, 'name')}
          value={nameValue}
          name={'name'}
          error={false}
          ref={nameInputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass={profileStyles.input}
        />
        <Input
          type={'email'}
          disabled={loginReadOnly}
          onIconClick={() =>
            onIconClickHandler(loginInputRef, setLoginReadOnly)
          }
          onBlur={() => onBlurHandler(setLoginReadOnly)}
          icon={'EditIcon'}
          placeholder={'Укажите e-mail'}
          onChange={changeHandler(setEmailValue, 'email')}
          value={emailValue}
          name={'name'}
          error={false}
          ref={loginInputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass={profileStyles.input}
        />
        <PasswordInput
          // onChange={onChange}
          value={passwordValue}
          name={'password'}
          icon="EditIcon"
        />
        <div className={`mt-6 ${profileStyles.buttonContainer}`}>
          <button
            type="button"
            disabled
            className={`mr-5 text text_type_main-default ${profileStyles.button}`}
          >
            Отмена
          </button>
          <Button disabled htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
    </main>
  );
}

export default Profile;
