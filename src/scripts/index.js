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
const popupTypeImage = document.querySelector(".popup_type_image");
const popupCloseBtns = document.querySelectorAll(".popup__close");
const popupElements = document.querySelectorAll('.popup');

const editProfileForm = document.querySelector(".popup__form[name='edit-profile']");
const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const newPlaceForm = document.querySelector(".popup__form[name='new-place']");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const typeUrlInput = document.querySelector(".popup__input_type_url");

const likeActiveClass = 'card__like-button_is-active';

function createCard(card, funcDeleteCard, funcLikeCard, funcOpenImage) {
  const cardElement = listItemTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener("click", () => funcOpenImage(card));
  cardElement.querySelector(".card__title").textContent = card.name;

  cardElement.querySelector(".card__delete-button").addEventListener("click", () => funcDeleteCard(cardElement));
  
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => funcLikeCard(likeButton));

  return cardElement;  
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach(card => {
    const el = createCard(card, deleteCard, toggleLike, openImage);
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

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitleElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = jobInput.value;
  closePopup(popupTypeEdit);
}

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: cardNameInput.value,
    link: typeUrlInput.value
  };
  const el = createCard(card, deleteCard, toggleLike, openImage);
  initialCardsList.prepend(el);
  closePopup(popupTypeAdd);
  newPlaceForm.reset();
}

newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);


function toggleLike(likeButton) {
  if (likeButton.classList.contains(likeActiveClass))
  {
    likeButton.classList.remove(likeActiveClass);
  }
  else
  {
    likeButton.classList.add(likeActiveClass);
  }
}

function openImage(card) {
  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector('.popup__caption');
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
  openPopup(popupTypeImage);
}
