import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, deleteCard, toggleLike } from './card';
import { openModal, closeModal } from './modal'

const cardTemplate = document.querySelector("#card-template").content;
const listItemTemplate = cardTemplate.querySelector(".card");
const initialCardsList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");
const profileModal = document.querySelector(".popup_type_edit");
const newCardModal = document.querySelector(".popup_type_new-card");
const imageModal = document.querySelector(".popup_type_image");
const modalCloseBtns = document.querySelectorAll(".popup__close");
const modalElements = document.querySelectorAll('.popup');

const editProfileForm = document.querySelector(".popup__form[name='edit-profile']");
const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const newPlaceForm = document.querySelector(".popup__form[name='new-place']");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const typeUrlInput = document.querySelector(".popup__input_type_url");

function closeModalByEsc(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".popup.popup_is-opened");
    if (modal) {
      closeModal(modal);
    }
  }
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitleElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = jobInput.value;
  closeModal(profileModal, closeModalByEsc);
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: cardNameInput.value,
    link: typeUrlInput.value
  };
  const el = createCard(listItemTemplate, card, deleteCard, toggleLike, openImage);
  initialCardsList.prepend(el);
  closeModal(newCardModal, closeModalByEsc);
}

function openImage(card) {
  const imageElement = imageModal.querySelector('.popup__image');
  const captionElement = imageModal.querySelector('.popup__caption');
  imageElement.src = card.link;
  imageElement.alt = card.name;
  captionElement.textContent = card.name;
  openModal(imageModal, closeModalByEsc);
}

// create cards
initialCards.forEach(card => {
  const el = createCard(listItemTemplate, card, deleteCard, toggleLike, openImage);
  initialCardsList.append(el);
});

profileEditButton.addEventListener('click', function () {
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
  openModal(profileModal, closeModalByEsc);
});

newCardButton.addEventListener('click', function () {
  // to clear old input values if the modal was closed using "close" button earlier
  newPlaceForm.reset();
  openModal(newCardModal, closeModalByEsc);
});

// add listeners for modals when close button is clicked
modalCloseBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    closeModal(btn.closest('.popup'), closeModalByEsc);
  })  
});

// add listeners for modals when overlay is clicked
modalElements.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal, closeModalByEsc);
    }
  })
});

// forms submit listeners
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);