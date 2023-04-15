window.addEventListener("DOMContentLoaded", function () {
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
  const modalTimeId = setTimeout(openModal, 5000);

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

  // getResourse("http://localhost:3000/menu").then((data) => {
  // data.forEach(({ img, altimg, title, descr, price }) => {
  //   new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
  //   });
  // });

  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
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
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
          <div class="modal__content">
              <div class="modal__close" data-close>×</div>
              <div class="modal__title">${message}</div>
          </div>
      `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  //Slider

  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector(".offer__slider-inner");
  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  next.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });

  // showSlides(slideIndex);

  // if (slides.length < 10){
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // }

  // function showSlides(n){
  //   if(n > slides.length){
  //     slideIndex = 1;
  //   }

  //   if (n < 1){
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach(item => item.style.display = "none");

  //   slides[slideIndex - 1].style.display = "block";

  //   if (slides.length < 10){
  //     current.textContent = `0${slideIndex}`;
  //   } else {
  //     current.textContent = slideIndex;
  //   }

  //  }

  //  function plusSlider(n){
  //   showSlides(slideIndex += n);
  // }

  // prev.addEventListener('click', () => {
  //   plusSlider(-1);
  // });

  // next.addEventListener('click', () => {
  //   plusSlider(1);
  // });
});
