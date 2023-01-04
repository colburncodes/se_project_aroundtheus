export const BASE_URL = "https://around.nomoreparties.co/v1/group-12";
export const AUTH_TOKEN = "db0cb0b5-b0ef-4843-a8af-9c3db60e50cb";

// validation activation
export const defaultFormConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSeletor: ".modal__save-button",
  inactiveButtonClass: "modal__button-disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__error_visible",
};

export const selectors = {
  cardsSection: ".cards__list",
  cardTemplate: "#card-template",
  addModal: "#modal__create",
  editModal: "#modal__edit",
  avatarModal: "#avatar-modal",
  imageModal: "#modal-image",
  deleteModal: "#delete-modal",
  cardModalForm: ".modal__form-create",
  profileModalForm: ".modal__form-edit",
  modalSelector: ".modal",
  profileImage: ".profile__image",
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
};

export const createModalForm = document.querySelector(".modal__form-create");
export const addCardButton = document.querySelector(".profile__add-button");
export const avatarIcon = document.querySelector(".profile__avatar-edit");
export const editUserButton = document.querySelector(".profile__edit-button");
export const profileInputName = document.querySelector(
  ".modal__input-profile-name"
);
export const profileInputDescription = document.querySelector(
  ".modal__input-profile-description"
);

export const deleteCardButton = document.querySelector(".card__like-button");
