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
const nameInputProfile = profilePopup.querySelector(".popup__text_type_name");
const infoInputProfile = profilePopup.querySelector(".popup__text_type_info");
const popupButtonCloseImage = imagePopup.querySelector(".popup__btn-close_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupImageCaption = imagePopup.querySelector(".popup__image-caption");
const popupButtonCloseCard = cardPopup.querySelector(".popup__btn-close_card");
const popupFormCard = cardPopup.querySelector(".popup__form_card");
const nameInputCard = cardPopup.querySelector(".popup__text_type_name-card");
const infoInputCard = cardPopup.querySelector(".popup__text_type_info-card");
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
