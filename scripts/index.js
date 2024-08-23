// @todo: Темплейт карточки

const template = document.querySelector("#card-template").content;

// @todo: DOM узлы

const container = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");

// @todo: Функция создания карточки

function createCard(info, delCard) {
  const cardElement = template.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = info.name;
  cardElement.querySelector(".card__image").src = info.link;
  cardElement.querySelector(".card__image").setAttribute('alt','Картинка с видом на' + ' ' + info.name);

  const delButton = cardElement.querySelector(".card__delete-button");
  delButton.addEventListener("click", delCard);
  return cardElement;
}

// @todo: Функция удаления карточки

function delCard(event) {
  event.target.closest(".card").remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach((cardElement) => {
  container.append(createCard(cardElement, delCard));
});
