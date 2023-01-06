class FormValidator {
  constructor(formElement, settings) {
    this._formElement = formElement;
    this._settings = settings;
    this._buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSeletor
    );
  }

  _showInputError = (input) => {
    const errorElement = document.querySelector(`.${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
    input.classList.add(this._settings.inputErrorClass);
  };

  _hideInputError = (input) => {
    const errorElement = document.querySelector(`.${input.id}-error`);
    errorElement.textContent = "";
    input.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
  };

  _checkInputValidity = (input, settings) => {
    if (input.validity.valid) {
      this._hideInputError(input, settings);
    } else {
      this._showInputError(input, settings);
    }
  };

  _checkFormValidity = () => {
    const inputList = [
      ...this._formElement.querySelectorAll(this._settings.inputSelector),
    ];

    return inputList.every((input) => input.validity.valid);
  };

  _toggleButtonState = () => {
    const isValid = this._checkFormValidity();

    if (isValid) {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    } else {
      this._buttonElement.setAttribute("disabled", "true");
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    }
  };

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

      this._toggleButtonState();
      formElement.addEventListener("reset", () => {
        setTimeout(() => {
          this._toggleButtonState();
        }, 0); // it’s enough to put 0 ms here
      });

      inputs.forEach((input) => {
        input.addEventListener("input", () => {
          this._checkInputValidity(input, this._settings);
          this._toggleButtonState();
        });
      });
    });
  }
}

export default FormValidator;
