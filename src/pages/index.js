import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Api from '../components/Api.js';
import {
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
} from '../utils/constants.js';


/*Api*/

const api = new Api(apiConfig);


/*получение ответа с сервера*/

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach(element => element.myId = dataUser._id);
    userInfo.setUserInfo({ username: dataUser.name, info: dataUser.about, avatar: dataUser.avatar });
    cardsSection.rendererItems(dataCard);
  })
  .catch((error => console.error(`Ошибка ${error}`)))


/*создание карточки*/

const createCard = (element) => {
  const card = new Card(element, selectorTemplate,
   popupImage.open, deletePopup.open,
   (likeElement, cardId) => {
    if (likeElement.classList.contains('card__like-btn_active')) {
      api.deleteLike(cardId)
      .then(res => {
        card.toggleLike(res.likes);
      })
      .catch((error) => console.error(`Ошибка снятия лайка ${error}`))
    } else {
      api.putLike(cardId)
      .then(res => {
        card.toggleLike(res.likes);
      })
      .catch((error) => console.error(`Ошибка добавления лайка ${error}`))
      }
    });

  return card.generateCard();
};


/*создание секции*/

const cardsSection = new Section({
  renderer: (element) => {
    cardsSection.addItemAppend(createCard(element))
  }
}, photoGridSelector);


/*создание Popup добавления карточек*/

const popupAddCard = new PopupWithForm(popupCardSelector, (data) => {
  Promise.all([api.getUserInfo(), api.addNewCard(data)])
  .then(([dataUser, dataCard]) => {
    dataCard.myId = dataUser._id;
    cardsSection.addItemPrepend(createCard(dataCard));
    popupAddCard.close();
  })
  .catch((error => console.error(`Ошибка создания новой карточки ${error}`)))
  .finally(() => popupAddCard.getDefaultText())
});

/*создание Popup для формы аватара*/

const popupAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  api.setNewAvatar(data)
  .then(res => {
    userInfo.setUserInfo({ username: res.name, info: res.about, avatar: res.avatar })
    popupAvatar.close()
  })
  .catch((error => console.error(`Ошибка обновления аватара ${error}`)))
  .finally(() => popupAvatar.getDefaultText())
});


/*создание Popup для формы редактирования профиля*/

const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  api.setUserInfo(data)
  .then(res => {
    userInfo.setUserInfo({ username: res.name, info: res.about, avatar: res.avatar })
    popupProfile.close()
  })
  .catch((error => console.error(`Ошибка редактирования профиля ${error}`)))
  .finally(() => popupProfile.getDefaultText())
});


/*создание Popup для формы удаления карточки*/

const deletePopup = new PopupDeleteCard(popupDeleteSelector, ({ card, cardId }) => {
  api.deleteCard(cardId)
  .then(() => {
    card.removeCard();
    deletePopup.close()
  })
  .catch((error) => console.error(`Ошибка удаления карточки ${error}`))
  .finally(() => deletePopup.getDefaultText())
});


/*получение формы профиля*/

const userInfo = new UserInfo(configProfile);


/*создание popup изображения*/

const popupImage = new PopupWithImage(popupImageSelector);


/*создание экземпляров класса FormValidator для обеих форм*/

const forms = {};

Array.from(document.querySelectorAll(config.formSelector)).forEach(item => {
  const form = new FormValidator(config, item)
  const name = item.getAttribute('name');
  forms[name] = form;
  form.enableValidation();
});


/*функция открытия popup редактирования профиля*/

function popupOpenProfile() {
  forms['formProfile'].resetValidationForm();

  popupProfile.setInputValues(userInfo.getUserInfo());

  popupProfile.open();
};
popupButtonOpenProfile.addEventListener('click', popupOpenProfile);


/*функция открытия popup добавления карточки*/

function popupOpenCard() {
  forms['formCard'].resetValidationForm();

  popupAddCard.open();
};
popupButtonOpenCard.addEventListener('click', popupOpenCard);


/*функция открытия popup аватара*/

function openAvatar() {
  forms['formAvatar'].resetValidationForm();

  popupAvatar.open();
};
clickAvatar.addEventListener('click', openAvatar);


/*слушатели событий*/

popupImage.setEventlisteners();
popupAddCard.setEventlisteners();
popupProfile.setEventlisteners();
popupAvatar.setEventlisteners();
deletePopup.setEventlisteners();





