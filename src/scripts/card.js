const likeActiveClass = "card__like-button_is-active";

export function createCard(
  listItemTemplate,
  card,
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

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => funcDeleteCard(cardElement));

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => funcLikeCard(likeButton));

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function toggleLike(likeButton) {
  if (likeButton.classList.contains(likeActiveClass)) {
    likeButton.classList.remove(likeActiveClass);
  } else {
    likeButton.classList.add(likeActiveClass);
  }
}
