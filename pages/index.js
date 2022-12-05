import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
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
  cardTitleValue,
  cardImageValue,
  editProfileModal,
  modalSelector,
  openProfileEditButton,
} from "../utils/constants.js";

const modalPopup = new Popup(modalSelector);
modalPopup.setEventListeners();

var userInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription
);

const createCardPopup = new Popup(createCardModal);
createCardPopup.setEventListeners();
openCreateCardButton.addEventListener("click", () => {
  createCardPopup.openModal(createCardModal);
});

const profileModalPopup = new Popup(editProfileModal);
profileModalPopup.setEventListeners();
openProfileEditButton.addEventListener("click", () => {
  userInfo.getUserInfo();
  modalPopup.openModal(editProfileModal);
});

const userInfoPopup = new PopupWithForm({
  popupSelector: editProfileModal,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    profileModalPopup.closeModal(editProfileModal);
  },
});
userInfoPopup.setEventListeners();

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

const cardInfoPopup = new PopupWithForm({
  popupSelector: createCardModal,
  handleFormSubmit: () => {
    const title = cardTitleValue.value;
    const url = cardImageValue.value;
    const data = {
      name: title,
      link: url,
    };
    renderCard(data);
    createModalForm.reset();
    createCardPopup.closeModal(createCardModal);
  },
});
cardInfoPopup.setEventListeners();

sectionList.renderItems(initialCards);
// validation activation
editFormValidator.enableValidation();
createFormValidator.enableValidation();
