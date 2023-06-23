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

const selectorTemplate = '.card-template';
const popupProfileSelector = ".popup_content_profile";
const popupCardSelector = '.popup_content_card';
const popupImageSelector = ".popup_content_image";
const photoGridSelector = '.photo-grid';

const configProfile = {
  profileNameSelector: '.profile__title',
  profileInfoSelector: '.profile__info'
};

export {
  initialCards,
  config,
  selectorTemplate,
  popupProfileSelector,
  popupCardSelector,
  popupImageSelector,
  photoGridSelector,
  configProfile
};
