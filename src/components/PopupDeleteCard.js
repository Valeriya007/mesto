import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(selectorPopup, submitCallback) {
    super(selectorPopup);
    this._submitCallback = submitCallback;
    this._formSubmit = this._popup.querySelector('.popup__form');
    this._submitButton = this._formSubmit.querySelector('.popup__btn-save');
    this._defaultTextButton = this._submitButton.textContent;
  }


  setEventlisteners() {
    super.setEventlisteners();
    this._formSubmit.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `${this._submitButton.textContent}...`
      this._submitCallback({ card: this._element, cardId: this._cardId });
    })
  }

  getDefaultText() {
    this._submitButton.textContent = this._defaultTextButton;
  }

  open = ({card, cardId}) => {
    super.open();
    this._element = card;
    this._cardId =  cardId;
  }
}
