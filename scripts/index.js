/*ОБЩИЙ ПОПАП*/

const popupElement = document.querySelector(".popup");
function popupOpen(popupElement) {
  popupElement.classList.add("popup_opened");
};
function popupClose(popupElement) {
  popupElement.classList.remove("popup_opened");
};

 /*ОКНО РЕДАКТИРОВАНИЯ ПРОФИЛЯ*/

const profilePopup = document.querySelector(".popup_type_profile");
const popupButtonOpenProfile = document.querySelector(".profile__edit-btn");
const popupButtonCloseProfile = profilePopup.querySelector(".popup__btn-close_profile");

const popupFormProfile = profilePopup.querySelector(".popup__form_profile");
const nameInputProfile = profilePopup.querySelector(".popup__text_type_name");
const infoInputProfile = profilePopup.querySelector(".popup__text_type_info");

const profileName = document.querySelector(".profile__title");
const profileInfo = document.querySelector(".profile__info");

const popupOpenProfile = function() {
  popupOpen(profilePopup);
  nameInputProfile.value = profileName.textContent;
  infoInputProfile.value = profileInfo.textContent;
};
popupButtonOpenProfile.addEventListener('click', popupOpenProfile);

const popupCloseProfile = function() {
  popupClose(profilePopup);
}
popupButtonCloseProfile.addEventListener('click', popupCloseProfile);

function handleFormProfileSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInputProfile.value;
  profileInfo.textContent = infoInputProfile.value;
  popupCloseProfile();
};
popupFormProfile.addEventListener('submit', handleFormProfileSubmit);

/*  ДОБАВЛЯЕМ КАРТОЧКИ ИЗ МАССИВА*/
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

const cardTemplate = document.querySelector(".card-template");
const photoGrid = document.querySelector(".photo-grid");

const imagePopup = document.querySelector(".popup_type_image");
const popupButtonCloseImage = imagePopup.querySelector(".popup__btn-close_image");

const popupImage = imagePopup.querySelector(".popup__image");
const popupImageCaption = imagePopup.querySelector(".popup__image-caption");


function createCardElement (cardData) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardName = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  /*ПРОСМОТР КАРТИНКИ*/
  const popupOpenImage = function() {
  popupOpen(imagePopup);
  popupImageCaption.textContent = cardData.name;
  popupImage.src = cardData.link;
  };
  cardImage.addEventListener('click', popupOpenImage);

  const popupCloseImage = function() {
  popupClose(imagePopup);
  };
  popupButtonCloseImage.addEventListener('click', popupCloseImage);

  /*КНОПКА ЛАЙКА*/
  const likeButton = cardElement.querySelector(".card__like-btn");
  const handleLike = () => {
    likeButton.classList.toggle("card__like-btn_active");
  };
  likeButton.addEventListener("click", handleLike);

  /*КНОПКА УДАЛЕНИЯ КАРТОЧКИ*/
  const deleteButton = cardElement.querySelector(".card__delete-btn");
  const handleDelete = () => {
    cardElement.remove();
  };
  deleteButton.addEventListener("click", handleDelete);

  return cardElement;
};

function renderCardElement (cardElement) {
  photoGrid.prepend(cardElement);
};

initialCards.forEach((card) => {
  renderCardElement(createCardElement(card));
});

/*ОКНО ДОБАВЛЕНИЯ КАРТОЧКИ*/
const cardPopup = document.querySelector(".popup_type_card");
const popupButtonOpenCard = document.querySelector(".profile__add-btn");
const popupButtonCloseCard = cardPopup.querySelector(".popup__btn-close_card");

const popupOpenCard = function() {
  popupOpen(cardPopup);
};
popupButtonOpenCard.addEventListener('click', popupOpenCard);

const popupCloseCard = function() {
  popupClose(cardPopup);
}
popupButtonCloseCard.addEventListener('click', popupCloseCard);

const popupFormCard = cardPopup.querySelector(".popup__form_card");
const nameInputCard = cardPopup.querySelector(".popup__text_type_name-card");
const infoInputCard = cardPopup.querySelector(".popup__text_type_info-card");

function handleFormCardSubmit (evt) {
  evt.preventDefault();

  const name = nameInputCard.value;
  const link = infoInputCard.value;
  const cardData = {
    name,
    link,
  };

  renderCardElement(createCardElement(cardData));

  popupCloseCard();
};
popupFormCard.addEventListener('submit', handleFormCardSubmit);





