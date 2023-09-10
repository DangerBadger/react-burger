/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-return */
/* eslint-disable react/jsx-curly-brace-presence */
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { login } from '../../services/reducers/user';

import loginStyles from './login.module.css';

function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isInputChanged, setIsInputChanged] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector((store) => store.userData.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      location.state && location.state.previousLocation
        ? navigate(location.state.previousLocation.pathname)
        : navigate('/');
    }
  }, [userInfo, navigate, location]);

  useEffect(() => {
    if (
      emailValue !== '' &&
      passwordValue !== '' &&
      passwordValue.length >= 6
    ) {
      setIsInputChanged(true);
    } else {
      setIsInputChanged(false);
    }
  }, [emailValue, passwordValue]);

  const submitHandler = (evt) => {
    evt.preventDefault();

    if (!emailValue || !passwordValue) {
      return;
    }

    dispatch(login({ emailValue, passwordValue }));
  };

  return (
    <main className={loginStyles.main}>
      <h1 className={`${loginStyles.header} text text_type_main-medium`}>
        Вход
      </h1>
      <form className={loginStyles.form} onSubmit={submitHandler}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={(evt) => setEmailValue(evt.target.value)}
          value={emailValue}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass={loginStyles.input}
          autoComplete="on"
        />
        <PasswordInput
          onChange={(evt) => setPasswordValue(evt.target.value)}
          value={passwordValue}
          name={'password'}
          extraClass={loginStyles.input}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isInputChanged}
        >
          Войти
        </Button>
      </form>
      <span
        className={`mb-4 className="text text_type_main-default text_color_inactive" ${loginStyles.linkContainer}`}
      >
        <p className={loginStyles.text}>Вы — новый пользователь?</p>
        <Link to="/register" className={loginStyles.link}>
          Зарегистрироваться
        </Link>
      </span>
      <span
        className={`className="text text_type_main-default text_color_inactive" ${loginStyles.linkContainer}`}
      >
        <p className={loginStyles.text}>Забыли пароль?</p>
        <Link to="/forgot-password" className={loginStyles.link}>
          Восстановить пароль
        </Link>
      </span>
    </main>
  );
}

export default Login;
