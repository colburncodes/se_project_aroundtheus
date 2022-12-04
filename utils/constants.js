export const ESC_KEY_VALUE = "Escape";
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

export const selectors = {
  createCardModal: "#modal__create",
  cardsSection: ".cards__list",
  cardTemplate: "#card-template",
  profileModalForm: ".modal__form-edit",
  modalSelector: ".modal",
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
};

/** Create Card Modal */
export const cardsList = document.querySelector(".cards__list");
export const createCardModal = document.querySelector("#modal__create");
export const createModalForm = document.querySelector(".modal__form-create");
export const openCreateCardButton = document.querySelector(
  ".profile__add-button"
);
export const createCardTitleValue = createCardModal.querySelector(
  ".modal__input-card-title"
);
export const createCardImageUrlValue = createCardModal.querySelector(
  ".modal__input-card-url"
);
export const cardTemplateSelector = document.getElementById("#card-template");

/** Profile Edit Modal */
export const editProfileModal = document.querySelector("#modal__edit");
export const profileModalForm = document.querySelector(".modal__form-edit");
export const openProfileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = editProfileModal.querySelector(
  ".modal__input-profile-name"
);
export const profileDescriptionInput = editProfileModal.querySelector(
  ".modal__input-profile-description"
);

export const imageModal = document.querySelector("#image-modal");
export const modalSelector = document.querySelector(".modal");
export const modalOpen = document.querySelector(".modal__open");
export const modalClose = document.querySelector(".modal__close");
export const modalFormSelector = document.querySelector(".modal__form");
