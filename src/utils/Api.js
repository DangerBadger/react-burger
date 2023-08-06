/* eslint-disable prefer-promise-reject-errors */
import { apiSettings } from './constants';

class Api {
  constructor({ url, headers }) {
    this._baseUrl = url;
    this._headers = headers;
  }

  getIngredients() {
    return fetch(this._baseUrl, { method: 'GET', headers: this._headers }).then(
      (res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
    );
  }
}

const api = new Api(apiSettings);

export default api;
