const profilePopup = document.querySelector(".popup_content_profile");
const profileName = document.querySelector(".profile__title");
const profileInfo = document.querySelector(".profile__info");
const cardTemplate = document.querySelector(".card-template");
const photoGrid = document.querySelector(".photo-grid");
const imagePopup = document.querySelector(".popup_content_image");
const cardPopup = document.querySelector(".popup_content_card");
const popupButtonOpenProfile = document.querySelector(".profile__edit-btn");
const popupButtonOpenCard = document.querySelector(".profile__add-btn");
const popupButtonCloseProfile = profilePopup.querySelector(".popup__btn-close_profile");
const popupFormProfile = profilePopup.querySelector(".popup__form_profile");
const nameInputProfile = profilePopup.querySelector(".popup__input_type_name");
const infoInputProfile = profilePopup.querySelector(".popup__input_type_info");
const popupButtonCloseImage = imagePopup.querySelector(".popup__btn-close_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupImageCaption = imagePopup.querySelector(".popup__image-caption");
const popupButtonCloseCard = cardPopup.querySelector(".popup__btn-close_card");
const popupFormCard = cardPopup.querySelector(".popup__form_card");
const titleInputCard = cardPopup.querySelector(".popup__input_type_title");
const emailInputCard = cardPopup.querySelector(".popup__input_type_email");
/*общий попап*/
function popupOpen(popup) {
  popup.classList.add("popup_opened");
};
function popupClose(popup) {
  popup.classList.remove("popup_opened");
};
/*окно редактирования профиля*/
function popupOpenProfile() {
  popupOpen(profilePopup);
  nameInputProfile.value = profileName.textContent;
  infoInputProfile.value = profileInfo.textContent;
};
popupButtonOpenProfile.addEventListener('click', popupOpenProfile);
function popupCloseProfile() {
  popupClose(profilePopup);
};
popupButtonCloseProfile.addEventListener('click', popupCloseProfile);
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInputProfile.value;
  profileInfo.textContent = infoInputProfile.value;
  popupCloseProfile();
};
popupFormProfile.addEventListener('submit', handleFormProfileSubmit);
/*добавляем карточки из массива*/
function createCardElement(cardData) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardName = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  /*окно просмотра фото*/
  function popupOpenImage() {
    popupOpen(imagePopup);
    popupImageCaption.textContent = cardData.name;
    popupImage.src = cardData.link;
  };
  cardImage.addEventListener('click', popupOpenImage);
  /*кнопка лайка*/
  const likeButton = cardElement.querySelector(".card__like-btn");
  const handleLike = () => {
    likeButton.classList.toggle("card__like-btn_active");
  };
  likeButton.addEventListener('click', handleLike);
  /*кнопка удаления карточки*/
  const deleteButton = cardElement.querySelector(".card__delete-btn");
  const handleDelete = () => {
    cardElement.remove();
  };
  deleteButton.addEventListener('click', handleDelete);
  return cardElement;
};
function popupCloseImage() {
  popupClose(imagePopup);
};
popupButtonCloseImage.addEventListener('click', popupCloseImage);
function renderCardElement(cardElement) {
  photoGrid.prepend(cardElement);
};
initialCards.reverse().forEach((card) => {
  renderCardElement(createCardElement(card));
});
/*окно добавления карточки*/
function popupOpenCard() {
  popupOpen(cardPopup);
};
popupButtonOpenCard.addEventListener('click', popupOpenCard);
function popupCloseCard() {
  popupClose(cardPopup);
};
popupButtonCloseCard.addEventListener('click', popupCloseCard);
function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const name = titleInputCard.value;
  const link = emailInputCard.value;
  const cardData = {
    name,
    link,
  };
  renderCardElement(createCardElement(cardData));
  popupCloseCard();
};
popupFormCard.addEventListener('submit', handleFormCardSubmit);
/*______________________________________________________________________________________________________*/
/*валидация формы карточки*/

function setInputValidState(input, errorElement) {
  input.classList.remove('popup__input_invalid');
  errorElement.textContent = '';
};
function setInputInvalidState(input, errorElement) {
  input.classList.add('popup__input_invalid');
  errorElement.textContent = input.validationMessage;
};
function checkInputValidity(input) {
  const errorElement = document.querySelector(`#error-${input.id}`);
  if (input.checkValidity()) {
    setInputValidState(input, errorElement);
  } else {
    setInputInvalidState(input, errorElement);
  }
};
function disableButton(button) {
  button.setAttribute('disabled', '');
  button.classList.add('popup__btn-save_disabled');
};
function enableButton(button) {
  button.removeAttribute('disabled');
  button.classList.remove('popup__btn-save_disabled');
};
function toggleButtonValidity(forms) {
  const submitButton = forms.querySelector('.popup__btn-save');
  if (forms.checkValidity()) {
    enableButton(submitButton);
  } else {
    disableButton(submitButton);
  }
};
function enableValidation() {
  const forms = document.querySelectorAll('.popup__form');
  const formsArray = Array.from(forms);
  formsArray.forEach(function (forms) {
    forms.addEventListener('submit', function(evt) {
      evt.preventDefault();
      toggleButtonValidity(forms);
    });
    toggleButtonValidity(forms);
    const inputs = forms.querySelectorAll('.popup__input');
    const inputsArray = Array.from(inputs);
    inputsArray.forEach(function (input) {
      input.addEventListener('input', () => {
      checkInputValidity(input);
      toggleButtonValidity(forms);
      });
    });
  });

};
enableValidation();
