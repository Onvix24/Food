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
