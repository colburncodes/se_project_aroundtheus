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
  avatarIcon,
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
const avatarModal = document.querySelector("#avatar-modal");

const imagePopup = new PopupWithImage("#image-modal");

const confirmationPopup = new PopupWithConfirmation(selectors.deleteModal);

const userInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription,
  selectors.profileImage
);

const editFormValidator = new FormValidator(editUserModal, defaultFormConfig);
const createFormValidator = new FormValidator(addCardModal, defaultFormConfig);
const avatarFormValidator = new FormValidator(avatarModal, defaultFormConfig);

addCardButton.addEventListener("click", () => {
  addFormModal.openModal();
});

const addFormModal = new PopupWithForm({
  popupSelector: selectors.addModal,
  handleFormSubmit: (data) => {
    addFormModal.renderLoading(true);
    api
      .addCard(data)
      .then((data) => {
        data;
        addFormModal.closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
    createModalForm.reset();
  },
});

avatarIcon.addEventListener("click", () => {
  avatarFormModal.openModal();
});

const avatarFormModal = new PopupWithForm({
  popupSelector: selectors.avatarModal,
  handleFormSubmit: (avatar) => {
    avatarFormModal.renderLoading(true);

    api
      .setUserAvatar(avatar)
      .then((avatar) => {
        avatar;
        avatarFormModal.closeModal();
      })
      .catch((err) => console.log(err));
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
    editFormModal.renderLoading(true);
    api
      .editUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
        });
        editFormModal.closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
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
      avatar: user.avatar,
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
                confirmationPopup.openModal();
                confirmationPopup.setSubmitAction(() => {
                  confirmationPopup.renderLoading(true);
                  api
                    .deleteCardById(cardId)
                    .then(() => {
                      card.handleDeleteCard();
                      console.log(`Card was deleted successfully ${cardId}`);
                      confirmationPopup.closeModal();
                    })
                    .catch((err) => console.error(err));
                });
              },
              handleUserLikes: () => {
                const cardId = card.getCardById();
                const likes = card.getUserLikesCount();
                api.changeCardLikeStatus(cardId, likes).then(() => {
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

addFormModal.setEventListeners();
avatarFormModal.setEventListeners();
confirmationPopup.setEventListeners();
editFormModal.setEventListeners();
imagePopup.setEventListeners();

avatarFormValidator.enableValidation();
createFormValidator.enableValidation();
editFormValidator.enableValidation();

