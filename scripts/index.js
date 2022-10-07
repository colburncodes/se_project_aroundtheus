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

// Buttons
const profileEditButton = document.querySelector(".profile__edit-button");
const modalCloseButton = document.querySelector(".modal__close-button");

// Modal
const profileEditModal = document.querySelector(".modal");
const profileModalForm = document.querySelector(".modal__form");
// Profile
const profileTitleInput = document.querySelector(".profile__title");
const profileDescriptionInput = document.querySelector(".profile__description");
const profileTitleEl = profileEditModal.querySelector(".modal__input-name");
const profileDescriptionEl = profileEditModal.querySelector(
  ".modal__input-description"
);
// Template
let cardTemplate = document.querySelector("#card-template").content;
let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

console.log(cardElement);

openModal = () => {
  profileEditModal.classList.add("modal__open");
};

closeModal = () => {
  profileEditModal.classList.remove("modal__open");
};


// Open Modal
profileEditButton.addEventListener("click", () => {
  profileTitleEl.value = profileTitleInput.textContent;
  profileDescriptionEl.value = profileDescriptionInput.textContent;
  openModal();
});

// Close Modal
modalCloseButton.addEventListener("click", closeModal);

profileModalForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const titleValue = evt.target.title.value;
  const descriptionValue = evt.target.description.value;

  if (titleValue !== "" || descriptionValue !== "") {
    profileTitleInput.textContent = titleValue;
    profileDescriptionInput.textContent = descriptionValue;
  }
  closeModal();
});

getCardElement = (data) => {};
