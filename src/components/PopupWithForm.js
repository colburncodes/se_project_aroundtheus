import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._modalForm = popupSelector;
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputs = this._modalForm.querySelectorAll(".modal__input");
    this._formValues = {};

    inputs.forEach((input) => (this._formValues[input.name] = input.value));
    return this._formValues;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  closeModal() {
    this._modalForm.reset();
    super.closeModal();
  }
}

export default PopupWithForm;
