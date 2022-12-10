class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(`${popupSelector}`);
    this._closeButtonElement = document.querySelector(".modal__close");
  }

  openModal = () => {
    this._popupElement.classList.add("modal__open");
    this.setEventListeners();
  };

  closeModal = () => {
    this._popupElement.classList.remove("modal__open");
    this.removeEventListeners();
  };

  _handleEscapePopup = (evt) => {
    if (evt.key === "Escape") {
      const activeModal = document.querySelector(".modal__open");
      this.closeModal(activeModal);
    }
  };

  setEventListeners() {
    this._closeButtonElement.addEventListener("click", this.closeModal());
    document.addEventListener("keyup", this._handleEscapePopup);
    // const popups = document.querySelectorAll(".modal");
    // popups.forEach((popup) => {
    //   popup.addEventListener("mousedown", (evt) => {
    //     if (evt.target.classList.contains("modal__open")) {
    //       this.closeModal(popup);
    //     }
    //     if (evt.target.classList.contains("modal__close")) {
    //       this.closeModal(popup);
    //     }
    //   });
    // });
  }

  removeEventListeners() {
    this._closeButtonElement.removeEventListener("click", this.closeModal());
    document.removeEventListener("keyup", this._handleEscapePopup);
  }
}

export default Popup;
