import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import {
  editFormValidator,
  createFormValidator,
} from "../components/FormValidator.js";

import {
  initialCards,
  selectors,
  createCardModal,
  createModalForm,
  openCreateCardButton,
  createCardTitleValue,
  createCardImageUrlValue,
  editProfileModal,
  profileModalForm,
  profileTitleInput,
  profileDescriptionInput,
  openProfileEditButton,
} from "../utils/constants.js";

const modalPopup = new Popup(selectors.modalSelector);
modalPopup.setEventListeners();

var userInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription
);

openCreateCardButton.addEventListener("click", () => {
  modalPopup.openModal(createCardModal);
});

openProfileEditButton.addEventListener("click", () => {
  userInfo.getUserInfo();
  modalPopup.openModal(editProfileModal);
});

const submitProfileForm = (evt) => {
  evt.preventDefault();
  const profile = {
    title: profileTitleInput.value,
    description: profileDescriptionInput.value,
  };
  userInfo.setUserInfo(profile);
  profileModalForm.reset();
  modalPopup.closeModal(editProfileModal);
};

profileModalForm.addEventListener("submit", submitProfileForm);

const createCard = (card) => {
  const newCard = new Card(card, "#card-template");
  return newCard.generateCard();
};

const sectionList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      sectionList.addItem(card);
    },
  },
  selectors.cardsSection
);

const renderCard = (card) => {
  const cardElement = createCard(card);
  sectionList.addItem(cardElement);
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
  modalPopup.closeModal(createCardModal);
};
createModalForm.addEventListener("submit", submitCardForm);

sectionList.renderItems(initialCards);

// validation activation
editFormValidator.enableValidation();
createFormValidator.enableValidation();
