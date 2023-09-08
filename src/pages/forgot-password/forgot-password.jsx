/* eslint-disable no-useless-return */
/* eslint-disable react/jsx-curly-brace-presence */
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { sendEmail } from '../../services/reducers/user';

import forgotPasswordStyles from './forgot-password.module.css';

function ForgotPassword() {
  const [emailValue, setEmailValue] = useState('');
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (evt) => {
    evt.preventDefault();
    if (!emailValue) {
      return;
    }

    dispatch(sendEmail(emailValue));
    setEmailValue('');
    navigate('/reset-password');
  };

  return (
    <main className={forgotPasswordStyles.main}>
      <h1
        className={`${forgotPasswordStyles.header} text text_type_main-medium`}
      >
        Восстановление пароля
      </h1>
      <form className={forgotPasswordStyles.form} onSubmit={submitHandler}>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={(evt) => setEmailValue(evt.target.value)}
          value={emailValue}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass={`ml-1 ${forgotPasswordStyles.input}`}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <span
        className={`className="text text_type_main-default text_color_inactive" ${forgotPasswordStyles.linkContainer}`}
      >
        <p className={forgotPasswordStyles.text}>Вспомнили пароль?</p>
        <Link to="/login" className={forgotPasswordStyles.link}>
          Войти
        </Link>
      </span>
    </main>
  );
}

export default ForgotPassword;
