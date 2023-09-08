/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/Api';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const registration = createAsyncThunk(
  'user/registration',
  async (registrationData, { rejectWithValue }) => {
    try {
      const response = await api.registration(
        registrationData.emailValue,
        registrationData.passwordValue,
        registrationData.nameValue
      );

      if (!response.success) {
        throw new Error('Ошибка запроса');
      }

      const accessToken = response.accessToken.split('Bearer ')[1];
      const { refreshToken } = response;

      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);
      return response;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.login(
        loginData.emailValue,
        loginData.passwordValue
      );

      if (!response.success) {
        throw new Error('Ошибка запроса');
      }
      const accessToken = response.accessToken.split('Bearer ')[1];
      const { refreshToken } = response;

      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);
      return response;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export const refreshingToken = createAsyncThunk(
  'user/refreshToken',
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.refreshToken(token);

      if (!response.success) {
        throw new Error('Ошибка запроса');
      }

      const accessToken = response.accessToken.split('Bearer ')[1];
      const { refreshToken } = response;

      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);
      return response;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.logout(token);

      if (!response.success) {
        throw new Error('Ошибка запроса');
      }

      deleteCookie('accessToken');
      deleteCookie('refreshToken');
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export const getUserData = createAsyncThunk(
  'user/getUserData',
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.getUserData(token);

      if (!response.success) {
        throw new Error('Ошибка запроса');
      }

      return response.user;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export const sendEmail = createAsyncThunk(
  'user/sendEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.sendEmail(email);

      if (!response.success) {
        throw new Error('Ошибка запроса');
      }

      return response.success;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (resetData, { rejectWithValue }) => {
    try {
      const response = await api.resetPassword(
        resetData.passwordValue,
        resetData.codeValue
      );

      if (!response.success) {
        throw new Error('Ошибка запроса');
      }

      return response.success;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

const userState = {
  forgotPasswordEmailConfirmed: false,
  forgotPasswordRequest: false,
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
  // accessToken: '',
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.registrationRequest = true;
        state.registrationFailed = false;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.registrationRequest = false;
        state.userInfo = action.payload.user;
        // state.accessToken = action.payload.accessToken.split('Bearer ')[1];
      })
      .addCase(registration.rejected, (state, action) => {
        state.registrationRequest = false;
        state.registrationFailed = true;
        console.error(action.payload);
      })
      .addCase(login.pending, (state) => {
        state.loginRequest = true;
        state.loginFailed = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginRequest = false;
        state.userInfo = action.payload.user;
        // state.accessToken = action.payload.accessToken.split('Bearer ')[1];
      })
      .addCase(login.rejected, (state, action) => {
        state.loginRequest = false;
        state.loginFailed = true;
        console.error(action.payload);
      })
      .addCase(refreshingToken.pending, (state) => {
        state.refreshTokenRequest = true;
        state.registrationFailed = false;
      })
      .addCase(refreshingToken.fulfilled, (state, action) => {
        state.refreshTokenRequest = false;
        // state.accessToken = action.payload.accessToken.split('Bearer ')[1];
      })
      .addCase(refreshingToken.rejected, (state, action) => {
        state.refreshTokenRequest = false;
        state.registrationFailed = true;
        console.error(action.payload);
      })
      .addCase(logout.pending, (state) => {
        state.logoutRequest = true;
        state.logoutFailed = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loginRequest = false;
        // state.accessToken = '';
        state.userInfo = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutRequest = false;
        state.logoutFailed = true;
        console.error(action.payload);
      })
      .addCase(getUserData.pending, (state) => {
        state.getUserDataRequest = true;
        state.getUserDataFailed = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.getUserDataRequest = false;
        state.userInfo = action.payload;
      })
      .addCase(getUserData, (state, action) => {
        state.getUserDataRequest = false;
        state.getUserDataFailed = true;
        console.error(action.payload);
      })
      .addCase(sendEmail.pending, (state) => {
        state.forgotPasswordRequest = true;
        state.forgotPasswordFailed = false;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.forgotPasswordRequest = false;
        state.forgotPasswordEmailConfirmed = action.payload;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.forgotPasswordRequest = false;
        state.forgotPasswordFailed = true;
        console.error(action.payload);
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordRequest = true;
        state.resetPasswordFailed = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordRequest = false;
        state.resetPasswordConfirmed = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordRequest = false;
        state.resetPasswordFailed = true;
        console.error(action.payload);
      });
  },
});

export const userReducer = userSlice.reducer;
