class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionSelector = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      role: this._descriptionSelector.textContent,
    };
  }

  setUserInfo({ name, role }) {
    this._nameElement.textContent = name;
    this._descriptionSelector.textContent = role;
  }
}

export default UserInfo;
