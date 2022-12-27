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
    console.log("clicked confirmation");
  }

  openModal() {
    super.openModal();
  }

  setEventListeners() {
    super.setEventListeners();
    this._handleSubmit.classList.remove("modal__button-disabled");
     this._handleSubmit.addEventListener("click", () => {
       this.handleConfirmation();
     });
  }

  closeModal() {
    super.closeModal();
  }
}

export default PopupWithConfirmation;
