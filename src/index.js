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
  patchAvatar,
} from "./components/api.js";

import "./pages/index.css";

// DOM узлы;

const container = document.querySelector(".places__list");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const generalPopups = document.querySelectorAll(".popup");

// Dom узлы профиля;

const profileImage = document.querySelector(".profile__image");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileForm = document.forms["edit-profile"];
const profileFormButton = profileForm.querySelector(".popup__button");
const openProfilePopupButton = document.querySelector(".profile__edit-button");
const profileFormName = document.querySelector(".popup__input_type_name");
const profileFormjob = document.querySelector(".popup__input_type_description");

// Dom узлы аватара профиля;

const popupTypeEditAvatar = document.querySelector(".popup_type_edit-avatar");
const profileAvatarForm = document.forms["edit-avatar"];
const profileAvatarFormButton =
  profileAvatarForm.querySelector(".popup__button");
const profileAvatarFormLink = popupTypeEditAvatar.querySelector(
  ".popup__input_type_url"
);
const openProfileAvatarPopupButton = document.querySelector(
  ".profile__image_edit-button"
);

// Dom узлы создания новой карточки;

const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const placeForm = document.forms["new-place"];
const placeFormButton = placeForm.querySelector(".popup__button");
const placeFormName = popupTypeNewCard.querySelector(
  ".popup__input_type_card-name"
);
const placeFormLink = popupTypeNewCard.querySelector(".popup__input_type_url");
const openPlacePopupButton = document.querySelector(".profile__add-button");

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

function setButtonMessage(button, message) {
  button.textContent = message;
}

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

const handleProfilePopup = function (openButton, popupForm, formButton) {
  // Слушатель открытия попапа редактирования текстовых данных профиля;

  openButton.addEventListener("click", function () {
    openModal(popupTypeEdit);
    profileFormName.value = profileName.textContent;
    profileFormjob.value = profileJob.textContent;
    clearValidation(popupForm, validationConfig);
  });

  //Функция сохранения на сервер внесенных в формы изменений при закрытии попапа;

  function handleProfileFormSubmit(event) {
    event.preventDefault();
    setButtonMessage(formButton, "Сохранение...");
    patchProfile(profileFormName.value, profileFormjob.value)
      .then((data) => {
        profileName.textContent = data.name;
        profileJob.textContent = data.about;
      })
      .then(() => {
        closeModal(popupTypeEdit);
      })
      .catch((data) =>
        alert(`${data} - ошибка записи данных профиля на сервер`)
      )
      .finally(() => {
        setButtonMessage(formButton, "Сохранить");
      });
  }

  //Слушатель сохранения внесенных в формы изменений при закрытии попапа;

  popupForm.addEventListener("submit", handleProfileFormSubmit);
};

handleProfilePopup(openProfilePopupButton, profileForm, profileFormButton);

//Функция попапа редактирования аватара профиля;

const handleProfileAvatarPopup = function (openButton, popupForm, formButton) {
  openButton.addEventListener("click", function () {
    openModal(popupTypeEditAvatar);
    profileAvatarFormLink.value = "";
    clearValidation(popupForm, validationConfig);
  });

  function handleProfileAvatarFormSubmit(event) {
    event.preventDefault();
    setButtonMessage(formButton, "Сохранение...");
    patchAvatar(profileAvatarFormLink.value)
      .then((data) => {
        profileImage.style.backgroundImage = `url(${data.avatar})`;
        event.target.reset();
      })
      .then(() => {
        closeModal(popupTypeEditAvatar);
      })
      .catch((data) =>
        alert(`${data} - ошибка записи аватара профиля на сервер`)
      )
      .finally(() => {
        setButtonMessage(formButton, "Сохранить");
      });
  }

  popupForm.addEventListener("submit", handleProfileAvatarFormSubmit);
};

handleProfileAvatarPopup(
  openProfileAvatarPopupButton,
  profileAvatarForm,
  profileAvatarFormButton
);

// функция открытия попапа добавления новой карточки;

const handleCardPopup = function (openButton, popupForm, formButton) {
  openButton.addEventListener("click", function () {
    openModal(popupTypeNewCard);
    placeFormName.value = "";
    placeFormLink.value = "";
    clearValidation(placeForm, validationConfig);
  });

  //Функция сохранения внесенных в форму попапа данных;

  function handleCardFormSubmit(event) {
    event.preventDefault();
    setButtonMessage(formButton, "Сохранение...");
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
      })
      .catch((data) =>
        alert(`${data} - ошибка записи данных карточки на сервер`)
      )
      .finally(() => {
        setButtonMessage(formButton, "Сохранить");
      });
  }

  popupForm.addEventListener("submit", handleCardFormSubmit);
};

handleCardPopup(openPlacePopupButton, placeForm, placeFormButton);

// Функция добавления новой карточки в конец .places__list;

const renderNewCard = function (newArrElem) {
  container.append(
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

popupCloseButtons.forEach(function (item) {
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
