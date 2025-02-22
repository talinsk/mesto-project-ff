export function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByEsc);
  modalElement.addEventListener("click", closeModalByOverlayClick);
  modalElement.querySelector(".popup__close").addEventListener("click", closeModalByButton);
}

export function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalByEsc);
}

function closeModalByEsc(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".popup.popup_is-opened");
    if (modal) {
      closeModal(modal);
    }
  }
}

function closeModalByOverlayClick(e) {
  const modal = document.querySelector(".popup.popup_is-opened");
  if (modal && e.target === modal) {
    closeModal(modal);
  }
}

function closeModalByButton(e) {
    closeModal(e.target.closest('.popup'));
}