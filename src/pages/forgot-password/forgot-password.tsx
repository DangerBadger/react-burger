/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-return */
/* eslint-disable react/jsx-curly-brace-presence */
import { useRef, useState, useEffect, FC, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useRedux';
import { Paths } from '../../utils/constants';

import { sendEmail } from '../../services/reducers/user';

import forgotPasswordStyles from './forgot-password.module.css';

const ForgotPassword: FC = () => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [isInputChanged, setIsInputChanged] = useState<boolean>(false);
  const forgotPasswordSuccess: boolean = useAppSelector(
    (store) => store.userData.forgotPasswordSuccess
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    emailValue !== '' ? setIsInputChanged(true) : setIsInputChanged(false);
  }, [emailValue]);

  useEffect(() => {
    forgotPasswordSuccess && navigate(Paths.resetPasswordPage);
  }, [forgotPasswordSuccess, navigate]);

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
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
        <Link to={Paths.loginPage} className={forgotPasswordStyles.link}>
          Войти
        </Link>
      </span>
    </main>
  );
};

export default ForgotPassword;
