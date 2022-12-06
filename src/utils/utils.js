const ESC_KEY_VALUE = "Escape";

const handleEscapePopup = (evt) => {
  if (evt.key === ESC_KEY_VALUE) {
    const activeModal = document.querySelector(".modal__open");
    closeModal(activeModal);
  }
};

const openModal = (modal) => {
  modal.classList.add("modal__open");
  document.addEventListener("keyup", handleEscapePopup);
};

const closeModal = (modal) => {
  modal.classList.remove("modal__open");
  document.removeEventListener("keyup", handleEscapePopup);
};

export { handleEscapePopup, openModal, closeModal, ESC_KEY_VALUE };
