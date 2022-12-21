class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  _handleResponse(response) {
    return response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status} ${response.statusText}`);
  }

  _handleResponseError(err) {
    console.log(`Error processing request ${err}`);
  }

  // GET: Get App Data (cardsList, userData)
  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  // GET: List of cards
  getInitialCards = async () => {
    return await fetch(`${this._baseUrl}/cards`, {
      headers: { authorization: this._authToken },
    })
      .then(this._handleResponse)
      .catch((err) => this._handleResponseError(err));
  };

  // POST: Add new card
  addCard = async ({ name, link }) => {
    return await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._handleResponse)
      .catch((err) => this._handleResponseError(err));
  };

  // DELETE: Delete card
  deleteCardById = async (id) => {
    return await fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then(this._handleResponse)
      .catch((err) => this._handleResponseError(err));
  };

  // GET: Gets User Profile
  getUserInfo = async () => {
    return await fetch(`${this._baseUrl}/users/me`, {
      headers: { authorization: this._authToken },
    })
      .then(this._handleResponse)
      .catch((err) => this._handleResponseError(err));
  };

  // PATCH: Edit User Profile
  editUserInfo = async ({ name, about }) => {
    return await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then(this._handleResponse)
      .catch((err) => this._handleResponseError(err));
  };

  // PATCH: Edit Profile Picture
  setUserAvatar = async ({ avatar }) => {
    return await fetch(`${this._baseUrl}/users/me/${avatar}`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    })
      .then(this._handleResponse)
      .catch((err) => this._handleResponseError(err));
  };

  // PUT | DELETE: Add | Remove User likes
  changeCardLikeStatus = async (cardId, like) => {
    return await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: like ? "PUT" : "DELETE",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        like,
      }),
    })
      .then(this._handleResponse)
      .catch((err) => this._handleResponseError(err));
  };
}

export default Api;
