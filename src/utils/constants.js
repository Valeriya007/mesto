const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/*переменная с обьектом для валидации*/
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible'
};

/*данные для обращения к серверу*/
const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '26ba2dd5-e912-464a-9732-c2958e2e76e2',
    'Content-Type': 'application/json'
  }
};

/*кнопки для открытия форм*/
const popupButtonOpenProfile = document.querySelector(".profile__edit-btn");
const popupButtonOpenCard = document.querySelector(".profile__add-btn");
const clickAvatar = document.querySelector(".profile__avatar");

/*константы селекторов для создания экземпляров*/
const selectorTemplate = '.card-template';
const popupProfileSelector = ".popup_content_profile";
const popupCardSelector = '.popup_content_card';
const popupImageSelector = ".popup_content_image";
const photoGridSelector = '.photo-grid';
const popupAvatarSelector = '.popup_content_avatar';
const popupDeleteSelector = '.popup_content_delete';

/*данные для UserInfo*/
const configProfile = {
  profileNameSelector: '.profile__title',
  profileInfoSelector: '.profile__info',
  profileAvatar: '.profile__image'
};

export {
  initialCards,
  config,
  apiConfig,
  popupButtonOpenProfile,
  popupButtonOpenCard,
  clickAvatar,
  selectorTemplate,
  popupProfileSelector,
  popupCardSelector,
  popupImageSelector,
  photoGridSelector,
  popupAvatarSelector,
  popupDeleteSelector,
  configProfile
};
