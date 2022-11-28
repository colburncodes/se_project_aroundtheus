import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const ESC_KEY_VALUE = "Escape";
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

/** Card Template */
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");

/** Profile Edit Modal */
const editProfileModal = document.querySelector("#modal__edit");
const profileModalForm = document.querySelector(".modal__form-edit");
const openProfileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = editProfileModal.querySelector(
  ".modal__input-profile-name"
);
const profileDescriptionInput = editProfileModal.querySelector(
  ".modal__input-profile-description"
);

/** Create Card Modal */
const createCardModal = document.querySelector("#modal__create");
const createModalForm = document.querySelector(".modal__form-create");
const openCreateCardButton = document.querySelector(".profile__add-button");
const createCardTitleValue = createCardModal.querySelector(
  ".modal__input-card-title"
);
const createCardImageUrlValue = createCardModal.querySelector(
  ".modal__input-card-url"
);

/** Image Modal */
const imageModal = document.querySelector("#image-modal");

/** Form data and elements */
const cardImageElement = imageModal.querySelector(".modal__preview-image");
const cardImageCaptionElement = imageModal.querySelector(".modal__caption");

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

const openModal = (modal) => {
  modal.classList.add("modal__open");
  document.addEventListener("keyup", handleEscapePopup);
};

const closeModal = (modal) => {
  modal.classList.remove("modal__open");
  document.removeEventListener("keyup", handleEscapePopup);
};

const fillProfileForm = () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
};

function handleProfileEditButton() {
  fillProfileForm();
  openModal(editProfileModal);
}

function handleCreateCardButton() {
  openModal(createCardModal);
}

openProfileEditButton.addEventListener("click", handleProfileEditButton);
openCreateCardButton.addEventListener("click", handleCreateCardButton);

const popups = document.querySelectorAll(".modal");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal__open")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("modal__close")) {
      closeModal(popup);
    }
  });
});

const submitProfileForm = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileModalForm.reset();
  closeModal(editProfileModal);
};

profileModalForm.addEventListener("submit", submitProfileForm);

const submitCardForm = (evt) => {
  evt.preventDefault();
  const title = createCardTitleValue.value;
  const url = createCardImageUrlValue.value;

  const card = {
    name: title,
    link: url,
  };

  const cardResult = createCard(card);
  cardsList.prepend(cardResult);
  createModalForm.reset();
  closeModal(createCardModal);
};

createModalForm.addEventListener("submit", submitCardForm);

const handleDeleteCard = (evt) => {
  evt.target.closest(".card").remove();
};

const handleLikeIcon = (evt) => {
  evt.target.classList.toggle("card__like-active");
};

const handlePreviewImage = (data) => {
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  cardImageCaptionElement.textContent = data.name;
  openModal(imageModal);
};

const createCard = (data) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardDescription = card.querySelector(".card__label-text");
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardDescription.textContent = data.name;

  deleteButton.addEventListener("click", handleDeleteCard);
  likeButton.addEventListener("click", handleLikeIcon);
  cardImage.addEventListener("click", () => handlePreviewImage(data));
  return card;
};

initialCards.map((card) => {
  const cardElement = createCard(card);
  const newCard = new Card(card, "#card-template")._generateCard();
  // console.log(newCard);
  cardsList.prepend(cardElement);
});

// validation activation
const defaultFormConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSeletor: ".modal__save-button",
  inactiveButtonClass: "modal__button-disabled",
  inputErrorClass: ".modal__input-error",
  errorClass: "modal__error_visible",
};

const editFormModalWindow = document.querySelector(
  defaultFormConfig.formSelector
);
const editFormValidator = new FormValidator(
  editFormModalWindow,
  defaultFormConfig
);

const createFormModalWindow = document.querySelector(
  defaultFormConfig.formSelector
);
const createFormValidator = new FormValidator(
  createFormModalWindow,
  defaultFormConfig
);

editFormValidator.enableValidation();
createFormValidator.enableValidation();
