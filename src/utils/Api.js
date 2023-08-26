/* eslint-disable prefer-promise-reject-errors */
import { apiSettings } from './constants';

class Api {
  constructor({ url, headers }) {
    this._baseUrl = url;
    this._headers = headers;
  }

  static checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  static checkSuccess(res) {
    return res && res.success
      ? res
      : Promise.reject(`Ответ на success: ${res}`);
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options)
      .then(Api.checkResponse)
      .then(Api.checkSuccess);
  }

  getIngredients() {
    return this._request('/ingredients', {
      method: 'GET',
      headers: this._headers,
    });
  }

  sendOrder(ingredientsId) {
    return this._request('/orders', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ ingredients: ingredientsId }),
    });
  }
}

const api = new Api(apiSettings);

export default api;
