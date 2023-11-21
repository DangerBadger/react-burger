/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/Api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUserInfo } from '../../utils/types';

type TUserData = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: TUserInfo;
};

type TLoginData = {
  emailValue: string;
  passwordValue: string;
};

type TResetData = Omit<TLoginData, 'emailValue'> & {
  codeValue: string;
};

type TRegistrationData = TLoginData & {
  nameValue: string;
};

type TChangedData = TRegistrationData & {
  accessToken: string;
};

type TUserState = {
  forgotPasswordEmailConfirmed: boolean;
  forgotPasswordRequest: boolean;
  forgotPasswordSuccess: boolean;
  forgotPasswordFailed: boolean;
  resetPasswordConfirmed: boolean;
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  registrationRequest: boolean;
  registrationFailed: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  refreshTokenRequest: boolean;
  refreshTokenFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  getUserDataRequest: boolean;
  getUserDataFailed: boolean;
  changeUserDataRequest: boolean;
  changeUserDataFailed: boolean;
  userInfo: TUserInfo | null;
  error: string | null;
};

export const registration = createAsyncThunk<
  TUserData,
  TRegistrationData,
  { rejectValue: string }
>('user/registration', async (registrationData, { rejectWithValue }) => {
  try {
    const response = await api.registration(
      registrationData.emailValue,
      registrationData.passwordValue,
      registrationData.nameValue
    );

    if (!response.success) {
      throw new Error('Ошибка запроса на создание пользователя');
    }

    const accessToken = response.accessToken.split('Bearer ')[1];
    const { refreshToken } = response;

    setCookie('accessToken', accessToken, {});
    setCookie('refreshToken', refreshToken, {});

    return response;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
  }
});

export const login = createAsyncThunk<
  TUserData,
  TLoginData,
  { rejectValue: string }
>('user/login', async (loginData, { rejectWithValue }) => {
  try {
    const response = await api.login(
      loginData.emailValue,
      loginData.passwordValue
    );

    if (!response.success) {
      throw new Error('Ошибка запроса авторизации пользователя');
    }
    const accessToken = response.accessToken.split('Bearer ')[1];
    const { refreshToken } = response;

    setCookie('accessToken', accessToken, {});
    setCookie('refreshToken', refreshToken, {});

    return response;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
  }
});

export const logout = createAsyncThunk<
  unknown,
  string,
  { rejectValue: string }
>('user/logout', async (token: string, { rejectWithValue }) => {
  try {
    const response = await api.logout(token);

    if (!response.success) {
      throw new Error('Ошибка запроса выхода из профиля');
    }

    deleteCookie('accessToken');
    deleteCookie('refreshToken');
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
  }
});

export const getUserData = createAsyncThunk<
  TUserInfo,
  string,
  { rejectValue: string }
>('user/getUserData', async (token, { rejectWithValue }) => {
  try {
    const response = await api.getUserData(token);

    if (!response.success) {
      throw new Error('Ошибка запроса на получение данных пользователя');
    }

    return response.user;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
  }
});

export const changeUserData = createAsyncThunk<
  TUserInfo,
  TChangedData,
  { rejectValue: string }
>('user/changeUserData', async (changedData, { rejectWithValue }) => {
  try {
    const response = await api.changeUserData(
      changedData.nameValue,
      changedData.emailValue,
      changedData.passwordValue,
      changedData.accessToken
    );

    if (!response.success) {
      throw new Error('Ошибка запроса на изменение данных пользователя');
    }

    return response.user;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
  }
});

export const sendEmail = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>('user/sendEmail', async (email, { rejectWithValue }) => {
  try {
    const response = await api.sendEmail(email);

    if (!response.success) {
      throw new Error('Ошибка запроса на отправку эмэйла для изменения пароля');
    }

    return response.success;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
  }
});

export const resetPassword = createAsyncThunk<
  boolean,
  TResetData,
  { rejectValue: string }
