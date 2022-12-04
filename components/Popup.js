import { ESC_KEY_VALUE } from "../utils/constants.js";

class Popup {
  constructor(popupSelector) {
    this._modalElement = popupSelector;
  }

  openModal = (modal) => {
    modal.classList.add("modal__open");
    document.addEventListener("keyup", this._handleEscapePopup);
  };

  closeModal = (modal) => {
    modal.classList.remove("modal__open");
    document.removeEventListener("keyup", this._handleEscapePopup);
  };

  _handleEscapePopup = (evt) => {
    if (evt.key === ESC_KEY_VALUE) {
      const activeModal = document.querySelector(".modal__open");
      this.closeModal(activeModal);
    }
  };

  setEventListeners() {
    const popups = document.querySelectorAll(".modal");
    popups.forEach((popup) => {
      popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("modal__open")) {
          this.closeModal(popup);
        }
        if (evt.target.classList.contains("modal__close")) {
          this.closeModal(popup);
        }
      });
    });
  }
}

export default Popup;
