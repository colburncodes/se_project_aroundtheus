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

closeModal = () => {
  profileEditModal.classList.remove("modal__open");
};

/** Get Profile Form */
getProfileForm = () => {
  profileTitleElement.value = ""; 
  profileDescriptionElement.value = "";
};

/** Open Profile Modal */
profileEditButton.addEventListener("click", () => {
  getProfileForm();
  openModal(profileEditModal);
});

/** Close Profile Modal */
profileModalCloseButton.addEventListener("click", closeModal);

/** Save User Function */
submitProfileForm = (evt) => {
  evt.preventDefault();
  const titleValue = evt.target.title.value;
  const descriptionValue = evt.target.description.value;

  profileTitleInput.textContent = titleValue;
  profileDescriptionInput.textContent = descriptionValue;
  closeModal();
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
initialCards.forEach(async (card) => {
  const result = await getCardElement(card);
  cardsList.prepend(result);
});
