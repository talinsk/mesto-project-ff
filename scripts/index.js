// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const listItemTemplate = cardTemplate.querySelector(".card");
const initialCardsList = document.querySelector(".places__list");

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

