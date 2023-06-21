import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
  }

  open = (data) => {
    this._popupImage.src = data.link;
    this._popupImageCaption.textContent = data.name;
    this._popupImage.alt = data.name;
    super.open();
  }
}
