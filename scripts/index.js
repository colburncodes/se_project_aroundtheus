const initialCards = [
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

/** BUTTON SELECTORS */
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalCloseButton = document.querySelector(".modal__close-button");
/** MODAL SELECTORS */
const profileEditModal = document.querySelector(".modal");
const profileModalForm = document.querySelector(".modal__form");
/** PROFILE SELECTORS */
const profileTitleInput = document.querySelector(".profile__title");
const profileDescriptionInput = document.querySelector(".profile__description");
const profileTitleElement =
  profileEditModal.querySelector(".modal__input-name");
const profileDescriptionElement = profileEditModal.querySelector(
  ".modal__input-description"
);
/** TEMPLATE SELECTORS */
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");

/** UTILITY FUNCTIONS */
openModal = (modal) => {
  modal.classList.add("modal__open");
};

closeModal = (modal) => {
  modal.classList.remove("modal__open");
};

/** Get Profile Form */
fillProfileForm = () => {
  profileTitleElement.value = profileTitleInput.textContent;
  profileDescriptionElement.value = profileDescriptionInput.textContent;
};

/** Open Profile Modal */
profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(profileEditModal);
});

/** Close Profile Modal */
profileModalCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

/** Reset Form Input Fields */
resetForm = () => {
  profileTitleElement.value = "";
  profileDescriptionElement.value = "";
};

/** Save User Function */
submitProfileForm = (evt) => {
  evt.preventDefault();
  const titleValue = evt.target.title.value;
  const descriptionValue = evt.target.description.value;
  // not sure what you mean by inputs changed.
  // it's remained the same so not sure what to do here.
  profileTitleInput.textContent = titleValue;
  profileDescriptionInput.textContent = descriptionValue;
  resetForm();
  closeModal(profileEditModal);
};

profileModalForm.addEventListener("submit", submitProfileForm);

/** Render Cards Function */
getCardElement = (data) => {
  const cardDetail = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardDetail.querySelector(".card__image");
  const cardDescription = cardDetail.querySelector(".card__label-text");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardDescription.textContent = data.name;

  return cardDetail;
};

/** Looping Card Array */
initialCards.forEach((card) => {
  const result = getCardElement(card);
  cardsList.prepend(result);
});
