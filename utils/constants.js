export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

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
