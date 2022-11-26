class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  _handleLikeIcon() {
    this._element.querySelector(".card__like-button");
  }

  _handleDeleteCard() {
    this._element.querySelector(".card").remove();
  }

  _handlePreviewImage() {}

  _setEventListeners() {
    console.warn("Yabba Dabba Dooooo!");
  }

  _generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._image})`;
    this._element.querySelector(".card__label-text").textContent = this._title;

    return this._element;
  }
}

export default Card;
