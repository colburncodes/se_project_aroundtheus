import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

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
const imagePopup = new PopupWithImage("#image-modal");

const userInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription
);

const editFormValidator = new FormValidator(editUserModal, defaultFormConfig);
const createFormValidator = new FormValidator(addCardModal, defaultFormConfig);

const renderCard = (data) => {
  const card = new Card(
    {
      data,
      handleImageClick: () => {
        imagePopup.open(data);
      },
    },
    "#card-template"
  );
  sectionListItems.addItem(card.generateCard());
};

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
    renderer: renderCard,
  },
  selectors.cardsSection
);

editFormModal.setEventListeners();
addFormModal.setEventListeners();
imagePopup.setEventListeners();

sectionListItems.renderItems();
editFormValidator.enableValidation();
createFormValidator.enableValidation();
