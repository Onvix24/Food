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
