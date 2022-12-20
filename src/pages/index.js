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

const userInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription
);

api
  .getUserInfo()
  .then((user) => {
    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
    });
  })
  .catch((err) => {
    console.error(err);
  });

// api
//   .addUserLikes("639dc6ef60cf901eecd83d2f")
//   .then((like) => console.log(like))
//   .catch((err) => {
//     console.error(err);
//   });

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

api
  .getInitialCards()
  .then((cards) => {
    const sectionListItems = new Section(
      {
        items: cards,
        renderer: () => {
          cards.forEach((data) => {
            const card = new Card(
              {
                data,
                handleImageClick: () => {
                  imagePopup.open(data);
                },
                handleDeleteClick: () => {
                  const cardId = card.getById();
                  api
                    .deleteCardById(cardId)
                    .then(() => {
                      card.handleDeleteCard();
                      console.log(`Card was deleted successfully`);
                    })
                    .catch((err) => console.error(err));
                },
              },
              "#card-template"
            );
            sectionListItems.addItem(card.generateCard());
          });
        },
      },
      selectors.cardsSection
    );
    sectionListItems.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

editFormModal.setEventListeners();
addFormModal.setEventListeners();
imagePopup.setEventListeners();

editFormValidator.enableValidation();
createFormValidator.enableValidation();
