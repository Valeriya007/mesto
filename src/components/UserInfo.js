export default class UserInfo {
  constructor(configProfile) {
    this._profileName = document.querySelector(configProfile.profileNameSelector);
    this._profileInfo = document.querySelector(configProfile.profileInfoSelector);
    this._profileAvatar = document.querySelector(configProfile.profileAvatar);
  }

  getUserInfo() {
    return {username: this._profileName.textContent, info: this._profileInfo.textContent};
  }

  setUserInfo({ username, info, avatar }) {
    this._profileName.textContent = username;
    this._profileInfo.textContent = info;
    this._profileAvatar.src = avatar;
  }
}
