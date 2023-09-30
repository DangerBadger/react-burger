/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-curly-brace-presence */
import {
  useRef,
  useState,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
  RefObject,
  FormEvent,
} from 'react';
import { NavLink } from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useRedux';
import { Paths } from '../../utils/constants';
import { TUserInfo } from '../../utils/types';

import { logout, changeUserData } from '../../services/reducers/user';
import { getCookie } from '../../utils/cookie';

import profileStyles from './profile.module.css';

const Profile: FC = () => {
  const [nameValue, setNameValue] = useState<string>('Default user');
  const [emailValue, setEmailValue] = useState<string>('default@mail.space');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [nameReadOnly, setNameReadOnly] = useState<boolean>(true);
  const [loginReadOnly, setLoginReadOnly] = useState<boolean>(true);
  const [isDataChanged, setIsDataChanged] = useState<boolean>(false);

  const userInfo: TUserInfo | null = useAppSelector(
    (store) => store.userData.userInfo
  );

  const nameInputRef = useRef<HTMLInputElement>(null);
  const loginInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    nameInputRef.current?.focus();
  }, [nameReadOnly]);

  useEffect(() => {
    loginInputRef.current?.focus();
  }, [loginReadOnly]);

  useEffect(() => {
    if (userInfo) {
      setNameValue(userInfo.name);
      setEmailValue(userInfo.email);
      setPasswordValue('');
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      setNameValue(userInfo.name);
      setEmailValue(userInfo.email);
      setPasswordValue('');
    }
  }, [userInfo]);

  const linkActivator = ({ isActive }: { isActive: boolean }): string =>
    isActive ? profileStyles.navLinkActive : profileStyles.navLink;

  const onIconClickHandler = (
    ref: RefObject<HTMLInputElement>,
    stateSetter: Dispatch<SetStateAction<boolean>>
  ) => {
    ref.current?.focus();
    stateSetter(false);
  };

  const onBlurHandler = (stateSetter: Dispatch<SetStateAction<boolean>>) => {
    stateSetter(true);
  };

  const logoutHandler = () => {
    const refreshToken: string | undefined = getCookie('refreshToken');
    if (refreshToken) dispatch(logout(refreshToken));
  };

  const changeHandler =
    (stateSetter: Dispatch<SetStateAction<string>>, propertyName: string) =>
    (evt: FormEvent<HTMLInputElement> & { target: HTMLInputElement }) => {
      const { value } = evt.target;

      stateSetter(value);

      if (propertyName === passwordValue) {
        value === passwordValue
          ? setIsDataChanged(false)
          : setIsDataChanged(true);
      } else if (userInfo !== null) {
        value === userInfo[propertyName as keyof TUserInfo]
          ? setIsDataChanged(false)
          : setIsDataChanged(true);
      }
    };

  const cancelHandler = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (userInfo !== null) {
      setNameValue(userInfo.name);
      setEmailValue(userInfo.email);
    }
    setPasswordValue('');
    setIsDataChanged(false);
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const accessToken: string = `Bearer ${getCookie('accessToken')}`;

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
};

export default Profile;
