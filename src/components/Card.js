class Card {
  constructor(
    { data, userId, handleImageClick, handleDeleteClick, handleUserLikes },
    cardSelector
  ) {
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleUserLikes = handleUserLikes;
  }

  getById() {
    return this._id;
  }

  getOwnerById() {
    return this._ownerId;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  handleLikeIcon = () =>
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-active");

  handleDeleteCard() {
    this._element.remove();
  }

  _setEventListeners() {

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteClick());

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this.handleLikeIcon());

    this._element.querySelector(".card__image").addEventListener("click", () =>
      this._handleImageClick({
        name: this._name,
        src: this._link,
      })
    );
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const imageElement = this._element.querySelector(".card__image");
    const imageElementText = this._element.querySelector(".card__label-text");

    imageElement.src = this._link;
    imageElement.alt = this._name;
    imageElementText.textContent = this._name;

    if (this._userId == this._ownerId) {
      this.handleDeleteCard();
    } else {
      this._element.querySelector(".card__delete-button").remove();
    }
    return this._element;
  }
}

export default Card;
