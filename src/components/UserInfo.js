class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      role: this._descriptionElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = about;
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}

export default UserInfo;
