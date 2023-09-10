/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-return */
/* eslint-disable react/jsx-curly-brace-presence */
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { sendEmail } from '../../services/reducers/user';

import forgotPasswordStyles from './forgot-password.module.css';

function ForgotPassword() {
  const [emailValue, setEmailValue] = useState('');
  const [isInputChanged, setIsInputChanged] = useState(false);
  const { userInfo } = useSelector((store) => store.userData);
  const { forgotPasswordSuccess } = useSelector((store) => store.userData);
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      location.state && location.state.previousLocation
        ? navigate(location.state.previousLocation.pathname)
        : navigate('/');
    }
  }, [userInfo, navigate, location]);

  useEffect(() => {
    emailValue !== '' ? setIsInputChanged(true) : setIsInputChanged(false);
  }, [emailValue]);

  useEffect(() => {
    forgotPasswordSuccess && navigate('/reset-password');
  }, [forgotPasswordSuccess]);

  const submitHandler = (evt) => {
    evt.preventDefault();
    if (!emailValue) {
      return;
    }

    dispatch(sendEmail(emailValue));
    setEmailValue('');
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
          autoComplete="on"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isInputChanged}
        >
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
