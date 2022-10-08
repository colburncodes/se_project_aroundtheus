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

/////////////////////
/// BUTTONS
/////////////////////
const profileEditButton = document.querySelector(".profile__edit-button");
const modalCloseButton = document.querySelector(".modal__close-button");

/////////////////////
/// MODAL
/////////////////////
const profileEditModal = document.querySelector(".modal");
const profileModalForm = document.querySelector(".modal__form");
/////////////////////
/// PROFILE
/////////////////////
const profileTitleInput = document.querySelector(".profile__title");
const profileDescriptionInput = document.querySelector(".profile__description");
const profileTitleEl = profileEditModal.querySelector(".modal__input-name");
const profileDescriptionEl = profileEditModal.querySelector(
  ".modal__input-description"
);
/////////////////////
/// TEMPLATE
/////////////////////s
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");

/////////////////////
/// UTILITY FUNCS
/////////////////////
openModal = () => {
  profileEditModal.classList.add("modal__open");
};

closeModal = () => {
  profileEditModal.classList.remove("modal__open");
};

/////////////////////
/// OPEN MODAL
/////////////////////
profileEditButton.addEventListener("click", () => {
  profileTitleEl.value = profileTitleInput.textContent;
  profileDescriptionEl.value = profileDescriptionInput.textContent;
  openModal();
});

/////////////////////
/// CLOSE MODAL
/////////////////////
modalCloseButton.addEventListener("click", closeModal);

///////////////////////
/// SUBMIT PROFILE FUNC
///////////////////////
submitProfileForm = (evt) => {
  evt.preventDefault();
  const titleValue = evt.target.title.value;
  const descriptionValue = evt.target.description.value;

  if (titleValue !== "" || descriptionValue !== "") {
    profileTitleInput.textContent = titleValue;
    profileDescriptionInput.textContent = descriptionValue;
  }
  closeModal();
};

/////////////////////
/// SAVE USER DATA
/////////////////////
profileModalForm.addEventListener("submit", submitProfileForm);

//////////////////////
/// RENDER CARDS FUNC
//////////////////////
getCardElement = (data) => {
  const cardDetails = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardDetails.querySelector(".card__image");
  const cardDescription = cardDetails.querySelector(".card__label-text");

  cardImage.src = `${data.link}`;
  cardImage.alt = `${data.name}`;
  cardDescription.textContent = `${data.name}`;

  return cardDetails;
};

////////////////////////
/// ITERATE CARDS ARRAY
////////////////////////
for (let card in initialCards) {
  cardsList.prepend(getCardElement(initialCards[card]));
}
