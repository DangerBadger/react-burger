/* eslint-disable prefer-promise-reject-errors */
import { apiSettings } from './constants';

class Api {
  constructor({ url, headers }) {
    this._baseUrl = url;
    this._headers = headers;
  }

  static checkResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(
      Api.checkResponse
    );
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

  // sendIngredients(ingredientsIds) {
  //   const burgerData = {
  //     'ingredients': ingredientsIds
  //   }

  //   return fetch(`${this._baseUrl}/orders`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8'
  //     },
  //     body: JSON.stringify(burgerData)
  //   }).then((res) => this._requestResult(res));
  // }
}

const api = new Api(apiSettings);

export default api;
