export const initialCards = [
  {
    name: "Venice Beach",
    link: "https://images.unsplash.com/photo-1516754075264-66d52acb23b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dmVuaWNlJTIwYmVhY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Santa Monica",
    link: "https://images.unsplash.com/photo-1601394025790-b95533df1241?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
  },
  {
    name: "Deception Pass",
    link: "https://images.unsplash.com/photo-1643897000114-d17674311088?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGVjZXB0aW9uJTIwcGFzc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
  },
  {
    name: "Grand Canyon National Park",
    link: "https://images.unsplash.com/photo-1456425712190-0dd8c2b00156?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhbmQlMjBjYW55b24lMjBuYXRpb25hbCUyMHBhcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Miami, Florida",
    link: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWlhbWl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
];

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
  imageModal: "#modal-image",
  cardModalForm: ".modal__form-create",
  profileModalForm: ".modal__form-edit",
  modalSelector: ".modal",
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
};

export const createModalForm = document.querySelector(".modal__form-create");
export const addCardButton = document.querySelector(".profile__add-button");

export const editUserButton = document.querySelector(".profile__edit-button");
export const profileInputName = document.querySelector(
  ".modal__input-profile-name"
);
export const profileInputDescription = document.querySelector(
  ".modal__input-profile-description"
);


