// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const initialCardsList = document.querySelector(".places__list");

function createCard(card, funcDeleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  cardElement.querySelector(".card__delete-button").addEventListener("click", funcDeleteCard);

  return cardElement;  
}

function deleteCard(e) {
  e.target.closest(".places__item").remove();
}

initialCards.forEach(card => {
  const el = createCard(card, deleteCard);
  initialCardsList.append(el);
});

