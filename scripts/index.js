import initialCards from './utilities.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popups = document.querySelectorAll('.popup');

const popupButtonOpenProfile = document.querySelector(".profile__edit-btn");
const popupButtonOpenCard = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__title");
const profileInfo = document.querySelector(".profile__info");

const profilePopup = document.querySelector(".popup_content_profile");
const popupFormProfile = profilePopup.querySelector(".popup__form_profile");
const nameInputProfile = profilePopup.querySelector(".popup__input_type_username");
const infoInputProfile = profilePopup.querySelector(".popup__input_type_info");
const popupButtonCloseProfile = profilePopup.querySelector(".popup__btn-close_profile");

const imagePopup = document.querySelector(".popup_content_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupImageCaption = imagePopup.querySelector(".popup__image-caption");
const popupButtonCloseImage = imagePopup.querySelector(".popup__btn-close_image");

const cardPopup = document.querySelector(".popup_content_card");
const popupFormCard = cardPopup.querySelector(".popup__form_card");
const titleInputCard = cardPopup.querySelector(".popup__input_type_title");
const urlInputCard = cardPopup.querySelector(".popup__input_type_url");
const popupButtonCloseCard = cardPopup.querySelector(".popup__btn-close_card");

const photoGrid = document.querySelector(".photo-grid");

/*переменная с обьектом для валидации*/
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible'
};

/*функция открытия попапа*/
function popupOpen(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', popupClickByEscape);
};

/*функция закрытия попапа*/
function popupClose(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', popupClickByEscape);
};

/*функция закрытия попапа при нажатии Escape*/
function popupClickByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    popupClose(openedPopup);
  }
};

/*функция закрытия попапа при нажатии оверлай*/
function popupClickByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    popupClose(evt.currentTarget);
  }
};
popups.forEach((popup) => {
  popup.addEventListener('click', popupClickByOverlay);
});

//работа с карточками

/*функция открытия окна просмотра фото*/
function popupOpenImage(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupImageCaption.textContent = data.name;
  popupOpen(imagePopup);
};

 /* функция закрытия окна просмотра фото*/
function popupCloseImage() {
  popupClose(imagePopup);
};
popupButtonCloseImage.addEventListener('click', popupCloseImage);


/*заполняем каточками контейнер*/
initialCards.forEach((item) => {
  const card = new Card(item, 'card-template', popupOpenImage);
  photoGrid.append(card.generateCard());
});


//работа с валидацией

/*запускаем валидацию для окна редактирования профиля*/
const popupFormProfileValidation = new FormValidator(config,popupFormProfile);
popupFormProfileValidation.enableValidation();

/*функция открытия окна редактирования профиля*/
function popupOpenProfile() {
  popupFormProfile.reset();
  popupFormProfileValidation.resetValidationForm();

  nameInputProfile.value = profileName.textContent;
  infoInputProfile.value = profileInfo.textContent;

  popupOpen(profilePopup);
};
popupButtonOpenProfile.addEventListener('click', popupOpenProfile);


/*функция закрытия окна редактирования профиля*/
function popupCloseProfile() {
  popupClose(profilePopup);
};
popupButtonCloseProfile.addEventListener('click', popupCloseProfile);

/*обработка submit для формы редактирования профиля*/
function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInputProfile.value;
  profileInfo.textContent = infoInputProfile.value;

  popupCloseProfile();
};
popupFormProfile.addEventListener('submit', handleFormProfileSubmit);

/*запускаем валидацию для окна добавления карточки*/
const popupFormCardVaidation = new FormValidator(config,popupFormCard);
popupFormCardVaidation.enableValidation();

/*окно добавления карточки*/
function popupOpenCard() {
  popupFormCard.reset();
  popupFormCardVaidation.resetValidationForm();
  popupOpen(cardPopup);
};
popupButtonOpenCard.addEventListener('click', popupOpenCard);

function popupCloseCard() {
  popupClose(cardPopup);
};
popupButtonCloseCard.addEventListener('click', popupCloseCard);

/*обработка submit для формы добавления новой карточки*/
function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const name = titleInputCard.value;
  const link = urlInputCard.value;
  const data = {
    name,
    link,
  };

  const card = new Card(data, 'card-template', popupOpenImage);
  photoGrid.prepend(card.generateCard());

  popupCloseCard();
};

popupFormCard.addEventListener('submit', handleFormCardSubmit);
