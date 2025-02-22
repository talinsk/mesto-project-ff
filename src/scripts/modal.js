export function openModal(modalElement, funcCloseModalByEsc) {
  modalElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", funcCloseModalByEsc);
}

export function closeModal(modalElement, funcCloseModalByEsc) {
  modalElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", funcCloseModalByEsc);
}

