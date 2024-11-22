import { openModal } from "./modal.js";

const template = document.querySelector("#card-template").content;
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupTitle = document.querySelector(".popup__caption");

// Функция создания карточки

const createCard = function (arrayElement, deleteCard, OpenPopup) {
  const cardElement = template.querySelector(".card").cloneNode(true); // клонирую шаблон tamplate

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const delButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = arrayElement.name; //добавил название картинки из initialCards
  cardImage.src = arrayElement.link; //добавил адрес картинки из initialCards
  cardImage.setAttribute(
    "alt",
    "Картинка с видом на" + " " + arrayElement.name
  ); //добавил атрибут alt для получаемой картинки

  cardImage.addEventListener("click", OpenPopup);

  delButton.addEventListener("click", deleteCard); //добавил к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк.
  return cardElement;
};

// функция открытия попапа карточки
const OpPopup = function (event) {
  openModal(popupTypeImage);
  popupTitle.textContent = event.target.closest(".card").textContent;
  popupImage.src = event.target.closest(".card__image").src;
  popupImage.alt = event.target.closest(".card__image").alt;
};

// Функция удаления карточки
const delCard = function (event) {
  event.target.closest(".card").remove();
};

export { createCard, delCard, OpPopup };
