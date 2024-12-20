import { updateLikeCard, deleteCard } from "./api.js";

const template = document.querySelector("#card-template").content;
// Функция создания карточки
const createCard = function (
  arrayElement,
  removeCard,
  likeCard,
  openCardImage,
  userId
) {
  const cardElement = template.querySelector(".card").cloneNode(true); // клонирую шаблон tamplate

  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeNumber = cardElement.querySelector(".card__likes-number");
  const cardTitle = cardElement.querySelector(".card__title");
  const delButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = arrayElement.name; //добавил название картинки из initialCards
  cardImage.src = arrayElement.link;
  cardImage.setAttribute(
    "alt",
    "Картинка с видом на" + " " + arrayElement.name
  );
  if (arrayElement.likes.length > 0) {
    cardLikeNumber.textContent = arrayElement.likes.length;
  } else {
    cardLikeNumber.textContent = "";
  }

  cardImage.addEventListener("click", () => openCardImage(arrayElement));

  if (arrayElement.likes.find((item) => item["_id"] === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    likeCard(likeButton, arrayElement._id, cardLikeNumber);
  });

  if (userId !== arrayElement.owner._id) {
    delButton.style.display = "none";
  } else {
    delButton.addEventListener("click", function (event) {
      removeCard(event.target.closest(".card"), arrayElement._id);
    });
  }

  return cardElement;
};

// Функция удаления карточки

function handleDeleteCard(card, id) {
  deleteCard(id)
    .then(() => {
      card.remove();
    })
    .catch((error) => {
      console.log(error);
    });
}
// Функция лайка карточки

const handleLikeCard = function (button, id, likeNum) {
  const isLiked = button.classList.contains("card__like-button_is-active");
  updateLikeCard(id, isLiked)
    .then((data) => {
      button.classList.toggle("card__like-button_is-active");
      if (data.likes.length === 0) {
        likeNum.textContent = "";
      } else {
        likeNum.textContent = data.likes.length;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export { createCard, handleDeleteCard, handleLikeCard };
