/* eslint-disable no-useless-return */
/* eslint-disable react/jsx-curly-brace-presence */
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { resetPassword } from '../../services/reducers/user';

import resetPasswordStyles from './reset-password.module.css';

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passwordChangingConfirmation = useSelector((store) => store.userData);

  const [passwordValue, setPasswordValue] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const inputRef = useRef();

  const submitHundler = (evt) => {
    evt.preventDefault();

    if (!passwordValue || !codeValue) {
      return;
    }

    dispatch(resetPassword({ passwordValue, codeValue }));
    setPasswordValue('');
    setCodeValue('');
    navigate('/');
  };

  return (
    <main className={resetPasswordStyles.main}>
      <h1
        className={`${resetPasswordStyles.header} text text_type_main-medium`}
      >
        Восстановление пароля
      </h1>
      <form className={resetPasswordStyles.form} onSubmit={submitHundler}>
        <PasswordInput
          onChange={(evt) => setPasswordValue(evt.target.value)}
          value={passwordValue}
          placeholder={'Введите новый пароль'}
          name={'password'}
          extraClass={`mb-2 ${resetPasswordStyles.input}`}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={(evt) => setCodeValue(evt.target.value)}
          value={codeValue}
          name={'code'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass={`ml-1 ${resetPasswordStyles.input}`}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <span
        className={`className="text text_type_main-default text_color_inactive" ${resetPasswordStyles.linkContainer}`}
      >
        <p className={resetPasswordStyles.text}>Вспомнили пароль?</p>
        <Link to="/login" className={resetPasswordStyles.link}>
          Войти
        </Link>
      </span>
    </main>
  );
}

export default ResetPassword;
