document.addEventListener("DOMContentLoaded", function () {
  var typed = new Typed(".typed-text", {
    strings: ["бесплатно.", "оффлайн."],
    typeSpeed: 40,
    backSpeed: 40,
    backDelay: 3000,
    startDelay: 800,
    loop: true,
    preStringTyped: function (arrayPos, self) {
      var typedText = document.querySelector(".typed-text");

      if (self.strings[arrayPos].trim() === "бесплатно.") {
        typedText.style.color = "#67a9ff";
      } else if (self.strings[arrayPos].trim() === "оффлайн.") {
        typedText.style.color = "#FF7496";
      }
    },
  });

  setTimeout(function () {
    var typedText = document.querySelector(".typed-text");
    typedText.classList.add("show");
  }, 500);
});

document.addEventListener("DOMContentLoaded", function () {
  var typedText = document.querySelector(".bottom-typed-text");
  var textToType =
    "Музыка – это тишина, которая живет между звуками. Найди свою тишину.";
  var typingSpeed = 60;
  var erasingSpeed = 30;
  var eraseDelay = 4500;
  var startDelay = 1500;
  var currentIndex = 0;
  var isTyping = true;

  function typeAndErase() {
    if (isTyping) {
      typedText.textContent = textToType.slice(0, currentIndex);
      currentIndex++;
      if (currentIndex <= textToType.length) {
        setTimeout(typeAndErase, typingSpeed);
      } else {
        isTyping = false;
        currentIndex = textToType.length;
        setTimeout(typeAndErase, eraseDelay);
      }
    } else {
      typedText.textContent = textToType.slice(0, currentIndex);
      currentIndex--;
      if (currentIndex >= 0) {
        setTimeout(typeAndErase, erasingSpeed);
      } else {
        isTyping = true;
        currentIndex = 0;
        setTimeout(typeAndErase, startDelay);
      }
    }
  }

  typedText.textContent = "";

  setTimeout(typeAndErase, startDelay);
});

const menu = document.querySelector("nav");
const menuOffsetTop = menu.offsetTop;

function handleScroll() {
  const scrollY = window.scrollY;

  if (scrollY >= menuOffsetTop) {
    menu.classList.add("fixed-menu");
  } else {
    menu.classList.remove("fixed-menu");
  }
}


document.addEventListener("DOMContentLoaded", function () {
  var algorithmBlocks = document.querySelectorAll(".algorithm-block");

  algorithmBlocks.forEach(function (block) {
    block.classList.add("hvr-grow"); 
    block.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.1)"; 
  });
});

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 5,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-nexts",
    prevEl: ".swiper-button-prevs",
  },
  keyboard: true,
  loop: true,
  breakpoints: {

    300: {
      slidesPerView: 1
    },

    501: {
      slidesPerView: 1
    },

    769: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    1025: {
      slidesPerView: 3,
      spaceBetween: 10
    },
  }
});


const emailInput = document.getElementById('emailInput');
const submitButton = document.getElementById('submitButton');
let isInputInvalid = false; 

emailInput.addEventListener('input', () => {
  const emailValue = emailInput.value;
  if (isValidEmail(emailValue)) {
    submitButton.removeAttribute('disabled');
    emailInput.classList.remove('input-error'); 
    isInputInvalid = false; 
  } else {
    submitButton.setAttribute('disabled', 'true');
    isInputInvalid = true; 
  }
});

submitButton.addEventListener('click', () => {
  const emailValue = emailInput.value;
  if (isInputInvalid) {
    emailInput.classList.add('input-error'); 
    emailInput.addEventListener('animationend', () => {
      emailInput.classList.remove('input-error'); 
    }, { once: true });
  } else if (isValidEmail(emailValue)) {
    document.querySelector('.subscription').classList.add('done'); 
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


document.addEventListener("DOMContentLoaded", function () {
  // Получаем элементы
  const pinkBlocks = document.querySelectorAll(".home-pink-block");
  const blueBlocks = document.querySelectorAll(".home-blue-block");
  const whiteBlock = document.querySelector(".home-white-block");
  const sections = document.querySelectorAll("section");

  // Создаем Intersection Observer для отслеживания видимости секций
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Если секция видима, применяем анимацию к блокам
        gsap.fromTo(pinkBlocks, { opacity: 0, y: 100 }, { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power2.out" });
        gsap.fromTo(blueBlocks, { opacity: 0, y: 100 }, { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power2.out" });
        gsap.fromTo(whiteBlock, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
        // Прекращаем наблюдение за данной секцией после применения анимации
        observer.unobserve(entry.target);
      }
    });
  });

  // Начинаем наблюдение за всеми секциями
  sections.forEach(section => {
    observer.observe(section);
  });
});






