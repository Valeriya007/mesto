export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._closeButton = this._popup.querySelector('.popup__btn-close');
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleCloseButton = () => {
    this.close()
  }


  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
     this.close()
    }
  }


  _handleClickByOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close()
    }
  }


  setEventlisteners() {
    this._closeButton.addEventListener('click', this._handleCloseButton);
    this._popup.addEventListener('click', this._handleClickByOverlay);
  }
}
