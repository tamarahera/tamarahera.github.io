/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/accordion.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordion.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const accordion = (triggersSelector, activeClassBtn, activeClassContent) => {
  const btns = document.querySelectorAll(triggersSelector);
  btns.forEach(item => {
    item.addEventListener('click', function () {
      console.log(this.nextElementSibling);
      this.classList.toggle(activeClassBtn);
      this.nextElementSibling.classList.toggle(activeClassContent);
      if (this.classList.contains(activeClassBtn)) {
        this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 20 + 'px';
      } else {
        this.nextElementSibling.style.maxHeight = '0px';
      }
      ;
    });
  });
};
/* harmony default export */ __webpack_exports__["default"] = (accordion);

/***/ }),

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const calc = (lessons, tutor, promocode, result, promocodeSuccess) => {
  const lessonsBlock = document.querySelector(lessons),
    tutorBlocks = Array.from(document.querySelectorAll(tutor)),
    promocodeBlock = document.querySelector(promocode),
    resultBlock = document.querySelector(result),
    promocodeMessage = document.querySelector(promocodeSuccess);
  let sum = 0;
  const calcFunc = () => {
    let hourPrice,
      courseName,
      tutorBlock = tutorBlocks.find(item => item.checked);
    switch (+lessonsBlock.value) {
      case 5:
        hourPrice = 13;
        courseName = 'Minimum';
        break;
      case 10:
        hourPrice = 12;
        courseName = 'Economical';
        break;
      case 15:
        hourPrice = 11;
        courseName = 'Normally';
        break;
      case 20:
        hourPrice = 10;
        courseName = 'Advanced';
        break;
    }
    if (tutorBlock.value === 'native') {
      hourPrice = hourPrice + 2;
    }
    sum = Math.round(hourPrice * +lessonsBlock.value);
    if (lessonsBlock == '' || tutorBlocks == '') {
      resultBlock.textContent = 'Please, choose an amount of lessons and a tutor';
      return;
    }
    if (promocodeBlock.value === 'MOINMOIN') {
      sum = Math.round(sum - hourPrice * 2);
      promocodeMessage.classList.add('modal__promocode-text--active');
    } else {
      promocodeMessage.classList.remove('modal__promocode-text--active');
    }
    resultBlock.innerHTML = `
            <b class="modal__calc-course">${courseName}</b>
            <p class="modal__calc-lessons"><b>${+lessonsBlock.value}</b> lessons with a ${tutorBlock.value} tutor</p>
            <p class="modal__calc-price">
                Price for an one lesson: <b>${hourPrice} €</b><br>
                Total price: <input class="modal__calc-total" name="sum" value="${sum}€">
            </p>
        `;
  };
  calcFunc();
  lessonsBlock.addEventListener('change', calcFunc);
  tutorBlocks.forEach(item => {
    item.addEventListener('input', calcFunc);
  });
  promocodeBlock.addEventListener('input', calcFunc);
};
/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./src/js/modules/checkTextInput.js":
/*!******************************************!*\
  !*** ./src/js/modules/checkTextInput.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const checkTextInput = inputsSelector => {
  const textInputs = document.querySelectorAll(inputsSelector);
  textInputs.forEach(item => {
    item.addEventListener('keypress', function (e) {
      if (e.key.match(/[^a-z 0-9 äöüß]/ig)) {
        e.preventDefault();
      }
    });
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[^a-z 0-9 äöüß]/ig, '');
    });
  });
};
/* harmony default export */ __webpack_exports__["default"] = (checkTextInput);

/***/ }),

/***/ "./src/js/modules/cookie.js":
/*!**********************************!*\
  !*** ./src/js/modules/cookie.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const cookie = () => {
  const cookieStorage = {
    // створ свій об'єкт з методами по типу localStorage
    getItem: key => {
      const cookies = document.cookie.split(';').map(item => item.split('=')).reduce((acc, _ref) => {
        let [key, value] = _ref;
        return {
          ...acc,
          [key.trim()]: value
        };
      }, {});
      return cookies[key];
    },
    setItem: (key, value) => {
      document.cookie = `${key}=${value};expires=Sun, 17 Jun 2050 06:12:51 GTM`;
    }
  };
  const storageType = cookieStorage;
  const consentPropertyType = 'site_consent';
  const toggleStorage = prop => {
    // зберігаємо згоду юзера
    storageType.setItem(consentPropertyType, prop);
  };
  const btnCancel = document.querySelector('[data-btn="cookie-reject"]');
  const btnAccept = document.querySelector('[data-btn="cookie-accept"]');
  btnAccept.addEventListener('click', () => {
    toggleStorage(true);
  });
  btnCancel.addEventListener('click', () => {
    toggleStorage(false);
  });
};
/* harmony default export */ __webpack_exports__["default"] = (cookie);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");

