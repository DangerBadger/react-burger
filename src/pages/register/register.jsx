/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-return */
/* eslint-disable react/jsx-curly-brace-presence */
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { registration } from '../../services/reducers/user';

import registerStyles from './register.module.css';

function Register() {
  const [nameValue, setNameValue] = useState('');
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
      nameValue !== '' &&
      emailValue !== '' &&
      passwordValue !== '' &&
      passwordValue.length >= 6
    ) {
      setIsInputChanged(true);
    } else {
      setIsInputChanged(false);
    }
  }, [emailValue, passwordValue, nameValue]);

  const submitHandler = (evt) => {
    evt.preventDefault();

    if (!nameValue || !emailValue || !passwordValue) {
      return;
    }

    dispatch(registration({ emailValue, passwordValue, nameValue }));
  };

  return (
    <main className={registerStyles.main}>
      <h1 className={`${registerStyles.header} text text_type_main-medium`}>
        Регистрация
      </h1>
      <form className={registerStyles.form} onSubmit={submitHandler}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(evt) => setNameValue(evt.target.value)}
          value={nameValue}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass={registerStyles.input}
          autoComplete="on"
        />
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
          extraClass={registerStyles.input}
          autoComplete="on"
        />
        <PasswordInput
          onChange={(evt) => setPasswordValue(evt.target.value)}
          value={passwordValue}
          name={'password'}
          extraClass={registerStyles.input}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isInputChanged}
        >
          Зарегистрироваться
        </Button>
      </form>
      <span
        className={`className="text text_type_main-default text_color_inactive" ${registerStyles.linkContainer}`}
      >
        <p className={registerStyles.text}>Уже зарегистрированы?</p>
        <Link to="/login" className={registerStyles.link}>
          Войти
        </Link>
      </span>
    </main>
  );
}

export default Register;
