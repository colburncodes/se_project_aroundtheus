import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._modalElement = document.querySelector(popupSelector);
    this._submitButton = this._modalElement.querySelector(
      ".modal__save-button"
    );
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Deleting...";
    } else {
      this._submitButton.textContent = "Yes";
    }
  }

  setSubmitAction(handleSubmit) {
    this._submitButton.addEventListener("click", handleSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.classList.remove("modal__button-disabled");
  }

}

export default PopupWithConfirmation;
