/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/Api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUserInfo } from '../../utils/types';
import { isError } from '../../utils/utils';

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
  const response = await api.registration(
    registrationData.emailValue,
    registrationData.passwordValue,
    registrationData.nameValue
  );

  if (!response.success) {
    return rejectWithValue(response.message);
  }

  const accessToken = response.accessToken.split('Bearer ')[1];
  const { refreshToken } = response;

  setCookie('accessToken', accessToken, {});
  setCookie('refreshToken', refreshToken, {});

  return response;
});

export const login = createAsyncThunk<
  TUserData,
  TLoginData,
  { rejectValue: string }
>('user/login', async (loginData, { rejectWithValue }) => {
  const response = await api.login(
    loginData.emailValue,
    loginData.passwordValue
  );

  if (!response.success) {
    return rejectWithValue(response.message);
  }
  const accessToken = response.accessToken.split('Bearer ')[1];
  const { refreshToken } = response;

  setCookie('accessToken', accessToken, {});
  setCookie('refreshToken', refreshToken, {});

  return response;
});

export const logout = createAsyncThunk<
  unknown,
  string,
  { rejectValue: string }
>('user/logout', async (token: string, { rejectWithValue }) => {
  const response = await api.logout(token);

  if (!response.success) {
    return rejectWithValue(response.message);
  }

  deleteCookie('accessToken');
  deleteCookie('refreshToken');
});

export const getUserData = createAsyncThunk<
  TUserInfo,
  string,
  { rejectValue: string }
>('user/getUserData', async (token, { rejectWithValue }) => {
  const response = await api.getUserData(token);

  if (!response.success) {
    return rejectWithValue(response.message);
  }

  return response.user;
});

export const changeUserData = createAsyncThunk<
  TUserInfo,
  TChangedData,
  { rejectValue: string }
>('user/changeUserData', async (changedData, { rejectWithValue }) => {
  const response = await api.changeUserData(
    changedData.nameValue,
    changedData.emailValue,
    changedData.passwordValue,
    changedData.accessToken
  );

  if (!response.success) {
    return rejectWithValue(response.message);
  }

  return response.user;
});

export const sendEmail = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>('user/sendEmail', async (email, { rejectWithValue }) => {
  const response = await api.sendEmail(email);

  if (!response.success) {
    return rejectWithValue(response.message);
  }

  return response.success;
});

export const resetPassword = createAsyncThunk<
  boolean,
  TResetData,
  { rejectValue: string }
>('user/resetPassword', async (resetData, { rejectWithValue }) => {
  const response = await api.resetPassword(
    resetData.passwordValue,
    resetData.codeValue
  );

  if (!response.success) {
    return rejectWithValue(response.message);
  }

  return response.success;
});

const initialState: TUserState = {
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
      .addCase(login.pending, (state) => {
        state.loginRequest = true;
        state.error = null;
        state.loginFailed = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginRequest = false;
        state.userInfo = action.payload.user;
      })
      .addCase(logout.pending, (state) => {
        state.logoutRequest = true;
        state.error = null;
        state.logoutFailed = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loginRequest = false;
        state.userInfo = null;
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
      .addCase(changeUserData.pending, (state) => {
        state.changeUserDataRequest = true;
        state.error = null;
        state.changeUserDataFailed = false;
      })
      .addCase(changeUserData.fulfilled, (state, action) => {
        state.changeUserDataRequest = false;
        state.userInfo = action.payload;
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
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordRequest = true;
        state.error = null;
        state.resetPasswordFailed = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordRequest = false;
        state.resetPasswordConfirmed = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.registrationRequest = false;
        state.loginRequest = false;
        state.logoutRequest = false;
        state.getUserDataRequest = false;
        state.changeUserDataRequest = false;
        state.forgotPasswordRequest = false;
        state.resetPasswordRequest = false;
        console.error(action.payload);
      });
  },
});

export const userReducer = userSlice.reducer;
