/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-return */
/* eslint-disable react/jsx-curly-brace-presence */
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Paths } from '../../utils/constants.ts';

import { resetPassword } from '../../services/reducers/user';

import resetPasswordStyles from './reset-password.module.css';

function ResetPassword() {
  const [passwordValue, setPasswordValue] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [isInputChanged, setIsInputChanged] = useState(false);
  const userInfo = useSelector((store) => store.userData.userInfo);
  const forgotPasswordSuccess = useSelector(
    (store) => store.userData.forgotPasswordSuccess
  );
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (codeValue !== '' && passwordValue !== '' && passwordValue.length >= 6) {
      setIsInputChanged(true);
    } else {
      setIsInputChanged(false);
    }
  }, [passwordValue, codeValue]);

  useEffect(() => {
    if (!userInfo && !forgotPasswordSuccess) {
      navigate(Paths.forgotPasswordPage);
    }
  }, [userInfo, navigate, forgotPasswordSuccess]);

  const submitHundler = (evt) => {
    evt.preventDefault();

    if (!passwordValue || !codeValue) {
      return;
    }

    dispatch(resetPassword({ passwordValue, codeValue }));
    setPasswordValue('');
    setCodeValue('');
    navigate(Paths.loginPage);
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
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isInputChanged}
        >
          Сохранить
        </Button>
      </form>
      <span
        className={`className="text text_type_main-default text_color_inactive" ${resetPasswordStyles.linkContainer}`}
      >
        <p className={resetPasswordStyles.text}>Вспомнили пароль?</p>
        <Link to={Paths.loginPage} className={resetPasswordStyles.link}>
          Войти
        </Link>
      </span>
    </main>
  );
}

export default ResetPassword;
