class Card {
  constructor(
    { data, userId, handleImageClick, handleDeleteClick, handleUserLikes },
    cardSelector
  ) {
    this._data = data;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleUserLikes = handleUserLikes;
  }

  getCardId = () => this._id;
  getUserLikesCount() {
    if (this._likes.length > 0) {
      return this._likes.length;
    }
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  handleDeleteCard() {
    this._element.remove();
    // this._element = null;
  }

  handleLikeIcon = () => {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-active");
  };

  setLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  isLiked() {
    // return true if user liked the card, otherwise false
  }

  renderLikes() {
    if (this.isLiked()) {
      // add active class to likes button
      // the element can be refactored
      this._element
        .querySelector(".card__like-button")
        .classList.add("card__like-active");
    } else {
      // remove active class to like button
      this._element
        .querySelector(".card__like-button")
        .classList.remove("card__like-active");
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteClick());

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleUserLikes());

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
    const imageLikes = this._element.querySelector(".card__like-count");

    imageElement.src = this._link;
    imageElement.alt = this._name;
    imageElementText.textContent = this._name;
    imageLikes.textContent = this.getUserLikesCount();

    if (this._userId == this._ownerId) {
      this.handleDeleteCard();
    } else {
      this._element.querySelector(".card__delete-button").remove();
    }
    return this._element;
  }
}

export default Card;