const forms = () => {
  const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input'),
    textareas = document.querySelectorAll('textarea'),
    inputPhone = document.querySelector('input[name="tel"]');
  inputPhone.addEventListener('input', () => {
    inputPhone.value = inputPhone.value.replace(/[^-0-9\+\(\)]/, '');
  });
  const message = {
    loading: 'Loading...',
    success: 'Thanks! We will answer as soon as possible.',
    error: 'Something goes wrong.',
    spinner: 'icons/spinner.gif',
    ok: 'icons/ok.svg',
    fail: 'icons/fail.svg'
  };
  const path = {
    question: 'server.php',
    order: 'order.php'
  };
  const resetInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
    textareas.forEach(item => {
      item.value = '';
    });
  };
  form.forEach(item => {
    item.addEventListener('submit', e => {
      e.preventDefault();
      let statusMessage = document.createElement('div'); // ств блок, а який вставимо повідомлення для корист
      statusMessage.classList.add('status');
      item.parentNode.appendChild(statusMessage); // ставимо повідомлення за межами форми

      item.classList.add('animate__animated', 'animate__fadeOutUp'); // cама форма має щезнути
      setTimeout(() => {
        item.style.display = 'none';
      }, 400);
      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      statusImg.classList.add('animate__animated', 'animate__fadeInUp', 'status__img');
      statusMessage.appendChild(statusImg);
      let textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      textMessage.classList.add('status__text');
      statusMessage.appendChild(textMessage);
      const formData = new FormData(item); // або JSON

      let api;
      item.closest('#modalOrder') ? api = path.order : api = path.question;
      console.log(api);
      (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.postData)(api, formData).then(result => {
        console.log(result);
        statusImg.setAttribute('src', message.ok);
        textMessage.textContent = message.success;
      }).catch(() => {
        statusImg.setAttribute('src', message.fail);
        textMessage.textContent = message.failure;
      }).finally(() => {
        resetInputs();
        setTimeout(() => {
          statusMessage.remove();
          item.style.display = 'block';
          item.classList.remove('animate__fadeOutUp');
          item.classList.add('animate__fadeInDown');
        }, 4000);
      });
    });
  });
};
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./src/js/modules/hamburger.js":
/*!*************************************!*\
  !*** ./src/js/modules/hamburger.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const hamburger = (btnOpen, btnClose, menuClass, logoText, headerActiveClass, logoActiveClass, overlayClass) => {
  const hamburgerBtnOpen = document.querySelector(btnOpen),
    hamburgerBtnClose = document.querySelector(btnClose),
    menu = document.querySelector(menuClass),
    logo = document.querySelector(logoText);
  if (menu.classList.contains(headerActiveClass) && !logo.classList.contains(logoActiveClass)) {
    logo.classList.add(logoActiveClass);
  }
  function openMenu() {
    menu.classList.add(headerActiveClass);
    logo.classList.add(logoActiveClass);
  }
  function closeMenu() {
    menu.classList.remove(headerActiveClass);
    logo.classList.remove(logoActiveClass);
  }
  hamburgerBtnOpen.addEventListener('click', () => {
    if (!menu.classList.contains(headerActiveClass)) {
      openMenu();
    }
  });
  hamburgerBtnClose.addEventListener('click', () => {
    if (menu.classList.contains(headerActiveClass)) {
      closeMenu();
    }
  });
  menu.parentElement.addEventListener('click', e => {
    if (e.target.tagName === 'A' && menu.classList.contains(headerActiveClass) || e.target.classList.contains(overlayClass)) {
      closeMenu();
    }
  });
};
/* harmony default export */ __webpack_exports__["default"] = (hamburger);

/***/ }),

