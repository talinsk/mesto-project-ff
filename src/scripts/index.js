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

const editProfileForm = document.querySelector(".popup__form[name='edit-profile']");
const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(".profile__description");
const profileImageElement = document.querySelector(".profile__image");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const newPlaceForm = document.querySelector(".popup__form[name='new-place']");
const cardNameInput = newPlaceForm.querySelector(".popup__input_type_card-name");
const typeUrlInput = newPlaceForm.querySelector(".popup__input_type_url");

const imageModalImageElement = imageModal.querySelector(".popup__image");
const imageModalCaptionElement = imageModal.querySelector(".popup__caption");

const newAvatarForm = newAvatarModal.querySelector(".popup__form");
const avatarUrlInput = newAvatarForm.querySelector(".popup__input_type_url");

const errorCaptionElement = errorModal.querySelector(".popup__text");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  // вызываем обновление данных о пользователе на сервере
  updateUser({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((userInfo) => {
      updateUserInfo(userInfo);
      closeModal(profileModal);
    })
    .catch((err) => {
      openError(err.message);
    });
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
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
        deleteCard,
        likeCard,
        openImage
      );
      initialCardsList.prepend(el);
      closeModal(newCardModal);
      newPlaceForm.reset();
    })
    .catch((err) => {
      openError(err.message);
    });
}

function handleNewAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatar = {
    avatar: avatarUrlInput.value,
  };

  // обновляем аватар на сервере
  updateAvatar(avatar)
    .then((userInfo) => {
      updateUserInfo(userInfo);
      closeModal(newAvatarModal);
      newAvatarForm.reset();
    })
    .catch((err) => {
      openError(err.message);
    });
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
  // to clear old input values if the modal was closed using "close" button or overlay earlier
  newPlaceForm.reset();
  clearValidation(newCardModal, validationConfig);
  openModal(newCardModal);
});

profileEditImage.addEventListener("click", function () {
  // to clear old input values if the modal was closed using "close" button or overlay earlier
  newAvatarForm.reset();
  clearValidation(newAvatarModal, validationConfig);
  openModal(newAvatarModal);
});

function deleteCard(id, cardElement) {
  deleteCardFromServer(id)
    .then(() => {
      deleteCardFromList(cardElement);
    })
    .catch((err) => {
      openError(err.message);
    });
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
    console.log(responses);
    const userInfo = responses[0];
    updateUserInfo(userInfo);

    const cards = responses[1];
    cards.forEach((card) => {
      const el = createCard(
        listItemTemplate,
        card,
        userInfo._id,
        deleteCard,
        likeCard,
        openImage
      );
      initialCardsList.append(el);
    });
  })
  .catch((err) => {
    openError(err.message);
  });
