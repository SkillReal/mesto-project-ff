const template = document.querySelector("#card-template").content;

// Функция создания карточки

const createCard = function (arrayElement, deleteCard, likeCard, openCardImage) {
  const cardElement = template.querySelector(".card").cloneNode(true); // клонирую шаблон tamplate

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const delButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = arrayElement.name; //добавил название картинки из initialCards
  cardImage.src = arrayElement.link; //добавил адрес картинки из initialCards
  cardImage.setAttribute(
    "alt",
    "Картинка с видом на" + " " + arrayElement.name
  ); //добавил атрибут alt для получаемой картинки

  cardImage.addEventListener("click", () => openCardImage(arrayElement));

  delButton.addEventListener("click", deleteCard); //добавил к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк;

  likeButton.addEventListener("click", likeCard);

  return cardElement;
};

// Функция удаления карточки

const handleDeleteCard = function (event) {
  event.target.closest(".card").remove();
};
// Функция лайка карточки

const handleLikeCard = function (event) {
  event.target.classList.toggle("card__like-button_is-active");
};

export { createCard, handleDeleteCard, handleLikeCard };