/***/ "./src/js/modules/mask.js":
/*!********************************!*\
  !*** ./src/js/modules/mask.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const mask = inputSelector => {
  let setCursorPosition = (position, element) => {
    element.focus();
    if (element.setSelectionRange) {
      // виділяє текст від до
      element.setSelectionRange(position, position); // виділяє не текст, а ставить курсор в певну позицію
    } else if (element.createTextRange) {
      // поліфіл для ie
      let range = element.createTextRange();
      range.collapse(true); // об'єднує граничні точки діапазону
      range.moveEnd('character', position); // кінцева точка виділення
      range.moveStart('character', position); // стартова точка виділення
      range.select(); //виділимо знач.
    }
  };

  function createMask(event) {
    let matrix = '+_ (___) ___ __ __',
      //можна задати через json
      i = 0,
      def = matrix.replace(/\D/g, ''),
      //всі не цифри видаляються, статичне значення
      val = this.value.replace(/\D/g, ''); //динамічне значення

    console.log(matrix);
    console.log(def);
    console.log(val);
    if (def.length >= val.length) {
      // коли хоче видалити + з матриці, не даємо йому це зробити
      val = def;
    }
    this.value = matrix.replace(/./g, function (a) {
      // a - кожен символ в матриці
      // return (/[_\d]/.test(a) && i < val.length) ? val.charAt(i++) : i >= val.length ? '' : a;
      if (/[_\d]/.test(a) && i < val.length) {
        return val.charAt(i++);
      }
      if (i >= val.length) {
        return '';
      }
      return a;

      /*  
      /[_\d]/.test(a) - true/false
      i < val.length - початково і=0, val.length - це те що ввів користувач 
      якщо це правда, то повертається просто val.charAt(i++) - цифра наступна за цифрою яка перевіряється і знаходиться на позиції і(index)
      i >= val.length ? '' - якщо індекс більше за довжину того що ввід користувач - пуска строка
      або повертаємо а - символ що був початково
      */
    });

    if (event.type === 'blur') {
      //коли користувач перестав вводити дані
      if (this.value.length == 1) {
        this.value = '';
      }
    } else {
      setCursorPosition(this.value.length, this); //к-сть символів в інпут, сам інпут
    }
  }

  let inputs = document.querySelectorAll(inputSelector);
  inputs.forEach(item => {
    item.addEventListener('input', createMask);
    item.addEventListener('keypress', createMask);
    item.addEventListener('focus', createMask);
    item.addEventListener('blue', createMask);
  });
};
/* harmony default export */ __webpack_exports__["default"] = (mask);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const modal = () => {
  let onceOpenModal = false;
  const giftBtn = document.querySelector('[data-btn="gift"]');
  function closeModal(modalItem, activeClass) {
    modalItem.classList.remove(activeClass);
    setTimeout(() => {
      modalItem.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = `0px`;
      if (giftBtn) {
        giftBtn.style.marginRight = `0px`;
      }
    }, 400);
  }
  function openModal(modalItem, activeClass, scrollNum) {
    modalItem.style.display = 'flex';
    modalItem.classList.add(activeClass);
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = `${scrollNum}px`;
    if (giftBtn) {
      giftBtn.style.marginRight = `${scrollNum}px`;
    }
  }
  function initModal(modalSelector, activeClass, overlayClass) {
    let openSelector = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    let closeSelector = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    let deleteBtn = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    let openImg = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    const modal = document.querySelector(modalSelector),
      modals = document.querySelectorAll('.modal'),
      openBtns = document.querySelectorAll(openSelector),
      scroll = calculateScroll();
    modals.forEach(item => {
      if (openSelector == true) {
        closeModal(item, activeClass);
      }
    });
    if ((!document.cookie || document.cookie.match(/false/ig)) && modalSelector === '#modalCookie') {
      openModal(modal, activeClass, scroll);
    } //якщо кукі не існують або вони false, показуємо модальне вікно з кукі при запуску

    openBtns.forEach(item => {
      item.addEventListener('click', e => {
        onceOpenModal = true;
        if (e.target) {
          e.preventDefault();
        }
        if (deleteBtn) {
          item.remove();
          window.removeEventListener('scroll', initScroll);
        }
        if (openImg) {
          let img = modal.querySelector('img'),
            p = modal.querySelector('p'),
            href = e.currentTarget.getAttribute('href'),
            subtitle = href.replace(/(.*\/)|(\.\w*)/gi, '').replace(/_/gi, ' ');
          img.setAttribute('src', href);
          img.setAttribute('alt', subtitle);
          p.textContent = `${subtitle}, Germany`;
        }
        openModal(modal, activeClass, scroll);
      });
    });
    try {
      const closeBtns = document.querySelectorAll(closeSelector);
      closeBtns.forEach(item => {
        item.addEventListener('click', () => {
          closeModal(modal, activeClass);
        });
      });
    } catch {}
    modal.addEventListener('click', e => {
      if (e.target.classList.contains(overlayClass)) {
        closeModal(modal, activeClass);
      }
      ;
    });
    window.addEventListener('keydown', e => {
      if (modal.classList.contains(activeClass) && e.key === 'Escape') {
        closeModal(modal, activeClass);
      }
    });
  }
  ;
  function showModalWithTime(btnSelector, time) {
    setTimeout(() => {
      const modals = document.querySelectorAll('.modal'),
        modalsDisplay = Array.from(modals).some(item => {
          return item.classList.contains('modal--active');
        });
      if (!modalsDisplay) {
        document.querySelector(btnSelector).click();
      }
    }, time);
  }
  ;
  showModalWithTime('[data-btn="level"]', 60000);
  function calculateScroll() {
    let block = document.createElement('div');
    block.style.width = '100px';
    block.style.height = '100px';
    block.style.overflowY = 'scroll';
    block.style.visibility = 'hidden';
    document.body.appendChild(block);
    let scrollWidth = block.offsetWidth - block.clientWidth;
    block.remove();
    return scrollWidth;
  }
  function initScroll() {
    openByScroll('[data-btn="gift"]');
  }
  function openByScroll(btnSelector) {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - 5;
    // element - для стандартних браузерів
    // body - для більш старих

    if (!onceOpenModal && window.scrollY + document.documentElement.clientHeight >= scrollHeight) {
      document.querySelector(btnSelector).click();
      window.removeEventListener('scroll', initScroll);
    }
    // scrollY - скільки зверху пролистано
    // clientHeight - те що бачить користувач зараз
    // scrollHeight - повна висота документу
  }

  window.addEventListener('scroll', initScroll);
  initModal('#modalContact', 'modal--active', 'modal__overlay', '[data-btn="contact"]', '#modalContact [data-btn="modal-close"]');
  initModal('#modalLevel', 'modal--active', 'modal__overlay', '[data-btn="level"]');
  initModal('#modalOrder', 'modal--active', 'modal__overlay', '[data-btn="order"]', '#modalLevel [data-btn="modal-close"]');
  initModal('#modalGift', 'modal--active', 'modal__overlay', '[data-btn="gift"]', '#modalGift [data-btn="modal-close"]', true);
  initModal('#modalImg', 'modal--active', 'modal__overlay', '.phrase__item-link', false, false, true);
  initModal('#modalCookie', 'modal--active', 'modal__overlay', false, '#modalCookie .modal__btn');

  /*     const cookie = document.querySelector('#modalCookie');
      console.log(cookie)
      setTimeout(() => {
          cookie.style.cssText = `display:flex;opacity:1;animation-name:none;`
      }, 1000); */
};

