import Popup from "./Popup.js";

class PopWithImage extends Popup {
  open({ name, link }) {
    const imageModal = this._modalElement;
    const cardImage = imageModal.querySelector(".modal__preview-image");
    const cardDescription = imageModal.querySelector(".modal__caption");

    cardImage.src = link;
    cardImage.alt = name;
    cardDescription.textContent = name;
    // super.openModal(imageModal);
    super.setEventListeners();
  }
}

export default PopWithImage;
