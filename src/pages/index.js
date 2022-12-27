import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

import {
  selectors,
  createModalForm,
  addCardButton,
  editUserButton,
  profileInputName,
  profileInputDescription,
  defaultFormConfig,
  BASE_URL,
  AUTH_TOKEN,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: BASE_URL,
  authToken: AUTH_TOKEN,
});

const editUserModal = document.querySelector("#modal__edit");
const addCardModal = document.querySelector("#modal__create");
const imagePopup = new PopupWithImage("#image-modal");
const confirmationPopup = new PopupWithConfirmation(selectors.deleteModal);

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
                const cardId = card.getCardById();
                confirmationPopup.openModal(() => {
                  api
                    .deleteCardById(cardId)
                    .then(() => {
                      card.handleDeleteCard();
                      confirmationPopup.closeModal();
                      console.log(`Card was deleted successfully ${cardId}`);
                    })
                    .catch((err) => console.error(err));
                });
              },
              handleUserLikes: () => {
                const cardId = card.getCardById();
                const like = card.getUserLikes();
                api.changeCardLikeStatus(cardId, like).then((obj) => {
                  console.log(obj);
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
