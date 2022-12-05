import Popup from "./Popup.js";
import { openModal } from "../utils/utils.js";

class PopWithImage extends Popup {
  open({ name, link }) {
    const imageModal = document.querySelector("#image-modal");
    const cardImage = imageModal.querySelector(".modal__preview-image");
    const cardDescription = imageModal.querySelector(".modal__caption");

    cardImage.src = link;
    cardImage.alt = name;
    cardDescription.textContent = name;
    openModal(imageModal);
  }
}

export default PopWithImage;
