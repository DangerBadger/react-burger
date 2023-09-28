/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-curly-brace-presence */
import { useRef, useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Paths } from '../../utils/constants';

import { logout, changeUserData } from '../../services/reducers/user';
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

    if (propertyName === passwordValue) {
      value === passwordValue
        ? setIsDataChanged(false)
        : setIsDataChanged(true);
    } else {
      value === userInfo[propertyName]
        ? setIsDataChanged(false)
        : setIsDataChanged(true);
    }
  };

  const cancelHandler = (evt) => {
    evt.preventDefault();

    setNameValue(userInfo.name);
    setEmailValue(userInfo.email);
    setPasswordValue('');
    setIsDataChanged(false);
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    const accessToken = `Bearer ${getCookie('accessToken')}`;

    dispatch(
      changeUserData({ nameValue, emailValue, passwordValue, accessToken })
    );

    setIsDataChanged(false);
  };

  return (
    <main className={profileStyles.main}>
      <div className={profileStyles.menuContainer}>
        <nav>
          <ul className={profileStyles.menuList}>
            <li
              className={`text text_type_main-medium ${profileStyles.menuItem}`}
            >
              <NavLink to={Paths.profilePage} className={linkActivator}>
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
            В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
          </p>
        </nav>
      </div>
      <form className="ml-15" onSubmit={submitHandler}>
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
          autoComplete="on"
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
          autoComplete="on"
        />
        <PasswordInput
          onChange={changeHandler(setPasswordValue, passwordValue)}
          value={passwordValue}
          name={'password'}
          icon="EditIcon"
        />
        <div className={`mt-6 ${profileStyles.buttonContainer}`}>
          <button
            type="button"
            disabled={!isDataChanged}
            className={`mr-5 text text_type_main-default ${profileStyles.button}`}
            onClick={cancelHandler}
          >
            Отмена
          </button>
          <Button
            disabled={!isDataChanged}
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
        </div>
      </form>
    </main>
  );
}

export default Profile;
