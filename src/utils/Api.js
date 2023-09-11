/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-promise-reject-errors */
import { getCookie, setCookie } from './cookie';
import { apiSettings } from './constants';

class Api {
  constructor({ url, headers }) {
    this._baseUrl = url;
    this._headers = headers;
  }

  // const checkReponse = (res) => {
  //   return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  // };

  // const fetchWithRefresh = async (url, options) => {
  //   try {
  //     const res = await fetch(url, options); //делаем запрос
  //     return await checkReponse(res);
  //   } catch (err) {
  //     if (err.message === "jwt expired") {
  //       const refreshData = await refreshToken(); //обновляем токен
  //       localStorage.setItem("refreshToken", refreshData.refreshToken);
  //       localStorage.setItem("accessToken", refreshData.accessToken); //(или в cookies)
  //       options.headers.authorization = refreshData.accessToken;
  //       const res = await fetch(url, options); //вызываем перезапрос данных
  //       return await checkReponse(res);
  //     } else {
  //       return Promise.reject(err);
  //     }
  //   }
  // };

  static checkResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  async _requestWithRefresh(endpoint, options) {
    try {
      const res = await fetch(`${this._baseUrl}${endpoint}`, options);
      return await Api.checkResponse(res);
    } catch (err) {
      console.log(err.message);
      if (err.message === 'jwt expired') {
        const refreshedData = await this.refreshToken(
          getCookie('refreshToken')
        );
        const { accessToken } = refreshedData;
        const { refreshToken } = refreshedData;

        setCookie('accessToken', accessToken.split('Bearer ')[1]);
        setCookie('refreshToken', refreshToken);
        options.headers.authorization = accessToken;
        const res = await fetch(`${this._baseUrl}${endpoint}`, options);
        return await Api.checkResponse(res);
      }
      return Promise.reject(err);
    }
  }

  getIngredients() {
    return this._requestWithRefresh('/ingredients', {
      method: 'GET',
      headers: this._headers,
    });
  }

  sendOrder(ingredientsId) {
    return this._requestWithRefresh('/orders', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ ingredients: ingredientsId }),
    });
  }

  registration(email, password, name) {
    return this._requestWithRefresh('/auth/register', {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: this._headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
  }

  login(email, password) {
    return this._requestWithRefresh('/auth/login', {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: this._headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  logout(token) {
    return this._requestWithRefresh('/auth/logout', {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: this._headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        token,
      }),
    });
  }

  refreshToken(token) {
    return this._requestWithRefresh('/auth/token', {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: this._headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        token,
      }),
    });
  }

  getUserData(token) {
    return this._requestWithRefresh('/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    });
  }

  changeUserData(name, email, password, token) {
    return this._requestWithRefresh('/auth/user', {
      method: 'PATCH',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    });
  }

  sendEmail(email) {
    return this._requestWithRefresh('/password-reset', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
      }),
    });
  }

  resetPassword(password, token) {
    return this._requestWithRefresh('/password-reset/reset', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        token,
      }),
    });
  }
}

const api = new Api(apiSettings);

export default api;
