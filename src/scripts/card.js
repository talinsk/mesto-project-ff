const likeActiveClass = "card__like-button_is-active";

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
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButtonElement = cardElement.querySelector(".card__delete-button");
  if (card.owner._id === currentUserId) {
    deleteButtonElement.classList.add("card__delete-button_visible");
    deleteButtonElement.addEventListener("click", () => funcDeleteCard(card._id, cardElement));
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => funcLikeCard(likeButton));

  const likeCounter = cardElement.querySelector(".card__like-count");
  likeCounter.textContent = card.likes.length;

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
