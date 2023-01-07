import "./index.css";

import Api from "../utils/Api.js";
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
  HEADERS,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: BASE_URL,
  authToken: AUTH_TOKEN,
  headers: HEADERS,
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

function createCard(data, userId) {
  const card = new Card(
    {
      data: data,
      userId: userId,
      handleImageClick: () => {
        imagePopup.open(data);
      },
      handleDeleteClick: () => {
        const id = card.getCardId();
        confirmationPopup.openModal();
        confirmationPopup.setSubmitAction(() => {
          confirmationPopup.renderLoading(true);
          api
            .deleteCardById(id)
            .then(() => {
              card.handleDeleteCard();
              confirmationPopup.closeModal();
            })
            .catch((err) => console.error(err))
            .finally(() => confirmationPopup.renderLoading(false));
        });
      },
      handleUserLikes: () => {
        api
          .changeCardLikeStatus(card.getCardId(), card.isLiked())
          .then((response) => card.setLikes(response.likes))
          .catch((err) => console.error(err));
      },
    },
    "#card-template"
  );
  return card.generateCard();
}

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
        createCard(data);
        createModalForm.reset();
        addFormModal.closeModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => addFormModal.renderLoading(false));
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
        userInfo.setAvatar(avatar);
        avatarFormModal.closeModal();
      })
      .catch((err) => console.log(err))
      .finally(() => avatarFormModal.renderLoading(false));
  },
});

const fillProfileForm = ({ name, role }) => {
  profileInputName.value = name;
  profileInputDescription.value = role;
};

editUserButton.addEventListener("click", () => {
  const { name, role } = userInfo.getUserInfo();
  fillProfileForm({ name, role });
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
      })
      .finally(() => editFormModal.renderLoading(false));
  },
});

api
  .getAppInfo()
  .then(([user, cards]) => {
    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
    });

    const avatar = user.avatar;
    userInfo.setAvatar(avatar);

    const userId = user._id;
    const cardsList = new Section(
      {
        items: cards,
        renderer: (data) => {
          const card = createCard(data, userId);
          cardsList.addItem(card);
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

