import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._modalElement = document.querySelector(popupSelector);
    this._handleSubmit = this._modalElement.querySelector(
      ".modal__save-button"
    );
  }

  handleConfirmation() {
    // confirm submission
  }

  openModal() {
    super.openModal();
  }

  setEventListeners() {
    super.setEventListeners();
    this.removeEventListeners();
    this._handleSubmit.addEventListener("click", () => this.handleConfirmation);
  }

  removeEventListeners() {
    this._handleSubmit.classList.remove("modal__button-disabled");
  }

  closeModal() {
    super.closeModal();
  }
}

export default PopupWithConfirmation;
