/* eslint-disable no-undef */
import {
  registration,
  login,
  logout,
  getUserData,
  changeUserData,
  sendEmail,
  resetPassword
} from "./user";
import { mockUserRegistrationData, mockUser } from '../../utils/mock-data';

describe('user reducer', () => {
  // Асинхронные thunk'и и их экшены
  global.fetch = jest.fn();

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

  it('should FULFILL change user data', async () => {
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

  it('should REJECT change user data', async () => {
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
});