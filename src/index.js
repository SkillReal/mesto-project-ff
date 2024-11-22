import { initialCards } from "./components/cards.js";

import { createCard, delCard, OpPopup, lkCard} from "./components/card.js";

import { openModal, closeModal } from "./components/modal.js";

import "./pages/index.css";

// DOM узлы;

const container = document.querySelector(".places__list");
const closeButton = document.querySelectorAll(".popup__close");
const generalPopup = document.querySelectorAll(".popup");

// Dom узлы редактирования профиля;

const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupFormEdit = popupTypeEdit.querySelector(".popup__form");
const openEditButton = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Dom узлы создания новой карточки;

const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupFormPlace = popupTypeNewCard.querySelector(".popup__form");
const popupFormName = popupTypeNewCard.querySelector(
  ".popup__input_type_card-name"
);
const popupFormLink = popupTypeNewCard.querySelector(".popup__input_type_url");
const openAddButton = document.querySelector(".profile__add-button");

//Вывод дефолтных карточек на страницу;

initialCards.forEach((arrElem) => {
  // перебрал массив объектов initialCards;
  container.append(createCard(arrElem, delCard, OpPopup, lkCard)); //добавляем в конец .places__list карточки;
});

// Функция попапа редактирования профиля;

const popupEdit = function (openButton, popupForm) {
  // Слушатель открытия попапа редактирования профиля;

  openButton.addEventListener("click", function () {
    openModal(popupTypeEdit);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  });

  //Функция сохранения внесенных в формы изменений при закрытии попапа;

  function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closeModal(popupTypeEdit);
  }

  //Слушатель сохранения внесенных в формы изменений при закрытии попапа;

  popupForm.addEventListener("submit", handleFormSubmit);
};

popupEdit(openEditButton, popupFormEdit);

// функция открытия попапа

const clickOpenButton = function (button, popup) {
  button.addEventListener("click", function () {
    openModal(popup);
  });
};

clickOpenButton(openAddButton, popupTypeNewCard);

//Функция сохранения внесенных в форму попапа данных

popupFormPlace.addEventListener("submit", function (event) {
  event.preventDefault();
  renderNewCard({
    name: popupFormName.value,
    link: popupFormLink.value,
  });
  event.target.reset();
  closeModal(popupTypeNewCard);
});
// Функция добавления новой карточки в начало .places__list;

const renderNewCard = function (newArrElem) {
  container.prepend(createCard(newArrElem, delCard, OpPopup, lkCard));
};

// функция закрытия всех попапов на крестик;

closeButton.forEach(function (item) {
  // перебрал псевдомассив кнопок закрытия попапов;
  item.addEventListener("click", function (event) {
    const popup = event.target.closest(".popup"); //нашел открытый попап для закрытия;
    closeModal(popup);
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
