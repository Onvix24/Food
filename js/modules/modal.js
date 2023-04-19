function modal() {
  // Modal

  // Отримуємо всі кнопки, які мають атрибут data-modal
  const modalTrigger = document.querySelectorAll("[data-modal]");

  // Отримуємо модальне вікно та кнопку для закриття
  const modal = document.querySelector(".modal");
  const modalCloseBtn = document.querySelector("[data-close]");

  // Додаємо обробник події "click" на всі кнопки з атрибутом data-modal, щоб відкривати модальне вікно при кліку
  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  // Функція, яка відкриває модальне вікно
  function openModal() {
    // Додаємо клас "show" та видаляємо клас "hide" у модальному вікні, щоб показати його на сторінці
    modal.classList.add("show");
    modal.classList.remove("hide");

    // Забороняємо прокручування сторінки, поки відображається модальне вікно
    document.body.style.overflow = "hidden";

    // Очищуємо таймер, який автоматично відкриває модальне вікно через 5 секунд
    clearInterval(modalTimeId);
  }

  // Функція, яка закриває модальне вікно
  function closeModal() {
    // Додаємо клас "hide" та видаляємо клас "show" у модальному вікні, щоб приховати його на сторінці
    modal.classList.add("hide");
    modal.classList.remove("show");

    // Дозволяємо прокручування сторінки після закриття модального ві`кна
    document.body.style.overflow = "";
  }

  // Додаємо обробник події "click" на кнопку закриття модального вікна, щоб закрити його при кліку на кнопку
  modalCloseBtn.addEventListener("click", closeModal);

  // Додаємо обробник події "click" на модальне вікно, щоб закривати його при кліку поза вікном
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Додаємо обробник події "keydown" на документ, щоб закривати модальне вікно при натисканні на клавішу Esc
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // Задаємо затримку появи модального вікна
  const modalTimeId = setTimeout(openModal, 500000);

  // Функція, яка відкриває модальне вікно при скроллі до кінця сторінки
  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  // Додаємо обробник події scroll до вікна браузера
  window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;
