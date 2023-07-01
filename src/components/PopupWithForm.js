import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitCallback) {
    super(selectorPopup);
    this._submitCallback = submitCallback;
    this._formSubmit = this._popup.querySelector('.popup__form');
    this._inputList = this._formSubmit.querySelectorAll('.popup__input');
    this._submitButton = this._formSubmit.querySelector('.popup__btn-save');
    this._defaultTextButton = this._submitButton.textContent;
  }

  _getInputsValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    })

    return this._inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    })
  }

  getDefaultText() {
    this._submitButton.textContent = this._defaultTextButton;
  }

  setEventlisteners() {
    super.setEventlisteners();
    this._formSubmit.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `${this._submitButton.textContent}...`
      this._submitCallback(this._getInputsValues());
    })
  }

  close() {
    super.close();
    this._formSubmit.reset();
  }
}
