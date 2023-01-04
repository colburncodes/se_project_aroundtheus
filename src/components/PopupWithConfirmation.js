import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._modalElement = document.querySelector(popupSelector);
    this._handleSubmit = this._modalElement.querySelector(
      ".modal__save-button"
    );
  }

  openModal() {
    super.openModal();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._handleSubmit.textContent = "Deleting...";
    } else {
      this._handleSubmit.textContent = "Yes";
    }
  }

  setSubmitAction(handleSubmit) {
    this._handleSubmit.addEventListener("click", handleSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._handleSubmit.classList.remove("modal__button-disabled");
  }

  closeModal() {
    super.closeModal();
  }
}

export default PopupWithConfirmation;
