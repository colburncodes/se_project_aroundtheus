import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

import {
  selectors,
  createModalForm,
  addCardButton,
  editUserButton,
  deleteCardButton,
  profileInputName,
  profileInputDescription,
  defaultFormConfig,
  BASE_URL,
  AUTH_TOKEN,
} from "../utils/constants.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

const api = new Api({
  baseUrl: BASE_URL,
  authToken: AUTH_TOKEN,
});

const editUserModal = document.querySelector("#modal__edit");
const addCardModal = document.querySelector("#modal__create");
const deleteModal = document.querySelector("#delete-modal");
const imagePopup = new PopupWithImage("#image-modal");

const userInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription
);

const editFormValidator = new FormValidator(editUserModal, defaultFormConfig);
const createFormValidator = new FormValidator(addCardModal, defaultFormConfig);

addCardButton.addEventListener("click", () => {
  addFormModal.openModal();
});

const addFormModal = new PopupWithForm({
  popupSelector: selectors.addModal,
  handleFormSubmit: (data) => {
    api
      .addCard(data)
      .then((data) => data)
      .catch((err) => {
        console.error(err);
      });
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
    api
      .editUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          about: data.about,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    editFormModal.closeModal();
  },
});

const confirmationPopup = new PopupWithConfirmation(selectors.deleteModal);

let userId;
api
  .getAppInfo()
  .then(([user, cards]) => {
    userId = user._id;

    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
    });

    const cardsList = new Section(
      {
        items: cards,
        renderer: (data) => {
          const card = new Card(
            {
              data,
              userId,
              handleImageClick: () => {
                imagePopup.open(data);
              },
              handleDeleteClick: () => {
                const cardId = card.getById();
                confirmationPopup.openModal(() => {
                  api
                    .deleteCardById(cardId)
                    .then(() => {
                      card.handleDeleteCard();
                      console.log(`Card was deleted successfully`);
                    })
                    .catch((err) => console.error(err));
                });
              },
              handleUserLiskes: () => {
                const cardId = card.getById();
                console.log(data.likes);
                api.changeCardLikeStatus(cardId, like).then(() => {
                  card.handleLikeIcon();
                });
              },
            },
            "#card-template"
          );
          cardsList.addItem(card.generateCard());
        },
      },
      selectors.cardsSection
    );
    cardsList.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

editFormModal.setEventListeners();
addFormModal.setEventListeners();
imagePopup.setEventListeners();
confirmationPopup.setEventListeners();

editFormValidator.enableValidation();
createFormValidator.enableValidation();