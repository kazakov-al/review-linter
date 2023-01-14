import DOMAIN from './constants';

class Api {
  constructor(domain) {
    this._domain = domain;
  }

  upload(file) {
    return fetch(`https://${this._domain}/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/zip'
      },
      body: file
    })
      .then(res => this._handleError(res))
  }

  _handleError(res) {
    return res.ok ? res.json(): Promise.reject(res.status)
  }
}

const api = new Api(DOMAIN);

export default api;
