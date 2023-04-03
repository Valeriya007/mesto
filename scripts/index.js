const popupElement = document.querySelector(".popup");
const popupButtonOpen = document.querySelector(".profile__edit-btn");
const popupButtonClose = popupElement.querySelector(".popup__btn-close");

const formElement = popupElement.querySelector(".popup__form");
const nameInput = popupElement.querySelector(".popup__text_type_name");
const jobInput = popupElement.querySelector(".popup__text_type_job");
const popupSubmit = popupElement.querySelector(".popup__btn-close");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__job");


const popupOpen = function () {
  popupElement.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
popupButtonOpen.addEventListener('click', popupOpen);

const popupClose = function () {
  popupElement.classList.remove("popup_opened");
}
popupButtonClose.addEventListener('click', popupClose);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose ();
}
formElement.addEventListener('submit', handleFormSubmit);








