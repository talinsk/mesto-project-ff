// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { initialCards } from './cards'

const cardTemplate = document.querySelector("#card-template").content;
const listItemTemplate = cardTemplate.querySelector(".card");
const initialCardsList = document.querySelector(".places__list");
const openPopupEdit = document.querySelector(".profile__edit-button");
const openPopupAdd = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeAdd = document.querySelector(".popup_type_new-card");
const popupCloseBtns = document.querySelectorAll(".popup__close");
const popupElements = document.querySelectorAll('.popup');

const formElement = document.querySelector(".popup__form");
const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function createCard(card, funcDeleteCard) {
  const cardElement = listItemTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  cardElement.querySelector(".card__delete-button").addEventListener("click", () => funcDeleteCard(cardElement));

  return cardElement;  
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach(card => {
    const el = createCard(card, deleteCard);
    initialCardsList.append(el);
});

function closePopupByEsc(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup.popup_is-opened");
    if (popup) {
      closePopup(popup);
    }
  }
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
}


openPopupEdit.addEventListener('click', function () {
  console.log(profileTitleElement.textContent);
  console.log(profileDescriptionElement.textContent);
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
  openPopup(popupTypeEdit);
});

openPopupAdd.addEventListener('click', function () {
  openPopup(popupTypeAdd);
});

popupCloseBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    closePopup(btn.closest('.popup'));
  })  
});

popupElements.forEach(popup => {
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  })
});

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitleElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = jobInput.value;
  closePopup(popupTypeEdit);
}

formElement.addEventListener('submit', handleFormSubmit); 
