/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
  // calc

  const result = document.querySelector(".calculating__result span");
  let sex, height, weight, age, ratio;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }

  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "____";
      return;
    }

    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcTotal();

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }
  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "3px inset red";
      } else {
        input.style.border = "none";
      }
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }

  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}

module.exports = calc;


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
  //Використовуєм класи для карточок

  class MenuCard {
    // Клас, що описує об'єкт меню
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      // Конструктор класу, який ініціалізує властивості об'єкта

      // Зберігає зображення властивість об'єкта
      this.src = src;
      // Зберігає опис зображення властивість об'єкта
      this.alt = alt;
      // Зберігає заголовок меню властивість об'єкта
      this.title = title;
      // Зберігає опис меню властивість об'єкта
      this.descr = descr;
      // Зберігає ціну меню властивість об'єкта
      this.price = price;
      // Зберігає список CSS класів для стилізації властивість об'єкта
      this.classes = classes;
      // Зберігає DOM елемент в який буде додано меню властивість об'єкта
      this.parent = document.querySelector(parentSelector);
      // Курс обміну для переведення ціни в гривні
      this.transfer = 40;
      // Переведення ціни в гривні
      this.changeToUAH();
    }

    // Метод для переведення ціни в іншу валюту (гривні)
    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    // Метод для створення HTML-розмітки елементу меню
    render() {
      // Створення нового DOM елементу div
      const element = document.createElement("div");

      // Перевірка чи є в об'єкта класи для стилізації
      if (this.classes.length === 0) {
        // Якщо класів немає, то додати клас 'menu__item'
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        // Якщо є, то додати їх усі до елементу
        this.classes.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
        <img src= ${this.src} ${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
    `; // HTML-код елементу меню
      this.parent.append(element); // Додавання створеного елементу меню в DOM
    }
  }

  const getResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${error.status}`);
    }
    return await res.json();
  };

  getResourse("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });
}

