/* eslint-disable no-undef */
import {
  userReducer,
  registration,
  login,
  logout,
  getUserData,
  changeUserData,
  sendEmail,
  resetPassword,
  initialState
} from "./user";
import { mockUserRegistrationData, mockUser, mockUserState } from '../../utils/mock-data';


describe('user reducer', () => {
  // Синхронные экшены
  it('should RETURN initial state', () => {
    const result = userReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  // Асинхронные thunk'и и их экшены
  global.fetch = jest.fn();

  // Регистрация
  it('should fulfill REGISTER new user', async () => {
    const dispatch = jest.fn();
    const thunk = registration(
      mockUserRegistrationData.email,
      mockUserRegistrationData.password,
      mockUserRegistrationData.name
    );

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve(mockUser),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('user/registration/pending');
    expect(end[0].type).toBe('user/registration/fulfilled');
    expect(end[0].payload).toEqual(mockUser);
  });

  it('should REJECT new user', async () => {
    const dispatch = jest.fn();
    const thunk = registration(mockUser);

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: false,
        }),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('user/registration/pending');
    expect(end[0].type).toBe('user/registration/rejected');
    expect(end[0].payload).toBe('Ошибка запроса на создание пользователя');
  });

  it('should CHANGE status with registration.pending action', () => {
    const result = userReducer(mockUserState, registration.pending());

    expect(result.registrationRequest).toBe(true);
    expect(result.error).toEqual(null);
    expect(result.registrationFailed).toBe(false);
  });

  it('should REGISTER new user with registration.fulfill action', () => {
    const result = userReducer(initialState, registration.fulfilled(mockUser));

    expect(result.registrationRequest).toBe(false);
    expect(result.userInfo).toEqual({ name: mockUser.user.name, email: mockUser.user.email });
  });

  it('should REJECT new user registration with registration.rejected action', () => {
    const action = 'Ошибка запроса на создание пользователя';
    const result = userReducer(initialState, registration.rejected(action));

    expect(result.registrationRequest).toBe(false);
    expect(result.registrationFailed).toBe(true);
    expect(result.error).toBe('Ошибка запроса на создание пользователя');
  });

  // Логин
  it('should fulfill LOGIN user', async () => {
    const dispatch = jest.fn();
    const thunk = login(
      mockUserRegistrationData.email,
      mockUserRegistrationData.password,
    );

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve(mockUser),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('user/login/pending');
    expect(end[0].type).toBe('user/login/fulfilled');
    expect(end[0].payload).toEqual(mockUser);
  });

  it('should REJECT login user', async () => {
    const dispatch = jest.fn();
    const thunk = login(mockUser);

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: false,
        }),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('user/login/pending');
    expect(end[0].type).toBe('user/login/rejected');
    expect(end[0].payload).toBe('Ошибка запроса авторизации пользователя');
  });

  it('should CHANGE status with login.pending action', () => {
    const result = userReducer(mockUserState, login.pending());

    expect(result.loginRequest).toBe(true);
    expect(result.error).toEqual(null);
    expect(result.loginFailed).toBe(false);
  });

  it('should LOGIN user with login.fulfill action', () => {
    const result = userReducer(initialState, login.fulfilled(mockUser));

    expect(result.loginRequest).toBe(false);
    expect(result.userInfo).toEqual({
      email: mockUser.user.email,
      name: mockUser.user.name
    });
  });

  it('should REJECT user login with login.rejected action', () => {
    const action = 'Ошибка запроса авторизации пользователя';
    const result = userReducer(initialState, login.rejected(action));

    expect(result.loginRequest).toBe(false);
    expect(result.loginFailed).toBe(true);
    expect(result.error).toBe('Ошибка запроса авторизации пользователя');
  });

  // Выход
  it('should FULFILL LOGOUT user', async () => {
    const dispatch = jest.fn();
    const thunk = logout(mockUserRegistrationData.refreshToken);

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve(mockUser),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('user/logout/pending');
    expect(end[0].type).toBe('user/logout/fulfilled');
  });

  it('should REJECT logout user', async () => {
    const dispatch = jest.fn();
    const thunk = logout(mockUserRegistrationData.refreshToken);

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: false,
        }),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('user/logout/pending');
    expect(end[0].type).toBe('user/logout/rejected');
    expect(end[0].payload).toBe('Ошибка запроса выхода из профиля');
  });

  it('should CHANGE status with logout.pending action', () => {
    const result = userReducer(mockUserState, logout.pending());

    expect(result.logoutRequest).toBe(true);
    expect(result.error).toEqual(null);
    expect(result.logoutFailed).toBe(false);
  });

  it('should LOGOUT user with logout.fulfill action', () => {
    const result = userReducer(initialState, logout.fulfilled(mockUser.refreshToken));

    expect(result.logoutRequest).toBe(false);
    expect(result.userInfo).toEqual(null);
  });

  it('should REJECT user logout with logout.rejected action', () => {
    const action = 'Ошибка запроса выхода из профиля';
    const result = userReducer(initialState, logout.rejected(action));

    expect(result.logoutRequest).toBe(false);
    expect(result.logoutFailed).toBe(true);
    expect(result.error).toBe(action);
  });

  // Получение данных пользователя
  it('should FULFILL fetch user data', async () => {
    const dispatch = jest.fn();
    const thunk = getUserData(mockUser.accessToken);

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: true,
          user: {
            email: mockUser.user.email,
            name: mockUser.user.name
          }
        }),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('user/getUserData/pending');
    expect(end[0].type).toBe('user/getUserData/fulfilled');
    expect(end[0].payload).toEqual(mockUser.user);
  });

  it('should REJECT fetch user data', async () => {
    const dispatch = jest.fn();
    const thunk = getUserData(mockUser);

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: false,
        }),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('user/getUserData/pending');
    expect(end[0].type).toBe('user/getUserData/rejected');
    expect(end[0].payload).toBe('Ошибка запроса на получение данных пользователя');
  });

  it('should CHANGE status with getUserData.pending action', () => {
    const result = userReducer(mockUserState, getUserData.pending());

    expect(result.getUserDataRequest).toBe(true);
    expect(result.error).toEqual(null);
    expect(result.getUserDataFailed).toBe(false);
  });

  it('should GET user data with getUserData.fulfill action', () => {
    const user = {
      name: mockUserRegistrationData.name,
      email: mockUserRegistrationData.email
    }
    const result = userReducer(initialState, getUserData.fulfilled(user));

    expect(result.getUserDataRequest).toBe(false);
    expect(result.userInfo).toEqual(user);
  });

  it('should REJECT get user data with getUserData.rejected action', () => {
    const action = 'Ошибка запроса на получение данных пользователя';
    const result = userReducer(initialState, getUserData.rejected(action));

    expect(result.getUserDataRequest).toBe(false);
    expect(result.getUserDataFailed).toBe(true);
    expect(result.error).toBe(action);
  });

  // Изменение данных пользователя
  it('should FULFILL change user data', async () => {
    const dispatch = jest.fn();
    const thunk = changeUserData(
      mockUser.user.name,
      mockUser.user.email,
      mockUserRegistrationData.password,
      mockUser.accessToken
    );

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: true, user: {
            email: mockUserRegistrationData.email,
            name: mockUserRegistrationData.name
          }
        }),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('user/changeUserData/pending');
    expect(end[0].type).toBe('user/changeUserData/fulfilled');
    expect(end[0].payload).toEqual({
      email: mockUserRegistrationData.email,
      name: mockUserRegistrationData.name
    });
  });

  it('should REJECT change user data', async () => {
    const dispatch = jest.fn();
    const thunk = changeUserData(
      mockUser.user.name,
      mockUser.user.email,
      mockUserRegistrationData.password,
      mockUser.accessToken
    );

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: false,
        }),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('user/changeUserData/pending');
    expect(end[0].type).toBe('user/changeUserData/rejected');
    expect(end[0].payload).toBe('Ошибка запроса на изменение данных пользователя');
  });

  it('should CHANGE status with changeUserData.pending action', () => {
    const result = userReducer(mockUserState, changeUserData.pending());

    expect(result.changeUserDataRequest).toBe(true);
    expect(result.error).toEqual(null);
    expect(result.changeUserDataFailed).toBe(false);
  });

  it('should CHANGE user data with changeUserData.fulfill action', () => {
    const user = {
      name: mockUserRegistrationData.name,
      email: mockUserRegistrationData.email,
    }
    const result = userReducer(initialState, changeUserData.fulfilled(user));

    expect(result.changeUserDataRequest).toBe(false);
    expect(result.userInfo).toEqual(user);
  });

  it('should REJECT changing user data with changeUserData.rejected action', () => {
    const action = 'Ошибка запроса на изменение данных пользователя';
    const result = userReducer(initialState, changeUserData.rejected(action));

    expect(result.changeUserDataRequest).toBe(false);
    expect(result.changeUserDataFailed).toBe(true);
    expect(result.error).toBe(action);
  });

  // Отправка емэйла с восстановлением пароля
  it('should FULFILL forgot password', async () => {
    const dispatch = jest.fn();
    const thunk = sendEmail(mockUser.user.email);

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: true
        }),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('user/sendEmail/pending');
    expect(end[0].type).toBe('user/sendEmail/fulfilled');
    expect(end[0].payload).toBe(true);
  });

  it('should REJECT forgot password', async () => {
    const dispatch = jest.fn();
    const thunk = sendEmail(mockUser.user.email);

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: false,
        }),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('user/sendEmail/pending');
    expect(end[0].type).toBe('user/sendEmail/rejected');
    expect(end[0].payload).toBe('Ошибка запроса на отправку эмэйла для изменения пароля');
  });

  it('should CHANGE status with sendEmail.pending action', () => {
    const result = userReducer(mockUserState, sendEmail.pending());

    expect(result.forgotPasswordRequest).toBe(true);
    expect(result.forgotPasswordSuccess).toBe(false);
    expect(result.error).toEqual(null);
    expect(result.forgotPasswordFailed).toBe(false);
  });

  it('should SEND an email with sendEmail.fulfill action', () => {
    const action = { success: true }
    const result = userReducer(initialState, sendEmail.fulfilled(action));

    expect(result.forgotPasswordRequest).toBe(false);
    expect(result.forgotPasswordSuccess).toBe(true);
    expect(result.forgotPasswordEmailConfirmed).toEqual(action);
  });

  it('should REJECT sending an email with sendEmail.rejected action', () => {
    const action = 'Ошибка запроса на отправку эмэйла для изменения пароля';
    const result = userReducer(initialState, sendEmail.rejected(action));

    expect(result.forgotPasswordRequest).toBe(false);
    expect(result.forgotPasswordFailed).toBe(true);
    expect(result.error).toBe(action);
  });

  // Измененеие пароля
  it('should FULFILL reset password', async () => {
    const dispatch = jest.fn();
    const thunk = resetPassword(
      mockUserRegistrationData.password,
      'a0064737-716c-4d8d-9795-fb1d666e5229'
    );

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: true
        }),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('user/resetPassword/pending');
    expect(end[0].type).toBe('user/resetPassword/fulfilled');
    expect(end[0].payload).toBe(true);
  });

  it('should REJECT reset password', async () => {
    const dispatch = jest.fn();
    const thunk = resetPassword(
      mockUserRegistrationData.password,
      'a0064737-716c-4d8d-9795-fb1d666e5229'
    );

    fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: false,
        }),
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('user/resetPassword/pending');
    expect(end[0].type).toBe('user/resetPassword/rejected');
    expect(end[0].payload).toBe('Ошибка запроса изменения пароля');
  });

  it('should CHANGE status with resetPassword.pending action', () => {
    const result = userReducer(mockUserState, resetPassword.pending());

    expect(result.resetPasswordRequest).toBe(true);
    expect(result.error).toEqual(null);
    expect(result.resetPasswordFailed).toBe(false);
  });

  it('should RESET password with resetPassword.fulfill action', () => {
    const action = { success: true }
    const result = userReducer(initialState, resetPassword.fulfilled(action));

    expect(result.resetPasswordRequest).toBe(false);
    expect(result.resetPasswordConfirmed).toEqual(action);
  });

  it('should REJECT reseting password with resetPassword.rejected action', () => {
    const action = 'Ошибка запроса изменения пароля';
    const result = userReducer(initialState, resetPassword.rejected(action));

    expect(result.resetPasswordRequest).toBe(false);
    expect(result.resetPasswordFailed).toBe(true);
    expect(result.error).toBe(action);
  });
});