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
