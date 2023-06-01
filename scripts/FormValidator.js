export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._submitButton = form.querySelector(this._submitButtonSelector);
    this._inputList = form.querySelectorAll(this._inputSelector);
  }

  /*функция добавляет ошибку*/
  _showInputError(errorElement, input) {
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  /*функция убирает ошибку*/
  _hideInputError(errorElement, input) {
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  /*проверка поля на валидность*/
  _checkInputValidity(input) {
    const errorElement = this._form.querySelector(`#error-${input.id}`);
    if (input.validity.valid) {
      this._hideInputError(errorElement, input);
    } else {
      this._showInputError(errorElement, input);
    }
  }

  /*кнопка не активна*/
  _disableButton() {
    this._submitButton.setAttribute('disabled', '');
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  /*кнопка активна*/
  _enableButton() {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove(this._inactiveButtonClass);
  }

  /*проверка валидации*/
  _checkValidity() {
    return Array.from(this._inputList).every(input => input.validity.valid);
  }

  /*изменение состояния кнопки*/
  _toggleButtonValidity() {
    this._checkValidity() ? this._enableButton() : this._disableButton();
  }

  /*вешаем слушатель на инпуты*/
  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonValidity();
      })
    })
  }

  /*функция включения валидации формы*/
  enableValidation() {
    this._setEventListeners();
  }

  /*сброс валидации*/
  resetValidationForm() {
    this._inputList.forEach((input) => {
      const errorElement = this._form.querySelector(`#error-${input.id}`);
      if (! input.validity.valid) {
        this._hideInputError(errorElement, input);
      }
    })
    this._disableButton();
  }
}
