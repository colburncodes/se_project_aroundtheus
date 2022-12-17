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
  updateUserProfile = async ({ name, about }) => {
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
}

export default Api;
