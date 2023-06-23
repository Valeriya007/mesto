import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  initialCards,
  config,
  selectorTemplate,
  popupProfileSelector,
  popupCardSelector,
  popupImageSelector,
  photoGridSelector,
  configProfile
} from '../utils/constants.js';

import '../pages/index.css';

const popupButtonOpenProfile = document.querySelector(".profile__edit-btn");
const popupButtonOpenCard = document.querySelector(".profile__add-btn");


/*создание попапа изображения*/

const popupImage = new PopupWithImage(popupImageSelector);


/*создание карточки*/

const createCard = (element) => {
  const card = new Card(element, selectorTemplate, popupImage.open);
  return card.generateCard()
};

/*создание секции*/

const cardsSection = new Section({
  items: initialCards,
  renderer: (element) => {
    cardsSection.addItem(createCard(element))
  }
}, photoGridSelector);


/*добавление карточек при загрузке страницы*/

cardsSection.rendererItems();


/*создание экземпляра класса PopupWithForm  для формы добавления карточек*/

const popupAddCard = new PopupWithForm(popupCardSelector, (dataCard) => {
  cardsSection.addItem(createCard(dataCard));
  popupAddCard.close();
});


/*получение формы профиля*/

const userInfo = new UserInfo(configProfile);


/*создание экземпляра класса PopupWithForm для формы редактирования профиля*/

const popupProfile = new PopupWithForm(popupProfileSelector, (dataProfile) => {
  userInfo.setUserInfo(dataProfile);
  popupProfile.close();
});


/*создание экземпляров класса FormValidator для обеих форм*/

const forms = {};

Array.from(document.querySelectorAll(config.formSelector)).forEach(item => {
  const form = new FormValidator(config, item)
  const name = item.getAttribute('name');
  forms[name] = form;
  form.enableValidation();
});


/*функция открытия попапа редактирования профиля*/

function popupOpenProfile() {
  forms['formProfile'].resetValidationForm();

  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
};
popupButtonOpenProfile.addEventListener('click', popupOpenProfile);


/*функция открытия попапа добавления карточки*/

function popupOpenCard() {
  forms['formCard'].resetValidationForm();

  popupAddCard.open();
};
popupButtonOpenCard.addEventListener('click', popupOpenCard);


/*слушатели событий*/

popupImage.setEventlisteners();
popupAddCard.setEventlisteners();
popupProfile.setEventlisteners();


