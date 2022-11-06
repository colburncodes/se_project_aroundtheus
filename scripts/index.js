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

/** Card Template */
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");
const closeModalButtons = document.querySelectorAll(".modal__close");

/** Profile Edit Modal */
const editProfileModal = document.querySelector("#modal__edit");
const profileModalForm = document.querySelector(".modal__form-edit");
const openProfileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = editProfileModal.querySelector(
  ".modal__input-profile-name"
);
const profileDescriptionInput = editProfileModal.querySelector(
  ".modal__input-profile-description"
);

/** Create Card Modal */
const createCardModal = document.querySelector("#modal__create");
const createModalForm = document.querySelector(".modal__form-create");
const openCreateCardButton = document.querySelector(".profile__add-button");
const createCardTitleValue = createCardModal.querySelector(
  ".modal__input-card-title"
);
const createCardImageUrlValue = createCardModal.querySelector(
  ".modal__input-card-url"
);

/** Image Modal */
const imageModal = document.querySelector("#image-modal");
const closeImageModal = imageModal.querySelector(".modal__close-preview");

/** Form data and elements */
const cardImageElement = imageModal.querySelector(".modal__preview-image");
const cardImageCaptionElement = imageModal.querySelector(".modal__caption");

/** HELPER FUNCTIONS */
openModal = (modal) => {
  modal.classList.add("modal__open");
};

closeModal = (modal) => {
  modal.classList.remove("modal__open");
};

/** Reset Edit Form Input Fields */
profileModalForm.reset();
createModalForm.reset();

/** Get Profile Form */
fillProfileForm = () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
};

function handleProfileEditButton() {
  fillProfileForm();
  openModal(editProfileModal);
}

function handleCreateCardButton() {
  openModal(createCardModal);
}

/** Open Profile | Create Modal */
openProfileEditButton.addEventListener("click", handleProfileEditButton);
openCreateCardButton.addEventListener("click", handleCreateCardButton);

/** Close Profile | Create Modal */
closeModalButtons.forEach((modalCloseButton) => {
  modalCloseButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    const modal = modalCloseButton.closest(".modal");
    closeModal(modal);
  });
});

closeImageModal.addEventListener("click", () => {
  closeModal(imageModal);
});

/** Save Profile Function */
submitProfileForm = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
};

profileModalForm.addEventListener("submit", submitProfileForm);

/** Save Card Function */
addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const title = createCardTitleValue.value;
  const url = createCardImageUrlValue.value;

  const card = {
    name: title,
    link: url,
  };

  const cardResult = createCard(card);
  cardsList.prepend(cardResult);
  closeModal(createCardModal);
};;

createModalForm.addEventListener("submit", addFormSubmitHandler);

const handleDeleteCard = (evt) => {
  evt.target.closest(".card").remove();
};

const handleLikeIcon = (evt) => {
  evt.target.classList.toggle("card__like-active");
};

const handlePreviewImage = (data) => {
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  cardImageCaptionElement.textContent = data.name;
  openModal(imageModal);
};

/** Render Cards Function */
const createCard = (data) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardDescription = card.querySelector(".card__label-text");
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardDescription.textContent = data.name;

  deleteButton.addEventListener("click", handleDeleteCard);
  likeButton.addEventListener("click", handleLikeIcon);
  cardImage.addEventListener("click", () => handlePreviewImage(data));

  return card;
};

/** Looping Card Array */
initialCards.forEach((card) => {
  const cardElement = createCard(card);
  cardsList.prepend(cardElement);
});