module.exports = cards;


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
  //Forms

  const forms = document.querySelectorAll("form");
  // Створюємо об'єкт з повідомленнями, що будуть виводитися під час відправки форми
  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  // Додаємо обробник події на кожну форму на сторінці
  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    // Функція, яка приймає URL та дані в форматі JSON, та відправляє POST запит на сервер
    const res = await fetch(url, {
      // Відправляємо запит на сервер з URL та JSON даними
      method: "POST", // Встановлюємо метод запиту на POST
      headers: {
        // Встановлюємо заголовки запиту
        "Content-Type": "application/json", // Встановлюємо тип даних на JSON
      },
      body: data, // Встановлюємо JSON дані в тіло запиту
    });

    return await res.json(); // Повертаємо JSON відповідь від сервера
  };

  function bindPostData(form) {
    // Функція, яка вішає обробник на подію submit форми та відправляє дані на сервер
    form.addEventListener("submit", (e) => {
      // Додаємо обробник події submit на форму
      e.preventDefault(); // Скасовуємо дію по замовчуванню (відправку форми)

      let statusMessage = document.createElement("img"); // Створюємо елемент зображення
      statusMessage.src = message.loading; // Встановлюємо зображення завантаження
      statusMessage.style.cssText = `
              display: block;
              margin: 0 auto;
          `; // Встановлюємо стилі для зображення
      form.insertAdjacentElement("afterend", statusMessage); // Вставляємо зображення після форми

      const formData = new FormData(form); // Створюємо об'єкт FormData з даними форми

      const json = JSON.stringify(Object.fromEntries(formData.entries())); // Конвертуємо дані FormData в JSON формат

      postData("http://localhost:3000/requests", json) // Відправляємо дані на сервер
        .then((data) => {
          // Обробляємо відповідь сервера
          console.log(data); // Виводимо відповідь в консоль
          showThanksModal(message.success); // Відображаємо модальне вікно з повідомленням про успішну відправку даних
          statusMessage.remove(); // Видаляємо елемент зображення зі статусом відправки
        })
        .catch(() => {
          // Обробляємо помилку відправки даних
          showThanksModal(message.failure); // Відображаємо модальне вікно з повідомленням про невдалу відправку даних
        })
        .finally(() => {
          // Виконується завжди після відправки даних, незалежно від успішності чи невдачі
          form.reset(); // Очищаємо форму після відправки даних
        });
    });
  }

  function showThanksModal(message) {
    // Функція приймає повідомлення, яке буде відображено в модальному вікні
    const prevModalDialog = document.querySelector(".modal__dialog"); // Знаходимо елемент модального вікна, який містить контент

    prevModalDialog.classList.add("hide"); // Додаємо клас "hide", щоб приховати контент модального вікна
    openModal(); // Викликаємо функцію, яка відкриє модальне вікно

    const thanksModal = document.createElement("div"); // Створюємо елемент div
    thanksModal.classList.add("modal__dialog"); // Додаємо клас "modal__dialog" до створеного елемента
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `; // Додаємо html-код для відображення модального вікна з переданим повідомленням
    document.querySelector(".modal").append(thanksModal); // Додаємо створений елемент до модального вікна
    setTimeout(() => {
      // Запускаємо тайме
      thanksModal.remove(); // Видаляємо створений елемент модального вікна
      prevModalDialog.classList.add("show"); // Додаємо клас "show", щоб показати контент модального вікна
      prevModalDialog.classList.remove("hide"); // Видаляємо клас "hide"
      closeModal(); // Викликаємо функцію, яка закриє модальне вікно
    }, 4000); // Задаємо час, через який буде виконано функцію в мілісекундах
  }
}

module.exports = forms;


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
  //Slider

  const slides = document.querySelectorAll(".offer__slide"), // Знаходимо всі елементи слайдів
    slider = document.querySelector(".offer__slider"), //Знаходимо перший елемент з класом "offer__slider"
    prev = document.querySelector(".offer__slider-prev"), // Знаходимо елемент кнопки "попередній слайд"
    next = document.querySelector(".offer__slider-next"), // Знаходимо елемент кнопки "наступний слайд"
    total = document.querySelector("#total"), // Знаходимо елемент, в якому буде відображатися загальна кількість слайдів
    current = document.querySelector("#current"), // Знаходимо елемент, в якому буде відображатися поточний номер слайда
    slidesWrapper = document.querySelector(".offer__slider-wrapper"), // Знаходимо обгортку слайдів
    width = window.getComputedStyle(slidesWrapper).width, // Визначаємо ширину обгортки слайдів
    slidesField = document.querySelector(".offer__slider-inner"); // Знаходимо елемент, який містить всі слайди
  let slideIndex = 1; // Встановлюємо початковий номер слайда
  let offset = 0; // Встановлюємо початкове зміщення слайдів

  if (slides.length < 10) {
    // Перевіряємо, чи кількість слайдів менше 10
    total.textContent = `0${slides.length}`; // Якщо так, то додаємо 0 перед загальною кількістю слайдів
    current.textContent = `0${slideIndex}`; // Якщо так, то додаємо 0 перед поточним номером слайда
  } else {
    total.textContent = slides.length; // Якщо кількість слайдів більше або дорівнює 10, то виводимо звичайну загальну кількість слайдів
    current.textContent = slideIndex; // Якщо кількість слайдів більше або дорівнює 10, то виводимо звичайний поточний номер слайда
  }

  slidesField.style.width = 100 * slides.length + "%"; // Встановлюємо ширину поля слайдів
  slidesField.style.display = "flex"; // Встановлюємо стиль відображення для поля слайдів
  slidesField.style.transition = "0.5s all"; // Встановлюємо стиль переходу для поля слайдів

  slidesWrapper.style.overflow = "hidden"; // Встановлюємо стиль переповнення для обгортки слайдів

  slides.forEach((slide) => {
    // Проходимось по кожному слайду
    slide.style.width = width; // Встановлюємо ширину для кожного слайда
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
  position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none; 
    `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, "");
  }

  function opacityDot() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = "1";
  }
  next.addEventListener("click", () => {
    // додаємо обробник події для кнопки "next"
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      // якщо досягнуто останнього слайда, перехід на перший слайд
      offset = 0;
    } else {
      // інакше збільшуємо відступ на ширину слайда
      offset += deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`; // зміщуємо вміст блоку зі слайдами

    if (slideIndex == slides.length) {
      // якщо досягнуто останнього слайда, перехід на перший слайд
      slideIndex = 1;
    } else {
      // інакше збільшуємо індекс поточного слайда
      slideIndex++;
    }

    if (slides.length < 10) {
      // якщо кількість слайдів менша за 10, додаємо перед індексом "0"
      current.textContent = `0${slideIndex}`;
    } else {
      // інакше відображаємо просто індекс
      current.textContent = slideIndex;
    }

    opacityDot();
  });

  prev.addEventListener("click", () => {
    // додаємо обробник події для кнопки "prev"
    if (offset == 0) {
      // якщо досягнуто першого слайда, перехід на останній слайд
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      // інакше зменшуємо відступ на ширину слайда
      offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`; // зміщуємо вміст блоку зі слайдами

    if (slideIndex == 1) {
      // якщо досягнуто першого слайда, перехід на останній слайд
      slideIndex = slides.length;
    } else {
      // інакше зменшуємо індекс поточного слайда
      slideIndex--;
    }

    if (slides.length < 10) {
      // якщо кількість слайдів менша за 10, додаємо перед індексом "0"
      current.textContent = `0${slideIndex}`;
    } else {
      // інакше відображаємо просто
    }

    opacityDot();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`; // зміщуємо вміст блоку зі слайдами

      if (slides.length < 10) {
        // якщо кількість слайдів менша за 10, додаємо перед індексом "0"
        current.textContent = `0${slideIndex}`;
      } else {
        // інакше відображаємо просто індекс
        current.textContent = slideIndex;
      }

      opacityDot();
    });
  });
}
module.exports = slider;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
  // Tabs

  // Отримуємо всі елементи з класом ".tabheader__item"
  let tabs = document.querySelectorAll(".tabheader__item");
  // Отримуємо всі елементи з класом ".tabcontent"
  let tabsContent = document.querySelectorAll(".tabcontent");
  // Отримуємо батьківський елемент, щоб додати обробник подій
  let tabsParent = document.querySelector(".tabheader__items");

  // Функція для приховування вмісту всіх табів
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide"); // Додаємо клас "hide"
      item.classList.remove("show", "fade"); // Видаляємо класи "show" та "fade"
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active"); // Видаляємо клас "tabheader__item_active"
    });
  }

  // Функція для відображення вмісту табу з індексом "i"
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade"); // Додаємо класи "show" та "fade"
    tabsContent[i].classList.remove("hide"); // Видаляємо клас "hide"
    tabs[i].classList.add("tabheader__item_active"); // Додаємо клас "tabheader__item_active"
  }

  // Приховуємо вміст всіх табів
  hideTabContent();
  // Відображуємо вміст першого табу
  showTabContent();

  // Додаємо обробник подій "click" до батьківського елемента "tabsParent"
  tabsParent.addEventListener("click", function (event) {
    const target = event.target; // Отримуємо цільовий елемент, на який клікнули
    if (target && target.classList.contains("tabheader__item")) {
      // Перевіряємо, чи цільовий елемент має клас ".tabheader__item"
      tabs.forEach((item, i) => {
        // Проходимо по всім елементам в "tabs"
        if (target == item) {
          // Якщо збігається, то викликаємо функції "hideTabContent()" та "showTabContent(i)"
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

module.exports = tabs;


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
  // Timer

  // Задаємо кінцевий термін в форматі рядка
  const deadline = "2023-09-13";

  // Функція для обчислення часу, який залишився до кінцевого терміну
  function getTimeRemaining(endtime) {
    // Ініціалізуємо змінні, які будуть містити відповідні значення часу
    let days, seconds, minutes, hours;

    // Обчислюємо час, який залишився до кінцевого терміну у мілісекундах
    const t = Date.parse(endtime) - Date.parse(new Date());

    // Якщо залишилось менше 1 секунди, то усі значення часу будуть 0
    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      // Інакше обчислюємо кількість днів, годин, хвилин та секунд
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      seconds = Math.floor((t / 1000) % 60);
      minutes = Math.floor((t / 1000 / 60) % 60);
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    }

    // Повертаємо об'єкт зі значеннями часу
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  // Функція, яка додає "0" перед значенням часу, якщо воно однозначне
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }
  // Функція для відображення значень часу на сторінці
  function setClock(selector, endtime) {
    // Отримуємо елементи таймера зі сторінки
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds");

    // Встановлюємо інтервал для оновлення значень таймера кожну секунду
    const timeInterval = setInterval(updateClock, 1000);

    // Оновлюємо значення таймера
    updateClock();

    function updateClock() {
      // Отримуємо значення часу залишку від функції getTimeRemaining()
      const t = getTimeRemaining(endtime);

      // Відображаємо значення днів, годин, хвилин та секунд на сторінці
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      // Якщо час вичерпано, то зупиняємо інтервал
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  // Встановлюємо таймер на сторінку з використанням заданих параметрів
  setClock(".timer", deadline);
}

module.exports = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener("DOMContentLoaded", function () {
  const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
    modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
    timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
    cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
    calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
    forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
    slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

  tabs();
  modal();
  timer();
  cards();
  calc();
  forms();
  slider();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map