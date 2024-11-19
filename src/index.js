import {
  initialCards, 
  
} from "./components/cards.js";
import './pages/index.css';

// @todo: Темплейт карточки

const template = document.querySelector("#card-template").content;

// @todo: DOM узлы

const container = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");

// @todo: Функция создания карточки

 const createCard = function (arrElement, deleteCard) {
  const cardElement = template.querySelector(".card").cloneNode(true); // клонирую шаблон tamplate

  cardElement.querySelector(".card__title").textContent = arrElement.name; //добавил название картинки из initialCards
  cardElement.querySelector(".card__image").src = arrElement.link; //добавил адрес картинки из initialCards
  cardElement.querySelector(".card__image").setAttribute('alt','Картинка с видом на' + ' ' + arrElement.name); //добавил атрибут alt для получаемой картинки

  const delButton = cardElement.querySelector(".card__delete-button");
  delButton.addEventListener("click", deleteCard); //добавил к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк.
  return cardElement;
}
// @todo: Функция удаления карточки

const delCard = function (event) {
  event.target.closest(".card").remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((arrElem) => {   // перебрал массив объектов initialCards
  container.append(createCard(arrElem, delCard)); //добавляем в конец .places__list карточки
});
