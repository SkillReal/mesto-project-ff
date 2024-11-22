import { initialCards } from "./components/cards.js";

import { createCard, delCard, OpPopup } from "./components/card.js";

import { openModal, closeModal} from "./components/modal.js";

import "./pages/index.css";

// DOM узлы;

const container = document.querySelector(".places__list");
const openAddButton = document.querySelector(".profile__add-button");
const openEditButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelectorAll(".popup__close");
const generalPopup = document.querySelectorAll(".popup");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

initialCards.forEach((arrElem) => {
  // перебрал массив объектов initialCards;
  container.append(createCard(arrElem, delCard, OpPopup)); //добавляем в конец .places__list карточки;
});

const clickOpenButton = function (button, popup) {
  button.addEventListener("click", function () {
    openModal(popup);
  });
};

clickOpenButton(openAddButton, popupTypeNewCard);
clickOpenButton(openEditButton, popupTypeEdit);

// функция закрытия всех попапов на крестик;

closeButton.forEach(function (item) {
  // перебрал псевдомассив кнопок закрытия попапов;
  item.addEventListener("click", function (evt) {
    const popup = evt.target.closest(".popup"); //нашел открытый попап для закрытия;
    closeModal(popup);
  });
});


generalPopup.forEach(function (item) {        
  item.addEventListener("click", function (evt) {
    const popup = evt.target.closest(".popup");
    if (evt.currentTarget === evt.target) {                
      closeModal(popup);
    }
  });
});


// функция закрытия всех попапов кликом на оверлей;

generalPopup.forEach(function (item) {        
  item.addEventListener("click", function (evt) {
    const popup = evt.target.closest(".popup");
    if (evt.currentTarget === evt.target) {                
      closeModal(popup);
    }
  });
});
// evt.currentTarget — элемент, где сработал обработчик;
// evt.target — элемент, где возникло событие;


