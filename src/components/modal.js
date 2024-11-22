//Функция открытия модального окна;

const openModal = function (popup) {
  popup.classList.add("popup_is-animated");
  document.addEventListener("keydown", closeModalEscape);
  setTimeout(function () {
    popup.classList.add("popup_is-opened");
  }, 0);
};
// Функция закрытия модального окна;

const closeModal = function (popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEscape);
};

// Функция закрытия модальноного окна при нажатии на "Esc";

const closeModalEscape = function (event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    closeModal(activePopup);
  }
};

export { openModal, closeModal};
