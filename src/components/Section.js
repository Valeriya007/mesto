export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialCard = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addCard() {
    this._initialCard.forEach(item => {
      this.addItem(item)
    })
  }

  addItem(item) {
    this._container.prepend(this._renderer(item));
  }
}
