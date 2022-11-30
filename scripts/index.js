import { openModal, closeModal } from "./utils.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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

const createCard = (card) => {
  const newCard = new Card(card, "#card-template");
  return newCard.generateCard();
};

const renderCard = (card) => {
  const cardElement = createCard(card);
  cardsList.prepend(cardElement);
};

const submitCardForm = (evt) => {
  evt.preventDefault();
  const title = createCardTitleValue.value;
  const url = createCardImageUrlValue.value;

  const card = {
    name: title,
    link: url,
  };

  renderCard(card);
  createModalForm.reset();
  closeModal(createCardModal);
};

createModalForm.addEventListener("submit", submitCardForm);

initialCards.map((card) => {
  renderCard(card);
});

// validation activation
const defaultFormConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSeletor: ".modal__save-button",
  inactiveButtonClass: "modal__button-disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__error_visible",
};

const editFormModalWindow = document.querySelector("#modal__edit");
const editFormValidator = new FormValidator(
  editFormModalWindow,
  defaultFormConfig
);

const createFormModalWindow = document.querySelector("#modal__create");
const createFormValidator = new FormValidator(
  createFormModalWindow,
  defaultFormConfig
);

editFormValidator.enableValidation();
createFormValidator.enableValidation();
