class FormValidator {
  constructor(formElement, settings) {
    this._formElement = formElement;
    this._settings = settings;
  }

  _showInputError = (input) => {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
    input.classList.add(this._settings.inputErrorClass);
  };

  _hideInputError = (input) => {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    errorElement.textContent = "";
    input.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
  };

  _checkInputValidity = (input, settings) => {};

  _toggleButtonState = (inputs, buttons, settings) => {};

  enableValidation() {
    const formList = Array.from(
      document.querySelectorAll(this._settings.formSelector)
    );

    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
      const inputs = [
        ...formElement.querySelectorAll(this._settings.inputSelector),
      ];
      const button = formElement.querySelector(
        this._settings.submitButtonSeletor
      );

      this._toggleButtonState(inputs, button, this._settings);
      formElement.addEventListener("reset", () => {
        setTimeout(() => {
          this._toggleButtonState(inputs, button, this._settings);
        }, 0); // it’s enough to put 0 ms here
      });

      inputs.forEach((input) => {
        input.addEventListener("input", () => {
          this._checkInputValidity(input, this._settings);
          this._toggleButtonState(inputs, button, this._settings);
        });
      });
    });
  }
}

export default FormValidator;