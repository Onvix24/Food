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
