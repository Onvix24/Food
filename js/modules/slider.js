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
