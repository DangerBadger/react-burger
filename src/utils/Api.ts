/* eslint-disable no-param-reassign */
import { getCookie, setCookie } from './cookie';
import { apiSettings } from './constants';

type THeaders = {
  readonly Accept: string;
  readonly 'Content-Type': string;
};

interface IApi<T> {
  readonly _baseUrl: string;
  readonly _headers: T;
}

class Api implements IApi<THeaders> {
  readonly _baseUrl: string;
  readonly _headers: THeaders;

  constructor({
    url,
    headers,
  }: {
    url: string;
    headers: { Accept: string; 'Content-Type': string };
  }) {
    this._baseUrl = url;
    this._headers = headers;
  }

  // static _checkResponse(res: Response) {
  //   return res.ok
  //     ? res.json()
  //     : res.json().then((err) => console.log(Promise.reject(err)));
  // }

  static _checkResponse(res: Response) {
    return res.ok ? res.json() : res.json().then((err) => err);
  }

  _request(endpoint: string, options: RequestInit) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then((res) =>
      Api._checkResponse(res)
    );
  }

  async _requestWithRefresh(endpoint: string, options: RequestInit) {
    try {
      const res = await fetch(`${this._baseUrl}${endpoint}`, options);
      if (res.status === 403) {
        throw new Error('jwt expired');
      }
      return await Api._checkResponse(res);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        if (err.message === 'jwt expired') {
          const refreshedData = await this.refreshToken(
            getCookie('refreshToken')
          );
          const { accessToken } = refreshedData;
          const { refreshToken } = refreshedData;

          setCookie('accessToken', accessToken.split('Bearer ')[1], {});
          setCookie('refreshToken', refreshToken, {});
          const headers = new Headers(options.headers);
          headers.append('Authorization', accessToken);
          options.headers = headers;
          const res = await fetch(`${this._baseUrl}${endpoint}`, options);
          return await Api._checkResponse(res);
        }
      }
      return Promise.reject(err);
    }
  }

  getIngredients() {
    return this._request('/ingredients', {
      method: 'GET',
      headers: this._headers,
    });
  }

  sendOrder(ingredientsId: Array<string>) {
    return this._request('/orders', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ ingredients: ingredientsId }),
    });
  }

  registration(email: string, password: string, name: string) {
    return this._request('/auth/register', {
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

  login(email: string, password: string) {
    return this._request('/auth/login', {
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

  logout(token: string) {
    return this._request('/auth/logout', {
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

  refreshToken(token: string | undefined) {
    return this._request('/auth/token', {
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

  getUserData(token: string) {
    return this._requestWithRefresh('/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    });
  }

  changeUserData(name: string, email: string, password: string, token: string) {
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

  sendEmail(email: string) {
    return this._request('/password-reset', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
      }),
    });
  }

  resetPassword(password: string, token: string) {
    return this._request('/password-reset/reset', {
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
