//  Общая функция открытия попапов;

const openModal = function (popup) {
  popup.classList.add("popup_is-animated");
  document.addEventListener("keydown", closeModalEscape);
  setTimeout(function () {
    popup.classList.add("popup_is-opened");
  }, 0);
};
// Общая функция закрытия попапов;

const closeModal = function (popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEscape);
};

// Функция закрытия попапов при нажатии на "Esc";

const closeModalEscape = function (event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    closeModal(activePopup);
  }
};

export { openModal, closeModal };