/* harmony default export */ __webpack_exports__["default"] = (modal);

/***/ }),

/***/ "./src/js/modules/showMoreReviews.js":
/*!*******************************************!*\
  !*** ./src/js/modules/showMoreReviews.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");

const showMoreReviews = (trigger, wrapper) => {
  const btn = document.querySelector(trigger);
  btn.addEventListener('click', function () {
    (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.getResource)('db.json') //http://localhost:3000/data
    .then(res => createCards(res.data)) // res
    .catch(error => console.log(error));
    this.remove();
  });
  function createCards(response) {
    response.forEach(_ref => {
      let {
        name,
        date,
        src,
        text,
        rating
      } = _ref;
      let card = document.createElement('li'),
        starsBlock = document.createElement('ul'),
        star = document.createElement('li');
      card.classList.add('review__item', 'animate__animated', 'animate__fadeInUp');
      starsBlock.classList.add('review__star-list');
      star.classList.add('review__star-item');
      star.innerHTML = `<img src="icons/star-solid.svg" alt="star" class="review__star-img">`;
      for (let i = 1; i <= 5; i++) {
        if (i <= +rating) {
          starsBlock.innerHTML += `
                        <li class="review__star-item">
                            <img src="icons/star-solid.svg" alt="star"
                            class="review__star-img">
                        </li>
                    `;
        } else {
          starsBlock.innerHTML += `
                        <li class="review__star-item">
                            <img src="icons/star-inline.svg" alt="star-inline"
                            class="review__star-img">
                        </li>
                    `;
        }
      }
      card.innerHTML = `
                <div class="review__box">
                    <img src=${src} alt="review" class="review__box-img">
                </div>
                <h3 class="subtitle review__name">${name}</h3>
                <p class="review__date">${date}</p>
                ${starsBlock.outerHTML}
                <p class="review__text">${text}</p>
                <i class="review__translate">*Translated from German</i>
            `;
      document.querySelector(wrapper).appendChild(card);
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (showMoreReviews);

/***/ }),

