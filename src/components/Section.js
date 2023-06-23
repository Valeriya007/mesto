export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialCard = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  rendererItems() {
    this._initialCard.forEach((item) => {
      this._renderer(item)
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
