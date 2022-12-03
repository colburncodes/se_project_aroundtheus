import Card from "../components/Card.js";
import { openModal, closeModal } from "../utils/utils.js";
import {
  editFormValidator,
  createFormValidator,
} from "../components/FormValidator.js";

import {
  initialCards,
  cardsList,
  createCardModal,
  createModalForm,
  openCreateCardButton,
  createCardTitleValue,
  createCardImageUrlValue,
  editProfileModal,
  profileModalForm,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  openProfileEditButton,
} from "../utils/constants.js";
import Section from "../components/Section.js";

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

const sectionList = new Section({
  items: initialCards,
  renderer: (item) => {
    renderCard(item);
  },
  cardsList,
});

sectionList.renderItems();

// validation activation
editFormValidator.enableValidation();
createFormValidator.enableValidation();
