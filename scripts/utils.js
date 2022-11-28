const ESC_KEY_VALUE = "Escape";

const isEscapeEvent = (evt, action) => {
  if (evt.key === ESC_KEY_VALUE) {
    const activeModal = document.querySelector(".modal__open");
    action(activeModal);
  }
};

const handleEscapePopup = (evt) => {
  evt.preventDefault();
  isEscapeEvent(evt, closeModal);
};

const imageModal = document.querySelector("#image-modal");

const openModal = (modal) => {
  modal.classList.add("modal__open");
  document.addEventListener("keyup", handleEscapePopup);
};

const closeModal = (modal) => {
  modal.classList.remove("modal__open");
  document.removeEventListener("keyup", handleEscapePopup);
};

export { isEscapeEvent, handleEscapePopup, imageModal, openModal, closeModal };
