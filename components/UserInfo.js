import {
  profileDescription,
  profileDescriptionInput,
  profileTitle,
  profileTitleInput,
} from "../utils/constants.js";

class UserInfo {
  constructor(name, description) {
    this._name = name;
    this._description = description;
  }

  getUserInfo() {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
  }

  setUserInfo(data) {
    const profile = {
      title: data.title,
      description: data.description,
    };

    profileTitle.textContent = profile.title;
    profileDescription.textContent = profile.description;
  }
}

export default UserInfo;
