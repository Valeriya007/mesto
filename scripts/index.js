const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector(".popup_content_profile");
const popupButtonOpenProfile = document.querySelector(".profile__edit-btn");
const popupButtonOpenCard = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__title");
const profileInfo = document.querySelector(".profile__info");
const cardTemplate = document.querySelector(".card-template");
const photoGrid = document.querySelector(".photo-grid");
const imagePopup = document.querySelector(".popup_content_image");
const cardPopup = document.querySelector(".popup_content_card");
const popupFormProfile = profilePopup.querySelector(".popup__form_profile");
const nameInputProfile = profilePopup.querySelector(".popup__input_type_username");
const infoInputProfile = profilePopup.querySelector(".popup__input_type_info");
const popupButtonCloseProfile = profilePopup.querySelector(".popup__btn-close_profile");
const popupButtonCloseImage = imagePopup.querySelector(".popup__btn-close_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupImageCaption = imagePopup.querySelector(".popup__image-caption");
const popupButtonCloseCard = cardPopup.querySelector(".popup__btn-close_card");
const popupFormCard = cardPopup.querySelector(".popup__form_card");
const titleInputCard = cardPopup.querySelector(".popup__input_type_title");
const urlInputCard = cardPopup.querySelector(".popup__input_type_url");
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
/*окно редактирования профиля*/
function popupOpenProfile() {
  popupOpen(profilePopup);
  nameInputProfile.value = profileName.textContent;
  infoInputProfile.value = profileInfo.textContent;
  enableValidation(config, popupFormProfile);
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
    popupImage.alt = cardData.name;
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
  popupFormCard.reset();
  toggleButtonValidity(config, popupFormCard);
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
  const link = urlInputCard.value;
  const cardData = {
    name,
    link,
  };

  renderCardElement(createCardElement(cardData));
  popupCloseCard();
};

popupFormCard.addEventListener('submit', handleFormCardSubmit);
