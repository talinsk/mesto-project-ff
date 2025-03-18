export const likeActiveClass = "card__like-button_is-active";
const deleteButtonVisibleClass = "card__delete-button_visible";

const cardTitleSelector = ".card__title";
const cardDeleteButtonSelector = ".card__delete-button";
const cardLikeButtonSelector = ".card__like-button";
const cardLikeCounterSelector = ".card__like-count";

export function createCard(
  listItemTemplate,
  card,
  currentUserId,
  funcDeleteCard,
  funcLikeCard,
  funcOpenImage
) {
  const cardElement = listItemTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener("click", () => funcOpenImage(card));
  cardElement.querySelector(cardTitleSelector).textContent = card.name;

  const deleteButtonElement = cardElement.querySelector(cardDeleteButtonSelector);
  if (card.owner._id === currentUserId) {
    deleteButtonElement.classList.add(deleteButtonVisibleClass);
    deleteButtonElement.addEventListener("click", () => funcDeleteCard(card._id, cardElement));
  }

  // элемент кнопки "лайк"
  const likeButton = cardElement.querySelector(cardLikeButtonSelector);
  // элемент счетчика лайков
  const likeCounter = cardElement.querySelector(cardLikeCounterSelector);
  likeButton.addEventListener("click", () => funcLikeCard(card._id, likeButton, likeCounter));  
  
  setCounterValue(likeCounter, card.likes.length);

  const user = card.likes.find((item) => item._id === currentUserId);
  if (user) {
    likeButton.classList.add(likeActiveClass);
  }

  return cardElement;
}

export function deleteCardFromList(cardElement) {
  cardElement.remove();
}

export function toggleLike(likeButton) {
  likeButton.classList.toggle(likeActiveClass);
}

// функция для установки значения количества лайков
export function setCounterValue(likeCounterElement, likesCount) {
  likeCounterElement.textContent = likesCount;
}
