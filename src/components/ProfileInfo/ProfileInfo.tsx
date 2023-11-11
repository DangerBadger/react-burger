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
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useRedux';
import { TUserInfo } from '../../utils/types';

import { changeUserData } from '../../services/reducers/user';
import { getCookie } from '../../utils/cookie';

import profileInfoStyles from './ProfileInfo.module.css';

const ProfileInfo: FC = () => {
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
        extraClass={profileInfoStyles.input}
        autoComplete="on"
      />
      <Input
        type={'email'}
        disabled={loginReadOnly}
        onIconClick={() => onIconClickHandler(loginInputRef, setLoginReadOnly)}
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
        extraClass={profileInfoStyles.input}
        autoComplete="on"
      />
      <PasswordInput
        onChange={changeHandler(setPasswordValue, passwordValue)}
        value={passwordValue}
        name={'password'}
        icon="EditIcon"
      />
      <div className={`mt-6 ${profileInfoStyles.buttonContainer}`}>
        <button
          type="button"
          disabled={!isDataChanged}
          className={`mr-5 text text_type_main-default ${profileInfoStyles.button}`}
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
  );
};

export default ProfileInfo;
