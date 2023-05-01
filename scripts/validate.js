const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible'
};
function setInputValidState(config, input, errorElement) {
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};
function setInputInvalidState(config, input, errorElement) {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
};
function checkInputValidity(config, input) {
  const errorElement = document.querySelector(`#error-${input.id}`);
  if (input.checkValidity()) {
    setInputValidState(config, input, errorElement);
  } else {
    setInputInvalidState(config, input, errorElement);
  }
};
function disableButton({inactiveButtonClass}, button) {
  button.setAttribute('disabled', '');
  button.classList.add(inactiveButtonClass);
};
function enableButton({inactiveButtonClass}, button) {
  button.removeAttribute('disabled');
  button.classList.remove(inactiveButtonClass);
};
function toggleButtonValidity({submitButtonSelector, ...rest}, forms) {
  const submitButton = forms.querySelector(submitButtonSelector);
  if (forms.checkValidity()) {
    enableButton(rest, submitButton);
  } else {
    disableButton(rest, submitButton);
  }
};
function enableValidation({formSelector, inputSelector, ...rest}) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(function (forms) {
    forms.addEventListener('submit', function(evt) {
      evt.preventDefault();
      toggleButtonValidity(rest, forms);
    });
    toggleButtonValidity(rest, forms);
    const inputs = Array.from(forms.querySelectorAll(inputSelector));
    inputs.forEach(function (input) {
      input.addEventListener('input', () => {
      checkInputValidity(rest, input);
      toggleButtonValidity(rest, forms);
      });
    });
  });
};
enableValidation(config);
