class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(`${popupSelector}`);
  }

  openModal() {
    this._popupElement.classList.add("modal__open");
    document.addEventListener("keyup", this._handleEscapePopup);
  }

  closeModal() {
    this._popupElement.classList.remove("modal__open");
    document.removeEventListener("keyup", this._handleEscapePopup);
    document.removeEventListener("click", this._handleCloseButton);
  }

  _handleCloseButton = () => {
    this.closeModal();
  };

  _handleEscapePopup = (evt) => {
    if (evt.key === "Escape") {
      this.closeModal();
    }
  };

  _handleModalOverlay = (evt) => {
    if (evt.target.classList.contains(".modal")) {
      this.closeModal();
    }
  };

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal__open")) {
        this.closeModal();
      }
      if (evt.target.classList.contains("modal__close")) {
        this.closeModal();
      }
    });
  }
}

export default Popup;
