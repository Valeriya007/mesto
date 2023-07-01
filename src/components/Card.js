export default class Card {
  constructor(dataCard, selectorTemplate, handleCardClick, handleDelete, handleLike) {
    this._selectorTemplate = selectorTemplate;
    this._name = dataCard.name;
    this._link = dataCard.link;

    this._myId = dataCard.myId;
    this._ownerId = dataCard.owner._id;
    this._cardId = dataCard._id;

    this._likes = dataCard.likes;
    this._likesLength = dataCard.likes.length;

    this._handleLike = handleLike;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
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
    this._likesCounter = this._element.querySelector(".card__like-counter");
    this._delete = this._element.querySelector(".card__delete-btn");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._renderLikes();
    this._keepDeleteButton();
    this._setEventListeners();

    return this._element;
  }

  /*функция отображения иконки удаления*/

  _keepDeleteButton() {
    this._myId === this._ownerId ? this._delete.style.display = 'block' : this._delete.style.display = 'none'
  }

  /*функция удаления карточки*/

  _handleDeleteCard = () => {
    this._handleDelete({ card: this, cardId: this._cardId });
  }

  /*функция просмотра фото*/

  _handleOpenImageCard = () => {
    this._handleCardClick({title: this._name, link: this._link});
  }

  /*кликаем по лайку*/

  _handleLikeCard = () => {
    this._handleLike(this._like, this._cardId);
  }

  /*изменение состояния кнопки лайка*/

  toggleLike(likes) {
    this._like.classList.toggle("card__like-btn_active");
    this._likesCounter.textContent = likes.length;
  }

  /*отображение колличества лайков*/

  _renderLikes() {
    this._likes.forEach(element => {
      if (element._id === this._myId) {
        this._like.classList.add('card__like-btn_active');
        return
      }
    })
    this._likesCounter.textContent = this._likesLength;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }


  /*слушатели событий*/
  _setEventListeners() {
    this._like.addEventListener('click', this._handleLikeCard);
    this._delete.addEventListener('click', this._handleDeleteCard);
    this._image.addEventListener('click', this._handleOpenImageCard);
  }
};
