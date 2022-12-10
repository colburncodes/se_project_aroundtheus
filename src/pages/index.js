// stylesheet
import "./index.css";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  editFormValidator,
  createFormValidator,
} from "../components/FormValidator.js";

import {
  initialCards,
  selectors,
  createModalForm,
  addCardButton,
  editUserButton,
  profileInputName,
  profileInputDescription,
} from "../utils/constants.js";

const userInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription
);

const createCard = (card) => {
  const newCard = new Card(card, "#card-template");
  return newCard.generateCard();
};

const renderCard = (card) => {
  const cardElement = createCard(card);
  sectionList.addItem(cardElement);
};

const editFormModal = new PopupWithForm({
  popupSelector: selectors.editModal,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    editFormModal.closeModal();
  },
});

const addFormModal = new PopupWithForm({
  popupSelector: selectors.addModal,
  handleFormSubmit: (data) => {
    // const title = cardTitleValue.value;
    // const url = cardImageValue.value;
    // const data = {
    //   name: title,
    //   link: url,
    // };
    renderCard(data);
    createModalForm.reset();
    addFormModal.closeModal();
  },
});

const sectionList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      renderCard(item);
    },
  },
  selectors.cardsSection
);

addCardButton.addEventListener("click", () => {
  addFormModal.openModal();
});

editUserButton.addEventListener("click", () => {
  const { name, role } = userInfo.getUserInfo();
  profileInputName.value = name;
  profileInputDescription.value = role;
  editFormModal.openModal();
});

sectionList.renderItems(initialCards);
// validation activation
editFormValidator.enableValidation();
createFormValidator.enableValidation();
