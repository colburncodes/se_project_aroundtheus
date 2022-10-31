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

/** Modal Wrappers */
const cardsList = document.querySelector(".cards__list");
const editProfileModal = document.querySelector(".modal__edit");
const profileModalForm = document.querySelector(".modal__form-edit");
const createCardModal = document.querySelector(".modal__create");
const createModalForm = document.querySelector(".modal__form-create");
const imageModal = document.querySelector("#image-modal");

/** BUTTON and DOM NODES */
const openProfileEditButton = document.querySelector(".profile__edit-button");
const openCreateProfileButton = document.querySelector(".profile__add-button");
const closeModalButtons = document.querySelectorAll(".modal__close");
const closeImageModal = imageModal.querySelector(".modal__close");

/** Profile DOM Nodes */
const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

/** Form data and elements */
const profileTitleInput = editProfileModal.querySelector(
  ".modal__input-profile-name"
);
const profileDescriptionInput = editProfileModal.querySelector(
  ".modal__input-profile-description"
);
const createCardTitleValue = createCardModal.querySelector(
  ".modal__input-card-title"
);
const createCardImageUrlValue = createCardModal.querySelector(
  ".modal__input-card-url"
);
const cardImageElement = imageModal.querySelector(".modal__image");
const cardImageCaptionElement = imageModal.querySelector(".modal__caption");

/** HELPER FUNCTIONS */
openModal = (modal) => {
  modal.classList.add("modal__open");
};

closeModal = (modal) => {
  modal.classList.remove("modal__open");
};

/** Reset Edit Form Input Fields */
resetEditForm = () => {
  var title = (profileTitleInput.value = "");
  console.log(title);
  var description = (profileDescriptionInput.value = "");
  console.log(description);
};

resetCreateForm = () => {
  createCardTitleValue.value = "";
  createCardImageUrlValue.value = "";
};

/** Get Profile Form */
fillProfileForm = () => {
  profileTitleInput.value = profileTitleElement.textContent;
  profileDescriptionInput.value = profileDescriptionElement.textContent;
};

/** Open Profile | Create Modal */
openProfileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(editProfileModal);
});

openCreateProfileButton.addEventListener("click", () => {
  openModal(createCardModal);
});

/** Close Profile | Create Modal */
closeModalButtons.forEach((modalCloseButton) => {
  modalCloseButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    const modal = modalCloseButton.closest(".modal");
    closeModal(modal);
  });
});

/** Save Profile Function */
submitProfileForm = (evt) => {
  evt.preventDefault();
  profileTitleElement.textContent = profileTitleInput.value;
  profileDescriptionElement.textContent = profileDescriptionInput.value;
  resetEditForm();
  closeModal(editProfileModal);
};

profileModalForm.addEventListener("submit", submitProfileForm);

/** Save Card Function */
addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  var name = createCardTitleValue.value;
  var url = createCardImageUrlValue.value;

  const card = {
    link: url,
    name: name,
  };

  if (card.link != "" && card.name != "") {
    const cardResult = renderCards(card);
    cardsList.prepend(cardResult);
    closeModal(createCardModal);
    resetCreateForm();
  }
};

createModalForm.addEventListener("click", addFormSubmitHandler);

const handleLikeIcon = (evt) => {
  evt.preventDefault();
  let toggle = evt.target.classList.toggle(".card__like-button");
  console.log(toggle);
};

const handleDeleteCard = (evt) => {
  evt.preventDefault();
  evt.target.closest(".card").remove();
};

const handlePreviewImage = (data) => {
  cardImageElement.src = data.link;
  cardImageElement.alt = `${data.name}`;

  cardImageCaptionElement.textContent = `${data.name}`;
  openModal(imageModal);
};

/** Render Cards Function */
const renderCards = (data) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardDescription = card.querySelector(".card__label-text");
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardDescription.textContent = data.name;

  likeButton.addEventListener("click", handleLikeIcon);
  deleteButton.addEventListener("click", handleDeleteCard);
  cardImage.addEventListener("click", () => handlePreviewImage(data));

  return card;
};

/** Looping Card Array */
initialCards.forEach((card) => {
  const result = renderCards(card);
  cardsList.prepend(result);
});
