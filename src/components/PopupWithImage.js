import { openModal } from "../utils/utils.js";
import Popup from "./Popup.js";

class PopWithImage extends Popup {
  open({ name, link }) {
    this._imageElement = document.querySelector("#image-modal");
    super.setEventListeners();

    const cardImage = this._imageElement.querySelector(".modal__preview-image");
    const cardDescription = this._imageElement.querySelector(".modal__caption");

    cardImage.src = link;
    cardImage.alt = name;
    cardDescription.textContent = name;

    openModal(this._imageElement);
    // super.openModal();
  }
}

export default PopWithImage;
