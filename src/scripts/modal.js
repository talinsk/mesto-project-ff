const popupOpenedClass = "popup_is-opened";
const popupCloseSelector = ".popup__close";
const popupOpenedSelector = ".popup.popup_is-opened";
const popupSelector = ".popup";

export function openModal(modalElement) {
  modalElement.classList.add(popupOpenedClass);
  document.addEventListener("keydown", closeModalByEsc);
  modalElement.addEventListener("click", closeModalByOverlayClick);
  modalElement.querySelector(popupCloseSelector).addEventListener("click", closeModalByButton);
}

export function closeModal(modalElement) {
  modalElement.classList.remove(popupOpenedClass);
  document.removeEventListener("keydown", closeModalByEsc);
}

function closeModalByEsc(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(popupOpenedSelector);
    if (modal) {
      closeModal(modal);
    }
  }
}

function closeModalByOverlayClick(e) {
  const modal = document.querySelector(popupOpenedSelector);
  if (modal && e.target === modal) {
    closeModal(modal);
  }
}

function closeModalByButton(e) {
    closeModal(e.target.closest(popupSelector));
}