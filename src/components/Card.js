export default class Card {
  constructor(data, selectorTemplate, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;
  }

  /*создаем шаблон карточки*/
  _getTempate() {
    const cardElement = document
    .querySelector(this._selectorTemplate)
    .content.querySelector(".card")
    .cloneNode(true);

    return cardElement;
  }

  /*генерируем карточку*/
  generateCard() {
    this._element = this._getTempate();
    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");
    this._like = this._element.querySelector(".card__like-btn");
    this._delete = this._element.querySelector(".card__delete-btn");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  /*функция лайка*/
  _handleLikeCard = () => {
    this._like.classList.toggle("card__like-btn_active");
  }

  /*функция удаления карточки*/
  _handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  /*функция просмотра фото*/
  _handleOpenImageCard = () => {
    this._handleCardClick(this._data);
  }

  /*слушатели событий*/
  _setEventListeners() {
    this._like.addEventListener('click', this._handleLikeCard);
    this._delete.addEventListener('click', this._handleDeleteCard);
    this._image.addEventListener('click', this._handleOpenImageCard);
  }
};
