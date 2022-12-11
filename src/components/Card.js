class Card {
  constructor(data, cardSelector) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  _handleLikeIcon = () =>
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-active");

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  // _handlePreviewImage(data) {
  //   const cardImage = imageModal.querySelector(".modal__preview-image");
  //   const cardDescription = imageModal.querySelector(".modal__caption");

  //   cardImage.src = data.link;
  //   cardImage.alt = data.name;
  //   cardDescription.textContent = data.name;

  //   //openModal(imageModal);
  // }

  _setEventListeners() {
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());

    // this._element
    //   .querySelector(".card__image")
    //   .addEventListener("click", () => this._handlePreviewImage(this._data));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const imageElement = this._element.querySelector(".card__image");
    const imageElementText = this._element.querySelector(".card__label-text");

    imageElement.src = this._link;
    imageElement.alt = this._name;
    imageElementText.textContent = this._name;

    return this._element;
  }
}

export default Card;
