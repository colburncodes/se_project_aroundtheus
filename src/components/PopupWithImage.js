import Popup from "./Popup.js";

class PopWithImage extends Popup {
  open({ name, link }) {
    this._imageElement = this._popupElement;
    super.setEventListeners();

    const cardImage = this._imageElement.querySelector(".modal__preview-image");
    const cardDescription = this._imageElement.querySelector(".modal__caption");

    cardImage.src = link;
    cardImage.alt = name;
    cardDescription.textContent = name;
  }
}

export default PopWithImage;
