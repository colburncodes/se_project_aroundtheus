import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._inputs = this._modalForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._buttonElement = this._modalForm.querySelector(".modal__save-button");
  }

  _getInputValues() {
    const formValues = {};
    this._inputs.forEach((input) => (formValues[input.name] = input.value));
    return formValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonElement.textContent = "Saving...";
    } else {
      this._buttonElement.textContent = "Save";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  closeModal() {
    this._modalForm.reset();
    super.closeModal();
  }
}

export default PopupWithForm;