/***/ "./src/js/modules/showPhotos.js":
/*!**************************************!*\
  !*** ./src/js/modules/showPhotos.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const showPhotos = imgSelector => {
  const blocks = document.querySelectorAll(imgSelector);
  function showImg(block) {
    const img = block.querySelector('img'),
      text = block.querySelector('p');
    img.classList.add('phrase__item-img--active', 'animate__animated', 'animate__fadeIn', 'animate__faster');
    text.classList.remove('phrase__item-text--active');
  }
  function hideImg(block) {
    const img = block.querySelector('img'),
      text = block.querySelector('p');
    img.classList.remove('phrase__item-img--active');
    text.classList.add('phrase__item-text--active', 'animate__animated', 'animate__fadeIn', 'animate__faster');
  }
  blocks.forEach(item => {
    item.querySelector('.phrase__item-text').classList.add('phrase__item-text--active');
    item.addEventListener('mouseover', () => {
      showImg(item);
    });
    item.addEventListener('mouseout', () => {
      hideImg(item);
    });
  });
};
/* harmony default export */ __webpack_exports__["default"] = (showPhotos);

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const slider = function (slidesSelector, prev, next, activeClassSlide, sliderWrapperSelector) {
  let multipleSlides = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  let sliderDotSelector = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  let activeClassDot = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  let slideIndex = 6,
    paused = false;
  const slideItems = document.querySelectorAll(slidesSelector),
    sliderWrapper = document.querySelector(sliderWrapperSelector),
    dots = document.querySelectorAll(sliderDotSelector);
  function showSlides(n) {
    let slideAmount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    if (n > slideItems.length - 1) {
      slideIndex = 0;
    }
    if (n < 0) {
      slideIndex = slideItems.length - 1;
    }
    slideItems.forEach(item => {
      item.classList.add('animate__animated');
      item.classList.remove(activeClassSlide);
    });
    if (multipleSlides === true) {
      dots.forEach(item => {
        item.classList.remove(activeClassDot);
      });
      slideItems.forEach((item, index) => {
        let slideIndexEnd = slideIndex + slideAmount - 1;
        if (slideIndexEnd > slideItems.length - 1) {
          slideIndex = 0;
        }
        if (index >= slideIndex && index <= slideIndexEnd) {
          item.classList.add(activeClassSlide);
          item.classList.add('animate__slideInRight');
          dots[index].classList.add(activeClassDot);
          setTimeout(() => {
            item.classList.remove('animate__slideInRight');
          }, 1000);
        }
      });
    } else {
      slideItems[slideIndex].classList.add(activeClassSlide);
    }
  }
  ;
  function plusSlide(n) {
    let slideAmount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    showSlides(slideIndex += n, slideAmount);
  }
  try {
    const prevBtn = document.querySelector(prev),
      nextBtn = document.querySelector(next);
    prevBtn.addEventListener('click', () => {
      plusSlide(-1);
      slideItems[slideIndex].classList.remove('animate__fadeInLeft');
      slideItems[slideIndex].classList.add('animate__fadeInRight');
    });
    nextBtn.addEventListener('click', () => {
      plusSlide(1);
      slideItems[slideIndex].classList.add('animate__fadeInLeft');
      slideItems[slideIndex].classList.remove('animate__fadeInRight');
    });
  } catch (e) {}
  function activateAnimation() {
    paused = setInterval(function () {
      plusSlide(1);
      slideItems[slideIndex].classList.add('animate__fadeInLeft');
      slideItems[slideIndex].classList.remove('animate__fadeInRight');
    }, 3000);
  }
  function activateAnimationMultiple(slideAmount, time) {
    paused = setInterval(function () {
      plusSlide(1, slideAmount);
    }, time);
  }
  if (multipleSlides === false) {
    activateAnimation();
    sliderWrapper.addEventListener('mouseleave', () => {
      activateAnimation();
    });
    sliderWrapper.addEventListener('mouseenter', () => {
      clearInterval(paused);
    });
  }
  function setSliderByWindowSize() {
    let slideAmount, time;
    if (window.matchMedia("(min-width: 1201px)").matches) {
      slideAmount = 4;
      time = 5000;
      activateAnimationMultiple(slideAmount, time);
      showSlides(1, slideAmount);
      sliderWrapper.addEventListener('mouseleave', () => {
        activateAnimationMultiple(slideAmount, time);
      });
      sliderWrapper.addEventListener('mouseenter', () => {
        clearInterval(paused);
      });
    } else if (window.matchMedia("(max-width: 1200px) and (min-width: 993px)").matches) {
      slideAmount = 3;
      time = 5000;
      showSlides(1, slideAmount);
      sliderWrapper.addEventListener('mouseleave', () => {
        activateAnimationMultiple(slideAmount, time);
      });
      sliderWrapper.addEventListener('mouseenter', () => {
        clearInterval(paused);
      });
    } else if (window.matchMedia("(max-width: 992px) and (min-width: 575px)").matches) {
      slideAmount = 2;
      time = 4000;
      showSlides(1, slideAmount);
      activateAnimationMultiple(slideAmount, time);
    } else if (window.matchMedia("(max-width: 576px)").matches) {
      time = 3000;
      slideAmount = 1;
      showSlides(1, slideAmount);
      activateAnimationMultiple(slideAmount, time);
    }
    dots.forEach((item, index) => {
      item.addEventListener('click', e => {
        if (index >= dots.length - slideAmount && !e.target.classList.contains(activeClassDot)) {
          clearInterval(paused);
          slideIndex = dots.length - slideAmount;
          showSlides(1, slideAmount);
          return;
        }
        if (!(index >= dots.length - slideAmount) && !e.target.classList.contains(activeClassDot)) {
          clearInterval(paused);
          slideIndex = index;
          showSlides(1, slideAmount);
          return;
        }
      });
    });
  }
  if (multipleSlides === true) {
    setSliderByWindowSize();
    window.screen.orientation.addEventListener('change', () => {
      clearInterval(paused);
      setSliderByWindowSize();
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./src/js/modules/switcher.js":
/*!************************************!*\
  !*** ./src/js/modules/switcher.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const switcher = (switchWrapperSelector, switchBtnsSelector, activeClassBtn, numSelector, activeClassNum) => {
  const switchWrapper = document.querySelector(switchWrapperSelector),
    switchBtns = document.querySelectorAll(switchBtnsSelector),
    local = [13, 12, 11, 10],
    native = [15, 14, 13, 12];
  let switchContentBlock = Array.from(document.querySelectorAll(numSelector));
  switchContentBlock.map((item, i) => {
    return item.textContent = `${local[i]} €`;
  });
  switchWrapper.addEventListener('click', e => {
    const target = e.target;
    if (target.getAttribute('data-price-btn') === 'local' && !target.classList.contains(activeClassBtn)) {
      switchBtns.forEach(item => item.classList.remove(activeClassBtn));
      target.classList.add(activeClassBtn);
      switchContentBlock.map((item, i) => {
        item.classList.toggle(activeClassNum);
        return item.textContent = `${local[i]} €`;
      });
    }
    if (target.getAttribute('data-price-btn') === 'native' && !target.classList.contains(activeClassBtn)) {
      switchBtns.forEach(item => item.classList.remove(activeClassBtn));
      target.classList.add(activeClassBtn);
      switchContentBlock.map((item, i) => {
        item.classList.toggle(activeClassNum);
        return item.textContent = `${native[i]} €`;
      });
    }
  });
};
/* harmony default export */ __webpack_exports__["default"] = (switcher);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const tabs = (parentSelector, tabSelector, contentSelector, activeClassTab, activeClassContent) => {
  const parent = document.querySelector(parentSelector),
    tabs = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector);
  function hideContent() {
    content.forEach(item => {
      item.classList.remove(activeClassContent);
    });
    tabs.forEach(item => {
      item.classList.remove(activeClassTab);
    });
  }
  function showContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    content[i].classList.add(activeClassContent);
    tabs[i].classList.add(activeClassTab);
  }
  hideContent();
  showContent();
  parent.addEventListener('click', e => {
    const target = e.target;
    if ((target.classList.contains(tabSelector.replace(/\./, '')) || target.parentNode.classList.contains(tabSelector.replace(/\./, ''))) && !target.classList.contains(activeClassTab) && target) {
      tabs.forEach((item, i) => {
        if (item === target || item === target.parentNode) {
          // parentNode для того, щоб дочірні ел посилались на головний таргет
          hideContent();
          showContent(i);
        }
      });
    }
    ;
  });
};
/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./src/js/services/requests.js":
/*!*************************************!*\
  !*** ./src/js/services/requests.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: function() { return /* binding */ getResource; },
/* harmony export */   postData: function() { return /* binding */ postData; }
/* harmony export */ });
const postData = async (url, data) => {
  let result = await fetch(url, {
    method: 'POST',
    body: data
  });
  return await result.text();
};
const getResource = async url => {
  let result = await fetch(url);
  if (!result.ok) {
    throw new Error(`Couldn't not fetch ${url}, status: ${result.status}`);
  }
  return await result.json();
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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_hamburger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/hamburger */ "./src/js/modules/hamburger.js");
/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/accordion */ "./src/js/modules/accordion.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_switcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/switcher */ "./src/js/modules/switcher.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_checkTextInput__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/checkTextInput */ "./src/js/modules/checkTextInput.js");
/* harmony import */ var _modules_showMoreReviews__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/showMoreReviews */ "./src/js/modules/showMoreReviews.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_showPhotos__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/showPhotos */ "./src/js/modules/showPhotos.js");
/* harmony import */ var _modules_mask__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/mask */ "./src/js/modules/mask.js");
/* harmony import */ var _modules_cookie__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/cookie */ "./src/js/modules/cookie.js");













