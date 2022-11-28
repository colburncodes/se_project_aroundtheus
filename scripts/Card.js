// refactor later in its own module
const ESC_KEY_VALUE = "Escape";

const isEscapeEvent = (evt, action) => {
  if (evt.key === ESC_KEY_VALUE) {
    const activeModal = document.querySelector(".modal__open");
    action(activeModal);
  }
};

const handleEscapePopup = (evt) => {
  evt.preventDefault();
  isEscapeEvent(evt, closeModal);
};

const imageModal = document.querySelector("#image-modal");

const openModal = (modal) => {
  modal.classList.add("modal__open");
  document.addEventListener("keyup", handleEscapePopup);
};

const closeModal = (modal) => {
  modal.classList.remove("modal__open");
  document.removeEventListener("keyup", handleEscapePopup);
};

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
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
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handlePreviewImage() {
    console.log(this._image);
    const cardImage = this._element.querySelector(".modal__preview-image");
    const cardDescription = this._element.querySelector(".modal__caption");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardDescription.textContent = this._name;

    openModal(imageModal);
  }

  _setEventListeners() {
    console.log(this);
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewImage());
  }

  _generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__label-text").textContent = this._name;

    return this._element;
  }
}

export default Card;
