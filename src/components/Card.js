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

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  setLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  isLiked() {
    return this._likes.find((like) => {
      if(like._id == this._userId) {
        return true;
      } else {
        return false;
      }
    });
  }

  _renderLikes() {
    if (this._likes.length > 0) {
      this.imageCountElement.textContent = this._likes.length;
    }

    if (this.isLiked()) {
      this.imageLikeElement.classList.add("card__like-active");
    } else {
      this.imageLikeElement.classList.remove("card__like-active");
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
    this.imageElement = this._element.querySelector(".card__image");
    this.imageElementText = this._element.querySelector(".card__label-text");
    this.imageDeleteElement = this._element.querySelector(
      ".card__delete-button"
    );
    this.imageLikeElement = this._element.querySelector(".card__like-button");
    this.imageCountElement = this._element.querySelector(".card__like-count");

    this.imageElement.src = this._link;
    this.imageElement.alt = this._name;
    this.imageElementText.textContent = this._name;

    this._renderLikes();

    this._userId !== this._ownerId ? this.imageDeleteElement.remove() : "";

    return this._element;
  }
}

export default Card;
