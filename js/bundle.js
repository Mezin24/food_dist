/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  const calcEl = document.querySelector('.calculating__result span');
  let sex,
    weight,
    height,
    age,
    ratio = localStorage.getItem('ratio') || 1.375;

  if (!localStorage.getItem('sex')) {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  } else {
    sex = localStorage.getItem('sex');
  }

  if (!localStorage.getItem('ratio')) {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  } else {
    ratio = localStorage.getItem('ratio');
  }

  calcCalories();
  initLocalData('#gender > div', 'calculating__choose-item_active');
  initLocalData(
    '.calculating__choose_big > div',
    'calculating__choose-item_active'
  );

  getDynamicData('.calculating__choose_medium > input');
  getStaticData('#gender > div', 'calculating__choose-item_active');
  getStaticData(
    '.calculating__choose_big > div',
    'calculating__choose-item_active'
  );

  function getStaticData(selector, activClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) =>
      el.addEventListener('click', (e) => {
        if (el.getAttribute('data-ratio')) {
          ratio = +e.target.dataset.ratio;
          localStorage.setItem('ratio', ratio);
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', sex);
        }

        elements.forEach((el) => el.classList.remove(activClass));
        e.target.classList.add(activClass);
        calcCalories();
      })
    );
  }

  function getDynamicData(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) =>
      el.addEventListener('input', (e) => {
        const id = e.target.getAttribute('id');
        if (e.target.value.match(/\D/g)) {
          el.style.border = '1px solid red';
          return;
        } else {
          el.style.border = 'none';
        }

        switch (id) {
          case 'age':
            age = +e.target.value;
            break;
          case 'height':
            height = +e.target.value;
            break;
          case 'weight':
            weight = +e.target.value;
            break;
        }

        calcCalories();
      })
    );
  }

  function calcCalories() {
    if (!sex || !weight || !height || !age || !ratio) {
      calcEl.textContent = '_____';
      return;
    }

    if (sex === 'female') {
      calcEl.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      calcEl.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  function initLocalData(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      el.classList.remove(activeClass);

      if (el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        el.classList.add(activeClass);
      }
      if (el.getAttribute('id') === localStorage.getItem('sex')) {
        el.classList.add(activeClass);
      }
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  class Card {
    constructor(img, altimg, title, descr, price, parent) {
      this.img = img;
      this.altimg = altimg;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parent);
    }

    calcPrice() {
      return this.price * 72;
    }

    render() {
      const html = `
      <div class="menu__item ">
        <img src="${this.img}" alt="${this.img}">
        <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.calcPrice()}</span> грн/день</div>
        </div>
      </div>
      `;

      this.parent.insertAdjacentHTML('beforeend', html);
    }
  }

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menu').then((menu) => {
    menu.forEach(({ img, altimg, title, descr, price }) => {
      new Card(
        img,
        altimg,
        title,
        descr,
        price,
        '.menu__field > .container'
      ).render();
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Мы скоро свяжемся с вами!',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach((form) => bindPostData(form));

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMsg = document.createElement('img');
      statusMsg.src = message.loading;
      statusMsg.innerHTML = message.loading;
      statusMsg.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      e.target.insertAdjacentElement('afterend', statusMsg);

      const formData = new FormData(e.target);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
        .then((request) => {
          showThanksMessage(message.success);
          console.log(request);

          statusMsg.remove();
        })
        .catch(() => showThanksMessage(message.failure))
        .finally(() => e.target.reset());
    });
  }

  function showThanksMessage(message) {
    const modalDialoge = document.querySelector('.modal__dialog');
    modalDialoge.classList.add('hide');

    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);
    const thanksDialoge = document.createElement('div');
    thanksDialoge.classList.add('modal__dialog');
    thanksDialoge.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksDialoge);
    setTimeout(() => {
      thanksDialoge.remove();
      modalDialoge.classList.add('show');
      modalDialoge.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflowY = 'scroll';
}
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflowY = 'hidden';

  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  const modalBtns = document.querySelectorAll(triggerSelector);

  modalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal(modalSelector, modalTimerId);
    });
  });

  function openModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight + 1 >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', openModalByScroll);
    }
  }

  modal.addEventListener('click', (e) => {
    const target = e.target;

    if (
      target.classList.contains('modal') ||
      target.getAttribute('data-close') === ''
    ) {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    const btn = e.key;
    if (btn === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  window.addEventListener('scroll', openModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
  slide,
  sliderContainer,
  prevArrow,
  nextArrow,
  currentId,
  totalId,
  wrapper,
  field,
}) {
  function addZero(num) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  const slides = document.querySelectorAll(slide);
  const slider = document.querySelector(sliderContainer);
  const prevBtn = document.querySelector(prevArrow);
  const nextBtn = document.querySelector(nextArrow);
  const currentLabel = document.getElementById(currentId);
  const totalLabel = document.getElementById(totalId);
  const slidesWrapper = document.querySelector(wrapper);
  const slidesField = document.querySelector(field);
  const width = window.getComputedStyle(slidesWrapper).width;
  let current = 1;
  let offset = 0;
  const dots = [];

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = 'all 0.5s';
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach((slide) => (slide.style.width = width));

  totalLabel.textContent = addZero(slides.length);
  currentLabel.textContent = addZero(current);

  slider.style.position = 'relative';
  const sliderIndicator = document.createElement('ol');
  sliderIndicator.classList.add('carousel-indicators');
  slider.append(sliderIndicator);

  slides.forEach((_, i) => {
    const dot = document.createElement('li');
    dot.setAttribute('data-go-to', i + 1);
    dot.classList.add('dot');
    if (i === 0) {
      dot.style.opacity = 1;
    }
    sliderIndicator.append(dot);
    dots.push(dot);
  });

  const setActiveDot = (num) => {
    dots.forEach((dot) => (dot.style.opacity = '0.5'));
    dots[num - 1].style.opacity = 1;
  };

  nextBtn.addEventListener('click', () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (current === slides.length) {
      current = 1;
    } else {
      current++;
    }
    currentLabel.textContent = addZero(current);

    setActiveDot(current);
  });

  prevBtn.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (current === 1) {
      current = slides.length;
    } else {
      current--;
    }
    currentLabel.textContent = addZero(current);

    setActiveDot(current);
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const dotIndex = e.target.getAttribute('data-go-to');
      current = +dotIndex;
      offset = +width.slice(0, width.length - 2) * (dotIndex - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      currentLabel.textContent = addZero(current);
      setActiveDot(current);
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(
  tabSelector,
  tabsContentSelector,
  tabsParentSlector,
  activeClass
) {
  const tabs = document.querySelectorAll(tabSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  const tabsParent = document.querySelector(tabsParentSlector);

  const removeTabs = () => {
    tabsContent.forEach((tab) => {
      tab.classList.add('hide');
      tab.classList.remove('fade', 'show');
    });

    tabs.forEach((tab) => {
      tab.classList.remove(activeClass);
    });
  };

  const showTab = (i = 0) => {
    tabs[i].classList.add('tabheader__item_active');
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
  };

  removeTabs();
  showTab();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains(tabSelector.slice(1))) {
      tabs.forEach((tab, i) => {
        if (target === tab) {
          removeTabs();
          showTab(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(timerSelector, deadline) {
  setTimer(timerSelector, deadline);

  function getDeadlineRemaining(endtime) {
    const remaining = Date.parse(endtime) - Date.parse(new Date());
    if (remaining <= 0) {
      return {
        remaining: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24)),
      hours = Math.floor((remaining / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((remaining / (1000 * 60)) % 60),
      seconds = Math.floor((remaining / 1000) % 60);

    return {
      remaining,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function addZero(num) {
    if (num <= 0 || num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setTimer(selector, endtime) {
    const timerEl = document.querySelector(selector),
      daysEl = timerEl.querySelector('#days'),
      hoursEl = timerEl.querySelector('#hours'),
      minutesEl = timerEl.querySelector('#minutes'),
      secondsEl = timerEl.querySelector('#seconds'),
      timerId = setInterval(displayTimer, 1000);

    displayTimer();

    function displayTimer() {
      const t = getDeadlineRemaining(endtime);
      if (t.remaining <= 0) {
        clearInterval(timerId);
      }
      daysEl.innerHTML = addZero(t.days);
      hoursEl.innerHTML = addZero(t.hours);
      minutesEl.innerHTML = addZero(t.minutes);
      secondsEl.innerHTML = addZero(t.seconds);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'Content-type': 'application/json',
    },
  });

  return await res.json();
};

const getData = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch url ${url}, status ${res.status}`);
  }

  return await res.json();
};





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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");








window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(
    () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId),
    5000000
  );

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(
    '.tabheader__item',
    '.tabcontent',
    '.tabheader__items',
    'tabheader__item_active'
  );
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-05-17T11:48:00');
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    slide: '.offer__slide',
    sliderContainer: '.offer__slider',
    prevArrow: '.offer__slider-prev',
    nextArrow: '.offer__slider-next',
    currentId: 'current',
    totalId: 'total',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
  });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map