window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  (0,_modules_cookie__WEBPACK_IMPORTED_MODULE_12__["default"])();
  (0,_modules_hamburger__WEBPACK_IMPORTED_MODULE_0__["default"])('[data-btn="hamburger-open"]', '[data-btn="hamburger-close"]', '.header__nav', '.header .logo .logo__text', 'header__nav--active', 'logo__text--active', 'header__overlay');
  (0,_modules_accordion__WEBPACK_IMPORTED_MODULE_1__["default"])('.question__btn', 'question__btn--active', 'question__descr--active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__["default"])('.level__tabs', '.level__tab', '.level__content-text', 'level__tab--active', 'level__content-text--active');
  (0,_modules_switcher__WEBPACK_IMPORTED_MODULE_4__["default"])('.price__switch', '.price__switch-btn', 'price__switch-btn--active', '.price__offer-num', 'price__offer-num--active');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])('.tutor__slide', '[data-slider="left"]', '[data-slider="right"]', 'tutor__slide--active', '.tutor__wrapper');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])('.phrase__item', '', '', 'phrase__item--active', '.phrase', true, '.phrase__buttons-btn', 'phrase__buttons-btn--active');
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_checkTextInput__WEBPACK_IMPORTED_MODULE_7__["default"])('[name="name"]');
  (0,_modules_checkTextInput__WEBPACK_IMPORTED_MODULE_7__["default"])('[name="message"]');
  (0,_modules_showMoreReviews__WEBPACK_IMPORTED_MODULE_8__["default"])('[data-load="review"]', '#review .review__list');
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_9__["default"])('#modalOrderLessons', 'input[name="tutor"]', '#modalOrderPromocode', '.modal__calc', '.modal__promocode-text');
  (0,_modules_showPhotos__WEBPACK_IMPORTED_MODULE_10__["default"])('.phrase__item');
  (0,_modules_mask__WEBPACK_IMPORTED_MODULE_11__["default"])('[name="tel"]');
});
}();
/******/ })()
;
//# sourceMappingURL=script.js.map