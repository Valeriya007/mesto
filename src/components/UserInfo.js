export default class UserInfo {
  constructor(configProfile) {
    this._profileName = document.querySelector(configProfile.profileNameSelector);
    this._profileInfo = document.querySelector(configProfile.profileInfoSelector);
  }

  getUserInfo() {
    return {username: this._profileName.textContent, info: this._profileInfo.textContent};
  }

  setUserInfo(dataUser) {
    this._profileName.textContent = dataUser.username;
    this._profileInfo.textContent = dataUser.info;
  }
}
