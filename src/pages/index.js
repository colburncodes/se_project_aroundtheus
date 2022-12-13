import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
  selectors,
  createModalForm,
  addCardButton,
  editUserButton,
  profileInputName,
  profileInputDescription,
  defaultFormConfig,
} from "../utils/constants.js";

const editUserModal = document.querySelector("#modal__edit");
const addCardModal = document.querySelector("#modal__create");

const userInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription
);

const createCard = (data) => {
  const cardElement = new Card(
    {
      data,
      handleImageClick: () => {
        // handle image click
      },
    },
    "#card-template"
  );
  return cardElement.generateCard();
};

const renderCard = (card) => {
  const cardElement = createCard(card);
  sectionListItems.addItem(cardElement);
};

const editFormValidator = new FormValidator(editUserModal, defaultFormConfig);
const createFormValidator = new FormValidator(addCardModal, defaultFormConfig);

addCardButton.addEventListener("click", () => {
  addFormModal.openModal();
});

const addFormModal = new PopupWithForm({
  popupSelector: selectors.addModal,
  handleFormSubmit: (data) => {
    renderCard(data);
    createModalForm.reset();
    addFormModal.closeModal();
  },
});

editUserButton.addEventListener("click", () => {
  const { name, role } = userInfo.getUserInfo();
  profileInputName.value = name;
  profileInputDescription.value = role;
  editFormModal.openModal();
});

const editFormModal = new PopupWithForm({
  popupSelector: selectors.editModal,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    editFormModal.closeModal();
  },
});

const sectionListItems = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      renderCard(data);
    },
  },
  selectors.cardsSection
);

editFormModal.setEventListeners();
addFormModal.setEventListeners();
//imagePopup.setEventListeners();

sectionListItems.renderItems();
editFormValidator.enableValidation();
createFormValidator.enableValidation();
