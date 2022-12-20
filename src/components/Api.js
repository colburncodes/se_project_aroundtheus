class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  // GET: List of cards
  getInitialCards = async () => {
    let response = await fetch(`${this._baseUrl}/cards`, {
      headers: { authorization: this._authToken },
    });
    let data = response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status} ${response.statusText}`);
    return data;
  };

  // POST: Add new card
  addCard = async ({ name, link }) => {
    let response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    });

    let data = response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status} ${response.statusText}`);
    return data;
  };

  // DELETE: Delete card
  deleteCardById = async (id) => {
    let response = await fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    let data = response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status} ${response.statusText}`);
    return data;
  };

  // GET: Gets User Profile
  getUserInfo = async () => {
    let response = await fetch(`${this._baseUrl}/users/me`, {
      headers: { authorization: this._authToken },
    });
    let data = response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status} ${response.statusText}`);
    return data;
  };

  // PATCH: Edit User Profile
  editUserInfo = async ({ name, about }) => {
    let response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    });
    let data = response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status} ${response.statusText}`);
    return data;
  };

  // PUT: Add User likes
  addUserLikes = async (id) => {
    let response = await fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    let data = response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status} ${response.statusText}`);
    return data;
  };
}

export default Api;
