const showInputError = (input, { errorClass, inputErrorClass }) => {
  const errorElement = document.querySelector(`.${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(errorClass);
  input.classList.add(inputErrorClass);
};

const hideInputError = (input, { errorClass, inputErrorClass }) => {
  const errorElement = document.querySelector(`.${input.id}-error`);
  errorElement.textContent = "";
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (input, settings) => {
  if (input.validity.valid) {
    hideInputError(input, settings);
  } else {
    showInputError(input, settings);
  }
};

const toggleButtonState = (inputs, buttons, settings) => {
  const isValid = inputs.every((input) => input.validity.valid);
  if (isValid) {
    buttons.classList.remove(settings.inactiveButtonClass);
    buttons.removeAttribute("disabled");
  } else {
    buttons.classList.add(settings.inactiveButtonClass);
  }
};

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSeletor,
  ...settings
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const inputs = [...formElement.querySelectorAll(inputSelector)];
    const button = formElement.querySelector(submitButtonSeletor);

    toggleButtonState(inputs, button, settings);
    formElement.addEventListener("reset", () => {
      setTimeout(() => {
        toggleButtonState(inputs, button, settings);
      }, 0); // it’s enough to put 0 ms here
    });

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input, settings);
        toggleButtonState(inputs, button, settings);
      });
    });
  });
};

enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSeletor: ".modal__save-button",
  inactiveButtonClass: "modal__button-disabled",
  inputErrorClass: ".modal__input-error",
  errorClass: "modal__error_visible",
});
