import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
} from "./components/card.js";

import { openModal, closeModal } from "./components/modal.js";

import { enableValidation, clearValidation } from "./components/validation.js";

import {
  getUserData,
  getInitialCards,
  patchProfile,
  postCard,
} from "./components/api.js";

import "./pages/index.css";

// DOM узлы;

const container = document.querySelector(".places__list");
const profileCloseButtons = document.querySelectorAll(".popup__close");
const generalPopups = document.querySelectorAll(".popup");

// Dom узлы профиля;

const profileImage = document.querySelector(".profile__image");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
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

// Валидация форм

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

//Вывод карточек на страницу и загрузка информации о пользователе с сервера;

let myId = "";

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    myId = userData._id;
    cards.forEach((arrElem) => {
      container.prepend(
        createCard(
          arrElem,
          handleDeleteCard,
          handleLikeCard,
          handleImageClick,
          myId
        )
      );
    });
  })
  .catch((data) => alert(`${data} - ошибка получения данных с сервера`));

// Функция попапа редактирования профиля;

const handleProfilePopup = function (openButton, popupForm) {
  // Слушатель открытия попапа редактирования профиля;

  openButton.addEventListener("click", function () {
    openModal(popupTypeEdit);
    profileFormName.value = profileName.textContent;
    profileFormjob.value = profileJob.textContent;
    clearValidation(popupForm, validationConfig);
  });

  //Функция сохранения на сервер внесенных в формы изменений при закрытии попапа;

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    patchProfile(profileFormName.value, profileFormjob.value)
      .then((data) => {
        profileName.textContent = data.name;
        profileJob.textContent = data.about;
      })
      .then(() => {
        closeModal(popupTypeEdit);
      });
  }

  //Слушатель сохранения внесенных в формы изменений при закрытии попапа;

  popupForm.addEventListener("submit", handleProfileFormSubmit);
};

handleProfilePopup(openProfileFormButton, profileForm);

// функция открытия попапа добавления новой карточки;

openAddButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
  placeFormName.value = "";
  placeFormLink.value = "";
  clearValidation(placeForm, validationConfig);
});

//Функция сохранения внесенных в форму попапа данных;

placeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const cardItem = {
    name: placeFormName.value,
    link: placeFormLink.value,
  };
  postCard(cardItem)
    .then((data) => {
      renderNewCard(data);
      event.target.reset();
    })
    .then(() => {
      closeModal(popupTypeNewCard);
    });
});

// Функция добавления новой карточки в начало .places__list;

const renderNewCard = function (newArrElem) {
  container.prepend(
    createCard(
      newArrElem,
      handleDeleteCard,
      handleLikeCard,
      handleImageClick,
      myId
    )
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
