import "../pages/index.css";
import {
  createCard,
  deleteCardFromList,
  toggleLike,
  setCounterValue,
} from "./card";
import { openModal, closeModal } from "./modal";
import { enableFormValidation, clearValidation } from "./validation";

import {
  getUser,
  updateUser,
  getCards,
  deleteCard as deleteCardFromServer,
  addNewCard,
  putLike,
  deleteLike,
  updateAvatar,
} from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
const listItemTemplate = cardTemplate.querySelector(".card");
const initialCardsList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");
const profileModal = document.querySelector(".popup_type_edit");
const newCardModal = document.querySelector(".popup_type_new-card");
const imageModal = document.querySelector(".popup_type_image");
const errorModal = document.querySelector(".popup_error");
const profileEditImage = document.querySelector(".profile__image");
const newAvatarModal = document.querySelector(".popup_type_new-avatar");
const confirmationModal = document.querySelector(".popup_confirmation");

const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(".profile__description");
const profileImageElement = document.querySelector(".profile__image");
const editProfileForm = document.querySelector(".popup__form[name='edit-profile']");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(".popup__input_type_description");
const editProfileSubmitButton = editProfileForm.querySelector(".popup__button");

const newPlaceForm = document.querySelector(".popup__form[name='new-place']");
const cardNameInput = newPlaceForm.querySelector(".popup__input_type_card-name");
const typeUrlInput = newPlaceForm.querySelector(".popup__input_type_url");
const newPlaceFormSubmitButton = newPlaceForm.querySelector(".popup__button");

const imageModalImageElement = imageModal.querySelector(".popup__image");
const imageModalCaptionElement = imageModal.querySelector(".popup__caption");

const newAvatarForm = newAvatarModal.querySelector(".popup__form");
const avatarUrlInput = newAvatarForm.querySelector(".popup__input_type_url");
const newAvatarFormSubmitButton = newAvatarForm.querySelector(".popup__button");

const confirmationButton = confirmationModal.querySelector(".popup__button");

const errorCaptionElement = errorModal.querySelector(".popup__text");

const deleteCardContext = {
  cardId: null,
  cardElement: null
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  setButtonTextLoading(editProfileSubmitButton);

  // вызываем обновление данных о пользователе на сервере
  updateUser({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((userInfo) => {
      updateUserInfo(userInfo);
      closeModal(profileModal);
      setNormalButtonText(editProfileSubmitButton);
    })
    .catch((err) => {
      openError(err.message);
      setNormalButtonText(editProfileSubmitButton);
    });
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  setButtonTextLoading(newPlaceFormSubmitButton);
  const card = {
    name: cardNameInput.value,
    link: typeUrlInput.value,
  };

  //создаем новую карточку на сервере
  addNewCard(card)
    .then((cardInfo) => {
      const el = createCard(
        listItemTemplate,
        cardInfo,
        cardInfo.owner._id,
        confirmDeleteCard,
        likeCard,
        openImage
      );
      initialCardsList.prepend(el);
      closeModal(newCardModal);
      newPlaceForm.reset();
      setNormalButtonText(newPlaceFormSubmitButton);
    })
    .catch((err) => {
      openError(err.message);
      setNormalButtonText(newPlaceFormSubmitButton);
    });
}

function handleNewAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatar = {
    avatar: avatarUrlInput.value,
  };
  setButtonTextLoading(newAvatarFormSubmitButton);

  // обновляем аватар на сервере
  updateAvatar(avatar)
    .then((userInfo) => {
      updateUserInfo(userInfo);
      closeModal(newAvatarModal);
      newAvatarForm.reset();
      setNormalButtonText(newAvatarFormSubmitButton);
    })
    .catch((err) => {
      openError(err.message);
      setNormalButtonText(newAvatarFormSubmitButton);
    });
}

function setNormalButtonText(buttonElement) {
  buttonElement.textContent = "Сохранить";
}

function setButtonTextLoading(buttonElement) {
  buttonElement.textContent = "Сохранение...";
}

function openImage(card) {
  imageModalImageElement.src = card.link;
  imageModalImageElement.alt = card.name;
  imageModalCaptionElement.textContent = card.name;
  openModal(imageModal);
}

function openError(err) {
  errorCaptionElement.textContent = err;
  openModal(errorModal);
}

// заполняем поля о пользователе на странице
function updateUserInfo(userInfo) {
  profileTitleElement.textContent = userInfo.name;
  profileDescriptionElement.textContent = userInfo.about;
  profileImageElement.style.backgroundImage = `url('${userInfo.avatar}')`;
}

profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
  clearValidation(profileModal, validationConfig);
  openModal(profileModal);
});

newCardButton.addEventListener("click", function () {
  newPlaceForm.reset();
  clearValidation(newCardModal, validationConfig);
  openModal(newCardModal);
});

profileEditImage.addEventListener("click", function () {
  newAvatarForm.reset();
  clearValidation(newAvatarModal, validationConfig);
  openModal(newAvatarModal);
});

confirmationButton.addEventListener("click", function () {
  deleteCard();
  closeModal(confirmationModal);
});

function deleteCard() {  
  if (!deleteCardContext.cardId) {
    return;
  }

  deleteCardFromServer(deleteCardContext.cardId)
    .then(() => {
      deleteCardFromList(deleteCardContext.cardElement);
    })
    .catch((err) => {
      openError(err.message);
    });
}

function confirmDeleteCard(id, cardElement) {
  deleteCardContext.cardId = id;
  deleteCardContext.cardElement = cardElement;
  openModal(confirmationModal);
}

// функция-обработчик нажатия на кнопку лайк
function likeCard(cardId, likeButton, likeCounterElement) {
  const promise = likeButton.classList.contains("card__like-button_is-active")
    ? deleteLike(cardId)
    : putLike(cardId);

  promise
    .then((card) => {
      // отрисовываем количество лайков
      setCounterValue(likeCounterElement, card.likes.length);
      // переключаем кнопку лайк
      toggleLike(likeButton);
    })
    .catch((err) => {
      openError(err.message);
    });
}

// обработчики для отправки форм
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);
newAvatarForm.addEventListener("submit", handleNewAvatarFormSubmit);

// навешиваем валидацию на все формы в модальных окнах
enableFormValidation(validationConfig);

// получаем информацию о текущем пользователе и о карточках при первоначальной загрузке страницы
const userPromise = getUser();
const cardsPromise = getCards();
Promise.all([userPromise, cardsPromise])
  .then((responses) => {
    const userInfo = responses[0];
    updateUserInfo(userInfo);

    const cards = responses[1];
    cards.forEach((card) => {
      const el = createCard(
        listItemTemplate,
        card,
        userInfo._id,
        confirmDeleteCard,
        likeCard,
        openImage
      );
      initialCardsList.append(el);
    });
  })
  .catch((err) => {
    openError(err.message);
  });