>('user/resetPassword', async (resetData, { rejectWithValue }) => {
  try {
    const response = await api.resetPassword(
      resetData.passwordValue,
      resetData.codeValue
    );

    if (!response.success) {
      throw new Error('Ошибка запроса изменения пароля');
    }

    return response.success;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
  }
});

export const initialState: TUserState = {
  forgotPasswordEmailConfirmed: false,
  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailed: false,
  resetPasswordConfirmed: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  registrationRequest: false,
  registrationFailed: false,
  loginRequest: false,
  loginFailed: false,
  refreshTokenRequest: false,
  refreshTokenFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  getUserDataRequest: false,
  getUserDataFailed: false,
  changeUserDataRequest: false,
  changeUserDataFailed: false,
  userInfo: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.registrationRequest = true;
        state.error = null;
        state.registrationFailed = false;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.registrationRequest = false;
        state.userInfo = action.payload.user;
      })
      .addCase(registration.rejected, (state, action) => {
        if (typeof action.error.message !== 'undefined') {
          state.error = action.error.message;
        }
        state.registrationRequest = false;
        state.registrationFailed = true;
        console.log(action.error.message);
      })
      .addCase(login.pending, (state) => {
        state.loginRequest = true;
        state.error = null;
        state.loginFailed = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginRequest = false;
        state.userInfo = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        if (typeof action.error.message !== 'undefined') {
          state.error = action.error.message;
        }
        state.loginRequest = false;
        state.loginFailed = true;
        console.log(action.error.message);
      })
      .addCase(logout.pending, (state) => {
        state.logoutRequest = true;
        state.error = null;
        state.logoutFailed = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutRequest = false;
        state.userInfo = null;
      })
      .addCase(logout.rejected, (state, action) => {
        if (typeof action.error.message !== 'undefined') {
          state.error = action.error.message;
        }
        state.logoutRequest = false;
        state.logoutFailed = true;
        console.log(action.error.message);
      })
      .addCase(getUserData.pending, (state) => {
        state.getUserDataRequest = true;
        state.error = null;
        state.getUserDataFailed = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.getUserDataRequest = false;
        state.userInfo = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        if (typeof action.error.message !== 'undefined') {
          state.error = action.error.message;
        }
        state.getUserDataRequest = false;
        state.getUserDataFailed = true;
        console.log(action.error.message);
      })
      .addCase(changeUserData.pending, (state) => {
        state.changeUserDataRequest = true;
        state.error = null;
        state.changeUserDataFailed = false;
      })
      .addCase(changeUserData.fulfilled, (state, action) => {
        state.changeUserDataRequest = false;
        state.userInfo = action.payload;
      })
      .addCase(changeUserData.rejected, (state, action) => {
        if (typeof action.error.message !== 'undefined') {
          state.error = action.error.message;
        }
        state.changeUserDataRequest = false;
        state.changeUserDataFailed = true;
        console.log(action.error.message);
      })
      .addCase(sendEmail.pending, (state) => {
        state.forgotPasswordRequest = true;
        state.forgotPasswordSuccess = false;
        state.error = null;
        state.forgotPasswordFailed = false;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.forgotPasswordRequest = false;
        state.forgotPasswordSuccess = true;
        state.forgotPasswordEmailConfirmed = action.payload;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        if (typeof action.error.message !== 'undefined') {
          state.error = action.error.message;
        }
        state.forgotPasswordRequest = false;
        state.forgotPasswordFailed = true;
        console.log(action.error.message);
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordRequest = true;
        state.error = null;
        state.resetPasswordFailed = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordRequest = false;
        state.resetPasswordConfirmed = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        if (typeof action.error.message !== 'undefined') {
          state.error = action.error.message;
        }
        state.resetPasswordRequest = false;
        state.resetPasswordFailed = true;
        console.log(action.error.message);
      });
  },
});

export const userReducer = userSlice.reducer;
