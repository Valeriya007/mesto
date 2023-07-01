export default class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
    this._authorization = config.headers.authorization;
  }

  /*проверка на ошибки*/
  _checkResponse(res) {return res.ok ? res.json() : Promise.reject};


  /*запрос данных о пользователе с сервера*/
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkResponse)
  }


  /*передача данных о пользователе с сервера*/
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.info,
      })
    })
    .then(this._checkResponse)
  }


  /*запрос данных с сервера*/
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkResponse)
  }


  /*добавление новой карточки на сервер*/
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._checkResponse)
  }


  /*передача на сервер данных нового аватара*/
  setNewAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._checkResponse)
  }


  /*удаление карточки с сервера*/
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkResponse)
  }


  /*отправление лайка на сервер*/
  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkResponse)
  }

  /*удаление лайка с сервера*/
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkResponse)
  }
}
