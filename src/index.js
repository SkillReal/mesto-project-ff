import { initialCards } from "./components/cards.js";

import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
} from "./components/card.js";

import { openModal, closeModal } from "./components/modal.js";

import "./pages/index.css";

// DOM узлы;

const container = document.querySelector(".places__list");
const profileCloseButtons = document.querySelectorAll(".popup__close");
const generalPopups = document.querySelectorAll(".popup");

// Dom узлы редактирования профиля;

const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileForm = document.forms["edit-profile"];
const openProfileFormButton = document.querySelector(".profile__edit-button");
const profileFormName = document.querySelector(".popup__input_type_name");
const profileFormjob = document.querySelector(".popup__input_type_description");

// Dom узлы создания новой карточки;

const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const placeForm = document.forms["new-place"];
const placeFormName = popupTypeNewCard.querySelector(
  ".popup__input_type_card-name"
);
const placeFormLink = popupTypeNewCard.querySelector(".popup__input_type_url");
const openAddButton = document.querySelector(".profile__add-button");

// Dom узлы  картинки;

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupTitle = document.querySelector(".popup__caption");

//Вывод дефолтных карточек на страницу;

initialCards.forEach((arrElem) => {
  // перебрал массив объектов initialCards;
  container.append(
    createCard(arrElem, handleDeleteCard, handleLikeCard, handleImageClick)
  ); //добавляем в конец .places__list карточки;
});

// Функция попапа редактирования профиля;

const handleProfilePopup = function (openButton, popupForm) {
  // Слушатель открытия попапа редактирования профиля;

  openButton.addEventListener("click", function () {
    openModal(popupTypeEdit);
    profileFormName.value = nameProfile.textContent;
    profileFormjob.value = jobProfile.textContent;
  });

  //Функция сохранения внесенных в формы изменений при закрытии попапа;

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = profileFormName.value;
    jobProfile.textContent = profileFormjob.value;
    closeModal(popupTypeEdit);
  }

  //Слушатель сохранения внесенных в формы изменений при закрытии попапа;

  popupForm.addEventListener("submit", handleProfileFormSubmit);
};

handleProfilePopup(openProfileFormButton, profileForm);

// функция открытия попапа

const clickOpenButton = function (button, popup) {
  button.addEventListener("click", function () {
    openModal(popup);
  });
};

clickOpenButton(openAddButton, popupTypeNewCard);

//Функция сохранения внесенных в форму попапа данных

placeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  renderNewCard({
    name: placeFormName.value,
    link: placeFormLink.value,
  });
  event.target.reset();
  closeModal(popupTypeNewCard);
});
// Функция добавления новой карточки в начало .places__list;

const renderNewCard = function (newArrElem) {
  container.prepend(
    createCard(newArrElem, handleDeleteCard, handleLikeCard, handleImageClick)
  );
};

// функция закрытия всех попапов на крестик;

profileCloseButtons.forEach(function (item) {
  // перебрал псевдомассив кнопок закрытия попапов;
  item.addEventListener("click", function (event) {
    const popup = event.target.closest(".popup"); //нашел открытый попап для закрытия;
    closeModal(popup);
  });
});

// функция закрытия всех попапов кликом на оверлей;

generalPopups.forEach(function (item) {
  item.addEventListener("click", function (event) {
    if (event.currentTarget === event.target) {
      closeModal(item);
    }
  });
});
// evt.currentTarget — элемент, где сработал обработчик;
// evt.target — элемент, где возникло событие;

// функция открытия попапа карточки

function handleImageClick(element) {
  openModal(popupTypeImage);
  popupTitle.textContent = element.name;
  popupImage.src = element.link;
  popupImage.alt = `Картинка с видом на ${element.name}`;
}
